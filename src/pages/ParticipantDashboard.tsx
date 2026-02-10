import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  BookOpen, 
  Headphones, 
  ClipboardList, 
  Info, 
  Lock, 
  CheckCircle2, 
  Play,
  Calendar,
  MapPin,
  User as UserIcon,
  Users,
  ChevronRight,
  Save
} from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import WeekCard from "@/components/participant/WeekCard";
import MeditationPlayer from "@/components/participant/MeditationPlayer";
import AssignmentCard from "@/components/participant/AssignmentCard";
import PracticalInfoCard from "@/components/participant/PracticalInfoCard";

interface Enrollment {
  id: string;
  start_date: string;
  current_week: number;
  status: string;
  trainer_name: string | null;
  location: string | null;
  group_info: string | null;
}

interface CourseWeek {
  id: string;
  week_number: number;
  title: string;
  description: string | null;
  theme: string | null;
  content: Record<string, unknown>;
}

interface Meditation {
  id: string;
  week_id: string;
  title: string;
  description: string | null;
  audio_url: string;
  duration_minutes: number | null;
  sort_order: number;
}

interface Assignment {
  id: string;
  week_id: string;
  title: string;
  description: string | null;
  instructions: string | null;
  sort_order: number;
}

interface ParticipantProgress {
  id: string;
  meditation_id: string | null;
  assignment_id: string | null;
  completed_at: string;
  notes: string | null;
}

const ParticipantDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [weeks, setWeeks] = useState<CourseWeek[]>([]);
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [progress, setProgress] = useState<ParticipantProgress[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate("/login");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/login");
      } else {
        loadDashboardData(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadDashboardData = async (userId: string) => {
    try {
      setLoading(true);

      // Load enrollment
      const { data: enrollmentData, error: enrollmentError } = await supabase
        .from("enrollments")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "active")
        .single();

      if (enrollmentError || !enrollmentData) {
        setLoading(false);
        return;
      }

      setEnrollment(enrollmentData as Enrollment);

      // Load all data in parallel
      const [weeksResult, meditationsResult, assignmentsResult, progressResult] = await Promise.all([
        supabase.from("course_weeks").select("*").order("week_number"),
        supabase.from("meditations").select("*").order("sort_order"),
        supabase.from("assignments").select("*").order("sort_order"),
        supabase.from("participant_progress")
          .select("*")
          .eq("enrollment_id", enrollmentData.id)
      ]);

      if (weeksResult.data) setWeeks(weeksResult.data as CourseWeek[]);
      if (meditationsResult.data) setMeditations(meditationsResult.data as Meditation[]);
      if (assignmentsResult.data) setAssignments(assignmentsResult.data as Assignment[]);
      if (progressResult.data) setProgress(progressResult.data as ParticipantProgress[]);

      // Set selected week to current week
      setSelectedWeek(enrollmentData.current_week || 1);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast.error("Er ging iets mis bij het laden van de gegevens");
    } finally {
      setLoading(false);
    }
  };

  const calculateUnlockedWeek = (): number => {
    if (!enrollment) return 1;
    const startDate = new Date(enrollment.start_date);
    const today = new Date();
    const diffTime = today.getTime() - startDate.getTime();
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    return Math.min(Math.max(diffWeeks + 1, 1), 8);
  };

  const isWeekUnlocked = (weekNumber: number): boolean => {
    return weekNumber <= calculateUnlockedWeek();
  };

  const getWeekProgress = (weekId: string): number => {
    const weekMeditations = meditations.filter(m => m.week_id === weekId);
    const weekAssignments = assignments.filter(a => a.week_id === weekId);
    const totalItems = weekMeditations.length + weekAssignments.length;
    
    if (totalItems === 0) return 0;

    const completedMeditations = weekMeditations.filter(m => 
      progress.some(p => p.meditation_id === m.id)
    ).length;
    
    const completedAssignments = weekAssignments.filter(a => 
      progress.some(p => p.assignment_id === a.id)
    ).length;

    return Math.round(((completedMeditations + completedAssignments) / totalItems) * 100);
  };

  const getTotalProgress = (): number => {
    const totalMeditations = meditations.length;
    const totalAssignments = assignments.length;
    const totalItems = totalMeditations + totalAssignments;
    
    if (totalItems === 0) return 0;

    const completedMeditations = progress.filter(p => p.meditation_id).length;
    const completedAssignments = progress.filter(p => p.assignment_id).length;

    return Math.round(((completedMeditations + completedAssignments) / totalItems) * 100);
  };

  const toggleMeditationComplete = async (meditationId: string) => {
    if (!enrollment || !user) return;

    const existingProgress = progress.find(p => p.meditation_id === meditationId);
    
    if (existingProgress) {
      // Remove progress
      await supabase
        .from("participant_progress")
        .delete()
        .eq("id", existingProgress.id);
      
      setProgress(prev => prev.filter(p => p.id !== existingProgress.id));
    } else {
      // Add progress
      const currentWeek = weeks.find(w => 
        meditations.find(m => m.id === meditationId)?.week_id === w.id
      );
      
      if (!currentWeek) return;

      const { data, error } = await supabase
        .from("participant_progress")
        .insert({
          user_id: user.id,
          enrollment_id: enrollment.id,
          week_id: currentWeek.id,
          meditation_id: meditationId
        })
        .select()
        .single();

      if (!error && data) {
        setProgress(prev => [...prev, data as ParticipantProgress]);
        toast.success("Meditatie gemarkeerd als voltooid");
      }
    }
  };

  const saveAssignmentNotes = async (assignmentId: string, notes: string) => {
    if (!enrollment || !user) return;

    const existingProgress = progress.find(p => p.assignment_id === assignmentId);
    const currentWeek = weeks.find(w => 
      assignments.find(a => a.id === assignmentId)?.week_id === w.id
    );

    if (!currentWeek) return;

    if (existingProgress) {
      // Update notes
      const { error } = await supabase
        .from("participant_progress")
        .update({ notes })
        .eq("id", existingProgress.id);

      if (!error) {
        setProgress(prev => prev.map(p => 
          p.id === existingProgress.id ? { ...p, notes } : p
        ));
        toast.success("Notities opgeslagen");
      }
    } else {
      // Create new progress with notes
      const { data, error } = await supabase
        .from("participant_progress")
        .insert({
          user_id: user.id,
          enrollment_id: enrollment.id,
          week_id: currentWeek.id,
          assignment_id: assignmentId,
          notes
        })
        .select()
        .single();

      if (!error && data) {
        setProgress(prev => [...prev, data as ParticipantProgress]);
        toast.success("Opdracht voltooid en notities opgeslagen");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-muted-foreground">Laden...</div>
          </div>
        </main>
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <Card className="max-w-xl mx-auto">
            <CardContent className="p-8 text-center">
              <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-medium mb-2">Geen actieve inschrijving</h2>
              <p className="text-muted-foreground mb-6">
                Je hebt momenteel geen actieve inschrijving voor de 8-weekse MSC training.
              </p>
              <Button asChild>
                <a href="/">Bekijk de training</a>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const currentWeekData = weeks.find(w => w.week_number === selectedWeek);
  const unlockedWeek = calculateUnlockedWeek();

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Mijn Dashboard | Mindful Mind"
        description="Jouw persoonlijke dashboard voor de 8-weekse MSC training"
      />
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-light text-foreground mb-2">
              Welkom bij je training
            </h1>
            <p className="text-muted-foreground">
              8-weekse Mindful Zelfcompassie Training
            </p>
          </div>

          {/* Progress Overview */}
          <Card className="mb-8 border-warm-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">Week {unlockedWeek} van 8</span>
                    <Badge variant="secondary">{getTotalProgress()}% voltooid</Badge>
                  </div>
                  <Progress value={getTotalProgress()} className="h-2" />
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Start: {new Date(enrollment.start_date).toLocaleDateString('nl-NL')}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Tabs */}
          <Tabs defaultValue="weeks" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
              <TabsTrigger value="weeks" className="gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Weken</span>
              </TabsTrigger>
              <TabsTrigger value="meditations" className="gap-2">
                <Headphones className="h-4 w-4" />
                <span className="hidden sm:inline">Meditaties</span>
              </TabsTrigger>
              <TabsTrigger value="assignments" className="gap-2">
                <ClipboardList className="h-4 w-4" />
                <span className="hidden sm:inline">Opdrachten</span>
              </TabsTrigger>
              <TabsTrigger value="info" className="gap-2">
                <Info className="h-4 w-4" />
                <span className="hidden sm:inline">Info</span>
              </TabsTrigger>
            </TabsList>

            {/* Weeks Tab */}
            <TabsContent value="weeks" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {weeks.map((week) => (
                  <WeekCard
                    key={week.id}
                    week={week}
                    isUnlocked={isWeekUnlocked(week.week_number)}
                    isSelected={selectedWeek === week.week_number}
                    progress={getWeekProgress(week.id)}
                    onClick={() => {
                      if (isWeekUnlocked(week.week_number)) {
                        setSelectedWeek(week.week_number);
                      }
                    }}
                  />
                ))}
              </div>

              {/* Selected Week Content */}
              {currentWeekData && isWeekUnlocked(currentWeekData.week_number) && (
                <Card className="mt-6 border-warm-200">
                  <CardHeader>
                    <CardTitle className="text-xl font-light">
                      Week {currentWeekData.week_number}: {currentWeekData.title}
                    </CardTitle>
                    {currentWeekData.theme && (
                      <CardDescription>{currentWeekData.theme}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    {currentWeekData.description && (
                      <p className="text-muted-foreground mb-6">{currentWeekData.description}</p>
                    )}

                    {/* Week Meditations */}
                    <div className="mb-6">
                      <h3 className="font-medium mb-3 flex items-center gap-2">
                        <Headphones className="h-4 w-4" />
                        Meditaties deze week
                      </h3>
                      <div className="space-y-3">
                        {meditations
                          .filter(m => m.week_id === currentWeekData.id)
                          .map(meditation => (
                            <MeditationPlayer
                              key={meditation.id}
                              meditation={meditation}
                              isCompleted={progress.some(p => p.meditation_id === meditation.id)}
                              onToggleComplete={() => toggleMeditationComplete(meditation.id)}
                            />
                          ))}
                        {meditations.filter(m => m.week_id === currentWeekData.id).length === 0 && (
                          <p className="text-sm text-muted-foreground">Nog geen meditaties beschikbaar voor deze week.</p>
                        )}
                      </div>
                    </div>

                    {/* Week Assignments */}
                    <div>
                      <h3 className="font-medium mb-3 flex items-center gap-2">
                        <ClipboardList className="h-4 w-4" />
                        Opdrachten deze week
                      </h3>
                      <div className="space-y-3">
                        {assignments
                          .filter(a => a.week_id === currentWeekData.id)
                          .map(assignment => {
                            const assignmentProgress = progress.find(p => p.assignment_id === assignment.id);
                            return (
                              <AssignmentCard
                                key={assignment.id}
                                assignment={assignment}
                                isCompleted={!!assignmentProgress}
                                notes={assignmentProgress?.notes || ""}
                                onSaveNotes={(notes) => saveAssignmentNotes(assignment.id, notes)}
                              />
                            );
                          })}
                        {assignments.filter(a => a.week_id === currentWeekData.id).length === 0 && (
                          <p className="text-sm text-muted-foreground">Nog geen opdrachten beschikbaar voor deze week.</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Meditations Tab */}
            <TabsContent value="meditations" className="space-y-4">
              {weeks.filter(w => isWeekUnlocked(w.week_number)).map(week => {
                const weekMeditations = meditations.filter(m => m.week_id === week.id);
                if (weekMeditations.length === 0) return null;
                
                return (
                  <div key={week.id}>
                    <h3 className="font-medium mb-3 text-muted-foreground">
                      Week {week.week_number}: {week.title}
                    </h3>
                    <div className="space-y-3">
                      {weekMeditations.map(meditation => (
                        <MeditationPlayer
                          key={meditation.id}
                          meditation={meditation}
                          isCompleted={progress.some(p => p.meditation_id === meditation.id)}
                          onToggleComplete={() => toggleMeditationComplete(meditation.id)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
              {meditations.length === 0 && (
                <Card className="border-warm-200">
                  <CardContent className="p-8 text-center">
                    <Headphones className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Meditaties worden binnenkort toegevoegd.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Assignments Tab */}
            <TabsContent value="assignments" className="space-y-4">
              {weeks.filter(w => isWeekUnlocked(w.week_number)).map(week => {
                const weekAssignments = assignments.filter(a => a.week_id === week.id);
                if (weekAssignments.length === 0) return null;
                
                return (
                  <div key={week.id}>
                    <h3 className="font-medium mb-3 text-muted-foreground">
                      Week {week.week_number}: {week.title}
                    </h3>
                    <div className="space-y-3">
                      {weekAssignments.map(assignment => {
                        const assignmentProgress = progress.find(p => p.assignment_id === assignment.id);
                        return (
                          <AssignmentCard
                            key={assignment.id}
                            assignment={assignment}
                            isCompleted={!!assignmentProgress}
                            notes={assignmentProgress?.notes || ""}
                            onSaveNotes={(notes) => saveAssignmentNotes(assignment.id, notes)}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {assignments.length === 0 && (
                <Card className="border-warm-200">
                  <CardContent className="p-8 text-center">
                    <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Opdrachten worden binnenkort toegevoegd.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Practical Info Tab */}
            <TabsContent value="info">
              <PracticalInfoCard enrollment={enrollment} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ParticipantDashboard;
