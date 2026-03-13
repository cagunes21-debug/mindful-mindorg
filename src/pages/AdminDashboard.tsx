import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, User, ClipboardList, BarChart3, MessageCircle, Users, Euro, GraduationCap, Heart, Mail, FileText, Presentation } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEO from "@/components/SEO";
import AdminCustomersSection from "@/components/admin/AdminCustomersSection";
import AdminRegistrationsSection from "@/components/admin/AdminRegistrationsSection";
import UpcomingSessionsWidget from "@/components/admin/UpcomingSessionsWidget";
import AdminScsOverview from "@/components/admin/AdminScsOverview";
import AdminFinanceSection from "@/components/admin/AdminFinanceSection";
import AdminNewsletterSection from "@/components/admin/AdminNewsletterSection";

const contentSections = [
  {
    title: "Content Library",
    description: "Beheer cursusmateriaal, meditaties, oefeningen en onderwerpen voor alle trainingen en sessies.",
    icon: GraduationCap,
    path: "/admin/cursusmateriaal",
    color: "bg-sage-100 text-sage-700",
  },
  {
    title: "MSC Session Builder",
    description: "Stel individuele sessies samen uit de materiaalbibliotheek.",
    icon: Presentation,
    path: "/admin/msc-builder",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Blog",
    description: "Schrijf en publiceer blogartikelen over mindfulness en zelfcompassie.",
    icon: BookOpen,
    path: "/admin/blog",
    color: "bg-amber-100 text-amber-700",
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("clients");

  return (
    <div className="min-h-screen bg-warm-50">
      <SEO title="Admin Dashboard | Mindful Mind" description="Beheer klanten, deelnemers en aanmeldingen" />
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-light text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Beheer klanten, leads en financiën</p>
            </div>
          </div>

          {/* Main Navigation Tabs */}
          <Tabs value={activeSection} onValueChange={setActiveSection}>
            <TabsList className="mb-6 h-auto flex-wrap">
              <TabsTrigger value="crm" className="gap-2">
                <MessageCircle className="h-4 w-4" /> CRM
              </TabsTrigger>
              <TabsTrigger value="clients" className="gap-2">
                <Users className="h-4 w-4" /> Klanten & Trainingen
              </TabsTrigger>
              <TabsTrigger value="finance" className="gap-2">
                <Euro className="h-4 w-4" /> Financiën
              </TabsTrigger>
            </TabsList>

            {/* CRM Section - Leads */}
            <TabsContent value="crm">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-light text-foreground mb-6 flex items-center gap-2 border-b pb-3">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    Leads (CRM)
                  </h2>
                  <AdminCustomersSection initialTab="leads" />
                </section>

                <section>
                  <h2 className="text-2xl font-light text-foreground mb-6 flex items-center gap-2 border-b pb-3">
                    <Mail className="h-5 w-5 text-primary" />
                    Nieuwsbrief
                  </h2>
                  <AdminNewsletterSection />
                </section>
              </div>
            </TabsContent>

            {/* Clients & Trainings Section */}
            <TabsContent value="clients">
              <div className="space-y-8">
                {/* Weekoverzicht sessies */}
                <UpcomingSessionsWidget />

                <section>
                  <h2 className="text-2xl font-light text-foreground mb-6 flex items-center gap-2 border-b pb-3">
                    <User className="h-5 w-5 text-primary" />
                    Klanten & Trainingen
                  </h2>
                  <AdminCustomersSection initialTab="customers" />
                </section>

                {/* Aanmeldingen Section */}
                <section>
                  <h2 className="text-2xl font-light text-foreground mb-6 flex items-center gap-2 border-b pb-3">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    Aanmeldingen & Betaling
                  </h2>
                  <AdminRegistrationsSection />
                </section>

                {/* SCS Scores Section */}
                <section>
                  <h2 className="text-2xl font-light text-foreground mb-6 flex items-center gap-2 border-b pb-3">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Zelfcompassie Scores (SCS)
                  </h2>
                  <AdminScsOverview />
                </section>
              </div>
            </TabsContent>

            {/* Finance Section */}
            <TabsContent value="finance">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-light text-foreground mb-6 flex items-center gap-2 border-b pb-3">
                    <Euro className="h-5 w-5 text-primary" />
                    Financiën
                  </h2>
                  <AdminFinanceSection />
                </section>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
