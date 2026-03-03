import { Heart, Shield, Eye, Star, Pen, Check } from "lucide-react";
import { motion } from "framer-motion";

const experiences = [
  {
    icon: Heart,
    title: "Mildheid voor jezelf",
    description: "Je leert jezelf te steunen en te troosten wanneer het moeilijk is — in plaats van jezelf te bekritiseren.",
    gradient: "from-rose-100 to-rose-50",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-500",
  },
  {
    icon: Shield,
    title: "Meer veerkracht",
    description: "Je ontwikkelt emotionele stabiliteit en leert beter omgaan met stress, twijfel en tegenslag.",
    gradient: "from-lavender-100 to-lavender-50",
    iconBg: "bg-lavender-100",
    iconColor: "text-lavender-500",
  },
  {
    icon: Eye,
    title: "Rust in je hoofd",
    description: "Je ontdekt hoe je kunt vertragen en ruimte kunt maken voor je gedachten en gevoelens, zonder oordeel.",
    gradient: "from-sage-100 to-sage-50",
    iconBg: "bg-sage-100",
    iconColor: "text-sage-600",
  },
  {
    icon: Star,
    title: "Verbinding met jezelf",
    description: "Je herstelt de relatie met jezelf en wordt je bewuster van wat jij écht nodig hebt om in balans te leven.",
    gradient: "from-coral-100 to-coral-50",
    iconBg: "bg-coral-100",
    iconColor: "text-coral-500",
  },
  {
    icon: Pen,
    title: "Praktische handvatten",
    description: "Je ontvangt concrete oefeningen en tools die je direct kunt toepassen — thuis, op werk en in je relaties.",
    gradient: "from-terracotta-100 to-warm-100",
    iconBg: "bg-terracotta-100",
    iconColor: "text-terracotta-600",
  },
];

const results = [
  "Meer innerlijke rust en minder piekeren",
  "Duidelijkere grenzen en minder over jezelf heen stappen",
  "Meer zelfvertrouwen en zelfcompassie",
  "Meer grip op stress en emoties",
  "Heldere keuzes die passen bij wie jij bent",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const BenefitsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-10 -left-20 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 -right-20 w-72 h-72 bg-lavender-200/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 max-w-5xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3"
          >
            Jouw transformatie
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif text-foreground mb-4"
          >
            Wat je zult <em className="italic text-primary">ervaren</em>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-20 h-0.5 bg-primary mx-auto origin-center"
          />
        </div>

        {/* Experience cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-20"
        >
          {experiences.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={cardVariants}
              className={`group relative rounded-xl p-5 bg-gradient-to-br ${benefit.gradient} border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
            >
              <div className={`w-10 h-10 rounded-lg ${benefit.iconBg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className={benefit.iconColor} size={20} />
              </div>
              <h3 className="font-serif text-lg text-foreground mb-1.5">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-xs">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Concrete results */}
        <div className="max-w-2xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-serif text-foreground text-center mb-8"
          >
            Concreet levert het je <em className="italic text-primary">op</em>
          </motion.h3>

          <motion.ul className="space-y-3 max-w-md mx-auto">
            {results.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 text-foreground"
              >
                <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </span>
                <span className="text-base leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
