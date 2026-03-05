import { useState, useEffect, useRef, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<"loading" | "authenticated" | "unauthenticated">("loading");
  const [adminState, setAdminState] = useState<"loading" | "yes" | "no">(requireAdmin ? "loading" : "yes");
  const userIdRef = useRef<string | null>(null);
  const adminCheckedRef = useRef(false);
  const mountedRef = useRef(true);
  const authStateRef = useRef<"loading" | "authenticated" | "unauthenticated">("loading");

  // Step 1: Use ONLY onAuthStateChange — it fires INITIAL_SESSION first, never hangs
  useEffect(() => {
    mountedRef.current = true;
    adminCheckedRef.current = false;

    console.log("[ProtectedRoute] Mount, requireAdmin:", requireAdmin);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mountedRef.current) return;
        console.log("[ProtectedRoute] Auth event:", event, "user:", session?.user?.id ?? "none");

        if (event === "SIGNED_OUT") {
          userIdRef.current = null;
          adminCheckedRef.current = false;
          setAdminState(requireAdmin ? "loading" : "yes");
          authStateRef.current = "unauthenticated";
          setAuthState("unauthenticated");
          return;
        }

        // INITIAL_SESSION or SIGNED_IN or TOKEN_REFRESHED
        if (session?.user) {
          userIdRef.current = session.user.id;
          authStateRef.current = "authenticated";
          setAuthState("authenticated");
        } else {
          userIdRef.current = null;
          authStateRef.current = "unauthenticated";
          setAuthState("unauthenticated");
        }
      }
    );

    // Safety timeout — if no auth event after 5s, assume unauthenticated
    const timeout = setTimeout(() => {
      if (mountedRef.current && authStateRef.current === "loading") {
        console.warn("[ProtectedRoute] Auth timeout — no event received in 5s");
        authStateRef.current = "unauthenticated";
        setAuthState("unauthenticated");
      }
    }, 5000);

    return () => {
      mountedRef.current = false;
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  // Step 2: Check admin role ONCE when authenticated
  useEffect(() => {
    if (authState !== "authenticated" || !requireAdmin || adminCheckedRef.current) return;

    const userId = userIdRef.current;
    if (!userId) {
      setAdminState("no");
      return;
    }

    adminCheckedRef.current = true;
    let cancelled = false;

    console.log("[ProtectedRoute] Checking admin for:", userId);

    (async () => {
      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId)
          .eq("role", "admin")
          .maybeSingle();

        if (cancelled || !mountedRef.current) return;

        if (error) {
          console.error("[ProtectedRoute] Admin query error:", error.message);
          setAdminState("no");
        } else if (!data) {
          console.warn("[ProtectedRoute] No admin role for:", userId);
          setAdminState("no");
        } else {
          console.log("[ProtectedRoute] Admin confirmed ✓");
          setAdminState("yes");
        }
      } catch (err) {
        if (cancelled || !mountedRef.current) return;
        console.error("[ProtectedRoute] Admin check exception:", err);
        setAdminState("no");
      }
    })();

    return () => { cancelled = true; };
  }, [authState, requireAdmin]);

  // Step 3: Redirects — only on definitive states
  useEffect(() => {
    if (authState === "unauthenticated") {
      console.log("[ProtectedRoute] → redirect /login");
      navigate("/login", { replace: true });
    } else if (authState === "authenticated" && requireAdmin && adminState === "no") {
      console.log("[ProtectedRoute] → redirect / (not admin)");
      navigate("/", { replace: true });
    }
  }, [authState, adminState, requireAdmin, navigate]);

  // Render
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
