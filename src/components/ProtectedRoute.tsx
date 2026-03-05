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
      if (!session) {
        if (mounted) setLoading(false);
        navigate("/login", { replace: true });
        return;
      }

      if (requireAdmin) {
        try {
          const { data, error } = await supabase.rpc("has_role", {
            _user_id: session.user.id,
            _role: "admin",
          });
          if (error) {
            console.error("Error checking admin role:", error);
            if (mounted) setLoading(false);
            navigate("/", { replace: true });
            return;
          }
          if (!data) {
            if (mounted) setLoading(false);
            navigate("/", { replace: true });
            return;
          }
        } catch (err) {
          console.error("Failed to check role:", err);
          if (mounted) setLoading(false);
          navigate("/", { replace: true });
          return;
        }
      }

      if (mounted) {
        setAuthorized(true);
        setLoading(false);
      }
    };

    // Set up listener BEFORE getSession (per Supabase best practices)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          setAuthorized(false);
          setLoading(false);
          navigate("/login", { replace: true });
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAccess(session);
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
