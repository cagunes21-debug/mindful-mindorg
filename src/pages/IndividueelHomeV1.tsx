import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { OrganizationSchema } from "@/components/StructuredData";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import HeroSectionV2 from "@/components/home/HeroSectionV2";
import IntroSection from "@/components/home/IntroSection";
import WhatIsMscSection from "@/components/home/WhatIsMscSection";
import WhyItWorksSection from "@/components/home/WhyItWorksSection";
import GroupTrainingTeaser from "@/components/home/GroupTrainingTeaser";
import CTASection from "@/components/home/CTASection";
import TrainersSection from "@/components/home/TrainersSection";

const IndividueelHome = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent />
      <SEO
        title="Mindful Zelfcompassie | Mindful Mind"
        description="Leer milder zijn voor jezelf. Mindful Self-Compassion helpt je om jezelf te ondersteunen op moeilijke momenten. Plan een gratis kennismaking."
      />
      <OrganizationSchema />
      <Navigation />
      <HeroSectionV2 />
      <IntroSection />
      <WhatIsMscSection />
      <WhyItWorksSection />
      <GroupTrainingTeaser />
      <CTASection />
      <TrainersSection />
      <Footer />
    </div>
  );
};

export default IndividueelHome;
