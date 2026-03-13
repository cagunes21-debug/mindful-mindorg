import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Mail, Lock, Presentation, FileText, Music } from "lucide-react";
import SEO from "@/components/SEO";

const ContentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // Prefetch content page
  useEffect(() => {
    import("./AdminContent");
  }, []);

  const redirectToContent = () => {
    console.log("[ContentLogin] Redirecting to /content-beheer");
    window.location.href = "/content-beheer";
  };

  // Check existing session & listen for sign-in
  useEffect(() => {
    let cancelled = false;
    let redirecting = false;

    const doRedirect = async (userId: string, accessToken: string) => {
      if (cancelled || redirecting) return;
      redirecting = true;

      try {
        const res = await Promise.race([
          fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/rpc/has_role`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ _user_id: userId, _role: "admin" }),
          }).then((r) => r.json()),
          new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 5000)),
        ]);

        if (res === true) {
          redirectToContent();
          return;
        }
      } catch (err) {
        console.warn("[ContentLogin] Admin check failed:", err);
      }

      // Not admin — show error
      redirecting = false;
      toast({
        variant: "destructive",
        title: "Geen toegang",
        description: "Je hebt geen beheerdersrechten voor Content Beheer.",
      });
      await supabase.auth.signOut();
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (cancelled) return;
      if (event === "SIGNED_IN" && session?.user && session.access_token) {
        setTimeout(() => doRedirect(session.user.id, session.access_token), 0);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user && session.access_token && !cancelled) {
        doRedirect(session.user.id, session.access_token);
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!email.trim()) newErrors.email = "E-mailadres is verplicht";
    if (!password) newErrors.password = "Wachtwoord is verplicht";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast({ variant: "destructive", title: "Inloggen mislukt", description: "E-mailadres of wachtwoord is onjuist." });
        } else if (error.message.includes("Email not confirmed")) {
          toast({ variant: "destructive", title: "E-mail niet bevestigd", description: "Bevestig eerst je e-mailadres." });
        } else {
          toast({ variant: "destructive", title: "Fout", description: error.message });
        }
      } else {
        toast({ title: "Welkom!", description: "Je wordt doorgestuurd naar Content Beheer..." });
        // Redirect happens via onAuthStateChange
        setTimeout(() => {
          window.location.href = "/content-beheer";
        }, 8000);
      }
    } catch {
      toast({ variant: "destructive", title: "Fout", description: "Er is iets misgegaan." });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: BookOpen, label: "Cursusmateriaal beheren" },
    { icon: Presentation, label: "Sessies samenstellen" },
    { icon: FileText, label: "Blog schrijven" },
    { icon: Music, label: "Meditaties uploaden" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-warm-50 to-sage-100 flex items-center justify-center p-4">
      <SEO title="Content Beheer Login | Mindful Mind" description="Log in op het Content Beheer portaal" />

      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left — branding */}
        <div className="hidden md:flex flex-col gap-6 pr-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Content Beheer</h1>
              <p className="text-sm text-muted-foreground">Mindful Mind</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Beheer al je trainingsmateriaal, sessies en publicaties vanuit één overzichtelijke werkplek.
          </p>

          <div className="space-y-3 mt-2">
            {features.map((f) => (
              <div key={f.label} className="flex items-center gap-3 text-sm text-foreground/80">
                <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
                  <f.icon className="h-4 w-4 text-primary" />
                </div>
                {f.label}
              </div>
            ))}
          </div>
        </div>

        {/* Right — login form */}
        <Card className="shadow-lg border-border/50">
          <CardHeader className="text-center md:text-left">
            <div className="md:hidden flex items-center gap-2 justify-center mb-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Mindful Mind</span>
            </div>
            <CardTitle className="text-xl">Inloggen</CardTitle>
            <CardDescription>Content Beheer Portaal</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mailadres</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="jouw@email.nl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    autoComplete="email"
                  />
                </div>
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Wachtwoord</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9"
                    autoComplete="current-password"
                  />
                </div>
                {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Bezig..." : "Inloggen"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentLogin;
