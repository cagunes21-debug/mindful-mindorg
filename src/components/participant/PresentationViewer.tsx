import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Loader2 } from "lucide-react";

interface PresentationViewerProps {
  url: string;
}

const PresentationViewer = ({ url }: PresentationViewerProps) => {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generateSignedUrl();
  }, [url]);

  const generateSignedUrl = async () => {
    setLoading(true);
    setError(null);
    try {
      // Extract the file path from the full storage URL
      const match = url.match(/\/storage\/v1\/object\/public\/presentations\/(.+)$/);
      if (!match) {
        setError("Ongeldig presentatie-pad");
        setLoading(false);
        return;
      }

      const filePath = decodeURIComponent(match[1]);
      
      const { data, error: signError } = await supabase.storage
        .from("presentations")
        .createSignedUrl(filePath, 3600); // 1 hour expiry

      if (signError || !data?.signedUrl) {
        setError("Kon presentatie niet laden");
        setLoading(false);
        return;
      }

      setSignedUrl(data.signedUrl);
    } catch {
      setError("Kon presentatie niet laden");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="mb-6">
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Presentatie
        </h3>
        <Card className="border-warm-200">
          <CardContent className="p-8 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !signedUrl) {
    return (
      <div className="mb-6">
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Presentatie
        </h3>
        <Card className="border-warm-200">
          <CardContent className="p-8 text-center text-muted-foreground">
            {error || "Presentatie niet beschikbaar"}
          </CardContent>
        </Card>
      </div>
    );
  }

  const isPdf = url.endsWith(".pdf");

  return (
    <div className="mb-6">
      <h3 className="font-medium mb-3 flex items-center gap-2">
        <BookOpen className="h-4 w-4" />
        Presentatie
      </h3>
      <Card className="border-warm-200 overflow-hidden">
        <CardContent className="p-0 relative">
          <div
            className="w-full h-[500px]"
            onContextMenu={(e) => e.preventDefault()}
          >
            {isPdf ? (
              <iframe
                src={`${signedUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                className="w-full h-full border-0"
                title="Presentatie"
                sandbox="allow-same-origin allow-scripts"
              />
            ) : (
              <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(signedUrl)}`}
                className="w-full h-full border-0"
                title="Presentatie"
                sandbox="allow-same-origin allow-scripts allow-popups"
              />
            )}
          </div>
          <p className="text-xs text-muted-foreground text-center py-2">
            Alleen bekijken — downloaden is niet beschikbaar
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PresentationViewer;
