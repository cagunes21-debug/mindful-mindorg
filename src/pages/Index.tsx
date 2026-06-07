import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { OrganizationSchema } from "@/components/StructuredData";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import HeroHome from "@/components/home/HeroHome";

import ProfilesSection from "@/components/home/ProfilesSection";
import MisconceptsSection from "@/components/home/MisconceptsSection";
import MscSection from "@/components/home/MscSection";
import ResultsHomeSection from "@/components/home/ResultsHomeSection";
import OfferingsSection from "@/components/home/OfferingsSection";
import StepsSection from "@/components/home/StepsSection";
import TestimonialsHomeSection from "@/components/home/TestimonialsHomeSection";
import TrainerHomeSection from "@/components/home/TrainerHomeSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent />
      <SEO
        title="Mindful Mind · Zelfcompassie & Welzijn"
        description="Leer jezelf ondersteunen met Mindful Self-Compassion. Individuele begeleiding en groepstrainingen voor meer rust, veerkracht en zelfvertrouwen."
      />
      <OrganizationSchema />
      <Navigation />
      <main id="main-content">

      <HeroHome />
      <ProfilesSection />
      <OfferingsSection />
      <ResultsHomeSection />
      <TestimonialsHomeSection />
      <TrainerHomeSection />
      <MscSection />
      <FinalCtaSection />



      </main>
      <Footer />
    </div>
  );
};

export default Index;
