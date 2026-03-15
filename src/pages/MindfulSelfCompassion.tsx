import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import heroMindfulness from "@/assets/hero-mindfulness.jpg";
import caglaPhoto from "@/assets/cagla-bio.png";

const MindfulSelfCompassion = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent />
      <SEO
        title="Mindful Self-Compassion"
        description="Leer met dezelfde vriendelijkheid op moeilijkheden te reageren als die je aan een goede vriend zou bieden. Mindful Self-Compassion sessies en workshops met Çağla Güneş en haar team."
        canonical="https://mindfulmind.nl/mindful-self-compassion"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-32 lg:pb-44 bg-warm-50">
        <div className="absolute inset-0">
          <img
            src={heroMindfulness}
            alt="Mindful Self-Compassion"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-warm-50/90 via-warm-50/80 to-warm-50/95" />
        </div>

        <div className="absolute top-20 left-10 w-64 h-64 bg-rose-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-lavender-200/20 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="inline-flex items-center gap-2 mb-8 rounded-full bg-warm-100 border border-warm-200 px-6 py-3.5 text-sm font-medium text-terracotta-700 shadow-sm"
            >
              <Sparkles className="h-4 w-4" />
              Mindful Self-Compassion
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl leading-[1.15]"
            >
              Een zachtere manier
              <span className="block font-serif italic text-terracotta-600 mt-3 text-[1.1em]">
                om jezelf te ontmoeten
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
            >
              Leren om op moeilijke momenten te reageren met dezelfde vriendelijkheid die je aan een goede vriend zou bieden. Mindful Self-Compassion sessies en workshops met Çağla Güneş en haar team.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-10 py-7 text-lg shadow-lg hover:shadow-xl transition-all"
              >
                <a href="#de-praktijk">
                  Ontdek meer
                  <ArrowRight className="ml-3 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* De Praktijk Section */}
      <section id="de-praktijk" className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute left-1/2 top-0 w-px h-20 bg-gradient-to-b from-transparent to-terracotta-200" />

        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="inline-block rounded-full bg-sage-100 px-5 py-2 text-xs font-semibold tracking-wider text-sage-700 mb-8 uppercase">
                  De praktijk
                </span>
                <h2 className="mb-10 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                  Wat als de stem van binnen{" "}
                  <span className="font-serif italic text-terracotta-600">
                    vriendelijker kon zijn?
                  </span>
                </h2>
              </div>

              <div className="space-y-6 text-muted-foreground text-lg lg:text-xl leading-relaxed">
                <p>
                  De meesten van ons hebben geleerd om door te duwen bij tegenslag — streng te zijn voor onszelf als we worstelen, ons eigen pijn te behandelen als iets dat overwonnen moet worden in plaats van iets om bij stil te staan. We bieden geduld aan anderen, maar keren diezelfde warmte zelden naar binnen.
                </p>
                <p>
                  Mindful Self-Compassion is een praktijk die deze relatie verandert. Niet door te repareren wat gebroken is, maar door te erkennen dat de worsteling zelf tederheid verdient. Het brengt mindfulness samen — het vermogen om aanwezig te zijn bij wat is — en compassie — de bereidheid om met zorg te reageren op lijden.
                </p>
                <p>
                  Het is geen filosofie. Het is iets wat je kunt leren, oefenen en in je lichaam voelen. En na verloop van tijd verandert het stilletjes hoe je je verhoudt tot jezelf, tot moeilijkheden en tot het leven.
                </p>
              </div>

              {/* Decorative divider with quote */}
              <div className="my-16 text-center">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px w-16 bg-terracotta-200" />
                  <span className="text-terracotta-400 text-2xl">✦</span>
                  <div className="h-px w-16 bg-terracotta-200" />
                </div>
                <blockquote className="text-xl lg:text-2xl font-light text-foreground leading-relaxed italic max-w-2xl mx-auto">
                  "Wanneer we onszelf compassie geven, proberen we de pijn niet weg te nemen. We veranderen onze relatie ertoe."
                </blockquote>
                <div className="flex items-center justify-center gap-4 mt-8">
                  <div className="h-px w-16 bg-terracotta-200" />
                  <span className="text-terracotta-400 text-2xl">✦</span>
                  <div className="h-px w-16 bg-terracotta-200" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Three Qualities Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-warm-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-rose-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-lavender-100/30 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-6">
                <span className="inline-block rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2 text-xs font-semibold tracking-wider text-terracotta-700 mb-6 uppercase">
                  Mindful Self-Compassion
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                  Drie kwaliteiten,{" "}
                  <span className="font-serif italic text-terracotta-600">
                    één praktijk
                  </span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed mb-16">
                  Mindful Self-Compassion, ontwikkeld door Kristin Neff en Christopher Germer, rust op drie met elkaar verbonden kwaliteiten. Samen vormen ze een manier van zijn met jezelf die zowel gegrond als zacht is — vooral in de momenten dat het leven het moeilijkst is.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              <ScrollReveal delay={0}>
                <div className="bg-white rounded-2xl p-8 lg:p-10 border border-warm-200 shadow-sm h-full text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage-100 mb-6">
                    <Sparkles className="h-7 w-7 text-sage-600" />
                  </div>
                  <h3 className="text-xl font-medium text-foreground mb-4">
                    Mindfulness
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Aanwezig zijn bij wat er is, zonder je te vereenzelvigen met de pijn of het weg te duwen.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="bg-white rounded-2xl p-8 lg:p-10 border border-warm-200 shadow-sm h-full text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terracotta-100 mb-6">
                    <Users className="h-7 w-7 text-terracotta-600" />
                  </div>
                  <h3 className="text-xl font-medium text-foreground mb-4">
                    Gedeelde menselijkheid
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Erkennen dat lijden deel uitmaakt van de gedeelde menselijke ervaring — je bent hier niet alleen in.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="bg-white rounded-2xl p-8 lg:p-10 border border-warm-200 shadow-sm h-full text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-6">
                    <Heart className="h-7 w-7 text-rose-500" />
                  </div>
                  <h3 className="text-xl font-medium text-foreground mb-4">
                    Zelfvriendelijkheid
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Reageren op jezelf met warmte en begrip, in plaats van met oordeel.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* CTA */}
            <ScrollReveal delay={0.3}>
              <div className="text-center mt-16">
                <Button
                  asChild
                  className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8 py-6 text-base shadow-md"
                >
                  <Link to="/msc-training">
                    Bekijk de MSC Training
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <p className="mt-4 text-sm text-muted-foreground">
                  Of bekijk onze{" "}
                  <Link
                    to="/coaching"
                    className="text-terracotta-600 hover:text-terracotta-700 underline underline-offset-2"
                  >
                    individuele begeleiding
                  </Link>
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MindfulSelfCompassion;
