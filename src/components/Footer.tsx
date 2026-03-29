import { Link } from "react-router-dom";
import { Mail, Phone, MessageCircle, Instagram } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const serviceLinks = [
    { to: "/", label: t("footer.mscTraining") },
    { to: "/barcelona-retreat", label: t("footer.barcelonaRetreat") },
    { to: "/coaching", label: t("footer.individualCoaching") },
    { to: "/bedrijven", label: t("footer.forCompanies") },
  ];

  const quickLinks = [
    { to: "/", label: t("footer.home") },
    { to: "/agenda", label: t("footer.agenda") },
    { to: "/over-ons", label: t("footer.aboutUs") },
    { to: "/trainers", label: t("footer.trainers") },
    { to: "/ervaringen", label: t("footer.experiences") },
    { to: "/faq", label: t("footer.faq") },
    { to: "/contact", label: t("footer.contact") },
  ];

  return (
    <footer className="border-t border-warm-200 bg-warm-100 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-block">
                <p className="font-serif italic text-2xl text-terracotta-600 mb-3">Mindful Mind</p>
              </Link>
              <p className="text-muted-foreground text-sm">
                {t("footer.tagline")}
              </p>
            </div>

            {/* Ons Aanbod */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">{t("footer.ourServices")}</h3>
              <ul className="space-y-2">
                {serviceLinks.map((link) => (
                  <li key={link.to + link.label}>
                    <Link 
                      to={link.to} 
                      className="text-sm text-muted-foreground hover:text-terracotta-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">{t("footer.quickLinks")}</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.to + link.label}>
                    <Link 
                      to={link.to} 
                      className="text-sm text-muted-foreground hover:text-terracotta-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">{t("footer.contactTitle")}</h3>
              <div className="space-y-3 mb-6">
                <a 
                  href="mailto:mindful-mind@outlook.com" 
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-terracotta-600 transition-colors group"
                >
                  <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center group-hover:bg-terracotta-50 transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="break-all">mindful-mind@outlook.com</span>
                </a>
                <a 
                  href="tel:+31625633379" 
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-terracotta-600 transition-colors group"
                >
                  <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center group-hover:bg-terracotta-50 transition-colors">
                    <Phone className="h-4 w-4" />
                  </div>
                  +31 6 25633379
                </a>
                <a 
                  href="https://wa.me/31625633379" 
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-terracotta-600 transition-colors group"
                >
                  <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center group-hover:bg-terracotta-50 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  WhatsApp
                </a>
                <a 
                  href="https://instagram.com/chala.gunes" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-terracotta-600 transition-colors group"
                >
                  <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center group-hover:bg-terracotta-50 transition-colors">
                    <Instagram className="h-4 w-4" />
                  </div>
                  @chala.gunes
                </a>
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-2">{t("footer.newsletter")}</h4>
              <NewsletterForm variant="inline" />
            </div>
          </div>

          <div className="border-t border-warm-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Mindful Mind. {t("footer.rights")}</p>
              <p className="mt-1">KvK: 91593700</p>
            </div>
            <div className="flex gap-4">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-terracotta-600 transition-colors">
                {t("footer.privacy")}
              </Link>
              <Link to="/algemene-voorwaarden" className="text-sm text-muted-foreground hover:text-terracotta-600 transition-colors">
                {t("footer.terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
