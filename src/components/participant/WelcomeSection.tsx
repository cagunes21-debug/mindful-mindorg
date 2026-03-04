import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, ClipboardList, Users, User as UserIcon, Heart, Sparkles, Play } from "lucide-react";

interface Enrollment {
  id: string;
  start_date: string;
  current_week: number;
  status: string;
  trainer_name: string | null;
  location: string | null;
  group_info: string | null;
  course_type: string;
  unlocked_weeks: number[];
}

interface WelcomeData {
  welcome_title: string;
  welcome_message: string;
  intro_video_url: string | null;
}

const COURSE_TYPE_NAMES: Record<string, string> = {
  'msc_8week': '8-weekse Groepstraining',
  'individueel_6': 'Individueel Traject (6 sessies)',
  'losse_sessie': 'Losse Sessie',
};

const COURSE_DISPLAY_NAMES: Record<string, string> = {
  'msc_8week': '8-weekse Mindful Zelfcompassie Training',
  'individueel_6': 'Individueel Traject',
  'losse_sessie': 'Losse Sessie',
};

// Map enrollment course_type to training_type in our new tables
const COURSE_TO_TRAINING: Record<string, string> = {
  'msc_8week': 'msc_8_week',
  'individueel_6': 'individual_6_sessions',
  'losse_sessie': 'individual_6_sessions',
};

const COURSE_HIGHLIGHTS: Record<string, { icon: React.ElementType; label: string }[]> = {
  'msc_8week': [
    { icon: Users, label: '8 groepssessies' },
    { icon: Headphones, label: 'Audiomeditaties' },
    { icon: ClipboardList, label: 'Thuisopdrachten' },
    { icon: Heart, label: 'Halve-dagretraite' },
  ],
  'individueel_6': [
    { icon: UserIcon, label: '6 persoonlijke sessies' },
    { icon: Headphones, label: 'Audiomeditaties' },
    { icon: ClipboardList, label: 'Oefeningen op maat' },
  ],
  'losse_sessie': [
    { icon: Sparkles, label: '1 sessie' },
    { icon: Headphones, label: 'Meditatie(s)' },
  ],
};

interface WelcomeSectionProps {
  user: User | null;
  enrollment: Enrollment;
  allEnrollments: Enrollment[];
  onSelectEnrollment: (enrollment: Enrollment) => void;
}

const WelcomeSection = ({ user, enrollment, allEnrollments, onSelectEnrollment }: WelcomeSectionProps) => {
  const [welcomeData, setWelcomeData] = useState<WelcomeData | null>(null);

  const firstName = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ')[0]
    : '';

  const trainingName = COURSE_DISPLAY_NAMES[enrollment.course_type] || 'training';
  const trainerName = enrollment.trainer_name || 'Je trainer';
  const highlights = COURSE_HIGHLIGHTS[enrollment.course_type] || COURSE_HIGHLIGHTS['msc_8week'];
  const trainingType = COURSE_TO_TRAINING[enrollment.course_type];

  useEffect(() => {
    if (trainingType) {
      supabase
        .from("training_welcome_content")
        .select("welcome_title, welcome_message, intro_video_url")
        .eq("training_type", trainingType)
        .maybeSingle()
        .then(({ data }) => {
          setWelcomeData(data as WelcomeData | null);
        });
    }
  }, [trainingType]);

  const hasCustomWelcome = welcomeData && (welcomeData.welcome_title || welcomeData.welcome_message);

  return (
    <Card className="mb-8 border-warm-200 bg-gradient-to-br from-warm-50 to-warm-100/30 shadow-sm">
      <CardContent className="p-8 md:p-10">
        {/* Training selector when multiple enrollments */}
        {allEnrollments.length > 1 && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">Je hebt meerdere trainingen:</p>
            <div className="flex flex-wrap gap-2">
              {allEnrollments.map(e => (
                <Button
                  key={e.id}
                  variant={enrollment.id === e.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => onSelectEnrollment(e)}
                >
                  {COURSE_TYPE_NAMES[e.course_type] || e.course_type}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="bg-background/80 rounded-xl p-6 text-muted-foreground space-y-4">
          {hasCustomWelcome ? (
            <>
              {welcomeData.welcome_title && (
                <p className="text-lg font-medium text-foreground">
                  {welcomeData.welcome_title.replace("{naam}", firstName || "daar")}
                </p>
              )}
              {welcomeData.welcome_message && (
                <div className="text-sm leading-relaxed whitespace-pre-line">
                  {welcomeData.welcome_message.replace("{naam}", firstName || "daar")}
                </div>
              )}
              {welcomeData.intro_video_url && (
                <div className="mt-4">
                  {welcomeData.intro_video_url.includes("youtube") || welcomeData.intro_video_url.includes("youtu.be") ? (
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        src={welcomeData.intro_video_url.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")}
                        className="w-full h-full"
                        allowFullScreen
                        title="Introductievideo"
                      />
                    </div>
                  ) : (
                    <a href={welcomeData.intro_video_url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                      <Play className="h-4 w-4" /> Bekijk introductievideo
                    </a>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              <p className="text-lg font-medium text-foreground">
                Hoi{firstName ? ` ${firstName}` : ''},
              </p>
              <p className="text-base leading-relaxed">
                Welkom bij de {trainingName}! 🌿
              </p>
              <p className="text-sm leading-relaxed">
                In de komende periode zul je je verdiepen in Mindful Zelfcompassie. Samen gaan we ontdekken
                hoe je vriendelijker naar jezelf kunt zijn, beter met stress kunt omgaan en meer innerlijke
                rust kunt ervaren.
              </p>
              <p className="text-sm leading-relaxed">
                Op deze pagina vind je alle materialen, meditaties en opdrachten die horen bij jouw traject.
                Neem de tijd om rustig te beginnen en voel je vrij om vragen te stellen of notities bij te houden.
              </p>
              <p className="text-sm leading-relaxed">
                We kijken ernaar uit om dit traject samen met jou te doorlopen!
              </p>
              <p className="text-sm leading-relaxed mt-2">
                Warme groet,<br />
                {trainerName}
              </p>
            </>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-border/50">
            {highlights.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <item.icon className="h-4 w-4 text-primary" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeSection;
