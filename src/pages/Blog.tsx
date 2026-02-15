import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { motion } from "framer-motion";
import NewsletterForm from "@/components/NewsletterForm";

const categories = [
  { value: "all", label: "Alles" },
  { value: "mindfulness", label: "Mindfulness" },
  { value: "zelfcompassie", label: "Zelfcompassie" },
  { value: "stressvermindering", label: "Stressvermindering" },
  { value: "meditatie", label: "Meditatie" },
  { value: "welzijn", label: "Welzijn" },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts", activeCategory],
    queryFn: async () => {
      let query = supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (activeCategory !== "all") {
        query = query.eq("category", activeCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Blog – Mindful Mind"
        description="Artikelen over mindfulness, zelfcompassie en stressvermindering. Ontdek praktische tips, wetenschappelijke inzichten en oefeningen voor meer innerlijke rust."
        canonical="https://mindfulmind.nl/blog"
        keywords="mindfulness blog, zelfcompassie artikelen, stressvermindering tips, meditatie oefeningen, welzijn"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
      ]} />
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-sage-100/40 via-background to-background" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-terracotta-100/30 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 rounded-full bg-sage-100 border border-sage-200 px-5 py-2.5 text-sm font-medium text-sage-700"
            >
              <BookOpen className="h-4 w-4" />
              Artikelen & Inzichten
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-6 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]"
            >
              Blog
              <span className="block font-serif italic text-terracotta-600 mt-2">over mindfulness</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Praktische inzichten, oefeningen en wetenschappelijke achtergronden over mindfulness, zelfcompassie en stressvermindering.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-4 border-b border-border bg-white sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat.value
                    ? "bg-terracotta-600 text-white"
                    : "bg-warm-50 text-muted-foreground hover:text-terracotta-600 hover:bg-terracotta-50 border border-warm-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {isLoading ? (
              <div className="grid gap-8 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-warm-50 rounded-3xl p-6 animate-pulse h-64" />
                ))}
              </div>
            ) : posts && posts.length > 0 ? (
              <StaggerContainer className="grid gap-8 md:grid-cols-2">
                {posts.map((post) => (
                  <StaggerItem key={post.id}>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group block bg-white rounded-3xl border border-warm-200 overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
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
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="secondary" className="bg-terracotta-100 text-terracotta-700 border-0 rounded-full text-xs">
                            {categories.find(c => c.value === post.category)?.label || post.category}
                          </Badge>
                          {post.published_at && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(post.published_at), "d MMMM yyyy", { locale: nl })}
                            </span>
                          )}
                        </div>
                        <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-terracotta-600 transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                            {post.excerpt}
                          </p>
                        )}
                        <span className="text-sm font-medium text-terracotta-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                          Lees meer <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <ScrollReveal>
                <div className="text-center py-20">
                  <div className="h-16 w-16 rounded-full bg-warm-50 flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h2 className="text-2xl font-light text-foreground mb-3">
                    Binnenkort meer artikelen
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We werken aan nieuwe artikelen over mindfulness en zelfcompassie. Kom snel terug voor inspirerende content.
                  </p>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="pb-16 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <NewsletterForm variant="card" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
