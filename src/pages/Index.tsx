import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, ArrowRight, Check, Calendar, Leaf, Sun, Sparkles, MessageSquareQuote, Mountain } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { OrganizationSchema, FAQSchema, WebsiteSchema } from "@/components/StructuredData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const offerings = [
  {
    title: "Mindful Self-Compassion (MSC)",
    subtitle: "8-week training",
    description: "Learn to support yourself instead of pushing yourself. Mindful Self-Compassion (MSC) is a scientifically validated program developed by Dr. Kristin Neff and Dr. Christopher Germer.",
    benefits: [
      "Work skillfully with self-criticism",
      "Build emotional resilience",
      "Respond to difficulty with kindness",
      "Create a supportive inner relationship",
    ],
    ideal: "Ideal if you are caring, responsible, and often hard on yourself.",
    link: "/msc-training",
    linkText: "Learn more about MSC",
    icon: Leaf,
    color: "sage",
  },
  {
    title: "Mindfulness-Based Stress Reduction (MBSR)",
    subtitle: "8-week training",
    description: "Mindfulness-Based Stress Reduction (MBSR), developed by Jon Kabat-Zinn, is one of the most widely researched mindfulness programs worldwide.",
    benefits: [
      "Reduce stress and overwhelm",
      "Increase focus and mental clarity",
      "Respond instead of react",
      "Develop a sustainable mindfulness practice",
    ],
    ideal: "Especially suitable if stress, tension, or mental overload are central in your life.",
    link: "/intensief",
    linkText: "Learn more about MBSR",
    icon: Leaf,
    color: "sage",
  },
  {
    title: "Workshops",
    subtitle: "Short, accessible sessions",
    description: "Our workshops offer a gentle introduction or deepening of mindfulness and self-compassion themes in a shorter format — ranging from a few hours to a full day.",
    benefits: [
      "Working with stress and overwhelm",
      "Self-compassion in daily life",
      "Dealing with self-criticism",
      "Mindfulness at work",
      "Emotional resilience and balance",
    ],
    ideal: "Want to explore mindfulness or self-compassion without long-term commitment.",
    link: "/workshops",
    linkText: "View upcoming workshops",
    icon: Sparkles,
    color: "terracotta",
  },
  {
    title: "Retreat in Barcelona",
    subtitle: "Mindfulness & Self-Compassion Retreat",
    description: "Step out of daily routines and into a space of rest, reflection, and renewal. This retreat weaves together mindfulness, self-compassion, embodiment practices, and silence.",
    benefits: [
      "Deep rest for body and nervous system",
      "Guided mindfulness and self-compassion practices",
      "Time for silence, reflection, and integration",
      "Meaningful connection with others",
      "Space to reconnect with what truly matters",
    ],
    ideal: "Perfect if you feel the need to slow down, reset, and deepen your practice.",
    link: "/intensief",
    linkText: "Discover the Barcelona retreat",
    icon: Sun,
    color: "warm",
  },
];

const testimonials = [
  {
    quote: "This training taught me to be gentler with myself. I now recognize much faster when I'm being too harsh on myself.",
    author: "Anna",
    role: "MSC Training Participant",
  },
  {
    quote: "I finally understand what self-compassion really means. It's not weakness, but strength. The trainers create a very safe atmosphere.",
    author: "Mark",
    role: "MSC Training Participant",
  },
  {
    quote: "After years of perfectionism, I learned to accept myself as I am. This training was a turning point in my life.",
    author: "Sophie",
    role: "MSC Training Participant",
  },
  {
    quote: "The one-on-one sessions were exactly what I needed. At my own pace, with full attention to my personal themes.",
    author: "Renate",
    role: "Coaching Client",
  },
];

