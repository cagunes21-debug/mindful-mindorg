import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen, User, ClipboardList, BarChart3, MessageCircle, Users, Euro,
  GraduationCap, Mail, FileText, Presentation, TrendingUp, UserPlus,
  CalendarDays, LogOut, Menu, ChevronRight,
} from "lucide-react";
import SEO from "@/components/SEO";
import AdminCustomersSection from "@/components/admin/AdminCustomersSection";
import AdminRegistrationsSection from "@/components/admin/AdminRegistrationsSection";
import UpcomingSessionsWidget from "@/components/admin/UpcomingSessionsWidget";
import AdminScsOverview from "@/components/admin/AdminScsOverview";
import AdminFinanceSection from "@/components/admin/AdminFinanceSection";
import AdminNewsletterSection from "@/components/admin/AdminNewsletterSection";
import { cn } from "@/lib/utils";

/* ─── Sidebar nav items ─── */
const navItems = [
  { id: "overview", label: "Overzicht", icon: BarChart3 },
  { id: "clients", label: "Klanten", icon: Users },
  { id: "crm", label: "Leads & CRM", icon: MessageCircle },
  { id: "registrations", label: "Aanmeldingen", icon: ClipboardList },
  { id: "finance", label: "Financiën", icon: Euro },
  { id: "scs", label: "SCS Scores", icon: TrendingUp },
  { id: "newsletter", label: "Nieuwsbrief", icon: Mail },
];

const contentLinks = [
  { title: "Content Library", icon: GraduationCap, path: "/admin/cursusmateriaal", color: "text-sage-700 bg-sage-100" },
  { title: "Session Builder", icon: Presentation, path: "/admin/msc-builder", color: "text-blue-700 bg-blue-100" },
  { title: "Blog", icon: BookOpen, path: "/admin/blog", color: "text-amber-700 bg-amber-100" },
];

/* ─── Quick stats hook ─── */
function useQuickStats() {
  const [stats, setStats] = useState({ clients: 0, leads: 0, registrations: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const [clientsRes, leadsRes, regsRes, ordersRes] = await Promise.all([
          supabase.from("clients").select("id", { count: "exact", head: true }),
          supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
          supabase.from("registrations").select("id", { count: "exact", head: true }).eq("status", "confirmed"),
          supabase.from("orders").select("total").eq("status", "paid"),
        ]);
        const revenue = (ordersRes.data || []).reduce((sum, o) => sum + (o.total || 0), 0);
        setStats({
          clients: clientsRes.count || 0,
          leads: leadsRes.count || 0,
          registrations: regsRes.count || 0,
          revenue,
        });
      } catch (e) {
        console.error("Stats fetch error:", e);
      }
      setLoading(false);
    }
    fetch();
  }, []);

  return { stats, loading };
}

/* ─── Stat card ─── */
function StatCard({ icon: Icon, label, value, accent, onClick }: {
  icon: React.ElementType; label: string; value: string | number; accent: string; onClick?: () => void;
}) {
  return (
    <Card
      className={cn("cursor-pointer hover:shadow-md transition-all group border-l-4", accent)}
      onClick={onClick}
    >
      <CardContent className="p-4 flex items-center gap-4">
        <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-semibold text-foreground leading-tight">{value}</p>
          <p className="text-xs text-muted-foreground truncate">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Main ─── */
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { stats, loading: statsLoading } = useQuickStats();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex">
      <SEO title="Admin Dashboard | Mindful Mind" description="Beheer klanten, deelnemers en aanmeldingen" />

      {/* ─── Sidebar ─── */}
      <aside
        className={cn(
          "bg-card border-r border-border flex flex-col shrink-0 transition-all duration-200 sticky top-0 h-screen z-30",
          sidebarOpen ? "w-56" : "w-14"
        )}
      >
        {/* Logo / toggle */}
        <div className="h-14 flex items-center gap-2 px-3 border-b border-border shrink-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-md hover:bg-muted transition-colors">
            <Menu className="h-4 w-4 text-muted-foreground" />
          </button>
          {sidebarOpen && <span className="text-sm font-semibold text-foreground truncate">Mindful Mind</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 space-y-0.5 px-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors",
                activeSection === item.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              title={item.label}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {sidebarOpen && <span className="truncate">{item.label}</span>}
            </button>
          ))}

          {/* Content links divider */}
          {sidebarOpen && (
            <div className="pt-4 pb-1 px-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Trainingen</p>
            </div>
          )}
          {contentLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title={link.title}
            >
              <link.icon className="h-4 w-4 shrink-0" />
              {sidebarOpen && <span className="truncate">{link.title}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-2 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            title="Uitloggen"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span>Uitloggen</span>}
          </button>
        </div>
      </aside>

      {/* ─── Main content ─── */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">

          {/* ─── Overview ─── */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Welkom terug. Hier is je overzicht.</p>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard icon={Users} label="Klanten" value={statsLoading ? "…" : stats.clients} accent="border-l-sage-500" onClick={() => setActiveSection("clients")} />
                <StatCard icon={UserPlus} label="Nieuwe leads" value={statsLoading ? "…" : stats.leads} accent="border-l-amber-500" onClick={() => setActiveSection("crm")} />
                <StatCard icon={ClipboardList} label="Aanmeldingen" value={statsLoading ? "…" : stats.registrations} accent="border-l-blue-500" onClick={() => setActiveSection("registrations")} />
                <StatCard icon={Euro} label="Omzet" value={statsLoading ? "…" : `€${stats.revenue.toLocaleString("nl-NL")}`} accent="border-l-emerald-500" onClick={() => setActiveSection("finance")} />
              </div>

              {/* Upcoming sessions */}
              <UpcomingSessionsWidget />

              {/* Quick links */}
              <div>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Snelkoppelingen</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {contentLinks.map((link) => (
                    <Card
                      key={link.path}
                      className="cursor-pointer hover:shadow-md transition-all group"
                      onClick={() => navigate(link.path)}
                    >
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0", link.color)}>
                          <link.icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{link.title}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── Clients ─── */}
          {activeSection === "clients" && (
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold text-foreground">Klanten & Trainingen</h1>
              <AdminCustomersSection initialTab="customers" />
            </div>
          )}

          {/* ─── CRM / Leads ─── */}
          {activeSection === "crm" && (
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold text-foreground">Leads & CRM</h1>
              <AdminCustomersSection initialTab="leads" />
            </div>
          )}

          {/* ─── Registrations ─── */}
          {activeSection === "registrations" && (
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold text-foreground">Aanmeldingen & Betaling</h1>
              <AdminRegistrationsSection />
            </div>
          )}

          {/* ─── Finance ─── */}
          {activeSection === "finance" && (
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold text-foreground">Financiën</h1>
              <AdminFinanceSection />
            </div>
          )}

          {/* ─── SCS Scores ─── */}
          {activeSection === "scs" && (
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold text-foreground">Zelfcompassie Scores (SCS)</h1>
              <AdminScsOverview />
            </div>
          )}

          {/* ─── Newsletter ─── */}
          {activeSection === "newsletter" && (
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold text-foreground">Nieuwsbrief</h1>
              <AdminNewsletterSection />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
