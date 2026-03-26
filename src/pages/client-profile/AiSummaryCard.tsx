import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function AiSummaryCard({ email }: { email: string }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const generateSummary = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("client-summary", {
        body: { client_email: email },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setSummary(data.summary);
      setHasGenerated(true);
    } catch (err: any) {
      toast.error(err.message || "Samenvatting kon niet worden gegenereerd");
    }
    setLoading(false);
  };

  return (
    <Card className="border-border/40 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-primary" />
            </div>
            <span className="text-xs font-semibold">AI Samenvatting</span>
          </div>
          <Button size="sm" variant="ghost" onClick={generateSummary} disabled={loading} className="gap-1.5 text-xs h-7">
            {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : hasGenerated ? <RefreshCw className="h-3 w-3" /> : <Sparkles className="h-3 w-3" />}
            {loading ? "Genereren..." : hasGenerated ? "Vernieuwen" : "Genereer"}
          </Button>
        </div>
        {summary ? (
          <div className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap">{summary}</div>
        ) : (
          <p className="text-xs text-muted-foreground">Klik op "Genereer" voor een AI-samenvatting van dit dossier.</p>
        )}
      </CardContent>
    </Card>
  );
}
