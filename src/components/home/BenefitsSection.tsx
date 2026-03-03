import { Heart, Shield, Eye, Star, Pen } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Zelfcompassie",
    description: "Omgaan met moeilijkheden met mildheid in plaats van zelfkritiek.",
  },
  {
    icon: Shield,
    title: "Emotionele balans",
    description: "Meer veerkracht en innerlijke rust in uitdagende momenten.",
  },
  {
    icon: Eye,
    title: "Mindful bewustzijn",
    description: "Leven met meer aanwezigheid en verbinding met jezelf.",
  },
  {
    icon: Star,
    title: "Innerlijke kracht",
    description: "Een warme, ondersteunende relatie met jezelf opbouwen.",
  },
  {
    icon: Pen,
    title: "Praktische tools",
    description: "Concrete handvatten die je direct kunt toepassen in je dagelijks leven.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Wat je zult ervaren
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-card rounded-lg p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <benefit.icon className="text-accent mb-4" size={28} />
              <h3 className="font-serif text-xl text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
