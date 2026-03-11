import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SEO from "@/components/SEO";
import { ArrowLeft, GraduationCap, Heart, Presentation, BookOpen, FileText, Music } from "lucide-react";

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

export default function AdminContent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-warm-50">
      <SEO title="Content Beheer | Mindful Mind" description="Beheer trainingsmateriaal, sessies en blog" />
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-light text-foreground">Content Beheer</h1>
              <p className="text-muted-foreground mt-1">Trainingsmateriaal, sessies en publicaties</p>
            </div>
          </div>

          {/* Content Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contentSections.map((section) => (
              <Card
                key={section.path}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(section.path)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${section.color}`}>
                      <section.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg font-medium">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{section.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
