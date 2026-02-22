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
  trainingDate?: string;
  trainingTime?: string;
  price?: string;
  remarks?: string;
  isRegistration?: boolean;
  honeypot?: string;
}

// Simple in-memory rate limiter (per function instance)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Rate limiting by IP
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || "unknown";
    if (isRateLimited(clientIp)) {
      console.warn("Rate limited IP:", clientIp);
      return new Response(
        JSON.stringify({ error: "Te veel verzoeken. Probeer het later opnieuw." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const body: ContactFormRequest = await req.json();
    const { name, email, phone, training, message, trainingDate, trainingTime, price, remarks, isRegistration, honeypot } = body;

    // Honeypot check - bots fill hidden fields
    if (honeypot) {
      console.warn("Honeypot triggered, likely bot");
      // Return success to not alert the bot
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length === 0 || name.trim().length > 100) {
      return new Response(
        JSON.stringify({ error: "Ongeldige naam (max 100 tekens)" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!email || typeof email !== "string" || email.trim().length > 255) {
      return new Response(
        JSON.stringify({ error: "Ongeldig e-mailadres" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return new Response(
        JSON.stringify({ error: "Ongeldig e-mailadres" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length === 0 || message.trim().length > 2000) {
      return new Response(
        JSON.stringify({ error: "Ongeldig bericht (max 2000 tekens)" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (phone && (typeof phone !== "string" || phone.trim().length > 20)) {
      return new Response(
        JSON.stringify({ error: "Ongeldig telefoonnummer (max 20 tekens)" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (training && (typeof training !== "string" || training.length > 200)) {
      return new Response(
        JSON.stringify({ error: "Ongeldige training selectie" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (remarks && (typeof remarks !== "string" || remarks.trim().length > 2000)) {
      return new Response(
        JSON.stringify({ error: "Ongeldige opmerkingen (max 2000 tekens)" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Sanitize inputs
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPhone = phone?.trim() || null;
    const sanitizedMessage = message.trim();
    const sanitizedRemarks = remarks?.trim() || null;

    // If this is a registration, save to database
    if (isRegistration && training) {
      console.log("Saving registration to database:", { name: sanitizedName, email: sanitizedEmail, training });
      
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      const { data: registrationData, error: registrationError } = await supabase
        .from("registrations")
        .insert({
          name: sanitizedName,
          email: sanitizedEmail,
          phone: sanitizedPhone,
          training_name: training,
          training_date: trainingDate || null,
          training_time: trainingTime || null,
          price: price || null,
          remarks: sanitizedRemarks,
          status: "pending",
        })
        .select()
        .single();

      if (registrationError) {
        console.error("Error saving registration:", registrationError);
      } else {
        console.log("Registration saved successfully:", registrationData);
      }
    }

    console.log("Sending contact form email:", { name: sanitizedName, email: sanitizedEmail, training, isRegistration });

    const emailSubject = isRegistration 
      ? `Nieuwe aanmelding: ${training} - ${sanitizedName}`
      : `Nieuw contactformulier: ${sanitizedName}`;

    // Escape HTML in user inputs to prevent XSS in emails
    const escapeHtml = (str: string) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    const notificationEmail = await resend.emails.send({
      from: "Mindful Mind <onboarding@resend.dev>",
      to: ["mindful-mind@outlook.com"],
      subject: emailSubject,
      html: `
        <h2>${isRegistration ? 'Nieuwe aanmelding ontvangen' : 'Nieuw bericht via het contactformulier'}</h2>
        <p><strong>Naam:</strong> ${escapeHtml(sanitizedName)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(sanitizedEmail)}</p>
        ${sanitizedPhone ? `<p><strong>Telefoon:</strong> ${escapeHtml(sanitizedPhone)}</p>` : ''}
        ${training ? `<p><strong>${isRegistration ? 'Training' : 'Interesse in'}:</strong> ${escapeHtml(training)}</p>` : ''}
        ${trainingDate ? `<p><strong>Startdatum:</strong> ${escapeHtml(trainingDate)}</p>` : ''}
        ${trainingTime ? `<p><strong>Tijd:</strong> ${escapeHtml(trainingTime)}</p>` : ''}
        ${price ? `<p><strong>Prijs:</strong> ${escapeHtml(price)}</p>` : ''}
        <p><strong>${isRegistration ? 'Opmerkingen' : 'Bericht'}:</strong></p>
        <p>${escapeHtml(sanitizedMessage).replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log("Notification email sent:", notificationEmail);

    const confirmationSubject = isRegistration
      ? `Bevestiging aanmelding: ${training} - Mindful Mind`
      : "Bedankt voor je bericht - Mindful Mind";

    const confirmationHtml = isRegistration
      ? `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #8B5A3C; font-size: 24px;">Bedankt voor je aanmelding, ${escapeHtml(sanitizedName)}!</h1>
          <p style="color: #666; line-height: 1.6;">
            We hebben je aanmelding voor <strong>${escapeHtml(training)}</strong> ontvangen.
          </p>
          ${trainingDate ? `<p style="color: #666; line-height: 1.6;">Startdatum: <strong>${escapeHtml(trainingDate)}</strong></p>` : ''}
          ${trainingTime ? `<p style="color: #666; line-height: 1.6;">Tijd: <strong>${escapeHtml(trainingTime)}</strong></p>` : ''}
          ${price ? `<p style="color: #666; line-height: 1.6;">Prijs: <strong>${escapeHtml(price)}</strong></p>` : ''}
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
          <h1 style="color: #8B5A3C; font-size: 24px;">Bedankt voor je bericht, ${escapeHtml(sanitizedName)}!</h1>
          <p style="color: #666; line-height: 1.6;">
            We hebben je bericht ontvangen en nemen zo snel mogelijk contact met je op.
          </p>
          ${training ? `<p style="color: #666; line-height: 1.6;">Je interesse in: <strong>${escapeHtml(training)}</strong></p>` : ''}
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
      to: [sanitizedEmail],
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
