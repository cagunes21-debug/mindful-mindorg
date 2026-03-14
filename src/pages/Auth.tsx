import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Heart, Mail, Lock, ArrowLeft, Check, Clock, Users, Globe, Calendar, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const emailSchema = z.string().email("Voer een geldig e-mailadres in");
const passwordSchema = z.string()
  .min(8, "Minimaal 8 tekens")
  .regex(/[A-Z]/, "Minimaal 1 hoofdletter")
  .regex(/[0-9]/, "Minimaal 1 cijfer")
  .regex(/[^A-Za-z0-9]/, "Minimaal 1 speciaal teken");

const trainingHighlights = [
  "8 wekelijkse groepssessies van 2 uur",
  "Stilte-retreat sessie",
  "Toegang tot online leeromgeving",
  "Geleide meditaties en oefeningen",
  "Persoonlijk werkboek",
  "Certificaat van deelname",
];

type ResetStep = "email" | "otp" | "newPassword" | "success";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const inviteSignup = searchParams.get("signup") === "true";
  const inviteEmail = searchParams.get("email") || "";
  
  const [isLogin, setIsLogin] = useState(!inviteSignup);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetStep, setResetStep] = useState<ResetStep>("email");
  const [email, setEmail] = useState(inviteEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  // Prefetch admin dashboard chunk so it's ready when we redirect
  useEffect(() => {
    import("./AdminDashboard");
  }, []);

  const redirectAfterLogin = async (userId: string, accessToken: string) => {
    console.log("[Auth] redirectAfterLogin called for user:", userId);
    
    try {
      const res = await Promise.race([
        fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/rpc/has_role`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
              "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ _user_id: userId, _role: "admin" }),
          }
        ).then(r => r.json()),
        new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 5000)),
      ]);

      console.log("[Auth] has_role result:", res);
      if (res === true) {
        console.log("[Auth] Admin detected, redirecting to /admin");
        navigate("/admin", { replace: true });
        return;
      }
    } catch (err) {
      console.warn("[Auth] Admin check failed, defaulting to participant:", err);
    }

    console.log("[Auth] Redirecting to /mijn-trainingen");
    window.location.href = "/mijn-trainingen";
  };

  useEffect(() => {
    let cancelled = false;
    let redirecting = false;

    const doRedirect = (userId: string, accessToken: string) => {
      if (cancelled || redirecting) return;
      redirecting = true;
      redirectAfterLogin(userId, accessToken);
    };

    // Set up listener FIRST (Supabase best practice)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (cancelled) return;
      if (event === "SIGNED_IN" && session?.user && session.access_token) {
        console.log("[Auth] SIGNED_IN event received");
        // Break out of auth callback context to prevent deadlocks
        setTimeout(() => doRedirect(session.user.id, session.access_token), 0);
      }
    });

    // THEN check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user && session.access_token && !cancelled) {
        console.log("[Auth] Existing session found");
        doRedirect(session.user.id, session.access_token);
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    try {
      emailSchema.parse(email);
    } catch (e) {
      if (e instanceof z.ZodError) newErrors.email = e.errors[0].message;
    }

    if (!isLogin) {
      try {
        passwordSchema.parse(password);
      } catch (e) {
        if (e instanceof z.ZodError) newErrors.password = e.errors.map(err => err.message).join(", ");
      }
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Wachtwoorden komen niet overeen";
      }
    } else {
      if (!password || password.length < 1) {
        newErrors.password = "Wachtwoord is verplicht";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    try {
      emailSchema.parse(email);
    } catch (err) {
      if (err instanceof z.ZodError) newErrors.email = err.errors[0].message;
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-reset-otp", {
        body: { email: email.trim(), action: "request" },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast({
        title: "Code verzonden",
        description: "Controleer je inbox voor de 6-cijferige code.",
      });
      setResetStep("otp");
    } catch {
      toast({
        variant: "destructive",
        title: "Fout",
        description: "Er is iets misgegaan. Probeer het later opnieuw.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) {
      setErrors({ otp: "Voer de volledige 6-cijferige code in" });
      return;
    }
    setResetStep("newPassword");
    setErrors({});
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    try {
      passwordSchema.parse(newPassword);
    } catch (err) {
      if (err instanceof z.ZodError) newErrors.newPassword = err.errors.map(e => e.message).join(", ");
    }
    if (newPassword !== confirmNewPassword) {
      newErrors.confirmNewPassword = "Wachtwoorden komen niet overeen";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-reset-otp", {
        body: {
          email: email.trim(),
          action: "verify",
          otp: otpCode,
          newPassword: newPassword,
        },
      });

      if (error) throw error;
      if (data?.error) {
        toast({
          variant: "destructive",
          title: "Fout",
          description: data.error,
        });
        if (data.error.includes("verlopen") || data.error.includes("Ongeldige")) {
          setResetStep("otp");
          setOtpCode("");
        }
        return;
      }

      setResetStep("success");
      toast({
        title: "Wachtwoord gewijzigd!",
        description: "Je kunt nu inloggen met je nieuwe wachtwoord.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Fout",
        description: "Er is iets misgegaan. Probeer het later opnieuw.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      if (isLogin) {
        // Don't rely on this promise resolving — onAuthStateChange handles redirect
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({ variant: "destructive", title: "Inloggen mislukt", description: "E-mailadres of wachtwoord is onjuist." });
          } else if (error.message.includes("Email not confirmed")) {
            toast({ variant: "destructive", title: "E-mail niet bevestigd", description: "Controleer je inbox en bevestig je e-mailadres." });
          } else {
            toast({ variant: "destructive", title: "Fout", description: error.message });
          }
        } else {
          toast({ title: "Welkom terug!", description: "Je bent succesvol ingelogd." });
          // Redirect happens via onAuthStateChange listener
          // Safety fallback if event doesn't fire within 8s
          setTimeout(() => {
            window.location.href = "/mijn-trainingen";
          }, 8000);
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });

        if (error) {
          if (error.message.includes("User already registered")) {
            toast({ variant: "destructive", title: "Account bestaat al", description: "Er bestaat al een account met dit e-mailadres. Probeer in te loggen." });
          } else {
            toast({ variant: "destructive", title: "Registratie mislukt", description: error.message });
          }
        } else {
          toast({ title: "Account aangemaakt!", description: "Controleer je inbox om je e-mailadres te bevestigen." });
        }
      }
    } catch {
      toast({ variant: "destructive", title: "Fout", description: "Er is iets misgegaan. Probeer het later opnieuw." });
    } finally {
      setLoading(false);
    }
  };

  const renderForgotPassword = () => {
    if (resetStep === "success") {
      return (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <ShieldCheck className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-sm text-muted-foreground">Je wachtwoord is gewijzigd. Je kunt nu inloggen.</p>
          <Button
            onClick={() => { setIsForgotPassword(false); setResetStep("email"); setOtpCode(""); setNewPassword(""); setConfirmNewPassword(""); }}
            className="w-full bg-sage-600 hover:bg-sage-700 text-white"
          >
            Naar inloggen
          </Button>
        </div>
      );
    }

    if (resetStep === "newPassword") {
      return (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-foreground">Nieuw wachtwoord</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="newPassword" type="password" placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="pl-10 border-warm-200 focus:border-sage-400 focus:ring-sage-400" required />
            </div>
            <p className="text-xs text-muted-foreground">Min. 8 tekens, 1 hoofdletter, 1 cijfer, 1 speciaal teken</p>
            {errors.newPassword && <p className="text-sm text-destructive">{errors.newPassword}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmNewPassword" className="text-foreground">Bevestig wachtwoord</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="confirmNewPassword" type="password" placeholder="••••••••" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="pl-10 border-warm-200 focus:border-sage-400 focus:ring-sage-400" required />
            </div>
            {errors.confirmNewPassword && <p className="text-sm text-destructive">{errors.confirmNewPassword}</p>}
          </div>
          <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700 text-white" disabled={loading}>
            {loading ? "Even geduld..." : "Wachtwoord opslaan"}
          </Button>
          <div className="text-center">
            <button type="button" onClick={() => { setResetStep("otp"); setErrors({}); }} className="text-sm text-sage-600 hover:text-sage-800 underline-offset-4 hover:underline transition-colors">
              Terug
            </button>
          </div>
        </form>
      );
    }

    if (resetStep === "otp") {
      return (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="space-y-3 text-center">
            <p className="text-sm text-muted-foreground">
              Voer de 6-cijferige code in die we naar <strong>{email}</strong> hebben gestuurd.
            </p>
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {errors.otp && <p className="text-sm text-destructive">{errors.otp}</p>}
          </div>
          <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700 text-white" disabled={otpCode.length !== 6}>
            Code verifiëren
          </Button>
          <div className="flex justify-between text-sm">
            <button type="button" onClick={() => { setResetStep("email"); setOtpCode(""); setErrors({}); }} className="text-sage-600 hover:text-sage-800 underline-offset-4 hover:underline transition-colors">
              Ander e-mailadres
            </button>
            <button type="button" onClick={async () => {
              setLoading(true);
              try {
                await supabase.functions.invoke("send-reset-otp", { body: { email: email.trim(), action: "request" } });
                toast({ title: "Nieuwe code verzonden", description: "Controleer je inbox." });
              } catch { /* ignore */ } finally { setLoading(false); }
            }} className="text-sage-600 hover:text-sage-800 underline-offset-4 hover:underline transition-colors" disabled={loading}>
              Code opnieuw sturen
            </button>
          </div>
        </form>
      );
    }

    // Step: email
    return (
      <form onSubmit={handleRequestOtp} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="resetEmail" className="text-foreground">E-mailadres</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="resetEmail" type="email" placeholder="jouw@email.nl" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 border-warm-200 focus:border-sage-400 focus:ring-sage-400" required />
          </div>
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>
        <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700 text-white" disabled={loading}>
          {loading ? "Even geduld..." : "Verificatiecode versturen"}
        </Button>
        <div className="text-center">
          <button type="button" onClick={() => { setIsForgotPassword(false); setResetStep("email"); setErrors({}); }} className="text-sm text-sage-600 hover:text-sage-800 underline-offset-4 hover:underline transition-colors">
            Terug naar inloggen
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-50 to-sage-50 flex flex-col">
      {/* Header */}
      <div className="p-4 md:p-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-800 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Terug naar home</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
          
          {/* Left: Training Info */}
          <div className="hidden md:block">
            <div className="space-y-6">
              <div>
                <span className="inline-block rounded-full bg-terracotta-100/80 px-4 py-1.5 text-xs font-medium tracking-wide text-terracotta-700 mb-4">
                  8-weekse groepstraining
                </span>
                <h2 className="text-3xl font-light text-foreground leading-tight">
                  Mindful
                  <span className="block font-serif italic text-terracotta-600 mt-1">Zelfcompassie</span>
                </h2>
                <p className="text-muted-foreground mt-3 leading-relaxed text-sm">
                  Leer jezelf te steunen, vooral in moeilijke tijden. Dit wetenschappelijk onderbouwde programma helpt je om zelfkritiek te transformeren in zelfcompassie.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4 text-terracotta-500" /><span>8 weken + retreat</span></div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><Calendar className="h-4 w-4 text-terracotta-500" /><span>2 uur per sessie</span></div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><Globe className="h-4 w-4 text-terracotta-500" /><span>100% live online</span></div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><Users className="h-4 w-4 text-terracotta-500" /><span>NL / EN</span></div>
              </div>

              <div className="space-y-2.5">
                <p className="text-sm font-medium text-foreground">Wat is inbegrepen:</p>
                {trainingHighlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <Check className="h-3.5 w-3.5 text-terracotta-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-2xl font-light text-terracotta-600">€550</p>
            </div>
          </div>

          {/* Right: Login Form */}
          <Card className="w-full border-warm-200/50 shadow-lg">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sage-400 to-sage-600">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-light text-foreground">
                {isForgotPassword
                  ? resetStep === "success" ? "Gelukt!" : resetStep === "otp" ? "Code invoeren" : resetStep === "newPassword" ? "Nieuw wachtwoord" : "Wachtwoord vergeten"
                  : isLogin ? "Welkom terug" : "Account aanmaken"}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {isForgotPassword
                  ? resetStep === "otp" ? "We hebben een code naar je e-mail gestuurd" : resetStep === "newPassword" ? "Kies een sterk nieuw wachtwoord" : resetStep === "success" ? "" : "We sturen een verificatiecode naar je e-mail"
                  : isLogin ? "Log in om toegang te krijgen tot je training" : "Maak een account aan om je aan te melden"}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-4">
              {isForgotPassword ? renderForgotPassword() : (
                <>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">E-mailadres</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="email" type="email" placeholder="jouw@email.nl" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 border-warm-200 focus:border-sage-400 focus:ring-sage-400" required />
                      </div>
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-foreground">Wachtwoord</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 border-warm-200 focus:border-sage-400 focus:ring-sage-400" required />
                      </div>
                      {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                      {!isLogin && <p className="text-xs text-muted-foreground">Min. 8 tekens, 1 hoofdletter, 1 cijfer, 1 speciaal teken</p>}
                    </div>

                    {!isLogin && (
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-foreground">Bevestig wachtwoord</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10 border-warm-200 focus:border-sage-400 focus:ring-sage-400" required />
                        </div>
                        {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                      </div>
                    )}

                    {isLogin && (
                      <div className="text-right">
                        <button type="button" onClick={() => { setIsForgotPassword(true); setResetStep("email"); setErrors({}); }} className="text-sm text-sage-600 hover:text-sage-800 underline-offset-4 hover:underline transition-colors">
                          Wachtwoord vergeten?
                        </button>
                      </div>
                    )}

                    <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700 text-white" disabled={loading}>
                      {loading ? "Even geduld..." : isLogin ? "Inloggen" : "Account aanmaken"}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <button type="button" onClick={() => { setIsLogin(!isLogin); setErrors({}); }} className="text-sm text-sage-600 hover:text-sage-800 underline-offset-4 hover:underline transition-colors">
                      {isLogin ? "Nog geen account? Registreer je hier" : "Al een account? Log hier in"}
                    </button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 text-center">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Compassie Collectief</p>
      </div>
    </div>
  );
};

export default Auth;
