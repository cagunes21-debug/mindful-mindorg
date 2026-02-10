import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, Sparkles, ArrowRight, Check, Mail, Phone, MessageCircle, Clock, Users, Globe, Calendar, Quote, TrendingDown, TrendingUp, Shield, Zap, Mountain, Building2, MapPin, GraduationCap, Award, Send } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { OrganizationSchema } from "@/components/StructuredData";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import heroMindfulness from "@/assets/hero-mindfulness.jpg";

// Programs data removed - now inline in the section below

const stats = [
  { label: "stress", value: "36%", direction: "down" },
  { label: "self-criticism", value: "67%", direction: "down" },
  { label: "resilience", value: "42%", direction: "up" },
  { label: "healthy boundaries", value: "38%", direction: "up" },
  { label: "connection", value: "29%", direction: "up" },
];

const testimonials = [
  {
    quote: "I've become kinder to myself — and that changes everything.",
    author: "Marieke",
  },
  {
    quote: "My body suddenly remembered how to breathe again.",
    author: "Retreat participant",
  },
  {
    quote: "It felt safe. As if my body was finally allowed to lead.",
    author: "Retreat participant",
  },
];

const targetAudience = [
  "You are perfectionistic or hard on yourself",
  "You experience stress or emotions physically",
  "You long for more peace, kindness and zest for life",
  "You are open to an experiential way of learning",
];

