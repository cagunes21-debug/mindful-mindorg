import { ScrollReveal } from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const HerkenningSection = () => {
  const { t } = useLanguage();
  const recognitionItems = [
    t("home.herkenning.item1"),
    t("home.herkenning.item2"),
    t("home.herkenning.item3"),
    t("home.herkenning.item4"),
    t("home.herkenning.item5"),
    t("home.herkenning.item6"),
  ];
  return (
    <>
      {/* Deel 1 — Verlangen */}
      <section className="py-20 md:py-28 bg-warm-50 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-terracotta-100/30 rounded-full blur-[100px]" />
        <div className="container mx-auto px-6 md:px-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-terracotta-500 font-medium mb-5">
                {t("home.herkenning.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-[1.15] mb-6">
                {t("home.herkenning.titleA")}{" "}
                <span className="text-primary italic font-light">{t("home.herkenning.titleB")}</span>
              </h2>
              {(() => {
                const parts = t("home.herkenning.p1")
                  .split("\n\n")
                  .map((s) => s.trim())
                  .filter(Boolean);
                const imagineItems = parts.filter((s) => (s.startsWith("Dat") || s.startsWith("That") || s.startsWith("Que")) && !/zelfcompassie|self-compassion|autocompasión|öz şefkat/i.test(s));
                const closingShort = parts.filter(
                  (s) => !imagineItems.includes(s) && s.length < 25
                );
                const finale = parts.find(
                  (s) => !imagineItems.includes(s) && !closingShort.includes(s)
                );
                return (
                  <div className="mt-2 text-left">
                    <ul className="space-y-3 md:space-y-4">
                      {imagineItems.map((line, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-foreground/90 text-base md:text-lg leading-[1.7]"
                        >
                          <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-terracotta-400 flex-shrink-0" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>

                    {closingShort.length > 0 && (
                      <div className="mt-8 flex flex-col items-center gap-2 font-serif italic text-xl md:text-2xl text-foreground">
                        {closingShort.map((line, i) => (
                          <span key={i}>
                            {line.replace(/\.$/, "")}
                          </span>
                        ))}
                      </div>
                    )}

                    {finale && (
                      <p className="mt-6 text-center font-serif text-xl md:text-2xl text-primary leading-[1.4]">
                        {finale}
                      </p>
                    )}
                  </div>
                );
              })()}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Deel 2 — Waarom zelfcompassie */}
      <section className="py-20 md:py-28 bg-background relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-sage-100/30 rounded-full blur-[100px]" />
        <div className="container mx-auto px-6 md:px-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-terracotta-500 font-medium mb-5">
                {t("home.herkenning.whyEyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-[1.15] mb-6">
                {t("home.herkenning.whyTitleA")}{" "}
                <span className="text-primary italic font-light">{t("home.herkenning.whyTitleB")}</span>
              </h2>
              {(() => {
                const parts = t("home.herkenning.whyP1")
                  .split("\n\n")
                  .map((s) => s.trim())
                  .filter(Boolean);
                const intro = parts[0];
                const bulletItems = parts.filter((s, i) => i > 0 && i < parts.length - 2);
                const closing = parts.slice(parts.length - 2);
                return (
                  <div className="mt-2">
                    {intro && (
                      <p className="text-foreground/90 text-base md:text-lg leading-[1.7] text-center">
                        {intro}
                      </p>
                    )}

                    {bulletItems.length > 0 && (
                      <ul className="mt-6 space-y-3 md:space-y-4 flex flex-col items-center">
                        {bulletItems.map((line, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 text-foreground font-serif italic text-lg md:text-xl"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-terracotta-400 flex-shrink-0" />
                            <span>{line.replace(/\.$/, "")}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {closing.length > 0 && (
                      <div className="mt-8 space-y-2">
                        {closing.map((line, i) => (
                          <p
                            key={i}
                            className={`text-center text-base md:text-lg leading-[1.7] ${
                              i === closing.length - 1
                                ? "font-serif text-xl md:text-2xl text-primary"
                                : "text-foreground/80"
                            }`}
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Deel 2.5 — Zelfcompassie werkt anders (vervolg) */}
      <section className="py-20 md:py-28 bg-warm-50 relative overflow-hidden">
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-sage-100/30 rounded-full blur-[100px]" />
        <div className="container mx-auto px-6 md:px-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-terracotta-500 font-medium mb-5">
                {t("home.herkenning.worksEyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-[1.15] mb-10">
                {t("home.herkenning.worksTitle")}
              </h2>
              {(() => {
                const parts = t("home.herkenning.worksP1")
                  .split("\n\n")
                  .map((s) => s.trim())
                  .filter(Boolean);
                return (
                  <div className="space-y-6">
                    {parts.map((part, i) => (
                      <p
                        key={i}
                        className={`text-base md:text-lg leading-[1.7] ${
                          i === parts.length - 1
                            ? "font-serif text-xl md:text-2xl text-primary"
                            : "text-foreground/90"
                        }`}
                      >
                        {part}
                      </p>
                    ))}
                  </div>
                );
              })()}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Deel 3 — Wat deelnemers merken */}
      <section className="py-20 md:py-28 bg-background relative overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-sage-100/30 rounded-full blur-[100px]" />
        <div className="container mx-auto px-6 md:px-10 relative">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12 md:mb-14">
                <p className="font-serif italic text-xl md:text-2xl text-foreground leading-relaxed">
                  {t("home.herkenning.quote")}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-center text-foreground/80 text-base md:text-lg leading-[1.7] mb-8 md:mb-10 max-w-2xl mx-auto">
                {t("home.herkenning.cardsIntro")}
              </p>
              <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                {recognitionItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-warm-50/70 border border-terracotta-100/60 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:bg-warm-100 hover:shadow-md hover:shadow-terracotta-900/5"
                  >
                    <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-terracotta-400 flex-shrink-0" />
                    <p className="text-foreground text-base leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default HerkenningSection;
