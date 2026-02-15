import { useParams, Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, User } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import RelatedPosts from "@/components/blog/RelatedPosts";

const categoryLabels: Record<string, string> = {
  mindfulness: "Mindfulness",
  zelfcompassie: "Zelfcompassie",
  stressvermindering: "Stressvermindering",
  meditatie: "Meditatie",
  welzijn: "Welzijn",
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-20 container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
            <div className="h-8 bg-warm-100 rounded w-1/3" />
            <div className="h-12 bg-warm-100 rounded w-2/3" />
            <div className="h-64 bg-warm-100 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={post.meta_title || `${post.title} – Mindful Mind Blog`}
        description={post.meta_description || post.excerpt || `Lees meer over ${post.title} op de Mindful Mind blog.`}
        canonical={`https://mindfulmind.nl/blog/${post.slug}`}
        keywords={`${post.category}, mindfulness, zelfcompassie, ${post.title}`}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt || post.meta_description,
            author: { "@type": "Organization", name: post.author_name },
            datePublished: post.published_at,
            dateModified: post.updated_at,
            publisher: {
              "@type": "Organization",
              name: "Mindful Mind",
              url: "https://mindfulmind.nl",
            },
            mainEntityOfPage: `https://mindfulmind.nl/blog/${post.slug}`,
            ...(post.featured_image && { image: post.featured_image }),
          })}
        </script>
      </Helmet>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: post.title, url: `/blog/${post.slug}` },
      ]} />
      <Navigation />

      <article className="pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Button asChild variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground rounded-full">
                <Link to="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Terug naar blog
                </Link>
              </Button>
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="bg-terracotta-100 text-terracotta-700 border-0 rounded-full">
                  {categoryLabels[post.category] || post.category}
                </Badge>
                {post.published_at && (
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {format(new Date(post.published_at), "d MMMM yyyy", { locale: nl })}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-tight mb-4">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              )}

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <User className="h-4 w-4" />
                {post.author_name}
              </div>
            </motion.div>

            {/* Featured image */}
            {post.featured_image && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-10"
              >
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full rounded-3xl object-cover max-h-[500px]"
                />
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg max-w-none
                prose-headings:font-light prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-terracotta-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                prose-blockquote:border-terracotta-300 prose-blockquote:text-muted-foreground prose-blockquote:italic
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA */}
            <div className="mt-16 bg-warm-50 rounded-3xl p-8 md:p-10 border border-warm-200 text-center">
              <h2 className="text-2xl font-light text-foreground mb-3">
                Wil je zelfcompassie in de <span className="font-serif italic text-terracotta-600">praktijk</span> brengen?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Ontdek onze 8-weekse Mindful Self-Compassion training en leer de technieken uit dit artikel toepassen.
              </p>
              <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                <Link to="/">Bekijk de training</Link>
              </Button>
            </div>

            {/* Related Posts */}
            <RelatedPosts currentPostId={post.id} category={post.category} />
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
