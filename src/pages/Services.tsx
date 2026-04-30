import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowRight, Compass, Users, Sparkles, Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { useLanguage } from "@/i18n/LanguageContext";

const Services = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <SEO title={t("services.seoTitle")} description={t("services.seoDesc")} />
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-sage-100/60 via-background to-background" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-terracotta-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-sage-200/30 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 rounded-full bg-sage-100 border border-sage-200 px-5 py-2.5 text-sm font-medium text-sage-800"
            >
              <Compass className="h-4 w-4" />
              {t("services.badge")}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]"
            >
              {t("services.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-8"
            >
              {t("services.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <a href="#groepstraject" className="inline-flex items-center gap-2 rounded-full bg-card border border-border/50 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-primary/5 transition-colors">
                <Users className="h-4 w-4 text-primary" />
                {t("services.chip1")}
              </a>
              <a href="#individueel" className="inline-flex items-center gap-2 rounded-full bg-card border border-border/50 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-primary/5 transition-colors">
                <Heart className="h-4 w-4 text-primary" />
                {t("services.chip2")}
              </a>
              <a href="#losse-sessies" className="inline-flex items-center gap-2 rounded-full bg-card border border-border/50 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-primary/5 transition-colors">
                <Sparkles className="h-4 w-4 text-primary" />
                {t("services.chip3")}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 1. Groepstraject */}
      <section id="groepstraject" className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <ScrollReveal animation="fade-right">
                <div>
                  <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-6">
                    {t("services.group.tag")}
                  </span>
                  <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                    🌿 {t("services.group.title")} <span className="font-serif italic text-terracotta-600">{t("services.group.titleAccent")}</span>
                  </h2>
                  <p className="text-terracotta-600 font-medium mb-6">{t("services.group.lead")}</p>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">{t("services.group.desc")}</p>

                  <h4 className="font-medium text-foreground mb-4">{t("services.group.whatYouGet")}</h4>
                  <ul className="space-y-3 mb-8">
                    {[t("services.group.f1"), t("services.group.f2"), t("services.group.f3"), t("services.group.f4")].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-foreground">
                        <Check className="h-4 w-4 text-terracotta-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                    <Link to="/msc-training">
                      {t("services.group.cta")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-left" delay={0.2}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-terracotta-100 to-sage-100 rounded-3xl transform rotate-3" />
                  <Card className="relative border-0 bg-white rounded-3xl shadow-lg overflow-hidden">
                    <CardContent className="p-8 flex flex-col items-center text-center">
                      <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-terracotta-100 to-terracotta-200 flex items-center justify-center mb-6">
                        <Users className="h-10 w-10 text-terracotta-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">{t("services.group.cardTitle")}</h3>
                      <p className="text-muted-foreground mb-4">{t("services.group.cardSub")}</p>
                      <p className="text-3xl font-light text-terracotta-600">€550</p>
                      <p className="text-sm text-muted-foreground mt-2">{t("services.group.cardNote")}</p>
                    </CardContent>
                  </Card>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Individueel Traject */}
      <section id="individueel" className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <ScrollReveal animation="fade-right" className="order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-sage-100 to-warm-100 rounded-3xl transform -rotate-3" />
                  <Card className="relative border-0 bg-white rounded-3xl shadow-lg overflow-hidden">
                    <CardContent className="p-8 flex flex-col items-center text-center">
                      <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-warm-100 to-warm-200 flex items-center justify-center mb-6">
                        <Heart className="h-10 w-10 text-terracotta-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">{t("services.individual.cardTitle")}</h3>
                      <p className="text-muted-foreground mb-4">{t("services.individual.cardSub")}</p>
                      <div className="inline-block rounded-full bg-terracotta-100 px-3 py-1 text-xs font-semibold text-terracotta-700 mb-3">
                        {t("services.individual.cardBadge")}
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <p className="text-xl font-light text-muted-foreground line-through">€650</p>
                        <p className="text-3xl font-light text-terracotta-600">€550</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-left" delay={0.2} className="order-1 lg:order-2">
                <div>
                  <span className="inline-block rounded-full bg-sage-200 px-4 py-1.5 text-xs font-semibold text-sage-800 mb-6">
                    {t("services.individual.tag")}
                  </span>
                  <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                    🌿 {t("services.individual.title")} <span className="font-serif italic text-terracotta-600">{t("services.individual.titleAccent")}</span>
                  </h2>
                  <p className="text-terracotta-600 font-medium mb-6">{t("services.individual.lead")}</p>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">{t("services.individual.desc")}</p>

                  <h4 className="font-medium text-foreground mb-4">{t("services.individual.whatYouGet")}</h4>
                  <ul className="space-y-3 mb-8">
                    {[t("services.individual.f1"), t("services.individual.f2"), t("services.individual.f3"), t("services.individual.f4"), t("services.individual.f5")].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-foreground">
                        <Check className="h-4 w-4 text-sage-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                    <Link to="/contact">
                      {t("services.individual.cta")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Individuele Sessie (los) */}
      <section id="losse-sessies" className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-6">
                  {t("services.single.tag")}
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  🌿 {t("services.single.title")} <span className="font-serif italic text-terracotta-600">{t("services.single.titleAccent")}</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                  {t("services.single.lead")}
                </p>
              </div>
            </ScrollReveal>

            <div className="max-w-md mx-auto">
              <ScrollReveal animation="fade-up">
                <Card className="border-warm-200 bg-warm-50 rounded-2xl overflow-hidden">
                  <CardContent className="p-8">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center mb-5">
                      <Heart className="h-6 w-6 text-sage-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{t("services.single.cardTitle")}</h3>
                    <p className="text-xs text-muted-foreground mb-4 font-medium">{t("services.single.cardSub")}</p>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {t("services.single.desc")}
                    </p>
                    <div className="pt-4 border-t border-warm-200">
                      <p className="text-sm text-muted-foreground">{t("services.single.duration")}</p>
                      <p className="text-2xl font-light text-terracotta-600 mt-1">€110</p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.3}>
              <div className="text-center mt-10">
                <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                  <Link to="/contact">
                    {t("services.single.cta")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Welke vorm past bij jou? */}
      <section className="py-24 lg:py-28 bg-gradient-to-b from-warm-50 to-sage-100">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <h2 className="mb-10 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                {t("services.choose.title")} <span className="font-serif italic text-terracotta-600">{t("services.choose.titleAccent")}</span>
              </h2>

              <div className="space-y-4 text-left max-w-lg mx-auto mb-12">
                {[
                  { q: t("services.choose.o1Q"), a: t("services.choose.o1A") },
                  { q: t("services.choose.o2Q"), a: t("services.choose.o2A") },
                  { q: t("services.choose.o3Q"), a: t("services.choose.o3A") },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/80 border border-warm-200">
                    <span className="text-lg mt-0.5">→</span>
                    <p className="text-foreground">
                      <strong>{item.q}</strong><br />
                      <span className="text-muted-foreground">{item.a}</span>
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-muted-foreground text-lg mb-8">
                {t("services.choose.footer")}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white px-10 py-7 text-base rounded-full shadow-lg">
                <Link to="/contact">
                  {t("services.choose.cta")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
