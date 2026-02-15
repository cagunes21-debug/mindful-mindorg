import { NavLink } from "@/components/NavLink";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogIn, LogOut, LayoutDashboard, BookOpen } from "lucide-react";
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

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Uitloggen mislukt");
    } else {
      toast.success("Je bent uitgelogd");
      navigate("/login");
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          checkAdminRole(session.user.id);
        } else {
          setIsAdmin(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    const { data } = await supabase.rpc('has_role', { _user_id: userId, _role: 'admin' });
    setIsAdmin(data === true);
  };

  const serviceLinks = [
    { to: "/", label: "8-weekse MSC Training" },
    { to: "/coaching", label: "Coaching" },
    { to: "/bedrijven", label: "Voor Bedrijven" },
  ];

  const aboutLinks = [
    { to: "/over-ons", label: "Over Ons" },
    { to: "/trainers", label: "Trainers" },
    { to: "/ervaringen", label: "Ervaringen" },
    { to: "/faq", label: "Veelgestelde Vragen" },
  ];

  const isServicesActive = serviceLinks.some(link => location.pathname === link.to) || location.pathname === "/ons-aanbod";
  const isAboutActive = aboutLinks.some(link => location.pathname === link.to);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="text-xl font-serif italic text-primary">Mindful Mind</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              activeClassName="text-primary"
            >
              Home
            </NavLink>

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${isServicesActive ? 'text-primary' : 'text-muted-foreground'}`}>
                Aanbod
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="bg-background border-border w-56">
                <DropdownMenuItem asChild>
                  <Link 
                    to="/ons-aanbod" 
                    className={`w-full cursor-pointer font-medium ${location.pathname === '/ons-aanbod' ? 'text-primary' : ''}`}
                  >
                    Overzicht
                  </Link>
                </DropdownMenuItem>
                <div className="h-px bg-border my-1" />
                {serviceLinks.map((link) => (
                  <DropdownMenuItem key={link.to} asChild>
                    <Link 
                      to={link.to} 
                      className={`w-full cursor-pointer ${location.pathname === link.to ? 'text-primary font-medium' : ''}`}
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink
              to="/barcelona-retreat"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              activeClassName="text-primary"
            >
              Retreat
            </NavLink>

            <NavLink
              to="/agenda"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              activeClassName="text-primary"
            >
              Agenda
            </NavLink>

            {/* About Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${isAboutActive ? 'text-primary' : 'text-muted-foreground'}`}>
                Over
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="bg-background border-border">
                {aboutLinks.map((link) => (
                  <DropdownMenuItem key={link.to} asChild>
                    <Link 
                      to={link.to} 
                      className={`w-full cursor-pointer ${location.pathname === link.to ? 'text-primary font-medium' : ''}`}
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full">
              <Link to="/contact">Contact</Link>
            </Button>

            {user && (
              <>
                <Button asChild variant="ghost" className="rounded-full text-muted-foreground hover:text-primary">
                  <Link to="/mijn-training" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Mijn Training
                  </Link>
                </Button>
                {isAdmin && (
                  <Button asChild variant="ghost" className="rounded-full text-muted-foreground hover:text-primary">
                    <Link to="/admin" className="flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Admin
                    </Link>
                  </Button>
                )}
              </>
            )}

            {user ? (
              <Button 
                variant="outline" 
                className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Uitloggen
              </Button>
            ) : (
              <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Inloggen
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
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
                Home
              </NavLink>

              {/* Mobile Services Section */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={`flex items-center justify-between text-sm font-medium transition-colors hover:text-primary ${isServicesActive ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  Aanbod
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
                      Overzicht
                    </NavLink>
                    {serviceLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                        activeClassName="text-primary font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              <NavLink
                to="/barcelona-retreat"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                activeClassName="text-primary"
                onClick={() => setIsOpen(false)}
              >
                Retreat
              </NavLink>

              <NavLink
                to="/agenda"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                activeClassName="text-primary"
                onClick={() => setIsOpen(false)}
              >
                Agenda
              </NavLink>

              {/* Mobile About Section */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setAboutOpen(!aboutOpen)}
                  className={`flex items-center justify-between text-sm font-medium transition-colors hover:text-primary ${isAboutActive ? 'text-primary' : 'text-muted-foreground'}`}
                >
                   Over
                  <ChevronDown className={`h-4 w-4 transition-transform ${aboutOpen ? 'rotate-180' : ''}`} />
                </button>
                {aboutOpen && (
                  <div className="flex flex-col gap-2 pl-4 border-l-2 border-terracotta-200">
                    {aboutLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                        activeClassName="text-primary font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white w-fit rounded-full">
                <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
              </Button>

              {user && (
                <>
                  <Button asChild variant="ghost" className="w-fit rounded-full text-muted-foreground hover:text-primary">
                    <Link to="/mijn-training" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Mijn Training
                    </Link>
                  </Button>
                  {isAdmin && (
                    <Button asChild variant="ghost" className="w-fit rounded-full text-muted-foreground hover:text-primary">
                      <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </Button>
                  )}
                </>
              )}

              {user ? (
                <Button 
                  variant="outline" 
                  className="w-fit rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Uitloggen
                </Button>
              ) : (
                <Button asChild variant="outline" className="w-fit rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Inloggen
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
