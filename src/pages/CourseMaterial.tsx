import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Users, User, Headphones, ClipboardList, Presentation, ExternalLink, Play, FileText } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link } from "react-router-dom";

interface CourseWeek {
  id: string;
  week_number: number;
  title: string;
  description: string | null;
  theme: string | null;
  content: Record<string, unknown>;
  course_type: string;
  notebook_url: string | null;
  notebook_audio_url: string | null;
}

interface Meditation {
  id: string;
  week_id: string;
  title: string;
  description: string | null;
  duration_minutes: number | null;
}

interface Assignment {
  id: string;
  week_id: string;
  title: string;
  description: string | null;
  instructions: string | null;
  sort_order: number | null;
}

const CourseMaterial = () => {
  const [groupWeeks, setGroupWeeks] = useState<CourseWeek[]>([]);
  const [individualWeeks, setIndividualWeeks] = useState<CourseWeek[]>([]);
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [weeksRes, medRes, assRes] = await Promise.all([
      supabase.from("course_weeks").select("*").order("week_number"),
      supabase.from("meditations").select("id, week_id, title, description, duration_minutes").order("sort_order"),
      supabase.from("assignments").select("id, week_id, title, description, instructions, sort_order").order("sort_order"),
    ]);

    const allWeeks = (weeksRes.data || []) as CourseWeek[];
    setGroupWeeks(allWeeks.filter(w => w.course_type === "msc_8week"));
    setIndividualWeeks(allWeeks.filter(w => w.course_type === "individueel_6"));
    setMeditations((medRes.data || []) as Meditation[]);
    setAssignments((assRes.data || []) as Assignment[]);
    setLoading(false);
  };

  const getWeekMeditations = (weekId: string) => meditations.filter(m => m.week_id === weekId);
  const getWeekAssignments = (weekId: string) => assignments.filter(a => a.week_id === weekId);

  const WeekContent = ({ week, label }: { week: CourseWeek; label: string }) => {
    const weekMeditations = getWeekMeditations(week.id);
    const weekAssignments = getWeekAssignments(week.id);
    const content = week.content as Record<string, unknown>;

    return (
      <AccordionItem value={week.id} className="border-border">
        <AccordionTrigger className="hover:no-underline px-4">
          <div className="flex items-center gap-3 text-left">
            <Badge variant="outline" className="shrink-0 font-mono">
              {label} {week.week_number}
            </Badge>
            <div>
              <span className="font-medium">{week.title}</span>
              {week.theme && (
                <span className="text-muted-foreground text-sm ml-2">— {week.theme}</span>
              )}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4 space-y-4">
          {week.description && (
            <p className="text-muted-foreground text-sm leading-relaxed">{week.description}</p>
          )}

          {/* Content sections from JSON */}
          {content?.sections && (content.sections as Array<{title: string; duration?: string; items?: string[]}>).length > 0 && (
            <div className="space-y-3">
              {(content.sections as Array<{title: string; duration?: string; items?: string[]}>).map((section, i) => (
                <div key={i}>
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-1">
                    <BookOpen className="h-4 w-4 text-primary" />
                    {section.title}
                    {section.duration && (
                      <Badge variant="secondary" className="text-xs font-normal">{section.duration}</Badge>
                    )}
                  </h4>
                  {section.items && section.items.length > 0 && (
                    <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                      {section.items.map((item: string, j: number) => <li key={j}>{item}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Legacy content from JSON */}
          {content?.meditations && (content.meditations as string[]).length > 0 && (
            <div>
              <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                <Headphones className="h-4 w-4 text-primary" /> Meditaties (curriculum)
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                {(content.meditations as string[]).map((m: string, i: number) => <li key={i}>{m}</li>)}
              </ul>
            </div>
          )}

          {content?.exercises && (content.exercises as string[]).length > 0 && (
            <div>
              <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                <ClipboardList className="h-4 w-4 text-primary" /> Oefeningen (curriculum)
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                {(content.exercises as string[]).map((e: string, i: number) => <li key={i}>{e}</li>)}
              </ul>
            </div>
          )}

          {/* Database meditations */}
          {weekMeditations.length > 0 && (
            <div>
              <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                <Headphones className="h-4 w-4 text-primary" /> Audio meditaties
              </h4>
              <div className="space-y-2">
                {weekMeditations.map(m => (
                  <div key={m.id} className="flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2 text-sm">
                    <span>{m.title}</span>
                    {m.duration_minutes && (
                      <Badge variant="secondary" className="text-xs">{m.duration_minutes} min</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Database assignments */}
          {weekAssignments.length > 0 && (
            <div>
              <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                <ClipboardList className="h-4 w-4 text-primary" /> Oefeningen & scripts
              </h4>
              <div className="space-y-2">
                {weekAssignments.map(a => (
                  <div key={a.id} className="bg-muted/50 rounded-lg overflow-hidden">
                    {a.instructions ? (
                      <Collapsible>
                        <CollapsibleTrigger className="w-full px-3 py-2 flex items-center justify-between hover:bg-muted/80 transition-colors">
                          <div className="text-left">
                            <p className="text-sm font-medium flex items-center gap-2">
                              <FileText className="h-3.5 w-3.5 text-primary" />
                              {a.title}
                            </p>
                            {a.description && <p className="text-xs text-muted-foreground mt-0.5 ml-5.5">{a.description}</p>}
                          </div>
                          <Badge variant="outline" className="text-xs shrink-0 ml-2">Script ▾</Badge>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="px-4 py-3 border-t border-border bg-background/50">
                            <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed italic">
                              {a.instructions}
                            </p>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <div className="px-3 py-2">
                        <p className="text-sm font-medium">{a.title}</p>
                        {a.description && <p className="text-xs text-muted-foreground mt-1">{a.description}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NotebookLM */}
          {(week.notebook_url || week.notebook_audio_url) && (
            <div className="border-t border-border pt-4 mt-4">
              <h4 className="text-sm font-medium flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4 text-primary" /> NotebookLM
              </h4>
              <div className="space-y-3">
                {week.notebook_audio_url && (
                  <div className="bg-muted/50 rounded-lg px-3 py-3">
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <Play className="h-3 w-3" /> Audio-overzicht
                    </p>
                    <audio controls className="w-full h-8" src={week.notebook_audio_url}>
                      Je browser ondersteunt geen audio.
                    </audio>
                  </div>
                )}
                {week.notebook_url && (
                  <a
                    href={week.notebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open in NotebookLM
                  </a>
                )}
              </div>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-16 flex items-center justify-center h-64">
          <div className="animate-pulse text-muted-foreground">Laden...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Cursusmateriaal | Mindful Mind" description="Overzicht van al het cursusmateriaal" />
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-light text-foreground mb-1">Cursusmateriaal</h1>
              <p className="text-muted-foreground">Overzicht van alle sessies, meditaties en opdrachten</p>
            </div>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/admin/presentatie/1">
                <Presentation className="h-4 w-4" />
                Presentatie Sessie 1
              </Link>
            </Button>
          </div>

          <Tabs defaultValue="group" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="group" className="gap-2">
                <Users className="h-4 w-4" />
                Groepstraining (8 weken)
              </TabsTrigger>
              <TabsTrigger value="individual" className="gap-2">
                <User className="h-4 w-4" />
                Individueel traject (6 sessies)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="group">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-light flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    8-weekse Mindful Zelfcompassie Training
                  </CardTitle>
                  <CardDescription>
                    Standaard MSC-curriculum met {groupWeeks.length} weken, {meditations.filter(m => groupWeeks.some(w => w.id === m.week_id)).length} meditaties en {assignments.filter(a => groupWeeks.some(w => w.id === a.week_id)).length} opdrachten
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="space-y-1">
                    {groupWeeks.map(week => (
                      <WeekContent key={week.id} week={week} label="Week" />
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="individual">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-light flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Individueel Traject – 6 sessies
                  </CardTitle>
                  <CardDescription>
                    Persoonlijk begeleidingstraject met {individualWeeks.length} sessies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="space-y-1">
                    {individualWeeks.map(week => (
                      <WeekContent key={week.id} week={week} label="Sessie" />
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseMaterial;
