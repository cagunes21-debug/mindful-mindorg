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
import AdminDashboard from "./pages/AdminDashboard";
import AdminBlog from "./pages/AdminBlog";
import CustomerOverview from "./pages/CustomerOverview";
import ParticipantDashboard from "./pages/ParticipantDashboard";
import BetalingSucces from "./pages/BetalingSucces";
import BetalingGeannuleerd from "./pages/BetalingGeannuleerd";
import Privacy from "./pages/Privacy";
import FAQ from "./pages/FAQ";
import Ervaringen from "./pages/Ervaringen";
import StadLanding from "./pages/StadLanding";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

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
            <Route path="/" element={<MindfulZelfcompassie />} />
            <Route path="/programmas" element={<Index />} />
            
            <Route path="/ons-aanbod" element={<Services />} />
            <Route path="/over-ons" element={<About />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/coaching" element={<Coaching />} />
            <Route path="/barcelona-retreat" element={<BewegingMildheidRetreat />} />
            <Route path="/bedrijven" element={<Bedrijven />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/klanten" element={<CustomerOverview />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/mijn-training" element={<ParticipantDashboard />} />
            <Route path="/betaling-succes" element={<BetalingSucces />} />
            <Route path="/betaling-geannuleerd" element={<BetalingGeannuleerd />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/ervaringen" element={<Ervaringen />} />
            <Route path="/zelfcompassie-training/:stad" element={<StadLanding />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
