import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Heart, Mail, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";

const emailSchema = z.string().email("Voer een geldig e-mailadres in");
const passwordSchema = z.string().min(6, "Wachtwoord moet minimaal 6 tekens bevatten");

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          navigate("/");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; confirmPassword?: string } = {};
    
    try {
      emailSchema.parse(email);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.email = e.errors[0].message;
      }
    }

    try {
      passwordSchema.parse(password);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.password = e.errors[0].message;
      }
    }

    if (!isLogin && password !== confirmPassword) {
      newErrors.confirmPassword = "Wachtwoorden komen niet overeen";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string } = {};
    try {
      emailSchema.parse(email);
    } catch (err) {
      if (err instanceof z.ZodError) {
        newErrors.email = err.errors[0].message;
      }
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/login`,
      });
      if (error) {
        toast({
          variant: "destructive",
          title: "Fout",
          description: error.message,
        });
      } else {
        toast({
          title: "E-mail verzonden",
          description: "Controleer je inbox voor de link om je wachtwoord te resetten.",
        });
        setIsForgotPassword(false);
      }
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
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({
              variant: "destructive",
              title: "Inloggen mislukt",
              description: "E-mailadres of wachtwoord is onjuist.",
            });
          } else if (error.message.includes("Email not confirmed")) {
            toast({
              variant: "destructive",
              title: "E-mail niet bevestigd",
              description: "Controleer je inbox en bevestig je e-mailadres.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Fout",
              description: error.message,
            });
          }
        } else {
          toast({
            title: "Welkom terug!",
            description: "Je bent succesvol ingelogd.",
          });
        }
      } else {
        const redirectUrl = `${window.location.origin}/`;
        
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: redirectUrl,
          },
        });

        if (error) {
          if (error.message.includes("User already registered")) {
            toast({
              variant: "destructive",
              title: "Account bestaat al",
              description: "Er bestaat al een account met dit e-mailadres. Probeer in te loggen.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Registratie mislukt",
              description: error.message,
            });
          }
        } else {
          toast({
            title: "Account aangemaakt!",
            description: "Controleer je inbox om je e-mailadres te bevestigen.",
          });
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fout",
        description: "Er is iets misgegaan. Probeer het later opnieuw.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-sage-50 flex flex-col">
      {/* Header */}
      <div className="p-4 md:p-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Terug naar home</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md border-sage-200/50 shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sage-400 to-sage-600">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-light text-charcoal-800">
              {isForgotPassword ? "Wachtwoord vergeten" : isLogin ? "Welkom terug" : "Account aanmaken"}
            </CardTitle>
            <CardDescription className="text-charcoal-500">
              {isForgotPassword
                ? "Voer je e-mailadres in om een resetlink te ontvangen"
                : isLogin 
                  ? "Log in om toegang te krijgen tot je trainingen" 
                  : "Maak een account aan om je aan te melden voor trainingen"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-4">
            {isForgotPassword ? (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-charcoal-700">E-mailadres</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="jouw@email.nl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 border-sage-200 focus:border-sage-400 focus:ring-sage-400"
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-sage-600 hover:bg-sage-700 text-white"
                  disabled={loading}
                >
                  {loading ? "Even geduld..." : "Resetlink versturen"}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => { setIsForgotPassword(false); setErrors({}); }}
                    className="text-sm text-sage-600 hover:text-sage-800 underline-offset-4 hover:underline transition-colors"
                  >
                    Terug naar inloggen
                  </button>
                </div>
              </form>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-charcoal-700">E-mailadres</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="jouw@email.nl"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 border-sage-200 focus:border-sage-400 focus:ring-sage-400"
                        required
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-charcoal-700">Wachtwoord</Label>
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
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password}</p>
                    )}
                  </div>

                  {!isLogin && (
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
                      {errors.confirmPassword && (
                        <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                      )}
                    </div>
                  )}

                  {isLogin && (
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => { setIsForgotPassword(true); setErrors({}); }}
                        className="text-sm text-sage-600 hover:text-sage-800 underline-offset-4 hover:underline transition-colors"
                      >
                        Wachtwoord vergeten?
                      </button>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-sage-600 hover:bg-sage-700 text-white"
                    disabled={loading}
                  >
                    {loading 
                      ? "Even geduld..." 
                      : isLogin 
                        ? "Inloggen" 
                        : "Account aanmaken"
                    }
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setErrors({});
                    }}
                    className="text-sm text-sage-600 hover:text-sage-800 underline-offset-4 hover:underline transition-colors"
                  >
                    {isLogin 
                      ? "Nog geen account? Registreer je hier" 
                      : "Al een account? Log hier in"
                    }
                  </button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="p-4 text-center">
        <p className="text-sm text-charcoal-500">
          © {new Date().getFullYear()} Compassie Collectief
        </p>
      </div>
    </div>
  );
};

export default Auth;
