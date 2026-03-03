import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Price mapping based on training type
const PRICE_MAP: Record<string, string> = {
  "Workshop Zelfcompassie": "price_1SwVkNGUBG17jvADqSqLjCor",
  "8-weekse MSC Training": "price_1SwVkYGUBG17jvADOGuK8xn1",
  "MBSR – 4-daags intensief": "price_1SwVknGUBG17jvADGVl2QmY4",
  "MSC – 4-daags intensief": "price_1SwVl3GUBG17jvADj4bKc5fx",
  "Individueel Traject": "price_1T6sXnGUBG17jvADNK4b4q38",
  // Fallback mappings for variations
  "8-weekse MSC Training (Nederlands)": "price_1SwVkYGUBG17jvADOGuK8xn1",
  "8-week MSC Training (English)": "price_1SwVkYGUBG17jvADOGuK8xn1",
  "Workshop Zelfcompassie (Nederlands)": "price_1SwVkNGUBG17jvADqSqLjCor",
  "Workshop Zelfcompassie (Engels)": "price_1SwVkNGUBG17jvADqSqLjCor",
};

// Find matching price ID for a training name
function findPriceId(trainingName: string): string | null {
  // Direct match
  if (PRICE_MAP[trainingName]) {
    return PRICE_MAP[trainingName];
  }
  
  // Partial match
  const lowerName = trainingName.toLowerCase();
  if (lowerName.includes("workshop")) {
    return PRICE_MAP["Workshop Zelfcompassie"];
  }
  if (lowerName.includes("8-week") || lowerName.includes("8 week")) {
    return PRICE_MAP["8-weekse MSC Training"];
  }
  if (lowerName.includes("mbsr")) {
    return PRICE_MAP["MBSR – 4-daags intensief"];
  }
  if (lowerName.includes("msc") && lowerName.includes("intensief")) {
    return PRICE_MAP["MSC – 4-daags intensief"];
  }
  if (lowerName.includes("individueel")) {
    return PRICE_MAP["Individueel Traject"];
  }
  
  return null;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    // Verify admin authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const anonClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await anonClient.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      throw new Error("Unauthorized");
    }

    const userId = claimsData.claims.sub as string;

    // Check if user is admin
    const { data: isAdmin } = await supabaseClient.rpc('has_role', { 
      _user_id: userId, 
      _role: 'admin' 
    });

    if (!isAdmin) {
      throw new Error("Only admins can create payment links");
    }

    const { registrationId, origin } = await req.json();

    if (!registrationId) {
      throw new Error("Registration ID is required");
    }

    // Fetch registration details
    const { data: registration, error: regError } = await supabaseClient
      .from("registrations")
      .select("*")
      .eq("id", registrationId)
      .single();

    if (regError || !registration) {
      throw new Error("Registration not found");
    }

    // Find the correct price ID
    const priceId = findPriceId(registration.training_name);
    if (!priceId) {
      throw new Error(`No price found for training: ${registration.training_name}`);
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Check if customer exists
    const customers = await stripe.customers.list({ 
      email: registration.email, 
      limit: 1 
    });
    
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: registration.email,
        name: registration.name,
        phone: registration.phone || undefined,
        metadata: {
          registration_id: registration.id,
        },
      });
      customerId = customer.id;
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin || req.headers.get("origin")}/betaling-succes?registration_id=${registrationId}`,
      cancel_url: `${origin || req.headers.get("origin")}/betaling-geannuleerd`,
      metadata: {
        registration_id: registrationId,
        training_name: registration.training_name,
      },
      payment_intent_data: {
        metadata: {
          registration_id: registrationId,
        },
      },
      locale: "nl",
    });

    // Update registration with payment link and status
    const { error: updateError } = await supabaseClient
      .from("registrations")
      .update({
        status: "confirmed",
        payment_status: "awaiting_payment",
        payment_link: session.url,
        stripe_session_id: session.id,
      })
      .eq("id", registrationId);

    if (updateError) {
      console.error("Error updating registration:", updateError);
    }

    // Send payment email
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey && session.url) {
      const resend = new Resend(resendApiKey);
      
      try {
        await resend.emails.send({
          from: "Mindful Mind <noreply@mindful-mind.org>",
          to: [registration.email],
          subject: `Bevestiging aanmelding: ${registration.training_name}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #c8a77e 0%, #b8956e 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-weight: 300; font-size: 28px;">Mindful Mind</h1>
              </div>
              
              <div style="background: #fdfaf6; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e8e0d5; border-top: none;">
                <h2 style="color: #5a7a6b; margin-top: 0;">Beste ${registration.name},</h2>
                
                <p>Wat fijn dat je je hebt aangemeld voor <strong>${registration.training_name}</strong>!</p>
                
                <p>Je aanmelding is bevestigd. Om je inschrijving definitief te maken, vragen we je om de betaling te voltooien via onderstaande link:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${session.url}" style="display: inline-block; background: #c8a77e; color: white; padding: 16px 32px; text-decoration: none; border-radius: 30px; font-weight: 500; font-size: 16px;">Betaling voltooien</a>
                </div>
                
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #5a7a6b; margin-top: 0; font-size: 16px;">Trainingsgegevens:</h3>
                  <p style="margin: 5px 0;"><strong>Training:</strong> ${registration.training_name}</p>
                  ${registration.training_date ? `<p style="margin: 5px 0;"><strong>Startdatum:</strong> ${registration.training_date}</p>` : ''}
                  ${registration.training_time ? `<p style="margin: 5px 0;"><strong>Tijd:</strong> ${registration.training_time}</p>` : ''}
                  ${registration.price ? `<p style="margin: 5px 0;"><strong>Kosten:</strong> ${registration.price}</p>` : ''}
                </div>
                
                <p style="color: #666; font-size: 14px;">Heb je vragen? Neem gerust contact met ons op via <a href="mailto:mindful-mind@outlook.com" style="color: #c8a77e;">mindful-mind@outlook.com</a></p>
                
                <p>Met warme groet,<br><strong>Team Mindful Mind</strong></p>
              </div>
              
              <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
                <p>© ${new Date().getFullYear()} Mindful Mind. Alle rechten voorbehouden.</p>
              </div>
            </body>
            </html>
          `,
        });
        console.log("Payment email sent successfully to:", registration.email);
      } catch (emailError) {
        console.error("Error sending payment email:", emailError);
        // Don't throw - the payment link was still created successfully
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        paymentUrl: session.url,
        sessionId: session.id,
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: unknown) {
    console.error("Error creating payment link:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
