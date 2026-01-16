import { Mail, Phone, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-warm-200 bg-warm-100 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-10 md:grid-cols-2 mb-12">
            <div>
              <p className="font-serif italic text-3xl text-terracotta-600 mb-4">Mindful Mind</p>
              <p className="text-muted-foreground text-lg">
                Begeleiding in Mindful Zelfcompassie
              </p>
            </div>
            <div className="space-y-4">
              <a href="mailto:mindful-mind@outlook.com" className="flex items-center gap-4 text-muted-foreground hover:text-terracotta-600 transition-colors group">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center group-hover:bg-terracotta-50 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                mindful-mind@outlook.com
              </a>
              <a href="tel:+31625633379" className="flex items-center gap-4 text-muted-foreground hover:text-terracotta-600 transition-colors group">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center group-hover:bg-terracotta-50 transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                +31 6 25633379
              </a>
              <a href="https://wa.me/31625633379" className="flex items-center gap-4 text-muted-foreground hover:text-terracotta-600 transition-colors group">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center group-hover:bg-terracotta-50 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </div>
                WhatsApp
              </a>
            </div>
          </div>
          <div className="border-t border-warm-200 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Mindful Mind. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
