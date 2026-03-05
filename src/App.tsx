import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import MindfulZelfcompassie from "./pages/MindfulZelfcompassie";

import StickyCTA from "./components/StickyCTA";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAutoLinkClient } from "./hooks/useAutoLinkClient";

const IndividueelHome = lazy(() => import("./pages/IndividueelHome"));

// Lazy-loaded routes for better Core Web Vitals
const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Trainers = lazy(() => import("./pages/Trainers"));
const Agenda = lazy(() => import("./pages/Agenda"));
const Contact = lazy(() => import("./pages/Contact"));
const Coaching = lazy(() => import("./pages/Coaching"));
const BewegingMildheidRetreat = lazy(() => import("./pages/BewegingMildheidRetreat"));
const Bedrijven = lazy(() => import("./pages/Bedrijven"));
const Auth = lazy(() => import("./pages/Auth"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminBlog = lazy(() => import("./pages/AdminBlog"));
const ParticipantDashboard = lazy(() => import("./pages/ParticipantDashboard"));
const BetalingSucces = lazy(() => import("./pages/BetalingSucces"));
const BetalingGeannuleerd = lazy(() => import("./pages/BetalingGeannuleerd"));
const Privacy = lazy(() => import("./pages/Privacy"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Ervaringen = lazy(() => import("./pages/Ervaringen"));
const StadLanding = lazy(() => import("./pages/StadLanding"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AlgemeneVoorwaarden = lazy(() => import("./pages/AlgemeneVoorwaarden"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const CourseMaterial = lazy(() => import("./pages/CourseMaterial"));

const SessionPresentation = lazy(() => import("./pages/SessionPresentation"));
const SelfCompassionPresentation = lazy(() => import("./pages/SelfCompassionPresentation"));
const IntakeForm = lazy(() => import("./pages/IntakeForm"));
const SelfCompassionQuestionnaire = lazy(() => import("./pages/SelfCompassionQuestionnaire"));
const MscMaterialsLibrary = lazy(() => import("./pages/MscMaterialsLibrary"));
const MscSessionBuilder = lazy(() => import("./pages/MscSessionBuilder"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-terracotta-300 border-t-terracotta-600 rounded-full animate-spin" />
  </div>
);

const AutoLinker = () => { useAutoLinkClient(); return null; };

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AutoLinker />
          <StickyCTA />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<IndividueelHome />} />
              <Route path="/msc-training" element={<MindfulZelfcompassie />} />
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
              <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/klanten" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/blog" element={<ProtectedRoute requireAdmin><AdminBlog /></ProtectedRoute>} />
              <Route path="/mijn-trainingen" element={<ProtectedRoute><ParticipantDashboard /></ProtectedRoute>} />
              <Route path="/mijn-trainingen/:id" element={<ProtectedRoute><ParticipantDashboard /></ProtectedRoute>} />
              <Route path="/betaling-succes" element={<BetalingSucces />} />
              <Route path="/betaling-geannuleerd" element={<BetalingGeannuleerd />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/ervaringen" element={<Ervaringen />} />
              <Route path="/zelfcompassie-training/:stad" element={<StadLanding />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/algemene-voorwaarden" element={<AlgemeneVoorwaarden />} />
              <Route path="/admin/cursusmateriaal" element={<ProtectedRoute requireAdmin><CourseMaterial /></ProtectedRoute>} />
              <Route path="/admin/deelnemers" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/msc-materials" element={<ProtectedRoute requireAdmin><MscMaterialsLibrary /></ProtectedRoute>} />
              <Route path="/admin/msc-builder" element={<ProtectedRoute requireAdmin><MscSessionBuilder /></ProtectedRoute>} />
              <Route path="/admin/presentatie/zelfcompassie" element={<ProtectedRoute requireAdmin><SelfCompassionPresentation /></ProtectedRoute>} />
              <Route path="/admin/presentatie/:sessionNumber" element={<ProtectedRoute requireAdmin><SessionPresentation /></ProtectedRoute>} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/intake/:enrollmentId" element={<IntakeForm />} />
              <Route path="/vragenlijst/:enrollmentId" element={<SelfCompassionQuestionnaire />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;