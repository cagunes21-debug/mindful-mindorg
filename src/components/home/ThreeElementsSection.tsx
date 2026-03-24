import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { Eye, Users, Heart } from "lucide-react";

const elements = [
  {
    icon: Eye,
    number: "1",
    title: "Mindfulness",
    description: "Opmerken wat je voelt, zonder het weg te duwen of te overspoelen. Aanwezig zijn bij wat er is — ook als dat ongemakkelijk is.",
    bg: "bg-terracotta-50/50",
    border: "border-terracotta-200/60",
    iconBg: "bg-terracotta-100",
    iconColor: "text-terracotta-600",
  },
  {
    icon: Users,
    number: "2",
    title: "Gedeelde menselijkheid",
    description: "Herkennen dat je niet de enige bent. Dat worstelen, falen en onzekerheid onderdeel zijn van mens-zijn.",
    bg: "bg-sage-50",
    border: "border-sage-200",
    iconBg: "bg-sage-100",
    iconColor: "text-sage-700",
  },
  {
    icon: Heart,
    number: "3",
    title: "Vriendelijkheid naar jezelf",
    description: "Leren om jezelf te ondersteunen in plaats van te veroordelen. Zodat je niet tegen jezelf werkt — maar met jezelf.",
    bg: "bg-terracotta-50/50",
    border: "border-terracotta-200/60",
    iconBg: "bg-terracotta-100",
    iconColor: "text-terracotta-600",
  },
];

const ThreeElementsSection = () => {
  return (
    <section className="py-14 md:py-20 bg-card">
      <div className="container mx-auto px-6 max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">De basis</p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground">
              De drie elementen van <em className="italic text-primary">zelfcompassie</em>
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-4">
          {elements.map((el) => (
            <StaggerItem key={el.number}>
              <div className={`rounded-2xl p-5 h-full border ${el.bg} ${el.border}`}>
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center mb-3 ${el.iconBg}`}>
                  <el.icon className={`h-4 w-4 ${el.iconColor}`} />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1.5">{el.title}</h3>
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
