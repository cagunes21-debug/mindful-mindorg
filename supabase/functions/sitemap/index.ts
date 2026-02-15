import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/xml; charset=utf-8",
};

const BASE_URL = "https://mindfulmind.nl";

const staticPages = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/ons-aanbod", changefreq: "monthly", priority: "0.9" },
  { loc: "/coaching", changefreq: "monthly", priority: "0.8" },
  { loc: "/bedrijven", changefreq: "monthly", priority: "0.8" },
  { loc: "/barcelona-retreat", changefreq: "monthly", priority: "0.8" },
  { loc: "/agenda", changefreq: "weekly", priority: "0.8" },
  { loc: "/blog", changefreq: "weekly", priority: "0.8" },
  { loc: "/over-ons", changefreq: "monthly", priority: "0.7" },
  { loc: "/trainers", changefreq: "monthly", priority: "0.7" },
  { loc: "/ervaringen", changefreq: "monthly", priority: "0.7" },
  { loc: "/contact", changefreq: "monthly", priority: "0.7" },
  { loc: "/faq", changefreq: "monthly", priority: "0.6" },
  { loc: "/privacy", changefreq: "yearly", priority: "0.3" },
];

const cities = [
  "amsterdam", "rotterdam", "den-haag", "utrecht", "eindhoven",
  "groningen", "arnhem", "tilburg", "breda", "nijmegen",
  "haarlem", "leiden", "almere", "maastricht", "enschede",
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const { data: posts } = await supabase
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("published", true)
      .order("published_at", { ascending: false });

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static pages
    for (const page of staticPages) {
      xml += `
  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    }

    // Blog posts
    if (posts) {
      for (const post of posts) {
        const lastmod = post.updated_at ? new Date(post.updated_at).toISOString().split("T")[0] : "";
        xml += `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>${lastmod ? `
    <lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      }
    }

    // City landing pages
    for (const city of cities) {
      xml += `
  <url>
    <loc>${BASE_URL}/zelfcompassie-training/${city}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }

    xml += `
</urlset>`;

    return new Response(xml, {
      headers: { ...corsHeaders, "Cache-Control": "public, max-age=3600" },
      status: 200,
    });
  } catch (error) {
    return new Response(`<error>${error.message}</error>`, {
      headers: corsHeaders,
      status: 500,
    });
  }
});
