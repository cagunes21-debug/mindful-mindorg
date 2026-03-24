import { ScrollReveal } from "@/components/ScrollReveal";

const QuoteSection = () => {
  return (
    <section className="py-16 md:py-20 bg-card">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <ScrollReveal>
          <blockquote className="text-2xl md:text-3xl font-serif italic text-foreground leading-relaxed">
            "Behandel jezelf zoals je een goede vriendin zou behandelen."
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default QuoteSection;
