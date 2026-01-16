import { NavLink } from "@/components/NavLink";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  const location = useLocation();

  const serviceLinks = [
    { to: "/msc-training", label: "8-weekse MSC Training" },
    { to: "/workshops", label: "Workshops" },
    { to: "/intensief", label: "Intensieve Programma's" },
    { to: "/barcelona-retreat", label: "Barcelona Retreat" },
    { to: "/beweging-mildheid", label: "In Beweging met Mildheid" },
    { to: "/coaching", label: "1-op-1 Coaching" },
  ];

  const aboutLinks = [
    { to: "/over-ons", label: "Over Ons" },
    { to: "/trainers", label: "Trainers" },
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
                Ons Aanbod
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
              to="/agenda"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              activeClassName="text-primary"
            >
              Agenda
            </NavLink>

            {/* About Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${isAboutActive ? 'text-primary' : 'text-muted-foreground'}`}>
                Over Ons
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
                  Ons Aanbod
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
                  Over Ons
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
