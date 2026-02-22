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
    const checkAccess = async (session: Session | null) => {
      if (!session) {
        navigate("/login", { replace: true });
        return;
      }

      if (requireAdmin) {
        const { data } = await supabase.rpc("has_role", {
          _user_id: session.user.id,
          _role: "admin",
        });
        if (!data) {
          navigate("/", { replace: true });
          return;
        }
      }

      setAuthorized(true);
      setLoading(false);
    };

    // Set up listener BEFORE getSession (per Supabase best practices)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          setAuthorized(false);
          navigate("/login", { replace: true });
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAccess(session);
    });

    return () => subscription.unsubscribe();
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
