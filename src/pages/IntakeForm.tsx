import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, CheckCircle2, Heart } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";

const MAX_TEXT = 2000;
const MAX_SHORT = 500;

export default function IntakeForm() {
  const { enrollmentId } = useParams<{ enrollmentId: string }>();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [enrollmentInfo, setEnrollmentInfo] = useState<{ course_type: string; trainer_name: string | null } | null>(null);
  const [existingSubmission, setExistingSubmission] = useState<string | null>(null);

  const [form, setForm] = useState({
    reason: "",
    main_theme: "",
    goal: "",
    expectations: "",
    mindfulness_experience: "",
    health_situation: "",
    availability: "",
    emergency_contact: "",
    additional_notes: "",
  });

  useEffect(() => {
    if (!enrollmentId) return;
    checkEnrollment();
  }, [enrollmentId]);

  const checkEnrollment = async () => {
    setLoading(true);
    try {
      // Check if enrollment exists
      const { data: enrollment, error } = await supabase
        .from("enrollments")
        .select("id, course_type, trainer_name")
        .eq("id", enrollmentId!)
        .single();

      if (error || !enrollment) {
        setEnrollmentInfo(null);
        setLoading(false);
        return;
      }
      setEnrollmentInfo(enrollment);

      // Check for existing submission
      const { data: existing } = await supabase
        .from("intake_submissions")
        .select("*")
        .eq("enrollment_id", enrollmentId!)
        .order("submitted_at", { ascending: false })
        .limit(1);

      if (existing && existing.length > 0) {
        const sub = existing[0];
        setExistingSubmission(sub.id);
        setForm({
          reason: sub.reason || "",
          main_theme: sub.main_theme || "",
          goal: sub.goal || "",
          expectations: sub.expectations || "",
          mindfulness_experience: sub.mindfulness_experience || "",
          health_situation: sub.health_situation || "",
          availability: sub.availability || "",
          emergency_contact: sub.emergency_contact || "",
          additional_notes: sub.additional_notes || "",
        });
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollmentId) return;

    // Validate required fields
    if (!form.reason.trim() || !form.main_theme.trim() || !form.goal.trim()) {
      toast.error("Vul de verplichte velden in (reden, thema en doel)");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        enrollment_id: enrollmentId,
        reason: form.reason.trim().slice(0, MAX_TEXT),
        main_theme: form.main_theme.trim().slice(0, MAX_SHORT),
        goal: form.goal.trim().slice(0, MAX_TEXT),
        expectations: form.expectations.trim().slice(0, MAX_TEXT) || null,
        mindfulness_experience: form.mindfulness_experience.trim().slice(0, MAX_TEXT) || null,
        health_situation: form.health_situation.trim().slice(0, MAX_TEXT) || null,
        availability: form.availability.trim().slice(0, MAX_SHORT) || null,
        emergency_contact: form.emergency_contact.trim().slice(0, MAX_SHORT) || null,
        additional_notes: form.additional_notes.trim().slice(0, MAX_TEXT) || null,
      };

      if (existingSubmission) {
        const { error } = await supabase
          .from("intake_submissions")
          .update(payload)
          .eq("id", existingSubmission);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("intake_submissions")
          .insert(payload);
        if (error) throw error;
      }

      setSubmitted(true);
      toast.success("Intake formulier verstuurd!");
    } catch (err: any) {
      toast.error("Er ging iets mis: " + err.message);
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!enrollmentInfo) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Dit intake formulier is niet beschikbaar of de link is ongeldig.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center p-4">
        <SEO title="Intake verstuurd | Mindful Mind" description="Bedankt voor het invullen" />
        <Card className="max-w-md w-full">
          <CardContent className="pt-8 pb-8 text-center space-y-4">
            <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto" />
            <h2 className="text-xl font-medium">Bedankt!</h2>
            <p className="text-muted-foreground">
              Je intake formulier is succesvol verstuurd. Je trainer heeft nu inzicht in je achtergrond en doelen, 
              zodat het traject optimaal op jou kan worden afgestemd.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-50 py-8 px-4">
      <SEO title="Intake Formulier | Mindful Mind" description="Vul je intakeformulier in voor je traject" />
      
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Heart className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-light text-foreground">Intake Formulier</h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Fijn dat je dit formulier invult. Je antwoorden helpen ons om het traject zo goed mogelijk op jou af te stemmen. 
            Er zijn geen foute antwoorden — schrijf wat voor jou waar is.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basis vragen */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Over jouw traject</CardTitle>
              <CardDescription>Wat brengt je hier en wat hoop je te bereiken?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Waarom meld je je aan voor dit traject? *</Label>
                <Textarea
                  value={form.reason}
                  onChange={e => handleChange("reason", e.target.value)}
                  placeholder="Wat is de aanleiding om dit traject te volgen?"
                  className="mt-1 min-h-[80px]"
                  maxLength={MAX_TEXT}
                  required
                />
              </div>
              <div>
                <Label>Wat is het belangrijkste thema voor jou? *</Label>
                <Input
                  value={form.main_theme}
                  onChange={e => handleChange("main_theme", e.target.value)}
                  placeholder="Bijv. stress, zelfkritiek, balans, rouw..."
                  className="mt-1"
                  maxLength={MAX_SHORT}
                  required
                />
              </div>
              <div>
                <Label>Wat is je doel voor dit traject? *</Label>
                <Textarea
                  value={form.goal}
                  onChange={e => handleChange("goal", e.target.value)}
                  placeholder="Wat zou je graag willen bereiken of veranderen?"
                  className="mt-1 min-h-[80px]"
                  maxLength={MAX_TEXT}
                  required
                />
              </div>
              <div>
                <Label>Wat zijn je verwachtingen?</Label>
                <Textarea
                  value={form.expectations}
                  onChange={e => handleChange("expectations", e.target.value)}
                  placeholder="Heb je specifieke verwachtingen van het traject of de begeleiding?"
                  className="mt-1 min-h-[60px]"
                  maxLength={MAX_TEXT}
                />
              </div>
            </CardContent>
          </Card>

          {/* Uitgebreide vragen */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Achtergrond</CardTitle>
              <CardDescription>Deze informatie helpt ons het traject beter af te stemmen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Eerdere ervaring met mindfulness of meditatie</Label>
                <Textarea
                  value={form.mindfulness_experience}
                  onChange={e => handleChange("mindfulness_experience", e.target.value)}
                  placeholder="Heb je eerder een training, cursus of app gevolgd? Zo ja, wat was je ervaring?"
                  className="mt-1 min-h-[60px]"
                  maxLength={MAX_TEXT}
                />
              </div>
              <div>
                <Label>Gezondheidssituatie</Label>
                <Textarea
                  value={form.health_situation}
                  onChange={e => handleChange("health_situation", e.target.value)}
                  placeholder="Is er iets dat wij moeten weten over je fysieke of mentale gezondheid? (bijv. blessures, medicatie, diagnoses)"
                  className="mt-1 min-h-[60px]"
                  maxLength={MAX_TEXT}
                />
              </div>
              <div>
                <Label>Beschikbaarheid</Label>
                <Input
                  value={form.availability}
                  onChange={e => handleChange("availability", e.target.value)}
                  placeholder="Welke dagen/tijden heb je voorkeur voor sessies?"
                  className="mt-1"
                  maxLength={MAX_SHORT}
                />
              </div>
              <div>
                <Label>Noodcontact</Label>
                <Input
                  value={form.emergency_contact}
                  onChange={e => handleChange("emergency_contact", e.target.value)}
                  placeholder="Naam en telefoonnummer van een noodcontact"
                  className="mt-1"
                  maxLength={MAX_SHORT}
                />
              </div>
            </CardContent>
          </Card>

          {/* Extra */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Overig</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label>Is er nog iets dat je wilt delen?</Label>
                <Textarea
                  value={form.additional_notes}
                  onChange={e => handleChange("additional_notes", e.target.value)}
                  placeholder="Alles wat je verder nog kwijt wilt..."
                  className="mt-1 min-h-[60px]"
                  maxLength={MAX_TEXT}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button type="submit" size="lg" disabled={submitting} className="gap-2 px-8">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              {existingSubmission ? "Bijwerken" : "Versturen"}
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Je gegevens worden vertrouwelijk behandeld en zijn alleen zichtbaar voor je trainer.
          </p>
        </form>
      </div>
    </div>
  );
}
