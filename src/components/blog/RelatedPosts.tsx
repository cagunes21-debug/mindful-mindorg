import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const categoryLabels: Record<string, string> = {
  mindfulness: "Mindfulness",
  zelfcompassie: "Zelfcompassie",
  stressvermindering: "Stressvermindering",
  meditatie: "Meditatie",
  welzijn: "Welzijn",
};

interface RelatedPostsProps {
  currentPostId: string;
  category: string;
}

const RelatedPosts = ({ currentPostId, category }: RelatedPostsProps) => {
  const { data: relatedPosts } = useQuery({
    queryKey: ["related-posts", category, currentPostId],
    queryFn: async () => {
      const { data: sameCat, error: err1 } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, featured_image, category, published_at")
        .eq("published", true)
        .eq("category", category)
        .neq("id", currentPostId)
        .order("published_at", { ascending: false })
        .limit(3);

      if (err1) throw err1;
      if (sameCat && sameCat.length >= 3) return sameCat;

      const existing = sameCat || [];
      const excludeIds = [currentPostId, ...existing.map((p) => p.id)];
      const remaining = 3 - existing.length;

      const { data: otherCat, error: err2 } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, featured_image, category, published_at")
        .eq("published", true)
        .not("id", "in", `(${excludeIds.join(",")})`)
        .order("published_at", { ascending: false })
        .limit(remaining);

      if (err2) throw err2;
      return [...existing, ...(otherCat || [])];
    },
  });

  if (!relatedPosts || relatedPosts.length === 0) return null;

  const hasMultipleCategories = new Set(relatedPosts.map((p) => p.category)).size > 1;

  return (
    <section className="mt-16 pt-12 border-t border-warm-200">
      <h2 className="text-2xl font-light text-foreground mb-8 text-center">
        {hasMultipleCategories ? (
          <>Meer <span className="font-serif italic text-terracotta-600">artikelen</span></>
        ) : (
          <>Meer over <span className="font-serif italic text-terracotta-600">{categoryLabels[category] || category}</span></>
        )}
      </h2>
      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <StaggerItem key={post.id}>
            <Link
              to={`/blog/${post.slug}`}
              className="group block bg-white rounded-2xl border border-warm-200 overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              {post.featured_image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-terracotta-100 text-terracotta-700 border-0 rounded-full text-xs">
                    {categoryLabels[post.category] || post.category}
                  </Badge>
                  {post.published_at && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(post.published_at), "d MMM yyyy", { locale: nl })}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-terracotta-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                )}
                <span className="text-sm font-medium text-terracotta-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Lees meer <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
};

export default RelatedPosts;
