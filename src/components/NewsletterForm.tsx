import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface NewsletterFormProps {
  variant?: "inline" | "card";
}

const NewsletterForm = ({ variant = "inline" }: NewsletterFormProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: trimmed });

      if (error) {
        if (error.code === "23505") {
          toast.info("Je bent al ingeschreven voor onze nieuwsbrief!");
        } else {
          throw error;
        }
      } else {
        setIsSubscribed(true);
        toast.success("Bedankt voor je inschrijving!");
      }
      setEmail("");
    } catch {
      toast.error("Er ging iets mis. Probeer het later opnieuw.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="flex items-center gap-2 text-sage-700">
        <CheckCircle className="h-5 w-5" />
        <span className="text-sm font-medium">Je bent ingeschreven!</span>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className="rounded-3xl bg-sage-50 border border-sage-200 p-8 text-center">
        <div className="h-12 w-12 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-4">
          <Mail className="h-6 w-6 text-sage-700" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Blijf op de hoogte</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
          Ontvang maandelijks tips over mindfulness, zelfcompassie en nieuwe artikelen direct in je inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Je e-mailadres"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-full bg-white border-sage-200 flex-1"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-terracotta-600 hover:bg-terracotta-700 text-white"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Inschrijven"}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-3">
          Geen spam, je kunt je altijd uitschrijven.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="email"
        placeholder="Je e-mailadres"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="rounded-full bg-white border-warm-200 text-sm h-9 flex-1"
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        size="sm"
        className="rounded-full bg-terracotta-600 hover:bg-terracotta-700 text-white h-9 px-4"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
      </Button>
    </form>
  );
};

export default NewsletterForm;