const participantExperiences = [
  "Greater calm and balance",
  "Increased emotional resilience",
  "Less stress and self-criticism",
  "Healthier boundaries and self-care",
  "Deeper connection with yourself and others",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Mindful Mind | Mindfulness, Self-Compassion & Conscious Living"
        description="Your well-being begins with how you treat yourself. Mindfulness, self-compassion, and conscious living — grounded in science, guided with care."
      />
      <OrganizationSchema />
      <WebsiteSchema />
      <FAQSchema items={[
        { question: "What is MSC?", answer: "Mindful Self-Compassion is a scientifically validated 8-week program that teaches you to support yourself with kindness." },
        { question: "What is MBSR?", answer: "Mindfulness-Based Stress Reduction is one of the most widely researched mindfulness programs for reducing stress and overwhelm." },
      ]} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-28 lg:pt-32 lg:pb-36">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-100/80 via-background to-background" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-terracotta-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-sage-200/30 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-muted-foreground text-lg md:text-xl mb-4"
            >
              Your well-being begins with how you treat yourself
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]"
            >
              Come home to
              <span className="block font-serif italic text-terracotta-600 mt-2">yourself</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Mindfulness, self-compassion, and conscious living — grounded in science, guided with care.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                <Link to="/msc-training">
                  Explore our programs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* A place to slow down */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <h2 className="mb-8 text-3xl font-light text-foreground md:text-4xl leading-tight">
                A place to slow down and <span className="font-serif italic text-terracotta-600">reconnect</span>
              </h2>
              <div className="text-muted-foreground text-lg leading-relaxed space-y-6">
                <p>
                  In a world that asks you to move faster, do more, and be stronger, 
                  we offer a different approach.
                </p>
                <p className="text-xl font-light text-foreground">
                  One that invites you to pause. To listen. To relate to yourself with awareness, kindness, and trust.
                </p>
                <p>
                  Our programs support you in meeting life as it is — with more calm, clarity, and compassion.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Offerings */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-6">
                  Our Offerings
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Find what resonates with <span className="font-serif italic text-terracotta-600">you</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-8">
              {offerings.map((offering, index) => (
                <StaggerItem key={index}>
                  <Card className={`border-0 rounded-3xl shadow-lg overflow-hidden bg-white`}>
                    <CardContent className="p-8 md:p-10">
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                          offering.color === "terracotta" 
                            ? "bg-gradient-to-br from-terracotta-100 to-terracotta-200" 
                            : offering.color === "sage"
                            ? "bg-gradient-to-br from-sage-100 to-sage-200"
                            : "bg-gradient-to-br from-warm-100 to-warm-200"
                        }`}>
                          <offering.icon className={`h-6 w-6 ${
                            offering.color === "terracotta" 
                              ? "text-terracotta-600" 
                              : offering.color === "sage"
                              ? "text-sage-700"
                              : "text-warm-600"
                          }`} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-foreground">{offering.title}</h3>
                          <p className="text-sm text-muted-foreground">{offering.subtitle}</p>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-6">{offering.description}</p>
                      
                      <div className="mb-6">
                        <p className="text-sm font-medium text-foreground mb-3">You will learn to:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {offering.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-sage-600 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-sm text-terracotta-600 mb-6 italic">{offering.ideal}</p>
                      
                      <Button asChild className="rounded-full bg-terracotta-600 hover:bg-terracotta-700 text-white">
                        <Link to={offering.link}>
                          {offering.linkText}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Which offering is right for you */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Which offering is <span className="font-serif italic text-terracotta-600">right for you?</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3 p-5 rounded-xl bg-sage-50 border border-sage-200">
                  <Leaf className="h-5 w-5 text-sage-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">MSC</p>
                    <p className="text-sm text-muted-foreground">if you want to cultivate a kinder relationship with yourself</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-5 rounded-xl bg-sage-50 border border-sage-200">
                  <Leaf className="h-5 w-5 text-sage-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">MBSR</p>
                    <p className="text-sm text-muted-foreground">if you want practical tools to work with stress</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-5 rounded-xl bg-terracotta-50 border border-terracotta-200">
                  <Sparkles className="h-5 w-5 text-terracotta-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Workshops</p>
                    <p className="text-sm text-muted-foreground">if you want focused learning in a shorter format</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-5 rounded-xl bg-warm-50 border border-warm-200">
                  <Sun className="h-5 w-5 text-warm-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Retreat</p>
                    <p className="text-sm text-muted-foreground">if you long for depth, rest, and spaciousness</p>
                  </div>
                </div>
              </div>
              <p className="text-center text-muted-foreground">
                All offerings are guided with care, professionalism, and a trauma-sensitive approach.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What participants experience */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold text-sage-700 mb-6">
                  What participants often experience
                </span>
                <p className="text-muted-foreground text-lg">
                  Research and lived experience show these practices can support:
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {participantExperiences.map((experience, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-warm-200 shadow-sm">
                    <Check className="h-5 w-5 text-sage-600 flex-shrink-0" />
                    <span className="text-foreground">{experience}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-6">
                  Testimonials
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  What participants <span className="font-serif italic text-terracotta-600">say</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <Carousel opts={{ loop: true }} className="max-w-3xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <Card className="border-0 bg-warm-50 rounded-3xl shadow-lg">
                      <CardContent className="p-8 md:p-12">
                        <MessageSquareQuote className="h-10 w-10 text-terracotta-300 mb-6" />
                        <blockquote className="text-xl text-foreground leading-relaxed mb-6">
                          "{testimonial.quote}"
                        </blockquote>
                        <div>
                          <p className="font-medium text-foreground">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-warm-100 px-4 py-1.5 text-xs font-semibold text-warm-700 mb-6">
                  Our Approach
                </span>
                <h2 className="mb-8 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  We work from a place of <span className="font-serif italic text-terracotta-600">gentleness, clarity, and safety</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                  "Evidence-based programs",
                  "Experienced guidance",
                  "Trauma-sensitive teaching",
                  "Respect for your pace",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 p-4 rounded-xl bg-white border border-warm-200 shadow-sm">
                    <Check className="h-4 w-4 text-sage-600 flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-lg text-muted-foreground italic">
                  You don't need to change who you are. You learn how to relate differently to what you experience.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-terracotta-500 to-terracotta-600">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-light text-white md:text-4xl leading-tight">
              Ready to begin?
            </h2>
            <p className="text-terracotta-100 text-lg mb-4">
              Whether you join a workshop, training, or retreat, you are welcome exactly as you are.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8">
                <Link to="/agenda">
                  View current offerings & dates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8">
                <Link to="/contact">
                  Get in touch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
