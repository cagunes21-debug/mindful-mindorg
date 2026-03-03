const trainers = [
  {
    name: "Çağla Güneş",
    role: "Traumatherapeut en Mindful Zelfcompassie-trainer",
  },
];

const TrainersSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Ontmoet de trainers
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto" />
        </div>
        <div className="max-w-sm mx-auto">
          {trainers.map((trainer) => (
            <div key={trainer.name} className="text-center">
              <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                <span className="font-serif text-2xl text-primary">
                  {trainer.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-serif text-xl text-foreground mb-1">{trainer.name}</h3>
              <p className="text-muted-foreground text-sm">{trainer.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainersSection;
