import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * After login, automatically links the authenticated user to any
 * existing client record (and its enrollments) that shares the same email.
 * Also links enrollments created via registrations (legacy flow).
 */
export function useAutoLinkClient() {
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if ((event === "SIGNED_IN" || event === "INITIAL_SESSION") && session?.user) {
          try {
            // 1. Link client records and their enrollments
            await supabase.rpc("link_user_to_client", {
              _user_id: session.user.id,
              _email: session.user.email!,
            });

            // 2. Also link orphan enrollments from registration-based flow
            // Find registrations matching this email
            const { data: regs } = await supabase
              .from("registrations")
              .select("id")
              .eq("email", session.user.email!);

            if (regs && regs.length > 0) {
              const regIds = regs.map(r => r.id);
              // Update enrollments that have registration_id but no user_id
              await supabase
                .from("enrollments")
                .update({ user_id: session.user.id })
                .in("registration_id", regIds)
                .is("user_id", null);
            }
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
