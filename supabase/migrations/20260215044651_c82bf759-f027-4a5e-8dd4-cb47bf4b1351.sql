
-- Blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'mindfulness',
  featured_image TEXT,
  meta_title TEXT,
  meta_description TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  author_name TEXT NOT NULL DEFAULT 'Mindful Mind',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Everyone can read published posts
CREATE POLICY "Anyone can view published blog posts"
ON public.blog_posts
FOR SELECT
USING (published = true);

-- Admins can manage all posts
CREATE POLICY "Admins can manage blog posts"
ON public.blog_posts
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Index for slug lookups and category filtering
CREATE INDEX idx_blog_posts_slug ON public.blog_posts (slug);
CREATE INDEX idx_blog_posts_category ON public.blog_posts (category);
CREATE INDEX idx_blog_posts_published ON public.blog_posts (published, published_at DESC);

-- Trigger for updated_at
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
