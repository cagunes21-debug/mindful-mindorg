import { useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

/* ─── Types ─── */
type AuthState = "loading" | "authenticated" | "unauthenticated";
type AdminState = "loading" | "yes" | "no" | "error";

interface SessionInfo {
  userId: string;
  accessToken: string;
}

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const AUTH_TIMEOUT_MS = 6_000;
const ADMIN_CHECK_TIMEOUT_MS = 8_000;
const ADMIN_RETRY_DELAY_MS = 1_500;
const LOG_PREFIX = "[ProtectedRoute]";

/* ─── Admin role check (direct fetch — bypasses Supabase client session timing) ─── */
async function checkAdminRole(session: SessionInfo): Promise<AdminState> {
  try {
    console.log(LOG_PREFIX, "Checking admin role…");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), ADMIN_CHECK_TIMEOUT_MS);

    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/rpc/has_role`,
      {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ _user_id: session.userId, _role: "admin" }),
      },
    );
    clearTimeout(timeout);

    const data = await res.json();
    console.log(LOG_PREFIX, "has_role →", data);
    if (data === true) return "yes";
    if (data === false) return "no";

    // Unexpected payload — fall back to direct table query
    console.warn(LOG_PREFIX, "Unexpected RPC payload, falling back to direct query");
    return await directAdminQuery(session.userId);
  } catch (err) {
    console.error(LOG_PREFIX, "Admin check failed:", err);
    return "error";
  }
}

async function directAdminQuery(userId: string): Promise<AdminState> {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();

  if (error) {
    console.error(LOG_PREFIX, "Direct query error:", error);
    return "error";
  }
  return data ? "yes" : "no";
}

/* ─── Component ─── */
export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [authState, setAuthState] = useState<AuthState>("loading");
  const [adminState, setAdminState] = useState<AdminState>(requireAdmin ? "loading" : "yes");

  // Refs prevent stale-closure bugs in timeouts & async callbacks
  const mountedRef = useRef(true);
  const authResolvedRef = useRef(false);
  const adminCheckedRef = useRef(false);
  const sessionRef = useRef<SessionInfo | null>(null);

  /* ── Helpers called from listeners & getSession ── */
  const resolveAuthenticated = useCallback((userId: string, accessToken: string) => {
    if (!mountedRef.current) return;
    console.log(LOG_PREFIX, "Resolved authenticated:", userId);
    sessionRef.current = { userId, accessToken };
    authResolvedRef.current = true;
    setAuthState("authenticated");
  }, []);

  const resolveUnauthenticated = useCallback((reason: string) => {
    if (!mountedRef.current) return;
    console.log(LOG_PREFIX, "Resolved unauthenticated:", reason);
    sessionRef.current = null;
    adminCheckedRef.current = false;
    authResolvedRef.current = true;
    setAdminState(requireAdmin ? "loading" : "yes");
    setAuthState("unauthenticated");
  }, [requireAdmin]);

  /* ── 1. Auth initialisation ── */
  useEffect(() => {
    mountedRef.current = true;
    authResolvedRef.current = false;
    adminCheckedRef.current = false;

    console.log(LOG_PREFIX, "Initializing…");

    // Listener first (Supabase best practice)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mountedRef.current) return;
      console.log(LOG_PREFIX, "onAuthStateChange:", event);

      if (event === "SIGNED_OUT") {
        resolveUnauthenticated("SIGNED_OUT event");
      } else if (session?.user) {
        resolveAuthenticated(session.user.id, session.access_token);
      }
    });

    // Then restore persisted session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mountedRef.current || authResolvedRef.current) return;
      if (session?.user) {
        resolveAuthenticated(session.user.id, session.access_token);
      } else {
        resolveUnauthenticated("no persisted session");
      }
    });

    // Safety net — only fires if nothing resolved in time
    const safetyTimeout = setTimeout(() => {
      if (mountedRef.current && !authResolvedRef.current) {
        console.warn(LOG_PREFIX, `Auth not resolved after ${AUTH_TIMEOUT_MS}ms`);
        resolveUnauthenticated("timeout");
      }
    }, AUTH_TIMEOUT_MS);

    return () => {
      mountedRef.current = false;
      subscription.unsubscribe();
      clearTimeout(safetyTimeout);
    };
  }, [resolveAuthenticated, resolveUnauthenticated]);

  /* ── 2. Admin role check (runs once after authentication) ── */
  useEffect(() => {
    if (authState !== "authenticated" || !requireAdmin || adminCheckedRef.current) return;

    const session = sessionRef.current;
    if (!session) {
      console.warn(LOG_PREFIX, "Authenticated but no session ref — denying admin");
      setAdminState("no");
      return;
    }

    // Fast path: check sessionStorage cache (same browser session)
    const cacheKey = `admin_role_${session.userId}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached === "yes") {
      console.log(LOG_PREFIX, "Admin role from cache → yes");
      adminCheckedRef.current = true;
      setAdminState("yes");
      return;
    }

    adminCheckedRef.current = true;
    let cancelled = false;

    (async () => {
      let result = await checkAdminRole(session);

      // One retry on transient error
      if (result === "error" && !cancelled && mountedRef.current) {
        console.log(LOG_PREFIX, "Retrying admin check…");
        await new Promise((r) => setTimeout(r, ADMIN_RETRY_DELAY_MS));
        if (!cancelled && mountedRef.current) {
          result = await checkAdminRole(session);
        }
      }

      if (!cancelled && mountedRef.current) {
        console.log(LOG_PREFIX, "Admin state resolved:", result);
        if (result === "yes") {
          sessionStorage.setItem(cacheKey, "yes");
        }
        setAdminState(result);
      }
    })();

    return () => { cancelled = true; };
  }, [authState, requireAdmin]);

  /* ── 3. Redirect when unauthenticated ── */
  useEffect(() => {
    if (authState === "unauthenticated" && location.pathname !== "/login") {
      console.log(LOG_PREFIX, "Redirecting to /login");
      navigate("/login", { replace: true });
    }
  }, [authState, navigate, location.pathname]);

  /* ── Render ── */
  const isLoading =
    authState === "loading" ||
    (requireAdmin && authState === "authenticated" && adminState === "loading");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-terracotta-300 border-t-terracotta-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (authState !== "authenticated") return null;

  if (requireAdmin && adminState !== "yes") {
    const isError = adminState === "error";
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <ShieldAlert className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-2">
              {isError ? "Fout bij autorisatie" : "Geen toegang"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {isError
                ? "Er ging iets mis bij het controleren van je rechten. Probeer het later opnieuw."
                : "Je hebt geen beheerdersrechten om deze pagina te bekijken."}
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" asChild>
                <Link to="/mijn-trainingen">Mijn Trainingen</Link>
              </Button>
              {isError && (
                <Button onClick={() => window.location.reload()}>
                  Opnieuw proberen
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}