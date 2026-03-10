import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Users } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

const AdminNewsletterSection = () => {
  const { data: subscribers, isLoading } = useQuery({
    queryKey: ["newsletter-subscribers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const activeCount = subscribers?.filter((s) => s.status === "active").length ?? 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Card className="flex-1">
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-sage-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-sage-700" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{activeCount}</p>
              <p className="text-sm text-muted-foreground">Actieve abonnees</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Nieuwsbrief Inschrijvingen
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-warm-50 rounded animate-pulse" />
              ))}
            </div>
          ) : subscribers && subscribers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 font-medium">E-mail</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">Ingeschreven op</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className="border-b last:border-0">
                      <td className="py-3">{sub.email}</td>
                      <td className="py-3">
                        <Badge
                          variant={sub.status === "active" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {sub.status === "active" ? "Actief" : "Uitgeschreven"}
                        </Badge>
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {format(new Date(sub.subscribed_at), "d MMM yyyy, HH:mm", { locale: nl })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm py-4 text-center">
              Nog geen nieuwsbrief inschrijvingen.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNewsletterSection;
