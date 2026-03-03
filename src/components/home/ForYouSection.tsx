import { Heart } from "lucide-react";

const ForYouSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Herken je dit?</h2>
          <div className="w-16 h-0.5 bg-primary mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed text-lg italic font-serif">
              "Altijd maar doorgaan, hoge verwachtingen van jezelf, en toch dat stemmetje dat zegt dat je niet genoeg bent?"
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed text-lg">
              Wat als je jezelf net zo liefdevol zou behandelen als een goede vriend(in)?
            </p>
            <p className="text-muted-foreground leading-relaxed">
              In individuele sessies leer je om vriendelijker om te gaan met jezelf, ook wanneer het leven tegenzit. Je ontwikkelt meer begrip, rust en veerkracht — op jouw eigen tempo.
            </p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Heart className="inline-block text-primary" size={24} />
        </div>
      </div>
    </section>
  );
};

export default ForYouSection;
