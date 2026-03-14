import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAuth = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claimsData.claims.sub as string;
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );
    const { data: isAdmin } = await supabaseAdmin.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { client_email } = await req.json();
    if (!client_email) {
      return new Response(JSON.stringify({ error: "client_email is vereist" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Gather all client data
    const [clientRes, regRes, enrollRes] = await Promise.all([
      supabaseAdmin.from("clients").select("id, first_name, last_name, notes").eq("email", client_email).limit(1).maybeSingle(),
      supabaseAdmin.from("registrations").select("training_name, status, payment_status, price, created_at").eq("email", client_email).order("created_at", { ascending: false }),
      supabaseAdmin.from("customers").select("*").eq("email", client_email).limit(1).maybeSingle(),
    ]);

    const clientId = clientRes.data?.id;
    let intakeData = null;
    let therapySessions: any[] = [];
    let trainerNotes: any[] = [];
    let sessionAppts: any[] = [];

    if (clientId) {
      const { data: enrs } = await supabaseAdmin.from("enrollments")
        .select("id, course_type, start_date, status, sessions_total, sessions_used, sessions_remaining, intake_reason, intake_theme, intake_goal")
        .eq("client_id", clientId);

      const enrIds = (enrs || []).map((e: any) => e.id);

      if (enrIds.length > 0) {
        const [intakeRes, therapyRes, notesRes, apptsRes] = await Promise.all([
          supabaseAdmin.from("intake_submissions").select("reason, goal, duration_of_issue, daily_impact, previous_therapy, main_theme").in("enrollment_id", enrIds).limit(1).maybeSingle(),
          supabaseAdmin.from("therapy_sessions").select("session_number, session_date, helpvraag, belangrijkste_themas, observaties, interventies").in("enrollment_id", enrIds).order("session_date", { ascending: false }).limit(5),
          supabaseAdmin.from("trainer_notes").select("note_type, content, created_at").in("enrollment_id", enrIds).order("created_at", { ascending: false }).limit(10),
          supabaseAdmin.from("session_appointments").select("week_number, session_date, session_time, status").in("enrollment_id", enrIds).order("session_date", { ascending: true }),
        ]);
        intakeData = intakeRes.data;
        therapySessions = therapyRes.data || [];
        trainerNotes = notesRes.data || [];
        sessionAppts = apptsRes.data || [];
      }
    }

    const contextParts: string[] = [];
    contextParts.push(`Cliënt: ${clientRes.data?.first_name || ""} ${clientRes.data?.last_name || ""}`);
    
    if (enrollRes.data) {
      contextParts.push(`Totaal aanmeldingen: ${enrollRes.data.total_registrations}, Betaald: ${enrollRes.data.paid_registrations}, Omzet: €${enrollRes.data.total_spent}`);
      if (enrollRes.data.trainings?.length) contextParts.push(`Trainingen: ${enrollRes.data.trainings.join(", ")}`);
    }

    if (intakeData) {
      contextParts.push(`\nINTAKE:`);
      if (intakeData.reason) contextParts.push(`Wat brengt je hier: ${intakeData.reason}`);
      if ((intakeData as any).duration_of_issue) contextParts.push(`Hoe lang speelt dit: ${(intakeData as any).duration_of_issue}`);
      if ((intakeData as any).daily_impact) contextParts.push(`Invloed dagelijks leven: ${(intakeData as any).daily_impact}`);
      if (intakeData.goal) contextParts.push(`Wat hoop je te veranderen: ${intakeData.goal}`);
      if ((intakeData as any).previous_therapy) contextParts.push(`Eerdere therapie: ${(intakeData as any).previous_therapy}`);
      if (intakeData.main_theme) contextParts.push(`Hoofdthema: ${intakeData.main_theme}`);
    }

    if (therapySessions.length > 0) {
      contextParts.push(`\nLAATSTE SESSIES:`);
      therapySessions.forEach((s: any) => {
        contextParts.push(`Sessie ${s.session_number || "?"} (${s.session_date || "?"}): Helpvraag: ${s.helpvraag || "-"}, Thema's: ${s.belangrijkste_themas || "-"}, Observaties: ${s.observaties || "-"}, Interventies: ${s.interventies || "-"}`);
      });
    }

    if (trainerNotes.length > 0) {
      contextParts.push(`\nTRAINER NOTITIES:`);
      trainerNotes.forEach((n: any) => {
        contextParts.push(`[${n.note_type}] ${n.content}`);
      });
    }

    if (sessionAppts.length > 0) {
      const upcoming = sessionAppts.filter((a: any) => a.status === "gepland");
      const completed = sessionAppts.filter((a: any) => a.status === "afgerond");
      contextParts.push(`\nSESSIES: ${completed.length} afgerond, ${upcoming.length} gepland`);
    }

    if (clientRes.data?.notes) {
      contextParts.push(`\nALGEMENE NOTITIES: ${clientRes.data.notes}`);
    }

    const fullContext = contextParts.join("\n");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `Je bent een ervaren therapeut-assistent die beknopte cliëntsamenvattingen schrijft voor een mindfulness- en zelfcompassie-trainer. 

Schrijf in het Nederlands. Wees warm maar professioneel. Gebruik de je/jij-vorm wanneer je over de cliënt schrijft.

Genereer een gestructureerd overzicht met de volgende secties:
1. **Kernprofiel** (2-3 zinnen): Wie is deze cliënt, wat is de hulpvraag
2. **Voortgang** (2-3 zinnen): Waar staat de cliënt nu in het traject
3. **Aandachtspunten** (opsomming): Belangrijke thema's om in de gaten te houden
4. **Volgende stap** (1-2 zinnen): Aanbeveling voor de volgende sessie

Als er weinig data beschikbaar is, geef dat eerlijk aan en baseer je samenvatting op wat er wél is.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Maak een samenvatting voor deze cliënt op basis van de volgende gegevens:\n\n${fullContext}` },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Te veel verzoeken. Probeer het later opnieuw." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI-tegoed onvoldoende. Voeg credits toe." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI samenvatting mislukt");
    }

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content || "Geen samenvatting beschikbaar.";

    return new Response(JSON.stringify({ summary }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("client-summary error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Onbekende fout" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
