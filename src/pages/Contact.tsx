import { Mail, Phone, MessageCircle, MapPin, Instagram, ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import SEO from "@/components/SEO";
import { Chapter, Reveal, PageShell, SectionBand } from "@/components/editorial/Editorial";
import { motion } from "framer-motion";

/* Editorial Contact page. */

const channels = [
  { icon: Mail, label: "E-mail", value: "mindful-mind@outlook.com", href: "mailto:mindful-mind@outlook.com" },
  { icon: Phone, label: "Telefoon", value: "+31 6 25633379", href: "tel:+31625633379" },
  { icon: MessageCircle, label: "WhatsApp", value: "Stuur een bericht", href: "https://wa.me/31625633379" },
  { icon: Instagram, label: "Instagram", value: "@chala.gunes", href: "https://instagram.com/chala.gunes" },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <SEO
        title="Contact · Mindful Mind"
        description="Neem contact op met Mindful Mind voor vragen over de Mindful Zelfcompassie Training of individuele begeleiding."
      />
      <Navigation />

      <main id="main-content">
        <PageShell>
          {/* 01 Arrival */}
          <section className="relative overflow-hidden pt-20 lg:pt-28">
            <div className="container mx-auto px-6 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-3xl text-center"
              >
                <Chapter n="i." label="Contact" />
                <h1 className="mt-10 font-serif text-[44px] leading-[1.02] tracking-tight text-[#1f1d1b] sm:text-[60px] lg:text-[72px]">
                  Schrijf ons.
                  <br />
                  We <em className="italic text-terracotta-600">lezen</em> alles.
                </h1>
                <p className="mt-8 text-lg leading-[1.75] text-[#54514d]">
                  Een vraag over de training, of gewoon even kennismaken? Stuur een bericht — we
                  reageren persoonlijk, meestal binnen 1–2 werkdagen.
                </p>
              </motion.div>
            </div>
            <div className="mt-24 border-t border-[#2C2A28]/10" />
          </section>

          {/* 02 Channels + Form */}
          <SectionBand tone="cream">
            <div className="container mx-auto px-6 py-24 lg:px-12 lg:py-32">
              <div className="grid gap-16 lg:grid-cols-12">
                {/* Direct channels */}
                <Reveal className="lg:col-span-5">
                  <Chapter n="ii." label="Direct contact" />
                  <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-5xl">
                    Vier manieren
                    <br />
                    <em className="italic text-terracotta-600">om te beginnen.</em>
                  </h2>
                  <p className="mt-6 max-w-sm text-[15px] leading-[1.8] text-[#54514d]">
                    Liever direct bellen, appen of mailen? Dat kan. We reageren meestal binnen
                    24 uur.
                  </p>

                  <ul className="mt-12 space-y-6">
                    {channels.map((c) => (
                      <li key={c.label}>
                        <a
                          href={c.href}
                          target={c.href.startsWith("http") ? "_blank" : undefined}
                          rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="group flex items-start gap-5 border-t border-[#2C2A28]/10 pt-5"
                        >
                          <c.icon className="mt-1 h-5 w-5 text-terracotta-600" />
                          <div className="flex-1">
                            <p className="text-[11px] uppercase tracking-[0.28em] text-[#7a7670]">
                              {c.label}
                            </p>
                            <p className="mt-1 font-serif text-xl text-[#1f1d1b] group-hover:text-terracotta-700">
                              {c.value}
                            </p>
                          </div>
                          <ArrowUpRight className="mt-2 h-4 w-4 text-[#7a7670] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </li>
                    ))}

                    <li className="border-t border-[#2C2A28]/10 pt-5">
                      <div className="flex items-start gap-5">
                        <MapPin className="mt-1 h-5 w-5 text-sage-700" />
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.28em] text-[#7a7670]">
                            Locatie
                          </p>
                          <p className="mt-1 font-serif text-xl text-[#1f1d1b]">
                            Online via Zoom
                          </p>
                          <p className="mt-1 text-[14px] text-[#54514d]">
                            Intensieve trajecten op locatie · Amersfoort
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Reveal>

                {/* Form */}
                <Reveal className="lg:col-span-6 lg:col-start-7">
                  <Chapter n="iii." label="Stuur een bericht" />
                  <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-5xl">
                    Vertel ons
                    <br />
                    <em className="italic text-terracotta-600">wat er speelt.</em>
                  </h2>
                  <p className="mt-6 text-[15px] leading-[1.8] text-[#54514d]">
                    Geen formulier-formaliteit. Schrijf zoals je zou schrijven aan een vriend.
                  </p>

                  <div className="mt-10 border border-[#2C2A28]/10 bg-white p-8 md:p-10">
                    <ContactForm />
                  </div>
                </Reveal>
              </div>
            </div>
          </SectionBand>

          {/* 03 Closing note */}
          <SectionBand tone="deep">
            <div className="container mx-auto px-6 py-20 lg:px-12 lg:py-24">
              <Reveal className="mx-auto max-w-2xl text-center">
                <p className="font-serif text-2xl italic leading-[1.5] text-white/90 lg:text-3xl">
                  "Geen automatische bevestigingsmail. Geen funnel. Alleen een mens die antwoordt —
                  als er ruimte is om te lezen wat je schreef."
                </p>
                <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-white/60">
                  — Çağla
                </p>
              </Reveal>
            </div>
          </SectionBand>
        </PageShell>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
