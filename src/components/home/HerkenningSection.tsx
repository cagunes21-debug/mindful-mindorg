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
      <section className="py-24 md:py-32 bg-warm-50">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-5">
              <ScrollReveal>
                <span className="block uppercase tracking-[0.2em] text-[10px] font-medium text-terracotta-500 mb-5">
                  {t("home.herkenning.eyebrow")}
                </span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foreground max-w-[14ch]">
                  {t("home.herkenning.titleA")}{" "}
                  <span className="italic font-light text-primary">{t("home.herkenning.titleB")}</span>
                </h2>
              </ScrollReveal>
            </div>
            <div className="md:col-span-7 md:pt-3">
              <ScrollReveal delay={0.1}>
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
                    <div>
                      <ul className="space-y-4">
                        {imagineItems.map((line, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-4 text-foreground/85 text-[15px] md:text-base leading-[1.75]"
                          >
                            <span className="mt-3 h-px w-5 bg-terracotta-500 flex-shrink-0" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>

                      {closingShort.length > 0 && (
                        <div className="mt-10 flex flex-col gap-1 font-serif italic text-xl md:text-2xl text-foreground">
                          {closingShort.map((line, i) => (
                            <span key={i}>{line.replace(/\.$/, "")}</span>
                          ))}
                        </div>
                      )}

                      {finale && (
                        <p className="mt-6 font-serif text-xl md:text-2xl text-primary leading-[1.4] italic">
                          {finale}
                        </p>
                      )}
                    </div>
                  );
                })()}
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Deel 2 — Waarom zelfcompassie (sage tonal band, centered editorial) */}
      <section className="py-28 md:py-40 bg-sage-50/40 border-y border-foreground/5">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="text-center">
            <ScrollReveal>
              <span className="block uppercase tracking-[0.2em] text-[10px] font-medium text-terracotta-500 mb-6">
                {t("home.herkenning.whyEyebrow")}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl italic leading-[1.1] tracking-tight text-foreground mb-12 max-w-[20ch] mx-auto">
                {t("home.herkenning.whyTitleA")}{" "}
                <span className="text-primary not-italic font-light">{t("home.herkenning.whyTitleB")}</span>
              </h2>

              {t("home.herkenning.whyIntro") && (
                <div className="mb-10 max-w-[58ch] mx-auto">
                  {(() => {
                    const introParts = t("home.herkenning.whyIntro")
                      .split("\n\n")
                      .map((s) => s.trim())
                      .filter(Boolean);
                    return (
                      <div className="space-y-5">
                        {introParts.map((part, i) => (
                          <p
                            key={i}
                            className={`leading-[1.8] ${
                              i === introParts.length - 1
                                ? "font-serif italic text-xl md:text-2xl text-foreground"
                                : "text-foreground/80 text-[15px] font-light"
                            }`}
                          >
                            {part}
                          </p>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}

              {(() => {
                const parts = t("home.herkenning.whyP1")
                  .split("\n\n")
                  .map((s) => s.trim())
                  .filter(Boolean);
                const intro = parts[0];
                const bulletItems = parts.filter((s, i) => i > 0 && i < parts.length - 2);
                const closing = parts.slice(parts.length - 2);
                return (
                  <div className="max-w-[58ch] mx-auto">
                    {intro && (
                      <p className="text-foreground/80 text-[15px] leading-[1.8] font-light">
                        {intro}
                      </p>
                    )}

                    {bulletItems.length > 0 && (
                      <ul className="mt-8 space-y-3 flex flex-col items-center">
                        {bulletItems.map((line, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-4 text-foreground font-serif italic text-lg md:text-xl"
                          >
                            <span className="h-px w-5 bg-terracotta-500 flex-shrink-0" />
                            <span>{line.replace(/\.$/, "")}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {closing.length > 0 && (
                      <div className="mt-10 space-y-3">
                        {closing.map((line, i) => (
                          <p
                            key={i}
                            className={`leading-[1.7] ${
                              i === closing.length - 1
                                ? "font-serif text-xl md:text-2xl text-primary italic"
                                : "text-foreground/80 text-[15px] font-light"
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

      {/* Deel 2.5 — Zelfcompassie werkt anders */}
      <section className="py-24 md:py-32 bg-background border-t border-foreground/10">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-5">
              <ScrollReveal>
                <span className="block uppercase tracking-[0.2em] text-[10px] font-medium text-terracotta-500 mb-5">
                  {t("home.herkenning.worksEyebrow")}
                </span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foreground">
                  {t("home.herkenning.worksTitle")}
                </h2>
              </ScrollReveal>
            </div>
            <div className="md:col-span-7 md:pt-3">
              <ScrollReveal delay={0.1}>
                {(() => {
                  const parts = t("home.herkenning.worksP1")
                    .split("\n\n")
                    .map((s) => s.trim())
                    .filter(Boolean);
                  return (
                    <div className="space-y-6 max-w-[58ch]">
                      {parts.map((part, i) => (
                        <p
                          key={i}
                          className={`leading-[1.8] ${
                            i === parts.length - 1
                              ? "font-serif italic text-xl md:text-2xl text-primary"
                              : "text-foreground/85 text-[15px] md:text-base font-light"
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
        </div>
      </section>

      {/* Deel 3 — Wat deelnemers merken */}
      <section className="py-24 md:py-32 bg-warm-50 border-t border-foreground/10">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <ScrollReveal>
            <div className="text-center mb-20 max-w-[56ch] mx-auto">
              <div className="font-serif text-terracotta-400/50 text-7xl leading-none mb-2 select-none">“</div>
              <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-foreground leading-[1.35] tracking-tight">
                {t("home.herkenning.quote")}
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8 border-t border-foreground/10 pt-12">
              {recognitionItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 group"
                >
                  <span className="mt-2 h-px w-5 bg-terracotta-500 flex-shrink-0 group-hover:w-8 transition-all duration-500" />
                  <p className="text-foreground/85 text-[15px] leading-[1.75] font-light">{item}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default HerkenningSection;
