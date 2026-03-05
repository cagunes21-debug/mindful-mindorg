import { useState, useEffect, useRef, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);
  const mountedRef = useRef(true);

  // Step 1: Get session via onAuthStateChange (never use getSession which can hang)
  useEffect(() => {
    mountedRef.current = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        // Only set session state — NO async work here
        if (mountedRef.current) {
          setSession(currentSession);
        }
      }
    );

    return () => {
      mountedRef.current = false;
      subscription.unsubscribe();
    };
  }, []);

  // Step 2: When session changes, check admin role
  useEffect(() => {
    if (session === undefined) return; // Still initializing

    if (!session) {
      navigate("/login", { replace: true });
      return;
    }

    if (!requireAdmin) {
      setIsAdmin(true); // Not needed, just mark as authorized
      return;
    }

    // Check admin role with a timeout fallback
    let cancelled = false;
    const controller = new AbortController();

    const checkAdmin = async () => {
      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle()
          .abortSignal(controller.signal);

        if (cancelled) return;

        if (error || !data) {
          console.error("[ProtectedRoute] Admin check failed:", error);
          navigate("/", { replace: true });
        } else {
          setIsAdmin(true);
        }
      } catch (err: any) {
        if (cancelled || err?.name === "AbortError") return;
        console.error("[ProtectedRoute] Admin check error:", err);
        navigate("/", { replace: true });
      }
    };

    checkAdmin();

    // Timeout: if query takes > 8s, redirect
    const timeout = setTimeout(() => {
      if (!cancelled) {
        console.error("[ProtectedRoute] Admin check timed out");
        controller.abort();
        navigate("/", { replace: true });
      }
    }, 8000);

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timeout);
    };
  }, [session, requireAdmin, navigate]);

  // Loading state
  const loading = session === undefined || (requireAdmin && session && isAdmin === undefined);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-terracotta-300 border-t-terracotta-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;
  if (requireAdmin && !isAdmin) return null;

  return <>{children}</>;
}
