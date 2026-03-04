import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown, FileText, Video, Headphones, Link2, ClipboardList, ExternalLink, Play,
} from "lucide-react";

interface ContentItem {
  id: string;
  training_type: string;
  unit_number: number;
  order_index: number;
  title: string;
  description: string | null;
  content_type: string;
  text_content: string | null;
  file_url: string | null;
  is_visible: boolean;
  release_date: string | null;
}

const COURSE_TO_TRAINING: Record<string, string> = {
  'msc_8week': 'msc_8_week',
  'individueel_6': 'individual_6_sessions',
  'losse_sessie': 'individual_6_sessions',
};

const UNIT_LABELS: Record<string, string> = {
  'msc_8_week': 'Week',
  'individual_6_sessions': 'Sessie',
};

const CONTENT_ICONS: Record<string, React.ElementType> = {
  text: FileText, video: Video, audio: Headphones, pdf: FileText, link: Link2, assignment: ClipboardList,
};

interface Props {
  courseType: string;
  unlockedWeeks: number[];
}

const TrainingContentSection = ({ courseType, unlockedWeeks }: Props) => {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});

  const trainingType = COURSE_TO_TRAINING[courseType];
  const unitLabel = trainingType ? UNIT_LABELS[trainingType] || "Eenheid" : "Eenheid";

  useEffect(() => {
    if (!trainingType) { setLoading(false); return; }
    supabase
      .from("training_content_items")
      .select("*")
      .eq("training_type", trainingType)
      .eq("is_visible", true)
      .order("unit_number")
      .order("order_index")
      .then(async ({ data }) => {
        const now = new Date();
        const visible = (data || []).filter((item: any) =>
          !item.release_date || new Date(item.release_date) <= now
        ) as ContentItem[];
        setItems(visible);

        // Generate signed URLs for private bucket files
        const bucketFiles = visible.filter(i => i.file_url && !i.file_url.startsWith("http"));
        if (bucketFiles.length > 0) {
          const paths = bucketFiles.map(i => i.file_url!);
          const { data: urls } = await supabase.storage
            .from("training-content")
            .createSignedUrls(paths, 3600);
          if (urls) {
            const map: Record<string, string> = {};
            urls.forEach((u, idx) => { if (u.signedUrl) map[paths[idx]] = u.signedUrl; });
            setSignedUrls(map);
          }
        }
        setLoading(false);
      });
  }, [trainingType]);

  if (loading || items.length === 0) return null;

  // Group by unit, only show unlocked units
  const grouped = items.reduce<Record<number, ContentItem[]>>((acc, item) => {
    if (!unlockedWeeks.includes(item.unit_number)) return acc;
    if (!acc[item.unit_number]) acc[item.unit_number] = [];
    acc[item.unit_number].push(item);
    return acc;
  }, {});

  if (Object.keys(grouped).length === 0) return null;

  const resolveUrl = (fileUrl: string | null) => {
    if (!fileUrl) return null;
    if (fileUrl.startsWith("http")) return fileUrl;
    return signedUrls[fileUrl] || null;
  };

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-sm text-muted-foreground flex items-center gap-2">
        <FileText className="h-4 w-4" /> Trainingsmateriaal
      </h3>
      {Object.entries(grouped)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([unitNum, unitItems]) => (
          <Collapsible key={unitNum} defaultOpen={unitItems.length <= 5}>
            <Card className="border-warm-200">
              <CollapsibleTrigger className="w-full text-left">
                <CardContent className="p-3 flex items-center gap-2">
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="outline" className="font-mono shrink-0">
                    {unitLabel} {unitNum}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {unitItems.length} item{unitItems.length !== 1 ? "s" : ""}
                  </span>
                </CardContent>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="px-3 pb-3 pt-0 space-y-2">
                  {unitItems.map(item => {
                    const Icon = CONTENT_ICONS[item.content_type] || FileText;
                    return (
                      <Collapsible key={item.id}>
                        <CollapsibleTrigger className="w-full text-left">
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors">
                            <Icon className="h-4 w-4 text-primary shrink-0" />
                            <span className="text-sm font-medium flex-1">{item.title}</span>
                            {item.description && (
                              <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0" />
                            )}
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="px-2 py-2 space-y-2">
                            {item.description && (
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            )}
                            {item.text_content && (
                              <div className="text-sm leading-relaxed whitespace-pre-line bg-background rounded-lg p-3 border">
                                {item.text_content}
                              </div>
                            )}
                            {item.file_url && item.content_type === "video" && (
                              item.file_url.includes("youtube") || item.file_url.includes("youtu.be") ? (
                                <div className="aspect-video rounded-lg overflow-hidden">
                                  <iframe
                                    src={item.file_url.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")}
                                    className="w-full h-full"
                                    allowFullScreen
                                  />
                                </div>
                              ) : (
                                <video controls className="w-full rounded-lg" src={item.file_url} />
                              )
                            )}
                            {item.file_url && item.content_type === "audio" && (
                              <audio controls className="w-full" src={item.file_url} />
                            )}
                            {item.file_url && (item.content_type === "pdf" || item.content_type === "link") && (
                              <a href={item.file_url} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                                <ExternalLink className="h-4 w-4" />
                                {item.content_type === "pdf" ? "Open PDF" : "Open link"}
                              </a>
                            )}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  })}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
    </div>
  );
};

export default TrainingContentSection;
