import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Pencil, Trash2, ArrowLeft, Eye, EyeOff, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published: boolean;
  published_at: string | null;
  author_name: string;
  created_at: string;
  updated_at: string;
}

const emptyPost: Omit<BlogPost, "id" | "created_at" | "updated_at"> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "mindfulness",
  featured_image: "",
  meta_title: "",
  meta_description: "",
  published: false,
  published_at: null,
  author_name: "Mindful Mind",
};

const categories = [
  { value: "mindfulness", label: "Mindfulness" },
  { value: "zelfcompassie", label: "Zelfcompassie" },
  { value: "stressvermindering", label: "Stressvermindering" },
  { value: "meditatie", label: "Meditatie" },
  { value: "welzijn", label: "Welzijn" },
];

export default function AdminBlog() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> & typeof emptyPost>(emptyPost);
  const [isNew, setIsNew] = useState(true);

  // Auth is handled by ProtectedRoute in App.tsx

  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (post: Partial<BlogPost>) => {
      const payload = {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || null,
        content: post.content,
        category: post.category,
        featured_image: post.featured_image || null,
        meta_title: post.meta_title || null,
        meta_description: post.meta_description || null,
        published: post.published,
        published_at: post.published ? (post.published_at || new Date().toISOString()) : null,
        author_name: post.author_name || "Mindful Mind",
      };

      if (post.id) {
        const { error } = await supabase
          .from("blog_posts")
          .update(payload)
          .eq("id", post.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      setIsEditorOpen(false);
      toast({ title: "Opgeslagen", description: "Blogpost is opgeslagen." });
    },
    onError: (error: any) => {
      toast({
        title: "Fout bij opslaan",
        description: error.message || "Kon blogpost niet opslaan.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast({ title: "Verwijderd", description: "Blogpost is verwijderd." });
    },
    onError: (error: any) => {
      toast({
        title: "Fout bij verwijderen",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const openNewPost = () => {
    setEditingPost({ ...emptyPost });
    setIsNew(true);
    setIsEditorOpen(true);
  };

  const openEditPost = (post: BlogPost) => {
    setEditingPost({ ...post });
    setIsNew(false);
    setIsEditorOpen(true);
  };

  return (
    <div className="min-h-screen bg-warm-50">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/admin")} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </Button>
              <div>
                <h1 className="text-3xl font-light text-foreground">Blog Beheer</h1>
                <p className="text-muted-foreground mt-1">Artikelen aanmaken en bewerken</p>
              </div>
            </div>
            <Button onClick={openNewPost} className="gap-2 bg-terracotta-600 hover:bg-terracotta-700">
              <Plus className="h-4 w-4" />
              Nieuw artikel
            </Button>
          </div>

          {/* Posts Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Artikelen ({posts?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-sage-600" />
                </div>
              ) : !posts || posts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nog geen artikelen</p>
                  <Button onClick={openNewPost} variant="outline" className="mt-4 gap-2">
                    <Plus className="h-4 w-4" />
                    Eerste artikel schrijven
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Titel</TableHead>
                        <TableHead>Categorie</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Datum</TableHead>
                        <TableHead className="text-right">Acties</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {posts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell>
                            <p className="font-medium max-w-[300px] truncate">{post.title}</p>
                            <p className="text-xs text-muted-foreground">/blog/{post.slug}</p>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-terracotta-100 text-terracotta-700 border-0">
                              {categories.find(c => c.value === post.category)?.label || post.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {post.published ? (
                              <Badge className="bg-green-100 text-green-700 border-green-200">
                                <Eye className="h-3 w-3 mr-1" />
                                Gepubliceerd
                              </Badge>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-600 border-gray-200">
                                <EyeOff className="h-3 w-3 mr-1" />
                                Concept
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {format(new Date(post.created_at), "d MMM yyyy", { locale: nl })}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="sm" onClick={() => openEditPost(post)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => {
                                  if (confirm("Weet je zeker dat je dit artikel wilt verwijderen?")) {
                                    deleteMutation.mutate(post.id);
                                  }
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Editor Dialog */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNew ? "Nieuw artikel" : "Artikel bewerken"}</DialogTitle>
            <DialogDescription>
              {isNew ? "Maak een nieuw blogartikel aan" : "Bewerk dit blogartikel"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Title & Slug */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Titel *</Label>
                <Input
                  id="title"
                  value={editingPost.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setEditingPost(prev => ({
                      ...prev,
                      title,
                      ...(isNew ? { slug: generateSlug(title) } : {}),
                    }));
                  }}
                  placeholder="Titel van het artikel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL slug *</Label>
                <Input
                  id="slug"
                  value={editingPost.slug}
                  onChange={(e) => setEditingPost(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="url-slug"
                />
              </div>
            </div>

            {/* Category & Author */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Categorie</Label>
                <Select
                  value={editingPost.category}
                  onValueChange={(value) => setEditingPost(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Auteur</Label>
                <Input
                  id="author"
                  value={editingPost.author_name}
                  onChange={(e) => setEditingPost(prev => ({ ...prev, author_name: e.target.value }))}
                  placeholder="Mindful Mind"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label htmlFor="excerpt">Samenvatting</Label>
              <Textarea
                id="excerpt"
                value={editingPost.excerpt || ""}
                onChange={(e) => setEditingPost(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Korte samenvatting voor overzichtspagina's en SEO..."
                className="min-h-[80px]"
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Inhoud (HTML) *</Label>
              <Textarea
                id="content"
                value={editingPost.content}
                onChange={(e) => setEditingPost(prev => ({ ...prev, content: e.target.value }))}
                placeholder="<p>Schrijf hier je artikel...</p>"
                className="min-h-[200px] font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Gebruik HTML-tags zoals &lt;p&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;blockquote&gt; etc.
              </p>
            </div>

            {/* Featured Image */}
            <div className="space-y-2">
              <Label htmlFor="image">Uitgelichte afbeelding URL</Label>
              <Input
                id="image"
                value={editingPost.featured_image || ""}
                onChange={(e) => setEditingPost(prev => ({ ...prev, featured_image: e.target.value }))}
                placeholder="https://..."
              />
            </div>

            {/* SEO */}
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">SEO</h3>
              <div className="space-y-2">
                <Label htmlFor="meta_title">Meta titel</Label>
                <Input
                  id="meta_title"
                  value={editingPost.meta_title || ""}
                  onChange={(e) => setEditingPost(prev => ({ ...prev, meta_title: e.target.value }))}
                  placeholder="Aangepaste titel voor zoekmachines"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta_desc">Meta beschrijving</Label>
                <Textarea
                  id="meta_desc"
                  value={editingPost.meta_description || ""}
                  onChange={(e) => setEditingPost(prev => ({ ...prev, meta_description: e.target.value }))}
                  placeholder="Beschrijving voor zoekmachines (max 160 tekens)"
                  className="min-h-[60px]"
                />
              </div>
            </div>

            {/* Publish */}
            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex items-center gap-3">
                <Switch
                  checked={editingPost.published}
                  onCheckedChange={(checked) => setEditingPost(prev => ({ ...prev, published: checked }))}
                />
                <Label>{editingPost.published ? "Gepubliceerd" : "Concept"}</Label>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditorOpen(false)}>
                  Annuleren
                </Button>
                <Button
                  onClick={() => saveMutation.mutate(editingPost)}
                  disabled={saveMutation.isPending || !editingPost.title || !editingPost.slug || !editingPost.content}
                  className="bg-terracotta-600 hover:bg-terracotta-700 gap-2"
                >
                  {saveMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                  Opslaan
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
