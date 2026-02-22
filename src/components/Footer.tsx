import { Link } from "react-router-dom";
import { Mail, Phone, MessageCircle } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

const serviceLinks = [
  { to: "/", label: "8-weekse MSC Training" },
  { to: "/barcelona-retreat", label: "Barcelona Retreat" },
  { to: "/coaching", label: "Individuele Begeleiding" },
  { to: "/bedrijven", label: "Voor Bedrijven" },
];

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/agenda", label: "Agenda" },
  { to: "/over-ons", label: "Over Ons" },
  { to: "/trainers", label: "Trainers" },
  { to: "/ervaringen", label: "Ervaringen" },
  { to: "/faq", label: "Veelgestelde Vragen" },
  { to: "/contact", label: "Contact" },
];

const Footer = () => {
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
                Begeleiding in Mindfulness en Zelfcompassie
              </p>
            </div>

            {/* Ons Aanbod */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Ons Aanbod</h3>
              <ul className="space-y-2">
                {serviceLinks.map((link) => (
                  <li key={link.to}>
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
              <h3 className="font-semibold text-foreground mb-4">Snelle Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.to}>
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
              <h3 className="font-semibold text-foreground mb-4">Contact</h3>
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
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Nieuwsbrief</h4>
              <NewsletterForm variant="inline" />
            </div>
          </div>

          <div className="border-t border-warm-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Mindful Mind. Alle rechten voorbehouden.</p>
              <p className="mt-1">KvK: 91593700</p>
            </div>
            <div className="flex gap-4">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-terracotta-600 transition-colors">
                Privacyverklaring
              </Link>
              <Link to="/algemene-voorwaarden" className="text-sm text-muted-foreground hover:text-terracotta-600 transition-colors">
                Algemene Voorwaarden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
