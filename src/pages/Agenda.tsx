// src/pages/Agenda.tsx
// Training dates now come from Supabase training_dates table.
// Admin can add/edit/hide dates without touching code.

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Globe, ArrowRight, Sparkles, Sun, Loader2 } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { RegistrationForm } from "@/components/RegistrationForm";
import { format, parseISO } from "date-fns";
import { nl as nlLocale, enUS } from "date-fns/locale";
import { useLanguage } from "@/i18n/LanguageContext";

interface TrainingDate {
  id: string;
  name: string;
  type: string;
  language: string;
  day_label: string | null;
  start_date: string;
  time_start: string | null;
  time_end: string | null;
  follow_up_dates: string | null;
  location: string | null;
  price: number;
  early_bird_price: number | null;
  early_bird_deadline: string | null;
  max_spots: number;
  is_full: boolean;
  is_featured: boolean;
  notes: string | null;
}

interface SelectedTraining {
  name: string;
  date: string;
  time?: string;
  price?: string;
}

function currentPrice(t: TrainingDate): number {
  if (t.early_bird_price && t.early_bird_deadline && new Date(t.early_bird_deadline) > new Date()) {
    return t.early_bird_price;
  }
  return t.price;
}

const Agenda = () => {
  const { t, language } = useLanguage();
  const dateLocale = language === "en" ? enUS : nlLocale;
  const [trainings, setTrainings] = useState<TrainingDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTraining, setSelectedTraining] = useState<SelectedTraining | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    supabase
      .from("training_dates")
      .select("*")
      .eq("is_visible", true)
      .order("start_date", { ascending: true })
      .then(({ data }) => {
        setTrainings((data || []) as TrainingDate[]);
        setLoading(false);
      });
  }, []);

  const openRegistration = (tr: TrainingDate) => {
    const price = currentPrice(tr);
    const isEarlyBird = tr.early_bird_price && tr.early_bird_deadline && new Date(tr.early_bird_deadline) > new Date();
    setSelectedTraining({
      name: tr.name,
      date: format(parseISO(tr.start_date), "d MMMM yyyy", { locale: dateLocale }),
      time: tr.time_start ? `${tr.time_start}${tr.time_end ? ` – ${tr.time_end}` : ""}` : undefined,
      price: price === 0 ? t("agenda.free") : `€${price}${isEarlyBird ? ` (${t("agenda.earlyBird").toLowerCase()})` : ""}`,
    });
    setIsDialogOpen(true);
  };

  const featured = trainings.filter(tr => tr.is_featured && !tr.is_full);
  const mscNL = trainings.filter(tr => tr.type === "msc_8week" && tr.language === "nl");
  const mscEN = trainings.filter(tr => tr.type === "msc_8week" && tr.language === "en");
  const workshops = trainings.filter(tr => tr.type === "workshop");

  return (
    <div className="min-h-screen bg-background">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-light">{t("agenda.dialogTitle")}</DialogTitle>
          </DialogHeader>
          {selectedTraining && (
            <RegistrationForm
              trainingName={selectedTraining.name}
              trainingDate={selectedTraining.date}
              trainingTime={selectedTraining.time}
              price={selectedTraining.price}
              onSuccess={() => setTimeout(() => setIsDialogOpen(false), 2000)}
            />
          )}
        </DialogContent>
      </Dialog>

      <SEO title={t("agenda.seoTitle")} description={t("agenda.seoDesc")} />
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-100/60 via-background to-background" />
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-terracotta-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-sage-200/30 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2.5 text-sm font-medium text-terracotta-700"
            >
              <Calendar className="h-4 w-4" /> {t("agenda.badge")}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]"
            >
              {t("agenda.titleA")}
              <span className="block font-serif italic text-terracotta-600 mt-2">{t("agenda.titleB")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
            >
              {t("agenda.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3 mt-8"
            >
              {[
                { id: "groepstraining", label: t("agenda.filter1") },
                { id: "workshops", label: t("agenda.filter2") },
                { id: "retreat", label: t("agenda.filter3") },
              ].map(b => (
                <Button key={b.id} variant="outline" size="sm"
                  onClick={() => document.getElementById(b.id)?.scrollIntoView({ behavior: "smooth" })}
                  className="rounded-full border-terracotta-300 text-terracotta-600 hover:bg-terracotta-50"
                >
                  {b.label}
                </Button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {loading && (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-terracotta-400" />
        </div>
      )}

      {!loading && (
        <>
          {/* Featured training */}
          {featured.length > 0 && (
            <section className="py-12 lg:py-16 bg-gradient-to-br from-terracotta-50 via-warm-50 to-sage-50">
              <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl">
                  {featured.map(tr => {
                    const price = currentPrice(tr);
                    const isEarly = tr.early_bird_price && tr.early_bird_deadline && new Date(tr.early_bird_deadline) > new Date();
                    return (
                      <motion.div key={tr.id}
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
                        className="relative overflow-hidden rounded-3xl bg-white border-2 border-terracotta-200 shadow-xl"
                      >
                        {isEarly && (
                          <div className="absolute top-4 right-4 z-10">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-terracotta-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                              <Sparkles className="h-4 w-4" /> {t("agenda.earlyBird")} – €{tr.early_bird_price}
                            </span>
                          </div>
                        )}
                        <div className="p-8 md:p-12">
                          <span className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold text-sage-800 mb-4">
                            {t("agenda.newOpen")}
                          </span>
                          <h2 className="text-2xl md:text-3xl font-light text-foreground mb-2 leading-tight">
                            {tr.name}
                            <span className="font-serif italic text-terracotta-600"> — {format(parseISO(tr.start_date), "MMMM yyyy", { locale: dateLocale })}</span>
                          </h2>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-6">
                            <div className="flex items-center gap-2 text-sm text-foreground">
                              <Calendar className="h-4 w-4 text-terracotta-500" />
                              <span>{t("agenda.start")} {format(parseISO(tr.start_date), "d MMM", { locale: dateLocale })}</span>
                            </div>
                            {tr.time_start && (
                              <div className="flex items-center gap-2 text-sm text-foreground">
                                <Clock className="h-4 w-4 text-terracotta-500" />
                                <span>{tr.time_start}{tr.time_end ? `–${tr.time_end}` : ""}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-sm text-foreground">
                              <Globe className="h-4 w-4 text-terracotta-500" />
                              <span>{tr.location || "Online"}</span>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <Button
                              onClick={() => openRegistration(tr)}
                              size="lg"
                              className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-10 py-6 text-base shadow-lg"
                            >
                              {isEarly ? t("agenda.enrollEarly") : t("agenda.enroll")}
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            {isEarly && (
                              <div className="text-sm text-muted-foreground">
                                <p><span className="line-through">€{tr.price}</span> → <span className="font-semibold text-terracotta-600">€{tr.early_bird_price}</span></p>
                                <p>{t("agenda.earlyBirdUntil")} {format(parseISO(tr.early_bird_deadline!), "d MMMM yyyy", { locale: dateLocale })}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Workshops */}
          {workshops.length > 0 && (
            <section id="workshops" className="py-10 lg:py-14 bg-white scroll-mt-20">
              <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl">
                  <div className="text-center mb-8">
                    <span className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold text-sage-800 mb-3">{t("agenda.workshops.tag")}</span>
                    <h2 className="text-2xl font-light text-foreground md:text-3xl leading-tight mb-2">
                      {t("agenda.workshops.titleA")} <span className="font-serif italic text-terracotta-600">{t("agenda.workshops.titleAccent")}</span> {t("agenda.workshops.titleB")}
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                      {t("agenda.workshops.sub")}
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {workshops.map(tr => (
                      <Card key={tr.id} className="border-warm-200 bg-warm-50/50 rounded-2xl overflow-hidden">
                        <CardContent className="p-5 flex items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-base" aria-hidden="true">
                                {tr.language === "nl" ? "🇳🇱" : tr.language === "en" ? "🇬🇧" : tr.language === "tr" ? "🇹🇷" : "🌍"}
                              </span>
                              <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold bg-terracotta-100 text-terracotta-700">
                                {tr.language === "nl" ? "Nederlands" : tr.language === "en" ? "English" : tr.language === "tr" ? "Türkçe" : tr.language}
                              </span>
                              <span className="text-sm font-medium text-foreground">
                                {format(parseISO(tr.start_date), "d MMMM yyyy", { locale: dateLocale })}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-1">
                              {tr.time_start && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{tr.time_start}{tr.time_end ? `–${tr.time_end}` : ""}</span>}
                              <span className="font-semibold text-terracotta-600 text-sm">{tr.price === 0 ? t("agenda.free") : `€${tr.price}`}</span>
                            </div>
                            {tr.price > 0 && (
                              <p className="text-xs text-muted-foreground">
                                {t("agenda.workshops.discount")}
                              </p>
                            )}
                          </div>
                          <Button
                            size="sm"
                            disabled={tr.is_full}
                            onClick={() => openRegistration(tr)}
                            className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full shrink-0 disabled:opacity-50"
                          >
                            {tr.is_full ? t("agenda.full") : t("agenda.enrollShort")}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 8-week MSC */}
          {(mscNL.length > 0 || mscEN.length > 0) && (
            <section id="groepstraining" className="py-20 lg:py-24 bg-warm-50 scroll-mt-20">
              <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                  <div className="text-center mb-12">
                    <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-4">{t("agenda.msc.tag")}</span>
                    <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight mb-4">
                      {t("agenda.msc.title")} <span className="font-serif italic text-terracotta-600">{t("agenda.msc.titleAccent")}</span>
                    </h2>
                  </div>

                  {/* NL */}
                  {mscNL.length > 0 && (
                    <div className="mb-12">
                      <div className="flex items-center gap-3 mb-6">
                        <Globe className="h-5 w-5 text-terracotta-600" />
                        <h3 className="text-xl font-semibold text-foreground">{t("agenda.msc.nlHeader")}</h3>
                      </div>
                      <div className="grid gap-6 md:grid-cols-2">
                        {mscNL.map(tr => {
                          const price = currentPrice(tr);
                          const isEarly = tr.early_bird_price && tr.early_bird_deadline && new Date(tr.early_bird_deadline) > new Date();
                          const isLastSpot = !tr.is_full && tr.notes?.toLowerCase().includes("laatste");
                          return (
                            <Card key={tr.id} className={`border-terracotta-200 rounded-3xl overflow-hidden transition-shadow ${tr.is_full ? "bg-warm-50 opacity-75" : "bg-white hover:shadow-md"}`}>
                              <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                  <p className="font-semibold text-foreground">{tr.day_label}</p>
                                  {tr.is_full && <span className="inline-block rounded-full bg-terracotta-100 px-3 py-1 text-xs font-semibold text-terracotta-700">{t("agenda.full")}</span>}
                                  {isLastSpot && <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 animate-pulse">{t("agenda.lastSpot")}</span>}
                                </div>
                                <div className="space-y-2 text-sm mb-4">
                                  <div className="flex items-start gap-2">
                                    <Calendar className="h-4 w-4 text-terracotta-500 mt-0.5" />
                                    <p className="font-medium text-foreground">{t("agenda.start")}: {format(parseISO(tr.start_date), "d MMMM yyyy", { locale: dateLocale })}</p>
                                  </div>
                                  {tr.time_start && (
                                    <div className="flex items-center gap-2">
                                      <Clock className="h-4 w-4 text-terracotta-500" />
                                      <p className="text-muted-foreground">{tr.time_start}{tr.time_end ? ` – ${tr.time_end}` : ""}</p>
                                    </div>
                                  )}
                                </div>
                                {tr.follow_up_dates && (
                                  <p className="text-xs text-muted-foreground mb-4">{t("agenda.msc.followUp")} {tr.follow_up_dates}</p>
                                )}
                                <div className="flex items-center justify-between pt-4 border-t border-warm-200">
                                  <div>
                                    {isEarly ? (
                                      <>
                                        <p className="text-xs text-muted-foreground line-through">€{tr.price}</p>
                                        <p className="text-lg font-semibold text-terracotta-600">€{tr.early_bird_price}</p>
                                      </>
                                    ) : (
                                      <p className="text-lg font-semibold text-terracotta-600">€{tr.price}</p>
                                    )}
                                  </div>
                                  <Button size="sm" disabled={tr.is_full} onClick={() => openRegistration(tr)}
                                    className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full disabled:opacity-50"
                                  >
                                    {tr.is_full ? t("agenda.full") : t("agenda.reserve")}
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* EN */}
                  {mscEN.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <Globe className="h-5 w-5 text-sage-700" />
                        <h3 className="text-xl font-semibold text-foreground">{t("agenda.msc.enHeader")}</h3>
                      </div>
                      <div className="grid gap-6 md:grid-cols-2">
                        {mscEN.map(tr => (
                          <Card key={tr.id} className={`border-sage-200 rounded-3xl overflow-hidden transition-shadow ${tr.is_full ? "bg-warm-50 opacity-75" : "bg-white hover:shadow-md"}`}>
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <p className="font-semibold text-foreground">{tr.day_label}</p>
                                {tr.is_full && <span className="inline-block rounded-full bg-sage-200 px-3 py-1 text-xs font-semibold text-sage-800">{t("agenda.fullEn")}</span>}
                              </div>
                              <div className="space-y-2 text-sm mb-4">
                                <div className="flex items-start gap-2">
                                  <Calendar className="h-4 w-4 text-sage-600 mt-0.5" />
                                  <p className="font-medium text-foreground">{t("agenda.start")}: {format(parseISO(tr.start_date), "d MMMM yyyy", { locale: dateLocale })}</p>
                                </div>
                                {tr.time_start && (
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-sage-600" />
                                    <p className="text-muted-foreground">{tr.time_start}{tr.time_end ? ` – ${tr.time_end}` : ""}</p>
                                  </div>
                                )}
                              </div>
                              {tr.follow_up_dates && (
                                <p className="text-xs text-muted-foreground mb-4">{t("agenda.msc.followUpEn")} {tr.follow_up_dates}</p>
                              )}
                              <div className="flex items-center justify-between pt-4 border-t border-warm-200">
                                <p className="text-lg font-semibold text-sage-700">€{tr.price}</p>
                                <Button size="sm" disabled={tr.is_full} onClick={() => openRegistration(tr)}
                                  className="bg-sage-600 hover:bg-sage-700 text-white rounded-full disabled:opacity-50"
                                >
                                  {tr.is_full ? t("agenda.fullEn") : t("agenda.reserve")}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Retreat */}
          <section id="retreat" className="py-20 lg:py-24 bg-gradient-to-br from-terracotta-500 to-terracotta-600 relative overflow-hidden scroll-mt-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
            <div className="container relative mx-auto px-4">
              <div className="mx-auto max-w-3xl text-center">
                <span className="inline-flex items-center gap-2 mb-8 rounded-full bg-white/20 px-5 py-2.5 text-sm font-medium text-white">
                  <Sun className="h-4 w-4" /> {t("agenda.retreat.badge")}
                </span>
                <h2 className="mb-6 text-3xl font-light text-white md:text-4xl leading-tight">
                  {t("agenda.retreat.titleA")}
                  <span className="block font-serif italic mt-2">{t("agenda.retreat.titleB")}</span>
                </h2>
                <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20 mb-8">
                  <p className="text-white/90">{t("agenda.retreat.soon")}</p>
                </div>
                <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-terracotta-50 px-10 py-7 text-base rounded-full shadow-lg">
                  <a href="mailto:mindful-mind@outlook.com">
                    {t("agenda.retreat.cta")} <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-light text-foreground md:text-3xl leading-tight">
              {t("agenda.cta.title")}
            </h2>
            <p className="mb-8 text-muted-foreground">{t("agenda.cta.sub")}</p>
            <Button asChild variant="outline" className="border-terracotta-300 text-terracotta-600 hover:bg-terracotta-50 rounded-full px-8">
              <a href="mailto:mindful-mind@outlook.com">{t("agenda.cta.button")} <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Agenda;
