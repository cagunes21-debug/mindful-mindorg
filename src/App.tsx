import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import MindfulZelfcompassie from "./pages/MindfulZelfcompassie";
import Services from "./pages/Services";
import About from "./pages/About";
import Trainers from "./pages/Trainers";
import Agenda from "./pages/Agenda";
import Contact from "./pages/Contact";
import Coaching from "./pages/Coaching";
import BewegingMildheidRetreat from "./pages/BewegingMildheidRetreat";
import Bedrijven from "./pages/Bedrijven";
import Auth from "./pages/Auth";

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
            <Route path="/mindful-zelfcompassie" element={<MindfulZelfcompassie />} />
            
            <Route path="/ons-aanbod" element={<Services />} />
            <Route path="/over-ons" element={<About />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/coaching" element={<Coaching />} />
            <Route path="/barcelona-retreat" element={<BewegingMildheidRetreat />} />
            <Route path="/bedrijven" element={<Bedrijven />} />
            <Route path="/login" element={<Auth />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
