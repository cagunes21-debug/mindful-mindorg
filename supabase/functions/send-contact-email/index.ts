import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactFormRequest {
  name: string;
  email: string;
  phone?: string;
  training?: string;
  message: string;
  // Registration-specific fields
  trainingDate?: string;
  trainingTime?: string;
  price?: string;
  remarks?: string;
  isRegistration?: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { 
      name, 
      email, 
      phone, 
      training, 
      message,
      trainingDate,
      trainingTime,
      price,
      remarks,
      isRegistration
    }: ContactFormRequest = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      console.error("Missing required fields:", { name: !!name, email: !!email, message: !!message });
      return new Response(
        JSON.stringify({ error: "Naam, e-mail en bericht zijn verplicht" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Invalid email format:", email);
      return new Response(
        JSON.stringify({ error: "Ongeldig e-mailadres" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // If this is a registration, save to database
    if (isRegistration && training) {
      console.log("Saving registration to database:", { name, email, training });
      
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      const { data: registrationData, error: registrationError } = await supabase
        .from("registrations")
        .insert({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone?.trim() || null,
          training_name: training,
          training_date: trainingDate || null,
          training_time: trainingTime || null,
          price: price || null,
          remarks: remarks?.trim() || null,
          status: "pending",
        })
        .select()
        .single();

      if (registrationError) {
        console.error("Error saving registration:", registrationError);
        // Continue with email sending even if database save fails
      } else {
        console.log("Registration saved successfully:", registrationData);
      }
    }

    console.log("Sending contact form email:", { name, email, training, isRegistration });

    // Determine email subject and content based on whether it's a registration
    const emailSubject = isRegistration 
      ? `Nieuwe aanmelding: ${training} - ${name}`
      : `Nieuw contactformulier: ${name}`;

    // Send notification email to Mindful Mind
    const notificationEmail = await resend.emails.send({
      from: "Mindful Mind <onboarding@resend.dev>",
      to: ["mindful-mind@outlook.com"],
      subject: emailSubject,
      html: `
        <h2>${isRegistration ? 'Nieuwe aanmelding ontvangen' : 'Nieuw bericht via het contactformulier'}</h2>
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefoon:</strong> ${phone}</p>` : ''}
        ${training ? `<p><strong>${isRegistration ? 'Training' : 'Interesse in'}:</strong> ${training}</p>` : ''}
        ${trainingDate ? `<p><strong>Startdatum:</strong> ${trainingDate}</p>` : ''}
        ${trainingTime ? `<p><strong>Tijd:</strong> ${trainingTime}</p>` : ''}
        ${price ? `<p><strong>Prijs:</strong> ${price}</p>` : ''}
        <p><strong>${isRegistration ? 'Opmerkingen' : 'Bericht'}:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log("Notification email sent:", notificationEmail);

    // Send confirmation email to the user
    const confirmationSubject = isRegistration
      ? `Bevestiging aanmelding: ${training} - Mindful Mind`
      : "Bedankt voor je bericht - Mindful Mind";

    const confirmationHtml = isRegistration
      ? `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #8B5A3C; font-size: 24px;">Bedankt voor je aanmelding, ${name}!</h1>
          <p style="color: #666; line-height: 1.6;">
            We hebben je aanmelding voor <strong>${training}</strong> ontvangen.
          </p>
          ${trainingDate ? `<p style="color: #666; line-height: 1.6;">Startdatum: <strong>${trainingDate}</strong></p>` : ''}
          ${trainingTime ? `<p style="color: #666; line-height: 1.6;">Tijd: <strong>${trainingTime}</strong></p>` : ''}
          ${price ? `<p style="color: #666; line-height: 1.6;">Prijs: <strong>${price}</strong></p>` : ''}
          <p style="color: #666; line-height: 1.6;">
            We nemen zo snel mogelijk contact met je op met meer informatie over de training.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Met warme groet,<br>
            <strong>Het Mindful Mind team</strong>
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">
            Dit is een automatisch gegenereerd bericht. Voor vragen kun je ons bereiken via mindful-mind@outlook.com
          </p>
        </div>
      `
      : `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #8B5A3C; font-size: 24px;">Bedankt voor je bericht, ${name}!</h1>
          <p style="color: #666; line-height: 1.6;">
            We hebben je bericht ontvangen en nemen zo snel mogelijk contact met je op.
          </p>
          ${training ? `<p style="color: #666; line-height: 1.6;">Je interesse in: <strong>${training}</strong></p>` : ''}
          <p style="color: #666; line-height: 1.6;">
            Met warme groet,<br>
            <strong>Het Mindful Mind team</strong>
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">
            Dit is een automatisch gegenereerd bericht. Voor vragen kun je ons bereiken via mindful-mind@outlook.com
          </p>
        </div>
      `;

    const confirmationEmail = await resend.emails.send({
      from: "Mindful Mind <onboarding@resend.dev>",
      to: [email],
      subject: confirmationSubject,
      html: confirmationHtml,
    });

    console.log("Confirmation email sent:", confirmationEmail);

    return new Response(
      JSON.stringify({ success: true, message: isRegistration ? "Aanmelding ontvangen" : "E-mails verzonden" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Er is een fout opgetreden" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
