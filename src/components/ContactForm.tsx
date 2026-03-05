import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send, Check } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Naam is verplicht").max(100, "Naam mag maximaal 100 tekens zijn"),
  email: z.string().trim().email("Ongeldig e-mailadres").max(255, "E-mail mag maximaal 255 tekens zijn"),
  phone: z.string().trim().max(20, "Telefoonnummer mag maximaal 20 tekens zijn").optional(),
  training: z.string().optional(),
  message: z.string().trim().min(1, "Bericht is verplicht").max(2000, "Bericht mag maximaal 2000 tekens zijn"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const trainings = [
  { label: "Algemene vraag", value: "general_question" },
  { label: "Individuele begeleiding", value: "individual_guidance" },
  { label: "8-weekse MSC training", value: "msc_training" },
  { label: "Workshop Zelfcompassie", value: "workshop" },
  { label: "Retreat", value: "retreat" },
];

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    training: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: { ...result.data, honeypot },
      });

      if (error) {
        throw new Error(error.message || "Er is een fout opgetreden");
      }

      setIsSuccess(true);
      toast({
        title: "Bericht verzonden!",
        description: "Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op.",
      });

      // Reset form after success
      setFormData({
        name: "",
        email: "",
        phone: "",
        training: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Er ging iets mis",
        description: error.message || "Probeer het later opnieuw of neem direct contact op.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="h-16 w-16 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-sage-700" />
        </div>
        <h3 className="text-2xl font-light text-foreground mb-4">Bedankt voor je bericht!</h3>
        <p className="text-muted-foreground mb-6">
          We hebben je bericht ontvangen en nemen zo snel mogelijk contact met je op.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSuccess(false)}
          className="border-terracotta-300 text-terracotta-600 hover:bg-terracotta-50 rounded-full"
        >
          Nog een bericht sturen
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Naam *</Label>
          <Input
            id="name"
            placeholder="Je naam"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`rounded-xl ${errors.name ? "border-destructive" : ""}`}
            disabled={isSubmitting}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            placeholder="je@email.nl"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={`rounded-xl ${errors.email ? "border-destructive" : ""}`}
            disabled={isSubmitting}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Telefoon (optioneel)</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+31 6 12345678"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="rounded-xl"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="training">Interesse in</Label>
          <Select
            value={formData.training}
            onValueChange={(value) => handleChange("training", value)}
            disabled={isSubmitting}
          >
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Selecteer een training" />
            </SelectTrigger>
            <SelectContent>
              {trainings.map((training) => (
                <SelectItem key={training} value={training}>
                  {training}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Bericht *</Label>
        <Textarea
          id="message"
          placeholder="Stel je vraag of vertel ons wat je zoekt..."
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className={`min-h-[150px] rounded-xl ${errors.message ? "border-destructive" : ""}`}
          disabled={isSubmitting}
        />
        {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
      </div>

      {/* Honeypot field - hidden from users, catches bots */}
      <div className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10" aria-hidden="true" tabIndex={-1}>
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full py-6"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verzenden...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Verstuur bericht
          </>
        )}
      </Button>
    </form>
  );
}
