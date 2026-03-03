import { Heart, Shield, Eye, Star, Pen, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const feelings = [
  { label: "Rust in je lichaam", color: "from-rose-200/60 to-rose-100/40", icon: "🌸" },
  { label: "Zachtheid naar jezelf", color: "from-lavender-200/60 to-lavender-100/40", icon: "💜" },
  { label: "Ruimte in je hoofd", color: "from-sage-200/60 to-sage-100/40", icon: "🍃" },
  { label: "Vertrouwen in je gevoel", color: "from-coral-200/60 to-coral-100/40", icon: "✨" },
];

const concreteResults = [
  { before: "Twijfelen over grenzen", after: "Je stelt duidelijker grenzen" },
  { before: "Schuldgevoel bij 'nee'", after: "Je zegt vaker 'nee' zonder schuldgevoel" },
  { before: "Stress opkroppen", after: "Je herkent stresssignalen eerder" },
  { before: "Eindeloos twijfelen", after: "Je maakt keuzes zonder eindeloos te twijfelen" },
];

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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const BenefitsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
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

        {/* Feeling pills — visual & compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {feelings.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className={`bg-gradient-to-r ${f.color} rounded-full px-6 py-3 flex items-center gap-2 border border-border/30`}
            >
              <span className="text-lg">{f.icon}</span>
              <span className="text-sm font-medium text-foreground">{f.label}</span>
            </motion.div>
          ))}
        </motion.div>

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

        {/* Concrete results — before/after style */}
        <div className="max-w-2xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-serif text-foreground text-center mb-10"
          >
            Concreet levert het je <em className="italic text-primary">op</em>
          </motion.h3>

          <div className="space-y-4 max-w-lg mx-auto">
            {concreteResults.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 rounded-xl bg-card border border-border/50 p-4"
              >
                <span className="text-xs text-muted-foreground line-through flex-shrink-0 w-[140px] hidden sm:block">
                  {item.before}
                </span>
                <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 hidden sm:block" />
                <span className="text-sm font-medium text-foreground">{item.after}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
