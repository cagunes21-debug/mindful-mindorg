import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { OrganizationSchema } from "@/components/StructuredData";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import HeroHome from "@/components/home/HeroHome";
import HerkenningSection from "@/components/home/HerkenningSection";
import MscSection from "@/components/home/MscSection";
import ResultsHomeSection from "@/components/home/ResultsHomeSection";
import PricingHomeSection from "@/components/home/PricingHomeSection";
import StepsSection from "@/components/home/StepsSection";
import TestimonialsHomeSection from "@/components/home/TestimonialsHomeSection";
import TrainerHomeSection from "@/components/home/TrainerHomeSection";
import GroupCtaSection from "@/components/home/GroupCtaSection";
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

      <HeroHome />
      <HerkenningSection />
      <MscSection />
      <ResultsHomeSection />
      <PricingHomeSection />
      <StepsSection />
      <TestimonialsHomeSection />
      <TrainerHomeSection />
      <GroupCtaSection />
      <FinalCtaSection />

      <Footer />
    </div>
  );
};

export default Index;
