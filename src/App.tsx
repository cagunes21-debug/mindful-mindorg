import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";

import Services from "./pages/Services";
import About from "./pages/About";
import Trainers from "./pages/Trainers";
import Agenda from "./pages/Agenda";
import Contact from "./pages/Contact";
import Workshops from "./pages/Workshops";
import Intensief from "./pages/Intensief";
import Coaching from "./pages/Coaching";
import BewegingMildheidRetreat from "./pages/BewegingMildheidRetreat";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            <Route path="/ons-aanbod" element={<Services />} />
            <Route path="/over-ons" element={<About />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/intensief" element={<Intensief />} />
            <Route path="/coaching" element={<Coaching />} />
            <Route path="/barcelona-retreat" element={<BewegingMildheidRetreat />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
