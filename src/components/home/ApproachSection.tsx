import textureImage from "@/assets/texture-warm.jpg";

const ApproachSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img src={textureImage} alt="" className="w-full h-full object-cover" aria-hidden="true" />
      </div>
      <div className="relative container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Individuele begeleiding
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-8" />
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-serif text-primary mb-3">01</div>
            <h3 className="font-serif text-lg text-foreground mb-2">Kennismaking</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Een vrijblijvend gesprek om je wensen en behoeften te verkennen.
            </p>
          </div>
          <div>
            <div className="text-4xl font-serif text-primary mb-3">02</div>
            <h3 className="font-serif text-lg text-foreground mb-2">Op maat</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Sessies afgestemd op jouw persoonlijke situatie en tempo.
            </p>
          </div>
          <div>
            <div className="text-4xl font-serif text-primary mb-3">03</div>
            <h3 className="font-serif text-lg text-foreground mb-2">Integratie</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Oefeningen en tools om zelfcompassie in je dagelijks leven te weven.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
