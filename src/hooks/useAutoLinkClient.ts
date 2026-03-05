import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * After login, automatically links the authenticated user to any
 * existing client record (and its enrollments) that shares the same email.
 */
export function useAutoLinkClient() {
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if ((event === "SIGNED_IN" || event === "INITIAL_SESSION") && session?.user) {
          try {
            await supabase.rpc("link_user_to_client", {
              _user_id: session.user.id,
              _email: session.user.email!,
            });
          } catch (err) {
            // Silently fail - this is a convenience feature
            console.error("Auto-link client error:", err);
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);
}
