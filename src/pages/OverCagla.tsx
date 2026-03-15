import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";

const OverCagla = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent />
      <SEO
        title="Over Çağla Güneş"
        description="Leer meer over Çağla Güneş — gecertificeerde MSC-trainer, traumatherapeut en oprichter van Mindful Mind."
        canonical="https://mindfulmind.nl/over-cagla"
      />
      <Navigation />

      {/* Placeholder — content volgt */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-3">Over</p>
          <h1 className="text-4xl md:text-5xl font-light text-foreground leading-tight mb-6">
            Çağla <span className="font-serif italic text-terracotta-600">Güneş</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Deze pagina wordt binnenkort aangevuld met meer informatie.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OverCagla;
