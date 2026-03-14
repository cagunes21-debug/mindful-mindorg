import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * After login, automatically links the authenticated user to any
 * existing client record (and its enrollments) that shares the same email.
 *
 * Important: keep onAuthStateChange callback non-blocking.
 */
export function useAutoLinkClient() {
  useEffect(() => {
    const linkUser = async (userId: string, email: string) => {
      try {
        await supabase.rpc("link_user_to_client", {
          _user_id: userId,
          _email: email,
        });
      } catch (err) {
        // Silently fail - convenience feature only
        console.error("Auto-link client error:", err);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        (event === "SIGNED_IN" || event === "INITIAL_SESSION") &&
        session?.user?.email
      ) {
        // Fire-and-forget to avoid blocking auth event processing
        setTimeout(() => {
          void linkUser(session.user.id, session.user.email as string);
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);
}
