import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { OrganizationSchema } from "@/components/StructuredData";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import EditorialHome from "@/components/home/EditorialHome";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
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
        <EditorialHome />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
