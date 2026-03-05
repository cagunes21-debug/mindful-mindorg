import { useState, useEffect, useRef, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [authState, setAuthState] = useState<"loading" | "authenticated" | "unauthenticated">("loading");
  const [adminState, setAdminState] = useState<"loading" | "yes" | "no">(requireAdmin ? "loading" : "yes");
  const userIdRef = useRef<string | null>(null);
  const adminCheckedRef = useRef(false);
  const mountedRef = useRef(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    adminCheckedRef.current = false;

    console.log("[ProtectedRoute] Mount, path:", location.pathname, "requireAdmin:", requireAdmin);

    // Proactively restore session from storage FIRST
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mountedRef.current) return;
      if (session?.user) {
        console.log("[ProtectedRoute] Session restored via getSession:", session.user.id);
        userIdRef.current = session.user.id;
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        setAuthState("authenticated");
      } else {
        console.log("[ProtectedRoute] No session found via getSession");
        setAuthState("unauthenticated");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mountedRef.current) return;
        console.log("[ProtectedRoute] Auth event:", event, "user:", session?.user?.id ?? "none");

        if (event === "SIGNED_OUT") {
          userIdRef.current = null;
          adminCheckedRef.current = false;
          setAdminState(requireAdmin ? "loading" : "yes");
          setAuthState("unauthenticated");
          return;
        }

        if (session?.user) {
          userIdRef.current = session.user.id;
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          setAuthState("authenticated");
        }
      }
    );

    // Safety timeout — only fires if neither getSession nor auth event arrives
    timeoutRef.current = setTimeout(() => {
      if (mountedRef.current) {
        console.warn("[ProtectedRoute] Safety timeout — no session in 5s, assuming unauthenticated");
        setAuthState("unauthenticated");
      }
    }, 5000);

    return () => {
      mountedRef.current = false;
      subscription.unsubscribe();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Check admin role ONCE when authenticated
  useEffect(() => {
    if (authState !== "authenticated" || !requireAdmin || adminCheckedRef.current) return;

    const userId = userIdRef.current;
    if (!userId) {
      console.warn("[ProtectedRoute] Authenticated but no userId ref — denying admin");
      setAdminState("no");
      return;
    }

    adminCheckedRef.current = true;
    let cancelled = false;

    console.log("[ProtectedRoute] Checking admin role for:", userId);

    // Use RPC only (SECURITY DEFINER, bypasses RLS — no hanging queries)
    const checkAdmin = async () => {
      try {
        const { data: hasRole, error } = await supabase
          .rpc("has_role", { _user_id: userId, _role: "admin" });

        if (cancelled || !mountedRef.current) return;

        if (error) {
          console.error("[ProtectedRoute] RPC has_role error:", error.message);
          setAdminState("no");
        } else if (hasRole) {
          console.log("[ProtectedRoute] Admin confirmed via RPC ✓");
          setAdminState("yes");
        } else {
          console.warn("[ProtectedRoute] Not admin");
          setAdminState("no");
        }
      } catch (err) {
        if (cancelled || !mountedRef.current) return;
        console.error("[ProtectedRoute] Admin check exception:", err);
        setAdminState("no");
      }
    };

    // Add a safety timeout for the admin check
    const adminTimeout = setTimeout(() => {
      if (!cancelled && mountedRef.current && adminState === "loading") {
        console.warn("[ProtectedRoute] Admin check timed out after 8s — denying");
        setAdminState("no");
      }
    }, 8000);

    checkAdmin();

    return () => {
      cancelled = true;
      clearTimeout(adminTimeout);
    };
  }, [authState, requireAdmin]);

  // Redirects — only on definitive states, prevent loops
  useEffect(() => {
    if (authState === "unauthenticated") {
      if (location.pathname !== "/login") {
        console.log("[ProtectedRoute] → redirect /login (from", location.pathname, ")");
        navigate("/login", { replace: true });
      }
    } else if (authState === "authenticated" && requireAdmin && adminState === "no") {
      if (location.pathname !== "/") {
        console.log("[ProtectedRoute] → redirect / (not admin)");
        navigate("/", { replace: true });
      }
    }
  }, [authState, adminState, requireAdmin, navigate, location.pathname]);

  // Loading state
  if (authState === "loading" || (requireAdmin && authState === "authenticated" && adminState === "loading")) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-terracotta-300 border-t-terracotta-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (authState !== "authenticated") return null;
  if (requireAdmin && adminState !== "yes") return null;

  return <>{children}</>;
}
