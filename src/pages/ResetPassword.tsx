import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Heart, Lock } from "lucide-react";
import { z } from "zod";

const passwordSchema = z.string().min(6, "Wachtwoord moet minimaal 6 tekens bevatten");

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("ResetPassword auth event:", event, !!session);
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        if (session) setSessionReady(true);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("ResetPassword existing session:", !!session);
      if (session) setSessionReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { password?: string; confirmPassword?: string } = {};

    try {
      passwordSchema.parse(password);
    } catch (err) {
      if (err instanceof z.ZodError) newErrors.password = err.errors[0].message;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Wachtwoorden komen niet overeen";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      // Ensure we have a session before updating
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ variant: "destructive", title: "Fout", description: "Je sessie is verlopen. Vraag een nieuwe resetlink aan via de inlogpagina." });
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        console.error("updateUser error:", error);
        toast({ variant: "destructive", title: "Fout", description: error.message });
      } else {
        toast({ title: "Wachtwoord gewijzigd!", description: "Je kunt nu inloggen met je nieuwe wachtwoord." });
        await supabase.auth.signOut();
        navigate("/login");
      }
    } catch {
      toast({ variant: "destructive", title: "Fout", description: "Er is iets misgegaan." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-sage-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-sage-200/50 shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sage-400 to-sage-600">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-light text-charcoal-800">Nieuw wachtwoord</CardTitle>
          <CardDescription className="text-charcoal-500">
            {sessionReady 
              ? "Kies een nieuw wachtwoord voor je account" 
              : "Even geduld, je sessie wordt geladen..."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-charcoal-700">Nieuw wachtwoord</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 border-sage-200 focus:border-sage-400 focus:ring-sage-400" required />
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-charcoal-700">Bevestig wachtwoord</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
                <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10 border-sage-200 focus:border-sage-400 focus:ring-sage-400" required />
              </div>
              {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
            </div>
            <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700 text-white" disabled={loading || !sessionReady}>
              {loading ? "Even geduld..." : !sessionReady ? "Sessie laden..." : "Wachtwoord opslaan"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
