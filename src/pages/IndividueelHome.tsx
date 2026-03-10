import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { OrganizationSchema } from "@/components/StructuredData";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import HeroSection from "@/components/home/HeroSection";
import ForYouSection from "@/components/home/ForYouSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import ApproachSection from "@/components/home/ApproachSection";
import TrainersSection from "@/components/home/TrainersSection";
import CTASection from "@/components/home/CTASection";
import PackageSection from "@/components/home/PackageSection";
import ForWhomSection from "@/components/home/ForWhomSection";
import GroupTrainingTeaser from "@/components/home/GroupTrainingTeaser";


const IndividueelHome = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent />
      <SEO
        title="Individuele Sessies Mindful Zelfcompassie | Mindful Mind"
        description="Individuele sessies Mindful Zelfcompassie — op jouw tempo, afgestemd op jouw behoeften. Ontdek je innerlijke kracht met persoonlijke begeleiding."
      />
      <OrganizationSchema />
      <Navigation />
      <HeroSection />
      <ForYouSection />
      <BenefitsSection />
      <PackageSection />
      <ForWhomSection />
      <GroupTrainingTeaser />
      <ApproachSection />
      
      <TrainersSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default IndividueelHome;
