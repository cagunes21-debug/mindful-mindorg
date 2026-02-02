import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { XCircle, ArrowRight, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

export default function BetalingGeannuleerd() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Betaling Geannuleerd"
        description="Je betaling is geannuleerd. Je kunt de betaling later alsnog voltooien."
      />
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-warm-200 bg-gradient-to-br from-warm-50 to-white rounded-3xl overflow-hidden">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-warm-100 mb-6">
                    <XCircle className="h-10 w-10 text-warm-600" />
                  </div>
                  
                  <h1 className="text-3xl font-light text-foreground mb-4">
                    Betaling <span className="font-serif italic text-warm-600">Geannuleerd</span>
                  </h1>
                  
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    Je betaling is niet voltooid. Geen zorgen — je aanmelding blijft bewaard 
                    en je kunt de betaling op een later moment alsnog voltooien via de link 
                    in je e-mail.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 mb-8 border border-warm-100">
                  <div className="flex items-center gap-3 text-left">
                    <Mail className="h-5 w-5 text-terracotta-500 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Check je inbox voor de betaallink die we je eerder hebben gestuurd. 
                      Deze blijft geldig totdat de training vol is.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                    <Link to="/agenda">
                      Bekijk alle trainingen
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <p className="text-sm text-muted-foreground">
                    Vragen of problemen met betalen? Mail ons op{" "}
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
