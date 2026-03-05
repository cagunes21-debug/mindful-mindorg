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
          if (error || !data) {
            if (mounted) setLoading(false);
            navigate("/", { replace: true });
            return;
          }
        } catch {
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

    // Listen for sign-out only — never do async work here
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT" || !session) {
          setAuthorized(false);
          setLoading(false);
          navigate("/login", { replace: true });
        }
      }
    );

    // Do the actual async check outside of onAuthStateChange
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
