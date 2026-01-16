import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Contact"
        description="Neem contact met ons op voor vragen over onze zelfcompassie trainingen. We helpen je graag bij het vinden van de juiste training."
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-100/60 via-background to-background" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-sage-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-terracotta-200/20 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2.5 text-sm font-medium text-terracotta-700"
            >
              <Mail className="h-4 w-4" />
              Contact
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]"
            >
              Neem contact
              <span className="block font-serif italic text-terracotta-600 mt-2">met ons op</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Heb je vragen over onze trainingen of wil je je aanmelden? We helpen je graag verder.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-5">
              {/* Contact Info */}
              <div className="lg:col-span-2">
                <ScrollReveal animation="fade-right">
                  <h2 className="text-2xl font-light text-foreground mb-6">
                    Direct <span className="font-serif italic text-terracotta-600">contact</span>
                  </h2>
                  
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    Je kunt ons ook direct bereiken via e-mail, telefoon of WhatsApp. We reageren meestal binnen 24 uur.
                  </p>
                </ScrollReveal>
                
                <StaggerContainer className="space-y-6">
                  <StaggerItem>
                    <a 
                      href="mailto:mindful-mind@outlook.com" 
                      className="flex items-start gap-4 group"
                    >
                      <div className="h-12 w-12 rounded-2xl bg-terracotta-100 flex items-center justify-center group-hover:bg-terracotta-200 transition-colors">
                        <Mail className="h-5 w-5 text-terracotta-600" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">E-mail</p>
                        <p className="text-muted-foreground group-hover:text-terracotta-600 transition-colors">
                          mindful-mind@outlook.com
                        </p>
                      </div>
                    </a>
                  </StaggerItem>
                  
                  <StaggerItem>
                    <a 
                      href="tel:+31625633379" 
                      className="flex items-start gap-4 group"
                    >
                      <div className="h-12 w-12 rounded-2xl bg-sage-100 flex items-center justify-center group-hover:bg-sage-200 transition-colors">
                        <Phone className="h-5 w-5 text-sage-700" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Telefoon</p>
                        <p className="text-muted-foreground group-hover:text-sage-700 transition-colors">
                          +31 6 25633379
                        </p>
                      </div>
                    </a>
                  </StaggerItem>
                  
                  <StaggerItem>
                    <a 
                      href="https://wa.me/31625633379" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 group"
                    >
                      <div className="h-12 w-12 rounded-2xl bg-warm-100 flex items-center justify-center group-hover:bg-warm-200 transition-colors">
                        <MessageCircle className="h-5 w-5 text-warm-600" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">WhatsApp</p>
                        <p className="text-muted-foreground group-hover:text-warm-600 transition-colors">
                          Stuur een bericht
                        </p>
                      </div>
                    </a>
                  </StaggerItem>
                  
                  <StaggerItem>
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-terracotta-50 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-terracotta-500" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Locatie</p>
                        <p className="text-muted-foreground">
                          Online trainingen via Zoom<br />
                          Intensieve trajecten: Amersfoort
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <ScrollReveal animation="fade-left" delay={0.2}>
                  <div className="bg-warm-50 rounded-3xl p-8 md:p-10 border border-warm-200">
                    <h2 className="text-2xl font-light text-foreground mb-2">
                      Stuur een <span className="font-serif italic text-terracotta-600">bericht</span>
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      Vul het formulier in en we nemen zo snel mogelijk contact met je op.
                    </p>
                    
                    <ContactForm />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
