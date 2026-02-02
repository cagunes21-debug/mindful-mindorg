import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";

export default function BetalingSucces() {
  const [searchParams] = useSearchParams();
  const registrationId = searchParams.get("registration_id");

  useEffect(() => {
    // Update payment status if we have a registration ID
    const updatePaymentStatus = async () => {
      if (registrationId) {
        await supabase
          .from("registrations")
          .update({ 
            payment_status: "paid",
            paid_at: new Date().toISOString(),
          })
          .eq("id", registrationId);
      }
    };

    updatePaymentStatus();
  }, [registrationId]);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Betaling Succesvol"
        description="Je betaling is succesvol verwerkt. Welkom bij Mindful Mind!"
      />
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-sage-200 bg-gradient-to-br from-sage-50 to-white rounded-3xl overflow-hidden">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sage-100 mb-6">
                    <CheckCircle2 className="h-10 w-10 text-sage-600" />
                  </div>
                  
                  <h1 className="text-3xl font-light text-foreground mb-4">
                    Betaling <span className="font-serif italic text-sage-600">Succesvol</span>
                  </h1>
                  
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    Bedankt voor je betaling! Je inschrijving is nu definitief bevestigd. 
                    We kijken ernaar uit om je te verwelkomen bij de training.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 mb-8 border border-sage-100">
                  <div className="flex items-center gap-3 text-left">
                    <Mail className="h-5 w-5 text-terracotta-500 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Je ontvangt binnenkort een bevestigingsmail met alle praktische informatie 
                      over de training.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                    <Link to="/">
                      Terug naar home
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <p className="text-sm text-muted-foreground">
                    Vragen? Mail ons op{" "}
                    <a href="mailto:mindful-mind@outlook.com" className="text-terracotta-600 hover:underline">
                      mindful-mind@outlook.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
