import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { email, action, otp, newPassword } = body;

    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ error: "E-mailadres is verplicht" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const emailNorm = email.toLowerCase().trim();

    if (action === "request") {
      // Check if user exists
      const { data: userData } = await supabaseAdmin.auth.admin.listUsers();
      const userExists = userData?.users?.some(
        (u) => u.email?.toLowerCase() === emailNorm
      );

      // Always return success to prevent email enumeration
      if (!userExists) {
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Generate 6-digit OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Invalidate previous OTPs
      await supabaseAdmin
        .from("password_reset_otps")
        .update({ used: true })
        .eq("email", emailNorm)
        .eq("used", false);

      // Store OTP
      const { error: insertError } = await supabaseAdmin
        .from("password_reset_otps")
        .insert({
          email: emailNorm,
          otp_code: otpCode,
          expires_at: expiresAt.toISOString(),
        });

      if (insertError) {
        console.error("OTP insert error:", insertError);
        return new Response(JSON.stringify({ error: "Kon code niet aanmaken" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Send email
      const { error: emailError } = await resend.emails.send({
        from: Deno.env.get("RESEND_FROM_EMAIL") || "Compassie Collectief <noreply@mindful-mind.org>",
        to: [email.trim()],
        subject: "Je verificatiecode voor wachtwoord reset",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2d5a3d; font-size: 24px; font-weight: 300; margin: 0;">Compassie Collectief</h1>
            </div>
            <div style="background: #f8f6f3; border-radius: 12px; padding: 30px; text-align: center;">
              <h2 style="color: #1a1a1a; font-size: 20px; font-weight: 400; margin: 0 0 10px;">Wachtwoord resetten</h2>
              <p style="color: #666; font-size: 14px; margin: 0 0 24px;">Gebruik onderstaande code om je wachtwoord te resetten. De code is 10 minuten geldig.</p>
              <div style="background: white; border: 2px solid #2d5a3d; border-radius: 8px; padding: 16px; margin: 0 auto; display: inline-block;">
                <span style="font-size: 32px; letter-spacing: 8px; font-weight: 600; color: #2d5a3d;">${otpCode}</span>
              </div>
              <p style="color: #999; font-size: 12px; margin-top: 24px;">Heb je deze code niet aangevraagd? Negeer dan deze e-mail.</p>
            </div>
          </div>
        `,
      });

      if (emailError) {
        console.error("Email send error:", emailError);
        return new Response(JSON.stringify({ error: "Kon e-mail niet versturen" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "verify") {
      if (!otp || !newPassword) {
        return new Response(JSON.stringify({ error: "Code en nieuw wachtwoord zijn verplicht" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Validate password strength
      if (newPassword.length < 8) {
        return new Response(JSON.stringify({ error: "Wachtwoord moet minimaal 8 tekens bevatten" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Find valid OTP
      const { data: otpRecord, error: otpError } = await supabaseAdmin
        .from("password_reset_otps")
        .select("*")
        .eq("email", emailNorm)
        .eq("otp_code", otp)
        .eq("used", false)
        .gte("expires_at", new Date().toISOString())
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (otpError || !otpRecord) {
        return new Response(JSON.stringify({ error: "Ongeldige of verlopen code. Probeer het opnieuw." }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Mark OTP as used
      await supabaseAdmin
        .from("password_reset_otps")
        .update({ used: true })
        .eq("id", otpRecord.id);

      // Find user and update password
      const { data: userData } = await supabaseAdmin.auth.admin.listUsers();
      const user = userData?.users?.find(
        (u) => u.email?.toLowerCase() === emailNorm
      );

      if (!user) {
        return new Response(JSON.stringify({ error: "Gebruiker niet gevonden" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
        user.id,
        { password: newPassword }
      );

      if (updateError) {
        console.error("Password update error:", updateError);
        return new Response(JSON.stringify({ error: "Kon wachtwoord niet wijzigen" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Ongeldige actie" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
