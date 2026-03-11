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
  const mountedRef = useRef(true);
  const adminCheckedRef = useRef(false);
  const authResolvedRef = useRef(false); // tracks whether auth has been resolved (prevents stale closure issues)
  const sessionRef = useRef<{ userId: string; accessToken: string } | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    adminCheckedRef.current = false;
    authResolvedRef.current = false;

    console.log("[ProtectedRoute] Initializing auth check...");

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mountedRef.current) return;
        console.log("[ProtectedRoute] onAuthStateChange:", event);

        if (event === "SIGNED_OUT") {
          console.log("[ProtectedRoute] User signed out");
          sessionRef.current = null;
          adminCheckedRef.current = false;
          authResolvedRef.current = true;
          setAdminState(requireAdmin ? "loading" : "yes");
          setAuthState("unauthenticated");
          return;
        }
        if (session?.user) {
          console.log("[ProtectedRoute] User authenticated:", session.user.id);
          sessionRef.current = { userId: session.user.id, accessToken: session.access_token };
          authResolvedRef.current = true;
          setAuthState("authenticated");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mountedRef.current) return;
      if (session?.user) {
        console.log("[ProtectedRoute] Session restored for:", session.user.id);
        sessionRef.current = { userId: session.user.id, accessToken: session.access_token };
        authResolvedRef.current = true;
        setAuthState("authenticated");
      } else {
        console.log("[ProtectedRoute] No session found");
        authResolvedRef.current = true;
        setAuthState("unauthenticated");
      }
    });

    // Safety timeout — uses ref instead of stale closure to avoid false logout
    const timeout = setTimeout(() => {
      if (mountedRef.current && !authResolvedRef.current) {
        console.warn("[ProtectedRoute] Auth timeout after 6s — no session resolved");
        setAuthState("unauthenticated");
      }
    }, 6000);

    return () => {
      mountedRef.current = false;
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  // Admin check using direct fetch
  useEffect(() => {
    if (authState !== "authenticated" || !requireAdmin || adminCheckedRef.current) return;
    const session = sessionRef.current;
    if (!session) {
      console.warn("[ProtectedRoute] No session ref for admin check");
      setAdminState("no");
      return;
    }

    adminCheckedRef.current = true;
    let cancelled = false;

    const checkAdmin = async (): Promise<"yes" | "no" | "error"> => {
      try {
        console.log("[ProtectedRoute] Checking admin role via direct fetch...");
        const res = await Promise.race([
          fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/rpc/has_role`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
                "Authorization": `Bearer ${session.accessToken}`,
              },
              body: JSON.stringify({ _user_id: session.userId, _role: "admin" }),
            }
          ),
          new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), 8000)),
        ]);

        const data = await res.json();
        console.log("[ProtectedRoute] has_role response:", data);

        if (data === true) return "yes";
        if (data === false) return "no";

        // Unexpected response — fallback to direct query
        console.warn("[ProtectedRoute] Unexpected RPC response, trying direct query");
        const { data: roles, error: queryError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.userId)
          .eq("role", "admin")
          .maybeSingle();

        if (queryError) {
          console.error("[ProtectedRoute] Direct query error:", queryError);
          return "error";
        }
        return roles ? "yes" : "no";
      } catch (e) {
        console.error("[ProtectedRoute] Admin check exception:", e);
        return "error";
      }
    };

    const run = async () => {
      let result = await checkAdmin();
      if (result === "error" && !cancelled && mountedRef.current) {
        console.log("[ProtectedRoute] Retrying admin check...");
        await new Promise(r => setTimeout(r, 1500));
        if (!cancelled && mountedRef.current) {
          result = await checkAdmin();
        }
      }
      if (!cancelled && mountedRef.current) {
        console.log("[ProtectedRoute] Final admin state:", result);
        setAdminState(result);
      }
    };

    run();
    return () => { cancelled = true; };
  }, [authState, requireAdmin]);

  // Redirect unauthenticated
  useEffect(() => {
    if (authState === "unauthenticated" && location.pathname !== "/login") {
      console.log("[ProtectedRoute] Redirecting unauthenticated user to /login");
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