import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    apiVersion: "2025-08-27.basil",
  });

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    // Get the signature from the header
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      console.error("No stripe-signature header");
      return new Response(
        JSON.stringify({ error: "No signature" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get the raw body
    const body = await req.text();

    // Verify the webhook signature
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET not configured");
      return new Response(
        JSON.stringify({ error: "Webhook secret not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let event: Stripe.Event;
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return new Response(
        JSON.stringify({ error: "Invalid signature" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Received Stripe event:", event.type);

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const registrationId = session.metadata?.registration_id;

      if (!registrationId) {
        console.log("No registration_id in session metadata");
        return new Response(
          JSON.stringify({ received: true, message: "No registration_id" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      console.log("Processing payment for registration:", registrationId);

      // Fetch the registration
      const { data: registration, error: fetchError } = await supabaseClient
        .from("registrations")
        .select("*")
        .eq("id", registrationId)
        .single();

      if (fetchError || !registration) {
        console.error("Registration not found:", fetchError);
        return new Response(
          JSON.stringify({ error: "Registration not found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Update the registration status
      const { error: updateError } = await supabaseClient
        .from("registrations")
        .update({
          payment_status: "paid",
          paid_at: new Date().toISOString(),
          status: "confirmed",
        })
        .eq("id", registrationId);

      if (updateError) {
        console.error("Error updating registration:", updateError);
        return new Response(
          JSON.stringify({ error: "Failed to update registration" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      console.log("Registration updated successfully");

      // Send confirmation email
      const resendApiKey = Deno.env.get("RESEND_API_KEY");
      if (resendApiKey) {
        const resend = new Resend(resendApiKey);

        try {
          await resend.emails.send({
            from: "Mindful Mind <noreply@mindful-mind.nl>",
            to: [registration.email],
            subject: `Betalingsbevestiging: ${registration.training_name}`,
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
                  <div style="text-align: center; margin-bottom: 24px;">
                    <div style="display: inline-block; background: #d4edda; color: #155724; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 500;">
                      ✓ Betaling ontvangen
                    </div>
                  </div>
                  
                  <h2 style="color: #5a7a6b; margin-top: 0;">Beste ${registration.name},</h2>
                  
                  <p>Wat fijn! Je betaling voor <strong>${registration.training_name}</strong> is succesvol ontvangen. Je inschrijving is nu definitief.</p>
                  
                  <div style="background: white; padding: 20px; border-radius: 8px; margin: 24px 0; border: 1px solid #e8e0d5;">
                    <h3 style="color: #5a7a6b; margin-top: 0; font-size: 16px; border-bottom: 1px solid #e8e0d5; padding-bottom: 12px;">Trainingsgegevens</h3>
                    <table style="width: 100%; font-size: 14px;">
                      <tr>
                        <td style="padding: 8px 0; color: #666;">Training:</td>
                        <td style="padding: 8px 0; font-weight: 500;">${registration.training_name}</td>
                      </tr>
                      ${registration.training_date ? `
                      <tr>
                        <td style="padding: 8px 0; color: #666;">Startdatum:</td>
                        <td style="padding: 8px 0; font-weight: 500;">${registration.training_date}</td>
                      </tr>` : ''}
                      ${registration.training_time ? `
                      <tr>
                        <td style="padding: 8px 0; color: #666;">Tijd:</td>
                        <td style="padding: 8px 0; font-weight: 500;">${registration.training_time}</td>
                      </tr>` : ''}
                      ${registration.price ? `
                      <tr>
                        <td style="padding: 8px 0; color: #666;">Betaald:</td>
                        <td style="padding: 8px 0; font-weight: 500; color: #155724;">${registration.price}</td>
                      </tr>` : ''}
                    </table>
                  </div>
                  
                  <div style="background: #fff3cd; padding: 16px; border-radius: 8px; margin: 24px 0;">
                    <h4 style="color: #856404; margin: 0 0 8px 0; font-size: 14px;">📋 Wat kun je verwachten?</h4>
                    <p style="color: #856404; margin: 0; font-size: 14px;">
                      Een week voor de start ontvang je van ons een e-mail met praktische informatie en eventuele voorbereidende opdrachten.
                    </p>
                  </div>
                  
                  <p style="color: #666; font-size: 14px;">
                    Heb je vragen of wil je iets wijzigen? Neem gerust contact met ons op via 
                    <a href="mailto:mindful-mind@outlook.com" style="color: #c8a77e;">mindful-mind@outlook.com</a>
                  </p>
                  
                  <p>Met warme groet,<br><strong>Team Mindful Mind</strong></p>
                </div>
                
                <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
                  <p>© ${new Date().getFullYear()} Mindful Mind. Alle rechten voorbehouden.</p>
                </div>
              </body>
              </html>
            `,
          });
          console.log("Confirmation email sent successfully to:", registration.email);
        } catch (emailError) {
          console.error("Error sending confirmation email:", emailError);
          // Don't fail the webhook, payment was still successful
        }
      }

      return new Response(
        JSON.stringify({ received: true, registrationId }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Return 200 for unhandled events
    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Webhook error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
