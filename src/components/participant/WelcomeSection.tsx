import { User } from "@supabase/supabase-js";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Headphones, ClipboardList, Info, Users, User as UserIcon, Calendar, Heart, Sparkles } from "lucide-react";

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

const COURSE_TYPE_NAMES: Record<string, string> = {
  'msc_8week': '8-weekse Groepstraining',
  'individueel_6': 'Individueel Traject (6 sessies)',
  'losse_sessie': 'Losse Sessie',
};

interface WelcomeSectionProps {
  user: User | null;
  enrollment: Enrollment;
  allEnrollments: Enrollment[];
  onSelectEnrollment: (enrollment: Enrollment) => void;
}

const WelcomeContent8Week = () => (
  <div className="bg-background/80 rounded-xl p-6 text-muted-foreground space-y-4">
    <p className="text-base leading-relaxed">
      Welkom bij de <strong>8-weekse Mindful Zelfcompassie Training (MSC)</strong>. 
      Gedurende 8 weken ontdek je stap voor stap hoe je een warme, 
      begripvolle relatie met jezelf kunt opbouwen — juist in moeilijke momenten.
    </p>
    <p className="text-sm leading-relaxed">
      Elke week wordt een nieuwe sessie vrijgegeven door je trainer. Je vindt hier 
      audiomeditaties om thuis te oefenen, reflectieopdrachten en achtergrondinformatie. 
      Neem de tijd en wees mild voor jezelf — er is geen haast. 💛
    </p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
      <div className="flex items-center gap-2 text-sm">
        <Users className="h-4 w-4 text-primary" />
        <span>8 groepssessies</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Headphones className="h-4 w-4 text-primary" />
        <span>Audiomeditaties</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <ClipboardList className="h-4 w-4 text-primary" />
        <span>Thuisopdrachten</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Heart className="h-4 w-4 text-primary" />
        <span>Halve-dagretraite</span>
      </div>
    </div>
  </div>
);

const WelcomeContentIndividueel = () => (
  <div className="bg-background/80 rounded-xl p-6 text-muted-foreground space-y-4">
    <p className="text-base leading-relaxed">
      Welkom bij jouw <strong>Individueel Traject</strong>. In 6 persoonlijke sessies 
      werk je op maat aan zelfcompassie en mindfulness, volledig afgestemd op jouw 
      behoeften en tempo.
    </p>
    <p className="text-sm leading-relaxed">
      Je trainer begeleidt je stap voor stap. Na elke sessie vind je hier de bijbehorende 
      meditaties en oefeningen om thuis mee te werken. Geef jezelf de ruimte om te 
      oefenen zonder oordeel — dit traject is er helemaal voor jou. 🌱
    </p>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
      <div className="flex items-center gap-2 text-sm">
        <UserIcon className="h-4 w-4 text-primary" />
        <span>6 persoonlijke sessies</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Headphones className="h-4 w-4 text-primary" />
        <span>Audiomeditaties</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <ClipboardList className="h-4 w-4 text-primary" />
        <span>Oefeningen op maat</span>
      </div>
    </div>
  </div>
);

const WelcomeContentLosseSessie = () => (
  <div className="bg-background/80 rounded-xl p-6 text-muted-foreground space-y-4">
    <p className="text-base leading-relaxed">
      Welkom bij jouw <strong>Losse Sessie</strong>. Deze sessie biedt je de kans om 
      kennis te maken met zelfcompassie en mindfulness, of om een specifiek thema 
      verder te verdiepen.
    </p>
    <p className="text-sm leading-relaxed">
      Hieronder vind je de materialen die bij jouw sessie horen. 
      Neem de tijd om de meditatie(s) en eventuele oefeningen rustig door te nemen. 🧘
    </p>
    <div className="grid grid-cols-2 gap-3 pt-2">
      <div className="flex items-center gap-2 text-sm">
        <Sparkles className="h-4 w-4 text-primary" />
        <span>1 sessie</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Headphones className="h-4 w-4 text-primary" />
        <span>Meditatie(s)</span>
      </div>
    </div>
  </div>
);

const WelcomeSection = ({ user, enrollment, allEnrollments, onSelectEnrollment }: WelcomeSectionProps) => {
  const getCourseName = (): string => {
    const names: Record<string, string> = {
      'msc_8week': '8-weekse Mindful Zelfcompassie Training',
      'individueel_6': 'Individueel Traject – 6 sessies',
      'losse_sessie': 'Losse Individuele Sessie',
    };
    return names[enrollment.course_type] || '8-weekse Mindful Zelfcompassie Training';
  };

  const firstName = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ')[0]
    : '';

  return (
    <Card className="mb-8 border-warm-200 bg-gradient-to-br from-warm-50 to-warm-100/30 shadow-sm">
      <CardContent className="p-8 md:p-10">
        <h1 className="text-3xl md:text-4xl font-light text-foreground mb-2">
          Welkom{firstName ? ` ${firstName}` : ''} 🌿
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          {getCourseName()}
        </p>

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

        {/* Course-type specific welcome content */}
        {enrollment.course_type === 'msc_8week' && <WelcomeContent8Week />}
        {enrollment.course_type === 'individueel_6' && <WelcomeContentIndividueel />}
        {enrollment.course_type === 'losse_sessie' && <WelcomeContentLosseSessie />}

        {/* Trainer & location info */}
        {(enrollment.trainer_name || enrollment.location) && (
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
            {enrollment.trainer_name && (
              <div className="flex items-center gap-1.5">
                <UserIcon className="h-4 w-4 text-primary" />
                <span>Trainer: {enrollment.trainer_name}</span>
              </div>
            )}
            {enrollment.location && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary" />
                <span>Locatie: {enrollment.location}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WelcomeSection;
