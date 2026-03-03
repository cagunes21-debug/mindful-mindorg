import { Heart, Shield, Eye, Star, Pen } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Heart,
    title: "Mildheid voor jezelf",
    description: "Je leert jezelf te troosten en steunen wanneer het moeilijk is, in plaats van jezelf te bekritiseren.",
    gradient: "from-rose-100 to-rose-50",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-500",
  },
  {
    icon: Shield,
    title: "Meer veerkracht",
    description: "Je bouwt emotionele stabiliteit op en leert beter omgaan met stress, twijfel en tegenslag.",
    gradient: "from-lavender-100 to-lavender-50",
    iconBg: "bg-lavender-100",
    iconColor: "text-lavender-500",
  },
  {
    icon: Eye,
    title: "Rust in je hoofd",
    description: "Je ontwikkelt de vaardigheid om even stil te staan, zonder te oordelen over wat je voelt.",
    gradient: "from-sage-100 to-sage-50",
    iconBg: "bg-sage-100",
    iconColor: "text-sage-600",
  },
  {
    icon: Star,
    title: "Verbinding met jezelf",
    description: "Je herstelt de relatie met jezelf en ontdekt wat je écht nodig hebt om in balans te leven.",
    gradient: "from-coral-100 to-coral-50",
    iconBg: "bg-coral-100",
    iconColor: "text-coral-500",
  },
  {
    icon: Pen,
    title: "Handvatten voor elke dag",
    description: "Je krijgt oefeningen en tools die je direct kunt inzetten — thuis, op werk, in relaties.",
    gradient: "from-terracotta-100 to-warm-100",
    iconBg: "bg-terracotta-100",
    iconColor: "text-terracotta-600",
  },
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {benefits.map((benefit) => (
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
      </div>
    </section>
  );
};

export default BenefitsSection;
