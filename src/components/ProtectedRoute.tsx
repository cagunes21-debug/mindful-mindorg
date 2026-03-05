import { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAccess = async (session: Session | null) => {
      console.log("[ProtectedRoute] checkAccess called, session:", !!session, "requireAdmin:", requireAdmin);
      if (!session) {
        console.log("[ProtectedRoute] No session, redirecting to login");
        if (mounted) setLoading(false);
        navigate("/login", { replace: true });
        return;
      }

      if (requireAdmin) {
        try {
          console.log("[ProtectedRoute] Checking admin role for user:", session.user.id);
          const { data, error } = await supabase.rpc("has_role", {
            _user_id: session.user.id,
            _role: "admin",
          });
          console.log("[ProtectedRoute] has_role result:", { data, error });
          if (error) {
            console.error("[ProtectedRoute] Error checking admin role:", error);
            if (mounted) setLoading(false);
            navigate("/", { replace: true });
            return;
          }
          if (!data) {
            console.log("[ProtectedRoute] User is not admin, redirecting to /");
            if (mounted) setLoading(false);
            navigate("/", { replace: true });
            return;
          }
        } catch (err) {
          console.error("[ProtectedRoute] Failed to check role:", err);
          if (mounted) setLoading(false);
          navigate("/", { replace: true });
          return;
        }
      }

      console.log("[ProtectedRoute] Access granted!");
      if (mounted) {
        setAuthorized(true);
        setLoading(false);
      }
    };

    console.log("[ProtectedRoute] useEffect fired, setting up auth listener");

    // Set up listener BEFORE getSession (per Supabase best practices)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("[ProtectedRoute] onAuthStateChange event:", event, "session:", !!session);
        if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
          checkAccess(session);
        } else if (!session) {
          setAuthorized(false);
          setLoading(false);
          navigate("/login", { replace: true });
        }
      }
    );

    console.log("[ProtectedRoute] About to call getSession()");
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("[ProtectedRoute] getSession resolved, session:", !!session);
      // checkAccess is handled by onAuthStateChange INITIAL_SESSION
    }).catch(err => {
      console.error("[ProtectedRoute] getSession error:", err);
      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, requireAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-terracotta-300 border-t-terracotta-600 rounded-full animate-spin" />
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
}
