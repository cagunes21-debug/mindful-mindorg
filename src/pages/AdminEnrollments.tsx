import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Users, Eye, Upload, Presentation, ArrowLeft, Loader2, FileUp, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Enrollment {
  id: string;
  user_id: string;
  course_type: string;
  start_date: string;
  current_week: number | null;
  status: string;
  trainer_name: string | null;
  location: string | null;
  group_info: string | null;
  unlocked_weeks: number[];
  registration_id: string | null;
}

interface EnrollmentWithEmail extends Enrollment {
  registration_email?: string;
  registration_name?: string;
}

interface CourseWeek {
  id: string;
  week_number: number;
  title: string;
  course_type: string;
  presentation_url: string | null;
}

const AdminEnrollments = () => {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<EnrollmentWithEmail[]>([]);
  const [courseWeeks, setCourseWeeks] = useState<CourseWeek[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnrollment, setSelectedEnrollment] = useState<EnrollmentWithEmail | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const [filterCourseType, setFilterCourseType] = useState<string>("all");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [enrollRes, weeksRes, regRes] = await Promise.all([
      supabase.from("enrollments").select("*").order("created_at", { ascending: false }),
      supabase.from("course_weeks").select("id, week_number, title, course_type, presentation_url").order("week_number"),
      supabase.from("registrations").select("id, email, name"),
    ]);

    const regs = regRes.data || [];
    const enriched: EnrollmentWithEmail[] = ((enrollRes.data || []) as Enrollment[]).map(e => {
      const reg = regs.find(r => r.id === e.registration_id);
      return {
        ...e,
        registration_email: reg?.email,
        registration_name: reg?.name,
      };
    });

    setEnrollments(enriched);
    setCourseWeeks((weeksRes.data || []) as CourseWeek[]);
    setLoading(false);
  };

  const getWeeksForEnrollment = (courseType: string) =>
    courseWeeks.filter(w => w.course_type === courseType);

  const toggleWeek = async (enrollment: EnrollmentWithEmail, weekNumber: number) => {
    const currentUnlocked = enrollment.unlocked_weeks || [1];
    const newUnlocked = currentUnlocked.includes(weekNumber)
      ? currentUnlocked.filter(w => w !== weekNumber)
      : [...currentUnlocked, weekNumber].sort((a, b) => a - b);

    setSaving(true);
    const { error } = await supabase
      .from("enrollments")
      .update({ unlocked_weeks: newUnlocked })
      .eq("id", enrollment.id);

    if (error) {
      toast.error("Kon niet opslaan");
    } else {
      setEnrollments(prev =>
        prev.map(e => e.id === enrollment.id ? { ...e, unlocked_weeks: newUnlocked } : e)
      );
      if (selectedEnrollment?.id === enrollment.id) {
        setSelectedEnrollment(prev => prev ? { ...prev, unlocked_weeks: newUnlocked } : null);
      }
      toast.success(`Sessie ${weekNumber} ${newUnlocked.includes(weekNumber) ? 'vrijgegeven' : 'vergrendeld'}`);
    }
    setSaving(false);
  };

  const handlePresentationUpload = async (weekId: string, file: File) => {
    setUploadingFor(weekId);
    try {
      const filePath = `week-${weekId}/${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("presentations")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("presentations")
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("course_weeks")
        .update({ presentation_url: urlData.publicUrl })
        .eq("id", weekId);

      if (updateError) throw updateError;

      setCourseWeeks(prev =>
        prev.map(w => w.id === weekId ? { ...w, presentation_url: urlData.publicUrl } : w)
      );
      toast.success("Presentatie geüpload!");
    } catch (err: any) {
      toast.error("Upload mislukt: " + err.message);
    }
    setUploadingFor(null);
  };

  const removePresentationUrl = async (weekId: string) => {
    const { error } = await supabase
      .from("course_weeks")
      .update({ presentation_url: null })
      .eq("id", weekId);

    if (!error) {
      setCourseWeeks(prev => prev.map(w => w.id === weekId ? { ...w, presentation_url: null } : w));
      toast.success("Presentatie verwijderd");
    }
  };

  const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    paused: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const filtered = enrollments.filter(
    e => filterCourseType === "all" || e.course_type === filterCourseType
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-16 flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Deelnemers Beheer | Admin" description="Beheer deelnemers en sessie-zichtbaarheid" />
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-light text-foreground">Deelnemers</h1>
                <p className="text-muted-foreground">Beheer sessie-zichtbaarheid en presentaties</p>
              </div>
            </div>
            <Select value={filterCourseType} onValueChange={setFilterCourseType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle programma's</SelectItem>
                <SelectItem value="msc_8week">Groepstraining</SelectItem>
                <SelectItem value="individueel_6">Individueel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Enrollments List */}
          <div className="space-y-4">
            {filtered.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  Geen inschrijvingen gevonden.
                </CardContent>
              </Card>
            )}
            {filtered.map(enrollment => {
              const weeks = getWeeksForEnrollment(enrollment.course_type);
              const label = enrollment.course_type === "individueel_6" ? "Sessie" : "Week";
              return (
                <Card key={enrollment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-lg">
                            {enrollment.registration_name || "Onbekende deelnemer"}
                          </h3>
                          <Badge className={statusColors[enrollment.status || "active"]}>
                            {enrollment.status || "active"}
                          </Badge>
                          <Badge variant="outline">
                            {enrollment.course_type === "individueel_6" ? "Individueel" : "Groep"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {enrollment.registration_email || "Geen e-mail gekoppeld"}
                          {enrollment.trainer_name && ` • Trainer: ${enrollment.trainer_name}`}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Start: {new Date(enrollment.start_date).toLocaleDateString("nl-NL")}
                        </p>
                      </div>

                      <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => {
                          setSelectedEnrollment(enrollment);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                        Sessies beheren
                      </Button>
                    </div>

                    {/* Quick week toggles */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {weeks.map(week => {
                        const isUnlocked = (enrollment.unlocked_weeks || [1]).includes(week.week_number);
                        return (
                          <button
                            key={week.id}
                            onClick={() => toggleWeek(enrollment, week.week_number)}
                            disabled={saving}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                              isUnlocked
                                ? "bg-primary/10 text-primary border border-primary/30"
                                : "bg-muted text-muted-foreground border border-border"
                            }`}
                          >
                            {label} {week.week_number}
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Presentations Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-light mb-4 flex items-center gap-2">
              <Presentation className="h-5 w-5 text-primary" />
              Presentaties per sessie
            </h2>
            <p className="text-muted-foreground mb-6">
              Upload presentaties die zichtbaar worden voor deelnemers wanneer de sessie is vrijgegeven.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {courseWeeks.map(week => {
                const label = week.course_type === "individueel_6" ? "Sessie" : "Week";
                return (
                  <Card key={week.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <Badge variant="outline" className="mb-1">{label} {week.week_number}</Badge>
                          <p className="font-medium text-sm">{week.title}</p>
                        </div>
                        {week.presentation_url && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removePresentationUrl(week.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      {week.presentation_url ? (
                        <div className="flex items-center gap-2 text-sm">
                          <Presentation className="h-4 w-4 text-primary" />
                          <a
                            href={week.presentation_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline truncate"
                          >
                            Presentatie bekijken
                          </a>
                        </div>
                      ) : (
                        <div>
                          <Label
                            htmlFor={`upload-${week.id}`}
                            className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {uploadingFor === week.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <FileUp className="h-4 w-4" />
                            )}
                            {uploadingFor === week.id ? "Uploaden..." : "Upload presentatie (PDF/PPTX)"}
                          </Label>
                          <Input
                            id={`upload-${week.id}`}
                            type="file"
                            accept=".pdf,.pptx,.ppt"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handlePresentationUpload(week.id, file);
                            }}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Detail Dialog */}
      {selectedEnrollment && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                Sessies beheren — {selectedEnrollment.registration_name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <p className="text-sm text-muted-foreground">
                Vink aan welke sessies zichtbaar zijn voor deze deelnemer.
              </p>
              {getWeeksForEnrollment(selectedEnrollment.course_type).map(week => {
                const isUnlocked = (selectedEnrollment.unlocked_weeks || [1]).includes(week.week_number);
                const label = selectedEnrollment.course_type === "individueel_6" ? "Sessie" : "Week";
                return (
                  <div
                    key={week.id}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      id={`week-${week.id}`}
                      checked={isUnlocked}
                      disabled={saving}
                      onCheckedChange={() => toggleWeek(selectedEnrollment, week.week_number)}
                    />
                    <Label htmlFor={`week-${week.id}`} className="flex-1 cursor-pointer">
                      <span className="font-medium">{label} {week.week_number}</span>
                      <span className="text-muted-foreground ml-2">— {week.title}</span>
                    </Label>
                    {week.presentation_url && (
                      <Badge variant="secondary" className="text-xs">
                        <Presentation className="h-3 w-3 mr-1" />
                        Presentatie
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
    </div>
  );
};

export default AdminEnrollments;
