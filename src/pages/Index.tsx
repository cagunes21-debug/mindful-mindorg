import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { OrganizationSchema } from "@/components/StructuredData";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import SectionDivider from "@/components/SectionDivider";
import HeroHome from "@/components/home/HeroHome";
import ProfilesSection from "@/components/home/ProfilesSection";
import HerkenningSection from "@/components/home/HerkenningSection";
import OfferingsSection from "@/components/home/OfferingsSection";
import ResultsHomeSection from "@/components/home/ResultsHomeSection";
import TestimonialsHomeSection from "@/components/home/TestimonialsHomeSection";
import MscSection from "@/components/home/MscSection";
import TrainerHomeSection from "@/components/home/TrainerHomeSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";

// Resolved CSS colors used for organic dividers between sections.
const WARM_50 = "hsl(40 30% 98%)";
const BACKGROUND = "hsl(40 30% 96%)";
const SAGE_50 = "hsl(150 25% 97%)";
const WHITE = "#ffffff";
const CREAM = "#F8F5EE";
const PRIMARY = "hsl(18 45% 48%)";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent />
      <SEO
        title="Mindful Zelfcompassie Training · Mindful Mind"
        description="De Mindful Zelfcompassie Training helpt je jezelf te ondersteunen. Individuele begeleiding en groepstrainingen voor meer rust, veerkracht en zelfvertrouwen."
      />
      <OrganizationSchema />
      <Navigation />
      <main id="main-content">
        <HeroHome />
        <SectionDivider fromColor={WARM_50} toColor={BACKGROUND} variant="curve" glow="sage" />
        <ProfilesSection />
        <SectionDivider fromColor={BACKGROUND} toColor={WARM_50} variant="wave" glow="terracotta" />
        <HerkenningSection />
        <SectionDivider fromColor={WARM_50} toColor={BACKGROUND} variant="drift" glow="sage" />
        <OfferingsSection />
        <SectionDivider fromColor={BACKGROUND} toColor={WARM_50} variant="soft" />
        <ResultsHomeSection />
        <SectionDivider fromColor={WARM_50} toColor={WHITE} variant="wave" glow="terracotta" />
        <TestimonialsHomeSection />
        <SectionDivider fromColor={WHITE} toColor={CREAM} variant="curve" glow="sage" />
        <MscSection />
        <SectionDivider fromColor={CREAM} toColor={BACKGROUND} variant="drift" />
        <TrainerHomeSection />
        <SectionDivider fromColor={BACKGROUND} toColor={PRIMARY} variant="curve" height={140} />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
