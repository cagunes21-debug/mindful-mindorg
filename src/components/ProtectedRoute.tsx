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
          // Cancel safety timeout — auth succeeded
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
            console.log("[ProtectedRoute] Safety timeout cancelled — session found");
          }
          setAuthState("authenticated");
        } else {
          userIdRef.current = null;
          setAuthState("unauthenticated");
        }
      }
    );

    // Safety timeout — only fires if no auth event arrives
    timeoutRef.current = setTimeout(() => {
      if (mountedRef.current) {
        console.warn("[ProtectedRoute] Safety timeout — no auth event in 5s, assuming unauthenticated");
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
          console.warn("[ProtectedRoute] No admin role found for:", userId);
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
