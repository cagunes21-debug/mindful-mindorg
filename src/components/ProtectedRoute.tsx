import { useState, useEffect, useRef, ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

/**
 * ProtectedRoute — handles auth gating and optional admin role verification.
 *
 * Flow:
 *  1. On mount, call getSession() to get the current session synchronously.
 *  2. Subscribe to onAuthStateChange ONLY for SIGNED_OUT to handle logout.
 *  3. If requireAdmin, query user_roles once (cached for the user id).
 *  4. Never redirect during loading; only redirect after a definitive answer.
 */
export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<"loading" | "authenticated" | "unauthenticated">("loading");
  const [adminState, setAdminState] = useState<"loading" | "yes" | "no">(requireAdmin ? "loading" : "yes");
  const userIdRef = useRef<string | null>(null);
  const mountedRef = useRef(true);

  // Step 1: Get initial session + listen for sign-out
  useEffect(() => {
    mountedRef.current = true;
    let ignore = false;

    console.log("[ProtectedRoute] Initializing, requireAdmin:", requireAdmin);

    // Get session immediately
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (ignore || !mountedRef.current) return;

      if (error) {
        console.error("[ProtectedRoute] getSession error:", error);
      }

      if (session?.user) {
        console.log("[ProtectedRoute] Session found for user:", session.user.id);
        userIdRef.current = session.user.id;
        setAuthState("authenticated");
      } else {
        console.log("[ProtectedRoute] No session found");
        setAuthState("unauthenticated");
      }
    });

    // Listen ONLY for sign-out events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (!mountedRef.current) return;

      if (event === "SIGNED_OUT") {
        console.log("[ProtectedRoute] User signed out");
        userIdRef.current = null;
        setAuthState("unauthenticated");
        setAdminState(requireAdmin ? "loading" : "yes");
      }
      // Ignore INITIAL_SESSION, TOKEN_REFRESHED, SIGNED_IN — we handle session via getSession
    });

    return () => {
      ignore = true;
      mountedRef.current = false;
      subscription.unsubscribe();
    };
  }, []); // Empty deps — only run once on mount

  // Step 2: Check admin role when authenticated
  useEffect(() => {
    if (authState !== "authenticated" || !requireAdmin) return;
    if (adminState === "yes" || adminState === "no") return; // Already checked

    const userId = userIdRef.current;
    if (!userId) {
      console.error("[ProtectedRoute] Authenticated but no userId — should not happen");
      setAdminState("no");
      return;
    }

    let cancelled = false;
    console.log("[ProtectedRoute] Checking admin role for:", userId);

    const checkAdmin = async () => {
      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId)
          .eq("role", "admin")
          .maybeSingle();

        if (cancelled || !mountedRef.current) return;

        if (error) {
          console.error("[ProtectedRoute] Admin query error:", error.message, error.code, error.details);
          setAdminState("no");
        } else if (!data) {
          console.warn("[ProtectedRoute] No admin role found for user:", userId);
          setAdminState("no");
        } else {
          console.log("[ProtectedRoute] Admin role confirmed ✓");
          setAdminState("yes");
        }
      } catch (err: any) {
        if (cancelled || !mountedRef.current) return;
        console.error("[ProtectedRoute] Admin check exception:", err);
        setAdminState("no");
      }
    };

    checkAdmin();

    // Safety timeout — 10s
    const timeout = setTimeout(() => {
      if (!cancelled && mountedRef.current && adminState === "loading") {
        console.error("[ProtectedRoute] Admin check timed out after 10s");
        setAdminState("no");
      }
    }, 10000);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [authState, requireAdmin]); // Only re-run when auth state changes, NOT on adminState

  // Step 3: Handle redirects — ONLY after definitive states
  useEffect(() => {
    if (authState === "unauthenticated") {
      console.log("[ProtectedRoute] Redirecting to /login (unauthenticated)");
      navigate("/login", { replace: true });
      return;
    }

    if (authState === "authenticated" && requireAdmin && adminState === "no") {
      console.log("[ProtectedRoute] Redirecting to / (not admin)");
      navigate("/", { replace: true });
    }
  }, [authState, adminState, requireAdmin, navigate]);

  // Loading states
  if (authState === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-terracotta-300 border-t-terracotta-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (authState === "unauthenticated") return null;

  if (requireAdmin && adminState === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-terracotta-300 border-t-terracotta-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (requireAdmin && adminState === "no") return null;

  return <>{children}</>;
}
