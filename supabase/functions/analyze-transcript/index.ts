import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Authenticate the request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
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
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { transcript } = await req.json();
    if (!transcript || transcript.trim().length < 50) {
      return new Response(JSON.stringify({ error: "Transcript is te kort. Plak minimaal een paar alinea's." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `Je bent een ervaren klinisch psycholoog en therapeut die gestructureerde sessienotities schrijft op basis van therapie-transcripten. 
    
Analyseer het transcript en vul de volgende velden in. Schrijf beknopt, professioneel en in de derde persoon. Gebruik klinisch taalgebruik dat geschikt is voor een cliëntdossier.

Gebruik de volgende tool om je antwoord te structureren.`;

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
          { role: "user", content: `Analyseer het volgende therapie-transcript en genereer gestructureerde sessienotities:\n\n${transcript}` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_session_notes",
              description: "Genereer gestructureerde therapie-sessienotities op basis van een transcript.",
              parameters: {
                type: "object",
                properties: {
                  helpvraag: { type: "string", description: "De primaire hulpvraag van de cliënt, bondig samengevat." },
                  achtergrond: { type: "string", description: "Relevante achtergrondinfo: context, voorgeschiedenis, omstandigheden." },
                  belangrijkste_themas: { type: "string", description: "De belangrijkste thema's die in de sessie naar voren kwamen, komma-gescheiden of in korte opsomming." },
                  doelstelling: { type: "string", description: "De doelstelling van de therapie of deze specifieke sessie." },
                  observaties: { type: "string", description: "Observaties van de therapeut: houding, emotie, non-verbaal gedrag, patronen." },
                  interventies: { type: "string", description: "Gebruikte of voorgestelde interventies en technieken." },
                },
                required: ["helpvraag", "achtergrond", "belangrijkste_themas", "doelstelling", "observaties", "interventies"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_session_notes" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Te veel verzoeken. Probeer het later opnieuw." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI-tegoed onvoldoende. Voeg credits toe in je workspace." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI analyse mislukt");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      throw new Error("Geen gestructureerd antwoord ontvangen van AI");
    }

    const notes = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(notes), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-transcript error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Onbekende fout" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
