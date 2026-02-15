import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send, Check, Calendar } from "lucide-react";
import { z } from "zod";

const registrationSchema = z.object({
  name: z.string().trim().min(1, "Naam is verplicht").max(100, "Naam mag maximaal 100 tekens zijn"),
  email: z.string().trim().email("Ongeldig e-mailadres").max(255, "E-mail mag maximaal 255 tekens zijn"),
  phone: z.string().trim().max(20, "Telefoonnummer mag maximaal 20 tekens zijn").optional(),
  remarks: z.string().trim().max(1000, "Opmerkingen mogen maximaal 1000 tekens zijn").optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface RegistrationFormProps {
  trainingName: string;
  trainingDate: string;
  trainingTime?: string;
  price?: string;
  onSuccess?: () => void;
}

export function RegistrationForm({ 
  trainingName, 
  trainingDate, 
  trainingTime,
  price,
  onSuccess 
}: RegistrationFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: "",
    email: "",
    phone: "",
    remarks: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({});

  const handleChange = (field: keyof RegistrationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = registrationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof RegistrationFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof RegistrationFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Save registration directly to the database
      const { error } = await supabase
        .from("registrations")
        .insert({
          name: result.data.name.trim(),
          email: result.data.email.trim().toLowerCase(),
          phone: result.data.phone?.trim() || null,
          training_name: trainingName,
          training_date: trainingDate || null,
          training_time: trainingTime || null,
          price: price || null,
          remarks: result.data.remarks?.trim() || null,
          status: "pending",
        });

      if (error) {
        throw new Error(error.message || "Er is een fout opgetreden");
      }

      setIsSuccess(true);
      toast({
        title: "Aanmelding verzonden!",
        description: "Bedankt voor je aanmelding. Je ontvangt een bevestiging per e-mail.",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Error submitting registration:", error);
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
      <div className="text-center py-8">
        <div className="h-16 w-16 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-sage-700" />
        </div>
        <h3 className="text-xl font-light text-foreground mb-2">Aanmelding ontvangen!</h3>
        <p className="text-muted-foreground mb-4">
          Je ontvangt een bevestiging per e-mail.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Training info banner */}
      <div className="bg-warm-50 rounded-xl p-4 border border-warm-200">
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-terracotta-600 mt-0.5" />
          <div>
            <p className="font-medium text-foreground">{trainingName}</p>
            <p className="text-sm text-muted-foreground">
              {trainingDate}{trainingTime ? ` • ${trainingTime}` : ''}
            </p>
            {price && <p className="text-sm font-medium text-terracotta-600 mt-1">{price}</p>}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-name">Naam *</Label>
        <Input
          id="reg-name"
          placeholder="Je volledige naam"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className={`rounded-xl ${errors.name ? "border-destructive" : ""}`}
          disabled={isSubmitting}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-email">E-mail *</Label>
        <Input
          id="reg-email"
          type="email"
          placeholder="je@email.nl"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={`rounded-xl ${errors.email ? "border-destructive" : ""}`}
          disabled={isSubmitting}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-phone">Telefoon (optioneel)</Label>
        <Input
          id="reg-phone"
          type="tel"
          placeholder="+31 6 12345678"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="rounded-xl"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-remarks">Opmerkingen of vragen (optioneel)</Label>
        <Textarea
          id="reg-remarks"
          placeholder="Heb je nog vragen of wil je iets delen?"
          value={formData.remarks}
          onChange={(e) => handleChange("remarks", e.target.value)}
          className="min-h-[80px] rounded-xl"
          disabled={isSubmitting}
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
            Aanmelding verzenden...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Verstuur aanmelding
          </>
        )}
      </Button>
      
      <p className="text-xs text-center text-muted-foreground">
        Na aanmelding ontvang je een bevestiging met meer informatie.
      </p>
    </form>
  );
}
