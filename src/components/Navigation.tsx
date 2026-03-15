import { NavLink } from "@/components/NavLink";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LogIn, LogOut, LayoutDashboard, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/i18n/LanguageContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Uitloggen mislukt");
    } else {
      setIsAdmin(false);
      toast.success("Je bent uitgelogd");
      navigate("/login");
    }
  };

  const checkAdminRole = async (userId: string) => {
    try {
      const { data } = await supabase.rpc('has_role', { _user_id: userId, _role: 'admin' });
      setIsAdmin(data === true);
    } catch {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        await checkAdminRole(currentUser.id);
      }
      setAuthReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          setTimeout(() => checkAdminRole(currentUser.id), 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const serviceLinks = [
    { to: "/mindful-self-compassion", label: t("nav.msc") },
    { to: "/msc-training", label: t("nav.groupTraining") },
    { to: "/coaching", label: t("nav.coaching") },
    { to: "/barcelona-retreat", label: t("nav.retreat") },
  ];

  const aboutLinks = [
    { to: "/over-ons", label: t("nav.aboutUs") },
    { to: "/trainers", label: t("nav.trainers") },
  ];

  const moreLinks = [
    { to: "/ervaringen", label: t("nav.experiences") },
    { to: "/faq", label: t("nav.faq") },
    { to: "/blog", label: t("nav.blog") },
  ];

  const isServicesActive = serviceLinks.some(link => location.pathname === link.to) || location.pathname === "/ons-aanbod";
  const isAboutActive = aboutLinks.some(link => location.pathname === link.to);
  const isMoreActive = moreLinks.some(link => location.pathname === link.to);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="text-xl font-serif italic text-primary">Mindful Mind</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5 lg:gap-8">
            <NavLink
              to="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              activeClassName="text-primary"
            >
              {t("nav.home")}
            </NavLink>

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${isServicesActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {t("nav.services")}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="bg-background border-border w-56">
                <DropdownMenuItem asChild>
                  <Link to="/ons-aanbod" className={`w-full cursor-pointer font-medium ${location.pathname === '/ons-aanbod' ? 'text-primary' : ''}`}>
                    {t("nav.servicesOverview")}
                  </Link>
                </DropdownMenuItem>
                <div className="h-px bg-border my-1" />
                {serviceLinks.slice(0, 2).map((link) => (
                  <DropdownMenuItem key={link.to} asChild>
                    <Link to={link.to} className={`w-full cursor-pointer ${location.pathname === link.to ? 'text-primary font-medium' : ''}`}>
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <div className="h-px bg-border my-1" />
                {serviceLinks.slice(2).map((link) => (
                  <DropdownMenuItem key={link.to} asChild>
                    <Link to={link.to} className={`w-full cursor-pointer ${location.pathname === link.to ? 'text-primary font-medium' : ''}`}>
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink
              to="/agenda"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              activeClassName="text-primary"
            >
              {t("nav.agenda")}
            </NavLink>

            {/* About Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${isAboutActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {t("nav.about")}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="bg-background border-border w-56">
                {aboutLinks.map((link) => (
                  <DropdownMenuItem key={link.to} asChild>
                    <Link to={link.to} className={`w-full cursor-pointer ${location.pathname === link.to ? 'text-primary font-medium' : ''}`}>
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${isMoreActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {t("nav.more")}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="bg-background border-border w-56">
                {moreLinks.map((link) => (
                  <DropdownMenuItem key={link.to} asChild>
                    <Link to={link.to} className={`w-full cursor-pointer ${location.pathname === link.to ? 'text-primary font-medium' : ''}`}>
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <LanguageToggle />

            <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full">
              <Link to="/contact">{t("nav.contact")}</Link>
            </Button>

            {user && isAdmin && (
              <Button asChild variant="ghost" className="rounded-full text-muted-foreground hover:text-primary px-2">
                <Link to="/mijn-trainingen" className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden lg:inline">{t("nav.myTrainings")}</span>
                </Link>
              </Button>
            )}

            {user ? (
              <Button
                variant="outline"
                className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t("nav.logout")}
              </Button>
            ) : (
              <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  {t("nav.login")}
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageToggle />
            <button
              className="p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <NavLink
                to="/"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                activeClassName="text-primary"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.home")}
              </NavLink>

              {/* Mobile Services Section */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={`flex items-center justify-between text-sm font-medium transition-colors hover:text-primary ${isServicesActive ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  {t("nav.services")}
                  <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesOpen && (
                  <div className="flex flex-col gap-2 pl-4 border-l-2 border-terracotta-200">
                    <NavLink
                      to="/ons-aanbod"
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      activeClassName="text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {t("nav.servicesOverview")}
                    </NavLink>
                    {serviceLinks.slice(0, 2).map((link) => (
                      <NavLink key={link.to} to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-primary" activeClassName="text-primary font-medium" onClick={() => setIsOpen(false)}>
                        {link.label}
                      </NavLink>
                    ))}
                    <div className="h-px bg-border my-1" />
                    {serviceLinks.slice(2).map((link) => (
                      <NavLink key={link.to} to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-primary" activeClassName="text-primary font-medium" onClick={() => setIsOpen(false)}>
                        {link.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              <NavLink
                to="/agenda"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                activeClassName="text-primary"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.agenda")}
              </NavLink>

              {/* Mobile About Section */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setAboutOpen(!aboutOpen)}
                  className={`flex items-center justify-between text-sm font-medium transition-colors hover:text-primary ${isAboutActive ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  {t("nav.about")}
                  <ChevronDown className={`h-4 w-4 transition-transform ${aboutOpen ? 'rotate-180' : ''}`} />
                </button>
                {aboutOpen && (
                  <div className="flex flex-col gap-2 pl-4 border-l-2 border-terracotta-200">
                    {aboutLinks.map((link) => (
                      <NavLink key={link.to} to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-primary" activeClassName="text-primary font-medium" onClick={() => setIsOpen(false)}>
                        {link.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile More Section */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={`flex items-center justify-between text-sm font-medium transition-colors hover:text-primary ${isMoreActive ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  {t("nav.more")}
                  <ChevronDown className={`h-4 w-4 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
                </button>
                {moreOpen && (
                  <div className="flex flex-col gap-2 pl-4 border-l-2 border-terracotta-200">
                    {moreLinks.map((link) => (
                      <NavLink key={link.to} to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-primary" activeClassName="text-primary font-medium" onClick={() => setIsOpen(false)}>
                        {link.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white w-fit rounded-full">
                <Link to="/contact" onClick={() => setIsOpen(false)}>{t("nav.contact")}</Link>
              </Button>

              {user && isAdmin && (
                <Button asChild variant="ghost" className="w-fit rounded-full text-muted-foreground hover:text-primary">
                  <Link to="/mijn-trainingen" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    {t("nav.myTrainings")}
                  </Link>
                </Button>
              )}

              {user ? (
                <Button
                  variant="outline"
                  className="w-fit rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t("nav.logout")}
                </Button>
              ) : (
                <Button asChild variant="outline" className="w-fit rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    {t("nav.login")}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
