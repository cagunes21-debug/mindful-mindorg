import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen, ClipboardList, BarChart3, MessageCircle, Users, Euro,
  GraduationCap, Mail, Presentation, TrendingUp, UserPlus,
  LogOut, Menu, ChevronRight, ChevronLeft, X, Home, CalendarDays,
} from "lucide-react";
import SEO from "@/components/SEO";
import AdminCustomersSection from "@/components/admin/AdminCustomersSection";
import AdminRegistrationsSection from "@/components/admin/AdminRegistrationsSection";
import UpcomingSessionsWidget from "@/components/admin/UpcomingSessionsWidget";
import AdminScsOverview from "@/components/admin/AdminScsOverview";
import AdminFinanceSection from "@/components/admin/AdminFinanceSection";
import AdminNewsletterSection from "@/components/admin/AdminNewsletterSection";
import { cn } from "@/lib/utils";
import AgendaSection from "@/components/admin/AgendaSection";

/* ─── Nav config ─── */
const navItems = [
  { id: "overview", label: "Overzicht", icon: Home },
  { id: "agenda", label: "Agenda", icon: CalendarDays },
  { id: "clients", label: "Klanten", icon: Users },
  { id: "crm", label: "Leads & CRM", icon: MessageCircle },
  { id: "registrations", label: "Aanmeldingen", icon: ClipboardList },
  { id: "finance", label: "Financiën", icon: Euro },
  { id: "scs", label: "SCS Scores", icon: TrendingUp },
  { id: "newsletter", label: "Nieuwsbrief", icon: Mail },
];

const contentLinks = [
  { title: "Content Library", icon: GraduationCap, path: "/admin/cursusmateriaal", color: "bg-sage-100 text-sage-700" },
  { title: "Session Builder", icon: Presentation, path: "/admin/msc-builder", color: "bg-blue-100 text-blue-700" },
  { title: "Blog", icon: BookOpen, path: "/admin/blog", color: "bg-amber-100 text-amber-700" },
];

/* ─── Quick stats hook ─── */
function useQuickStats() {
  const [stats, setStats] = useState({ clients: 0, leads: 0, registrations: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  return { stats, loading };
}

/* ─── Stat card ─── */
function StatCard({ icon: Icon, label, value, accent, onClick }: {
  icon: React.ElementType; label: string; value: string | number; accent: string; onClick?: () => void;
}) {
  return (
    <Card
      className={cn(
        "cursor-pointer hover:shadow-lg transition-all duration-200 group border-l-4 bg-card/80 backdrop-blur-sm",
        accent
      )}
      onClick={onClick}
    >
      <CardContent className="p-4 flex items-center gap-3">
        <div className={cn(
          "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200",
          accent.replace("border-l-", "bg-").replace("500", "100")
        )}>
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-bold text-foreground leading-tight tracking-tight">{value}</p>
          <p className="text-[11px] text-muted-foreground truncate">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Main ─── */
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { stats, loading: statsLoading } = useQuickStats();

  // Detect mobile
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true);
      else setSidebarOpen(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleNav = useCallback((id: string) => {
    setActiveSection(id);
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const activeMeta = navItems.find(n => n.id === activeSection);

  return (
    <div className="min-h-screen bg-background flex">
      <SEO title="Admin Dashboard | Mindful Mind" description="Beheer klanten, deelnemers en aanmeldingen" />

      {/* ─── Mobile overlay ─── */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 animate-in fade-in duration-200"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── Sidebar ─── */}
      <aside
        className={cn(
          "bg-card border-r border-border flex flex-col shrink-0 transition-all duration-300 z-50 h-screen",
          // Desktop: sticky, always visible
          "md:sticky md:top-0 md:w-56",
          // Mobile: fixed overlay
          isMobile && "fixed top-0 left-0 w-64 shadow-2xl",
          isMobile && !sidebarOpen && "-translate-x-full",
          isMobile && sidebarOpen && "translate-x-0",
        )}
      >
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-border shrink-0">
          <span className="text-sm font-bold text-foreground tracking-tight">Mindful Mind</span>
          {isMobile && (
            <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-md hover:bg-muted transition-colors">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2.5 overflow-y-auto space-y-0.5">
          {navItems.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-150",
                  active
                    ? "bg-primary/10 text-primary font-semibold shadow-sm"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-4 w-4 shrink-0", active && "text-primary")} />
                <span className="truncate">{item.label}</span>
                {active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
              </button>
            );
          })}

          {/* Divider */}
          <div className="pt-4 pb-1.5 px-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50">Trainingen</p>
          </div>
          {contentLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => { navigate(link.path); if (isMobile) setSidebarOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all duration-150"
            >
              <link.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{link.title}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-2.5 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Uitloggen</span>
          </button>
        </div>
      </aside>

      {/* ─── Main content ─── */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Top bar (mobile) */}
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border md:hidden">
          <div className="flex items-center gap-3 px-4 h-12">
            <button onClick={() => setSidebarOpen(true)} className="p-1.5 -ml-1.5 rounded-lg hover:bg-muted transition-colors">
              <Menu className="h-5 w-5 text-foreground" />
            </button>
            {activeMeta && (
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <activeMeta.icon className="h-4 w-4 text-primary" />
                <span>{activeMeta.label}</span>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-0">

          {/* ─── Overview ─── */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">Dashboard</h1>
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
                <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/60 mb-3">Snelkoppelingen</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {contentLinks.map((link) => (
                    <Card
                      key={link.path}
                      className="cursor-pointer hover:shadow-lg transition-all duration-200 group bg-card/80 backdrop-blur-sm"
                      onClick={() => navigate(link.path)}
                    >
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", link.color)}>
                          <link.icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{link.title}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── Section pages (non-overview) ─── */}
          {activeSection !== "overview" && activeMeta && (
            <div className="space-y-4">
              {/* Breadcrumb / back bar */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveSection("overview")}
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors group"
                >
                  <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                  Overzicht
                </button>
                <span className="text-muted-foreground/40">/</span>
                <span className="text-sm text-muted-foreground">{activeMeta.label}</span>
              </div>

              <h1 className="text-2xl font-bold text-foreground tracking-tight">{activeMeta.label}</h1>

              {activeSection === "clients" && <AdminCustomersSection initialTab="customers" />}
              {activeSection === "crm" && <AdminCustomersSection initialTab="leads" />}
              {activeSection === "registrations" && <AdminRegistrationsSection />}
              {activeSection === "finance" && <AdminFinanceSection />}
              {activeSection === "scs" && <AdminScsOverview />}
              {activeSection === "newsletter" && <AdminNewsletterSection />}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
