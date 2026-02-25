import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Heart, Lock, Loader2 } from "lucide-react";

type PageState = "loading" | "form" | "invalid" | "success";

const ResetPassword = () => {
  const [pageState, setPageState] = useState<PageState>("loading");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const resolved = useRef(false);

  useEffect(() => {
    // Listen for auth events (PASSWORD_RECOVERY or SIGNED_IN after token processing)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (resolved.current) return;

      if ((event === "PASSWORD_RECOVERY" || event === "SIGNED_IN" || event === "TOKEN_REFRESHED") && session) {
        resolved.current = true;
        setPageState("form");
      }
    });

    // Also check if there's already an active session (tokens may have been
    // processed before the listener was set up)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (resolved.current) return;
      if (session) {
        resolved.current = true;
        setPageState("form");
      }
    });

    // Check URL hash for recovery tokens as additional fallback
    const hash = window.location.hash;
    if (hash && (hash.includes("type=recovery") || hash.includes("access_token"))) {
      // Tokens are present, give Supabase a moment to process them
      setTimeout(() => {
        if (!resolved.current) {
          supabase.auth.getSession().then(({ data: { session } }) => {
            if (!resolved.current) {
              if (session) {
                resolved.current = true;
                setPageState("form");
              }
            }
          });
        }
      }, 2000);
    }

    // Fallback timeout
    const timeout = setTimeout(() => {
      if (!resolved.current) {
        resolved.current = true;
        setPageState("invalid");
      }
    }, 10000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Wachtwoord moet minimaal 6 tekens bevatten");
      return;
    }
    if (password !== confirmPassword) {
      setError("Wachtwoorden komen niet overeen");
      return;
    }

    setSaving(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSaving(false);

    if (updateError) {
      toast({
        variant: "destructive",
        title: "Fout",
        description: "Kon wachtwoord niet wijzigen. Vraag een nieuwe resetlink aan.",
      });
      return;
    }

    setPageState("success");
    toast({ title: "Wachtwoord gewijzigd!", description: "Je wordt doorgestuurd naar de inlogpagina." });
    await supabase.auth.signOut();
    setTimeout(() => navigate("/login"), 2000);
  };

  if (pageState === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-sage-50 flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-sage-600" />
        <p className="text-sm text-charcoal-500">Link verifiëren...</p>
      </div>
    );
  }

  if (pageState === "invalid") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-sage-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-sage-200/50 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-charcoal-800">Ongeldige link</CardTitle>
            <CardDescription className="text-charcoal-500">
              Deze resetlink is ongeldig of verlopen. Vraag een nieuwe aan via de inlogpagina.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/login")} className="w-full bg-sage-600 hover:bg-sage-700 text-white">
              Naar inlogpagina
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (pageState === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-sage-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-sage-200/50 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-xl text-charcoal-800">Wachtwoord gewijzigd!</CardTitle>
            <CardDescription className="text-charcoal-500">
              Je wordt doorgestuurd naar de inlogpagina...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-sage-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-sage-200/50 shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sage-400 to-sage-600">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-light text-charcoal-800">Nieuw wachtwoord</CardTitle>
          <CardDescription className="text-charcoal-500">Kies een nieuw wachtwoord voor je account</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-charcoal-700">Nieuw wachtwoord</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 border-sage-200 focus:border-sage-400 focus:ring-sage-400"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-charcoal-700">Bevestig wachtwoord</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 border-sage-200 focus:border-sage-400 focus:ring-sage-400"
                  required
                />
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700 text-white" disabled={saving}>
              {saving ? "Even geduld..." : "Wachtwoord opslaan"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
