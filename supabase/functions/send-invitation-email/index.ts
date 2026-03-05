import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { client_id, enrollment_id, program_name, email, first_name } = await req.json();

    if (!email || !program_name) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify admin access
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get the calling user
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    }).auth.getUser();

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check admin role
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build signup link with email pre-filled
    const siteUrl = req.headers.get("origin") || "https://mindful-mindorg.lovable.app";
    const signupLink = `${siteUrl}/login?signup=true&email=${encodeURIComponent(email)}`;

    // Send email via Resend
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Mindful Mind <noreply@mindful-mind.org>",
        to: [email],
        subject: `Je bent ingeschreven voor ${program_name}`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <div style="background:linear-gradient(135deg,#8B9D77,#A67B5B);border-radius:16px;padding:32px 24px;">
        <h1 style="color:#ffffff;font-size:24px;font-weight:300;margin:0 0 8px;">Welkom bij Mindful Mind</h1>
        <p style="color:rgba(255,255,255,0.9);font-size:14px;margin:0;">Je bent ingeschreven ✨</p>
      </div>
    </div>
    
    <div style="margin-bottom:24px;">
      <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Beste ${first_name || "deelnemer"},
      </p>
      <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Je bent ingeschreven voor <strong>${program_name}</strong>. 
        Maak een account aan om toegang te krijgen tot je trainingsmateriaal en vragenlijsten.
      </p>
    </div>

    <div style="text-align:center;margin:32px 0;">
      <a href="${signupLink}" style="display:inline-block;background:linear-gradient(135deg,#8B9D77,#7A8C66);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:500;">
        Account aanmaken
      </a>
    </div>

    <div style="background:#f9fafb;border-radius:8px;padding:16px;margin-bottom:24px;">
      <p style="color:#6b7280;font-size:13px;line-height:1.5;margin:0;">
        Na het aanmaken van je account krijg je automatisch toegang tot:
      </p>
      <ul style="color:#6b7280;font-size:13px;line-height:1.8;margin:8px 0 0;padding-left:20px;">
        <li>Je persoonlijke leeromgeving</li>
        <li>Meditaties en oefeningen</li>
        <li>Vragenlijsten en werkboek</li>
      </ul>
    </div>

    <p style="color:#9ca3af;font-size:12px;text-align:center;margin-top:32px;">
      Mindful Mind · Mindful Zelfcompassie Training
    </p>
  </div>
</body>
</html>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Resend error:", errorData);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
