import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { Eye, Users, Heart } from "lucide-react";

const elements = [
  {
    icon: Eye,
    number: "1",
    title: "Mindfulness",
    description: "Opmerken wat je voelt, zonder het weg te duwen of te overspoelen. Aanwezig zijn bij wat er is — ook als dat ongemakkelijk is.",
    accent: "terracotta",
  },
  {
    icon: Users,
    number: "2",
    title: "Gedeelde menselijkheid",
    description: "Herkennen dat je niet de enige bent. Dat worstelen, falen en onzekerheid onderdeel zijn van mens-zijn.",
    accent: "sage",
  },
  {
    icon: Heart,
    number: "3",
    title: "Vriendelijkheid naar jezelf",
    description: "Leren om jezelf te ondersteunen in plaats van te veroordelen. Zodat je niet tegen jezelf werkt — maar met jezelf.",
    accent: "terracotta",
  },
];

const ThreeElementsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-6 max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">De basis</p>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground">
              De drie elementen van <em className="italic text-primary">zelfcompassie</em>
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {elements.map((el) => (
            <StaggerItem key={el.number}>
              <div className={`rounded-2xl p-6 h-full border ${
                el.accent === "sage"
                  ? "bg-sage-50 border-sage-200"
                  : "bg-terracotta-50/50 border-terracotta-200/60"
              }`}>
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-4 ${
                  el.accent === "sage" ? "bg-sage-100" : "bg-terracotta-100"
                }`}>
                  <el.icon className={`h-5 w-5 ${
                    el.accent === "sage" ? "text-sage-700" : "text-terracotta-600"
                  }`} />
                </div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{el.number}.</p>
                <h3 className="text-lg font-semibold text-foreground mb-2">{el.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{el.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default ThreeElementsSection;