const methodPillars = [
  {
    title: "Mind",
    subtitle: "Your thoughts & emotions",
    icon: Brain,
    color: "terracotta",
    items: [
      "Learn to be kinder and gentler with yourself",
      "Develop skills to soften self-criticism and difficult emotions",
    ],
  },
  {
    title: "Body",
    subtitle: "Your body & energy",
    icon: Sparkles,
    color: "sage",
    items: [
      "Become aware of tension and relaxation",
      "Learn to listen to your body's signals",
      "Experience gentle, free and playful movement",
    ],
  },
  {
    title: "Heart",
    subtitle: "Your emotional world",
    icon: Heart,
    color: "warm",
    items: [
      "Reconnect with your emotions",
      "Experience compassion, warmth and zest for life",
      "Develop a deeper connection with yourself and others",
    ],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent />
      <SEO 
        title="Mindful Mind | Come Home to Yourself"
        description="Science-based mindfulness, meditation and self-compassion trainings. Reduce stress, soften self-criticism and find inner peace in 8 weeks."
      />
      <OrganizationSchema />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-32 lg:pb-44 bg-warm-50">
        <div className="absolute inset-0">
          <img 
            src={heroMindfulness} 
            alt="Mindfulness meditation in nature" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-warm-50/90 via-warm-50/80 to-warm-50/95" />
        </div>
        
        <div className="absolute top-20 left-10 w-64 h-64 bg-terracotta-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-sage-200/20 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-block rounded-full bg-terracotta-100/80 px-5 py-2 text-sm font-medium tracking-wide text-terracotta-700">
                Mind · Body · Heart
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl leading-[1.15]"
            >
              Come home
              <span className="block font-serif italic text-terracotta-600 mt-3 text-[1.1em]">to yourself</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-4"
            >
              Science-based mindfulness, meditation, and self-compassion — through trainings, workshops, and coaching.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12 font-medium"
            >
              Soften stress and self-criticism, and meet yourself with more peace.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-10 py-7 text-lg shadow-lg hover:shadow-xl transition-all">
                <a href="#programmas">
                  Reserve Your Spot Today
                  <ArrowRight className="ml-3 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8 py-7 text-lg">
                <Link to="/bedrijven">
                  <Building2 className="mr-2 h-5 w-5" />
                  For Organizations
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <ScrollReveal>
              <h2 className="mb-6 text-2xl font-light text-foreground md:text-3xl lg:text-4xl leading-tight">
                Slow down. Feel. <span className="font-serif italic text-terracotta-600">Relax.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Our gentle, science-based programs reconnect you with your mind, body, and heart.
              </p>
              <p className="text-terracotta-600 font-medium mb-8">
                Human. Grounded. Evidence-based.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all">
                  <a href="#programmas">
                    For Individuals
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8 py-6 text-base">
                  <Link to="/bedrijven">
                    <Building2 className="mr-2 h-5 w-5" />
                    For Organizations
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Offerings Section */}
      <section className="py-16 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-terracotta-100 px-5 py-2 text-xs font-semibold tracking-wider text-terracotta-700 mb-6 uppercase">
                  Our Offerings
                </span>
              </div>
            </ScrollReveal>
            
            <div className="space-y-6">
              <ScrollReveal delay={0.1}>
                <Link to="/" className="group block bg-white hover:bg-terracotta-50 border border-warm-200 hover:border-terracotta-300 rounded-2xl p-6 transition-all shadow-sm hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">🌱</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-foreground mb-2 group-hover:text-terracotta-700 transition-colors">
                        Mindful Self-Compassion (MSC) Training
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        Transform self-criticism into self-compassion and cultivate inner support.
                      </p>
                      <p className="text-sm text-terracotta-600 font-medium">
                        Our flagship program guides you gently along the journey.
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-terracotta-400 group-hover:text-terracotta-600 transition-colors mt-1" />
                  </div>
                </Link>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2}>
                <Link to="/agenda" className="group block bg-white hover:bg-terracotta-50 border border-warm-200 hover:border-terracotta-300 rounded-2xl p-6 transition-all shadow-sm hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">✨</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-foreground mb-2 group-hover:text-terracotta-700 transition-colors">
                        Workshops
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        A gentle way to explore and deepen mindfulness and self-compassion.
                      </p>
                      <p className="text-sm text-terracotta-600 font-medium">
                        Perfect for getting started or extending your practice before committing to a full program.
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-terracotta-400 group-hover:text-terracotta-600 transition-colors mt-1" />
                  </div>
                </Link>
              </ScrollReveal>
              
              <ScrollReveal delay={0.3}>
                <Link to="/coaching" className="group block bg-white hover:bg-terracotta-50 border border-warm-200 hover:border-terracotta-300 rounded-2xl p-6 transition-all shadow-sm hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">🤍</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-foreground mb-2 group-hover:text-terracotta-700 transition-colors">
                        Coaching
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        Guidance tailored to your pace and personal journey.
                      </p>
                      <p className="text-sm text-terracotta-600 font-medium">
                        Receive one-to-one support as you explore your path.
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-terracotta-400 group-hover:text-terracotta-600 transition-colors mt-1" />
                  </div>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="mb-8 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                  Does this sound <span className="font-serif italic text-terracotta-600">familiar?</span>
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <h3 className="text-xl font-semibold text-foreground">
                  Do you often feel tense or hard on yourself?
                </h3>
                <p>
                  Your mind never stops. You want to do things right, you're self-critical, and you keep going — even when your body signals you to slow down.
                </p>
                <p>
                  You long for gentleness, yet the tension remains.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="mt-16">
                <h3 className="text-2xl font-light text-foreground mb-6">
                  You're not <span className="font-serif italic text-terracotta-600">alone</span>
                </h3>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Maybe you've tried many things already: books, courses, advice, techniques.
                  </p>
                  <p>
                    And still, stress, inner unrest, or exhaustion return.
                  </p>
                  <div className="bg-terracotta-50 border-l-4 border-terracotta-400 rounded-r-xl p-6 my-8">
                    <p className="text-foreground font-medium mb-2">
                      The problem isn't that you're doing too little.
                    </p>
                    <p className="text-foreground font-medium">
                      The problem is that you've been too hard on yourself for too long — and over time, mind, body, and heart lose balance.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Method Section - Mind, Body, Heart */}
      <section className="py-24 lg:py-32 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-8">
                <span className="inline-block rounded-full bg-sage-100 px-5 py-2 text-xs font-semibold tracking-wider text-sage-700 mb-6 uppercase">
                  Our Approach
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                  Mind · Body · <span className="font-serif italic text-terracotta-600">Heart</span>
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="text-center mb-16">
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
                  Real change happens when you include all of you: your thoughts, your body, and your emotional world.
                </p>
                <p className="text-muted-foreground text-base max-w-2xl mx-auto">
                  Our programs combine:
                </p>
                <ul className="text-muted-foreground text-base max-w-lg mx-auto mt-4 space-y-1">
                  <li>• Mindful Self-Compassion (MSC)</li>
                  <li>• Mindfulness and meditation</li>
                  <li>• Body awareness and gentle movement</li>
                </ul>
                <p className="text-foreground text-lg mt-6 font-medium">
                  Together, they invite you to slow down, soften, and come home to yourself with more peace.
                </p>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-8 md:grid-cols-3">
              {methodPillars.map((pillar, index) => (
                <StaggerItem key={index}>
                  <Card className="h-full bg-white border-warm-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-8">
                      <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 ${
                        pillar.color === 'terracotta' ? 'bg-terracotta-100' : 
                        pillar.color === 'sage' ? 'bg-sage-100' : 'bg-warm-200'
                      }`}>
                        <pillar.icon className={`h-8 w-8 ${
                          pillar.color === 'terracotta' ? 'text-terracotta-600' : 
                          pillar.color === 'sage' ? 'text-sage-600' : 'text-warm-700'
                        }`} />
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground mb-2">{pillar.title}</h3>
                      <p className="text-terracotta-600 text-sm font-medium mb-6">{pillar.subtitle}</p>
                      <ul className="space-y-3 text-muted-foreground text-sm">
                        {pillar.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className={`h-4 w-4 mt-0.5 shrink-0 ${
                              pillar.color === 'terracotta' ? 'text-terracotta-500' : 
                              pillar.color === 'sage' ? 'text-sage-500' : 'text-warm-600'
                            }`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <ScrollReveal delay={0.3}>
              <div className="text-center mt-12">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-10 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                    <a href="#programmas">
                      Reserve Your Spot Today
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8 py-6 text-lg">
                    <Link to="/bedrijven">
                      <Building2 className="mr-2 h-5 w-5" />
                      For Organizations
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-terracotta-600 to-terracotta-700">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-white/10 px-5 py-2 text-xs font-semibold tracking-wider text-white/90 mb-6 uppercase">
                  Science-Based
                </span>
                <p className="text-white/80 text-base max-w-3xl mx-auto mb-6">
                  Mindful Self-Compassion was developed by Dr. Kristin Neff and Dr. Christopher Germer and is supported by more than 3,500 scientific studies.
                </p>
                <p className="text-white font-medium mb-8">
                  Average results from MSC research show:
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {stats.map((stat, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <span className="text-sm text-white/70">{stat.direction === 'down' ? '↓' : '↑'}</span>
                      <span className="text-3xl md:text-4xl font-light text-white">{stat.value}</span>
                    </div>
                    <p className="text-sm text-white/80">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programmas" className="py-24 lg:py-32 bg-warm-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="text-center mb-8">
                <span className="inline-block rounded-full bg-terracotta-100 px-5 py-2 text-xs font-semibold tracking-wider text-terracotta-700 mb-6 uppercase">
                  Our Offerings
                </span>
                <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                  Programs & <span className="font-serif italic text-terracotta-600">Coaching</span>
                </h2>
                <p className="text-terracotta-600 font-medium mb-4">
                  For individuals and organizations
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <p className="text-muted-foreground text-base mb-4">
                  Our programs help you release tension, find inner peace and reconnect with your mind, body and heart — both personally and within teams and departments.
                </p>
                <p className="text-muted-foreground text-base mb-4">
                  We offer:
                </p>
                <ul className="text-muted-foreground text-base space-y-1 mb-6">
                  <li><strong>Individual programs:</strong> 8-week Mindful Self-Compassion Training, workshops, retreats and 1-on-1 coaching</li>
                  <li><strong>Organizations:</strong> trainings and workshops for teams, departments and leaders, online or on-site</li>
                </ul>
                <Button asChild variant="link" className="text-terracotta-600 hover:text-terracotta-700">
                  <Link to="/bedrijven">
                    👉 Read more about working with organizations
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
            
            <div className="grid gap-8 md:grid-cols-2">
              {/* Main product: 8-weekse MSC Training */}
              <ScrollReveal delay={0.1}>
                <Card className="h-full ring-2 ring-terracotta-300 bg-gradient-to-br from-white to-terracotta-50 border-warm-200 shadow-sm hover:shadow-lg transition-all">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="h-14 w-14 rounded-2xl bg-terracotta-500 flex items-center justify-center shrink-0">
                        <span className="text-2xl">🌱</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">8-weekse Mindful Zelfcompassie-training</h3>
                        <p className="text-terracotta-600 text-sm font-medium">8 sessies van 2 uur · online · inclusief stilte-retreat</p>
                      </div>
                    </div>
                    <p className="text-foreground font-medium text-sm mb-4">
                      Een verdiepend programma waarin je stap voor stap zelfcompassie ontwikkelt en leert integreren in je dagelijks leven.
                    </p>
                    <div className="flex items-center mb-6">
                      <span className="text-2xl font-light text-terracotta-600">€ 550</span>
                    </div>
                    <div className="mt-auto flex flex-col gap-2">
                      <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full">
                        <Link to="/">
                          <Send className="mr-2 h-4 w-4" />
                          Schrijf je in
                        </Link>
                      </Button>
                      <Button asChild variant="ghost" className="text-terracotta-600 hover:text-terracotta-700 hover:bg-terracotta-50">
                        <Link to="/">
                          Meer informatie
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Right column: Workshops + Weekly Sessions stacked */}
              <div className="flex flex-col gap-6">
                <ScrollReveal delay={0.15}>
                  <Card className="bg-white border-warm-200 shadow-sm hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl">🧘</span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Wekelijkse sessies mindfulness & zelfcompassie</h3>
                          <p className="text-terracotta-600 text-xs font-medium">1 uur per sessie · online</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">
                        Korte, regelmatige sessies om mindfulness en zelfcompassie dagelijks te oefenen en te verankeren.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-light text-terracotta-600">€ 15 <span className="text-sm text-muted-foreground">per sessie</span></span>
                        <Button asChild size="sm" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full">
                          <Link to="/agenda">
                            <Send className="mr-1.5 h-3.5 w-3.5" />
                            Aanmelden
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <Card className="bg-white border-warm-200 shadow-sm hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl">✨</span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Workshop Zelfcompassie</h3>
                          <p className="text-terracotta-600 text-xs font-medium">1 online sessie van 1 uur · geen voorkennis nodig</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">
                        Maak op een laagdrempelige en interactieve manier kennis met de basis van zelfcompassie.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-light text-terracotta-600">€ 35</span>
                        <Button asChild size="sm" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full">
                          <Link to="/agenda">
                            <Send className="mr-1.5 h-3.5 w-3.5" />
                            Aanmelden
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>

              {/* Individuele begeleiding - full width */}
              <ScrollReveal delay={0.25} className="md:col-span-2">
                <Card className="bg-white border-warm-200 shadow-sm hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-2xl">🤍</span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Individuele begeleiding</h3>
                          <p className="text-terracotta-600 text-xs font-medium">Individueel · op maat · online of op locatie</p>
                          <p className="text-muted-foreground text-sm mt-2">
                            Persoonlijke begeleiding, afgestemd op jouw situatie, tempo en behoeften.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 md:shrink-0">
                        <span className="text-lg font-light text-terracotta-600">€ 75 <span className="text-sm text-muted-foreground">per sessie</span></span>
                        <Button asChild size="sm" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full">
                          <Link to="/coaching">
                            <Send className="mr-1.5 h-3.5 w-3.5" />
                            Aanmelden
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>

            {/* For Organizations Card */}
            <ScrollReveal delay={0.3}>
              <Card className="mt-8 bg-gradient-to-br from-sage-50 to-warm-50 border-sage-200">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-sage-100 flex items-center justify-center shrink-0">
                      <span className="text-2xl">🏢</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">For Organizations</h3>
                      <p className="text-sage-700 text-sm font-medium mb-4">Teams, departments & leaders</p>
                      <p className="text-muted-foreground mb-4">
                        Invest in wellbeing, resilience and connection within your team.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-sage-500 mt-0.5 shrink-0" />
                          Science-based trainings
                        </li>
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-sage-500 mt-0.5 shrink-0" />
                          Mindful Self-Compassion & mindfulness for professional contexts
                        </li>
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-sage-500 mt-0.5 shrink-0" />
                          Online or on-site
                        </li>
                      </ul>
                      <Button asChild className="bg-sage-600 hover:bg-sage-700 text-white rounded-full">
                        <Link to="/bedrijven">
                          👉 Read more about working with organizations
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Who is this <span className="font-serif italic text-terracotta-600">for?</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  These programs are right for you if:
                </p>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {targetAudience.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-warm-50 rounded-xl p-5 shadow-sm border border-warm-200">
                    <Check className="h-5 w-5 text-terracotta-500 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 lg:py-32 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="inline-block rounded-full bg-sage-100 px-5 py-2 text-xs font-semibold tracking-wider text-sage-700 mb-6 uppercase">
                  Experiences
                </span>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <StaggerItem key={index}>
                  <Card className="h-full bg-white border-warm-200">
                    <CardContent className="p-8">
                      <Quote className="h-8 w-8 text-terracotta-300 mb-4" />
                      <blockquote className="text-foreground text-lg leading-relaxed mb-6 italic">
                        "{testimonial.quote}"
                      </blockquote>
                      <footer className="text-sm font-medium text-terracotta-600">
                        — {testimonial.author}
                      </footer>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
            
            <ScrollReveal delay={0.2}>
              <div className="text-center mt-8">
                <p className="text-muted-foreground mb-6">
                  More than 250 participants have completed our MSC training and experience less stress and more inner peace.
                </p>
                <Button asChild variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full">
                  <Link to="/trainers">
                    👉 Read more experiences
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <span className="inline-block rounded-full bg-terracotta-100 px-5 py-2 text-xs font-semibold tracking-wider text-terracotta-700 mb-6 uppercase">
                Practical & Contact
              </span>
              <p className="text-muted-foreground text-lg mb-8">
                Workshops · Trainings · Retreats · 1-on-1 Coaching
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <a 
                  href="mailto:mindful-mind@outlook.com" 
                  className="flex items-center gap-2 bg-warm-50 rounded-full px-6 py-3 text-muted-foreground hover:text-terracotta-600 transition-colors shadow-sm border border-warm-200"
                >
                  <Mail className="h-4 w-4" />
                  mindful-mind@outlook.com
                </a>
                <a 
                  href="https://wa.me/31625633379" 
                  className="flex items-center gap-2 bg-warm-50 rounded-full px-6 py-3 text-muted-foreground hover:text-terracotta-600 transition-colors shadow-sm border border-warm-200"
                >
                  <MessageCircle className="h-4 w-4" />
                  +31 6 25633379 (WhatsApp)
                </a>
              </div>

              <p className="text-muted-foreground text-sm mb-8">
                Office hours: Mon–Fri, 9:00 AM–5:00 PM
              </p>
              
              <Button asChild variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full">
                <Link to="/agenda">
                  👉 View full schedule
                  <Calendar className="ml-2 h-4 w-4" />
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

export default Index;
