import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, User, ClipboardList, BarChart3 } from "lucide-react";
import SEO from "@/components/SEO";
import AdminCustomersSection from "@/components/admin/AdminCustomersSection";
import AdminRegistrationsSection from "@/components/admin/AdminRegistrationsSection";
import UpcomingSessionsWidget from "@/components/admin/UpcomingSessionsWidget";
import AdminScsOverview from "@/components/admin/AdminScsOverview";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-warm-50">
      <SEO title="Admin Dashboard | Mindful Mind" description="Beheer klanten, deelnemers en aanmeldingen" />
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-light text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Beheer klanten, deelnemers en aanmeldingen</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" size="sm" className="gap-2" onClick={() => scrollTo("section-klanten")}>
                <User className="h-4 w-4" />Klanten
              </Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => scrollTo("section-aanmeldingen")}>
                <ClipboardList className="h-4 w-4" />Aanmeldingen
              </Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => scrollTo("section-scs")}>
                <BarChart3 className="h-4 w-4" />SCS Scores
              </Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate("/admin/blog")}>
                <BookOpen className="h-4 w-4" />Blog
              </Button>
            </div>
          </div>

          {/* Weekoverzicht sessies */}
          <section className="mb-8">
            <UpcomingSessionsWidget />
          </section>

          {/* Klanten Section */}
          <section id="section-klanten" className="mb-16 scroll-mt-28">
            <h2 className="text-2xl font-light text-foreground mb-6 flex items-center gap-2 border-b pb-3">
              <User className="h-5 w-5 text-primary" />
              Klanten (CRM)
            </h2>
            <AdminCustomersSection />
          </section>


          {/* Aanmeldingen Section */}
          <section id="section-aanmeldingen" className="mb-16 scroll-mt-28">
            <h2 className="text-2xl font-light text-foreground mb-6 flex items-center gap-2 border-b pb-3">
              <ClipboardList className="h-5 w-5 text-primary" />
              Aanmeldingen & Betaling
            </h2>
            <AdminRegistrationsSection />
          </section>

          {/* SCS Scores Section */}
          <section id="section-scs" className="mb-16 scroll-mt-28">
            <h2 className="text-2xl font-light text-foreground mb-6 flex items-center gap-2 border-b pb-3">
              <BarChart3 className="h-5 w-5 text-primary" />
              Zelfcompassie Scores (SCS)
            </h2>
            <AdminScsOverview />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
