import { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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

    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        if (mounted) setLoading(false);
        navigate("/login", { replace: true });
        return;
      }

      if (requireAdmin) {
        // Query user_roles directly instead of RPC to avoid deadlocks
        const { data: roleData, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (error || !roleData) {
          console.error("[ProtectedRoute] Admin check failed:", error);
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

    // Listen for sign-out
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === "SIGNED_OUT") {
          setAuthorized(false);
          setLoading(false);
          navigate("/login", { replace: true });
        }
      }
    );

    init();

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
