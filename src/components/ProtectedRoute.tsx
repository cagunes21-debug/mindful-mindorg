import { useState, useEffect, useRef, ReactNode } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [authState, setAuthState] = useState<"loading" | "authenticated" | "unauthenticated">("loading");
  const [adminState, setAdminState] = useState<"loading" | "yes" | "no" | "error">(requireAdmin ? "loading" : "yes");
  const userIdRef = useRef<string | null>(null);
  const adminCheckedRef = useRef(false);
  const mountedRef = useRef(true);
  const authResolvedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    adminCheckedRef.current = false;

    // Listen FIRST (best practice)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mountedRef.current) return;
        if (event === "SIGNED_OUT") {
          userIdRef.current = null;
          adminCheckedRef.current = false;
          setAdminState(requireAdmin ? "loading" : "yes");
          setAuthState("unauthenticated");
          return;
        }
        if (session?.user) {
          userIdRef.current = session.user.id;
          authResolvedRef.current = true;
          setAuthState("authenticated");
        }
      }
    );

    // THEN restore session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mountedRef.current) return;
      if (session?.user) {
        userIdRef.current = session.user.id;
        authResolvedRef.current = true;
        setAuthState("authenticated");
      } else {
        setAuthState("unauthenticated");
      }
    });

    // Safety timeout
    const timeout = setTimeout(() => {
      if (mountedRef.current && authState === "loading") {
        setAuthState("unauthenticated");
      }
    }, 5000);

    return () => {
      mountedRef.current = false;
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  // Admin check
  useEffect(() => {
    if (authState !== "authenticated" || !requireAdmin || adminCheckedRef.current) return;
    const userId = userIdRef.current;
    if (!userId) { setAdminState("no"); return; }

    adminCheckedRef.current = true;
    let cancelled = false;

    const check = async () => {
      try {
        const result = await Promise.race([
          supabase.rpc("has_role", { _user_id: userId, _role: "admin" }),
          new Promise<null>((resolve) => setTimeout(() => resolve(null), 5000)),
        ]);
        if (cancelled || !mountedRef.current) return;
        if (result === null) {
          setAdminState("error");
        } else if ('error' in result && result.error) {
          console.error("[ProtectedRoute] Admin check error:", result.error);
          setAdminState("error");
        } else if ('data' in result && result.data === true) {
          setAdminState("yes");
        } else {
          setAdminState("no");
        }
      } catch {
        if (!cancelled && mountedRef.current) setAdminState("error");
      }
    };
    check();
    return () => { cancelled = true; };
  }, [authState, requireAdmin]);

  // Redirect unauthenticated
  useEffect(() => {
    if (authState === "unauthenticated" && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [authState, navigate, location.pathname]);

  // Loading
  if (authState === "loading" || (requireAdmin && authState === "authenticated" && adminState === "loading")) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-terracotta-300 border-t-terracotta-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (authState !== "authenticated") return null;

  // Not authorized or error
  if (requireAdmin && adminState !== "yes") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <ShieldAlert className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-2">
              {adminState === "error" ? "Fout bij autorisatie" : "Geen toegang"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {adminState === "error"
                ? "Er ging iets mis bij het controleren van je rechten. Probeer het later opnieuw."
                : "Je hebt geen beheerdersrechten om deze pagina te bekijken."}
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" asChild>
                <Link to="/mijn-trainingen">Mijn Trainingen</Link>
              </Button>
              {adminState === "error" && (
                <Button onClick={() => window.location.reload()}>Opnieuw proberen</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
