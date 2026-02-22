import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { ScrollReveal } from "@/components/ScrollReveal";

const AlgemeneVoorwaarden = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Algemene Voorwaarden"
        description="Algemene voorwaarden van Mindful Mind voor trainingen, coaching en retreats op het gebied van mindfulness en zelfcompassie."
      />
      <Navigation />

      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <h1 className="mb-8 text-3xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl leading-[1.1]">
                Algemene <span className="font-serif italic text-terracotta-600">Voorwaarden</span>
              </h1>
              <p className="text-muted-foreground mb-12">
                Laatst bijgewerkt: {new Date().toLocaleDateString("nl-NL", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </ScrollReveal>

            <div className="prose prose-neutral max-w-none space-y-10 text-foreground">
              <Section title="Artikel 1 – Definities">
                <p>In deze algemene voorwaarden wordt verstaan onder:</p>
                <ul>
                  <li><strong>Mindful Mind:</strong> de eenmanszaak Mindful Mind, ingeschreven bij de Kamer van Koophandel onder nummer 91593700.</li>
                  <li><strong>Deelnemer:</strong> de natuurlijke persoon die zich aanmeldt voor een training, coaching of retreat.</li>
                  <li><strong>Opdrachtgever:</strong> de natuurlijke of rechtspersoon die een overeenkomst aangaat met Mindful Mind.</li>
                  <li><strong>Overeenkomst:</strong> de overeenkomst tussen Mindful Mind en de deelnemer/opdrachtgever.</li>
                  <li><strong>Training:</strong> een groepstraining, individueel traject, retreat of workshop aangeboden door Mindful Mind.</li>
                </ul>
              </Section>

              <Section title="Artikel 2 – Toepasselijkheid">
                <ul>
                  <li>Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes en overeenkomsten tussen Mindful Mind en de deelnemer/opdrachtgever.</li>
                  <li>Afwijkingen van deze voorwaarden zijn slechts geldig indien schriftelijk overeengekomen.</li>
                  <li>Door aanmelding voor een training verklaart de deelnemer zich akkoord met deze voorwaarden.</li>
                </ul>
              </Section>

              <Section title="Artikel 3 – Aanmelding en inschrijving">
                <ul>
                  <li>Aanmelding geschiedt via het inschrijfformulier op de website of per e-mail.</li>
                  <li>Na aanmelding ontvangt de deelnemer een bevestiging per e-mail. De overeenkomst komt tot stand op het moment van deze bevestiging.</li>
                  <li>Mindful Mind behoudt zich het recht voor om een aanmelding zonder opgaaf van redenen te weigeren.</li>
                </ul>
              </Section>

              <Section title="Artikel 4 – Prijzen en betaling">
                <ul>
                  <li>Alle genoemde prijzen zijn inclusief BTW, tenzij anders vermeld.</li>
                  <li>Betaling dient te geschieden binnen 14 dagen na factuurdatum, tenzij anders overeengekomen.</li>
                  <li>Bij niet-tijdige betaling is de deelnemer van rechtswege in verzuim en is Mindful Mind gerechtigd wettelijke rente in rekening te brengen.</li>
                  <li>In onderling overleg kan een betalingsregeling worden getroffen.</li>
                </ul>
              </Section>

              <Section title="Artikel 5 – Annulering door deelnemer">
                <ul>
                  <li>Annulering dient schriftelijk (per e-mail) te geschieden.</li>
                  <li>Bij annulering tot 30 dagen voor aanvang: volledige restitutie minus €25 administratiekosten.</li>
                  <li>Bij annulering tussen 30 en 14 dagen voor aanvang: 50% van het trainingsbedrag.</li>
                  <li>Bij annulering binnen 14 dagen voor aanvang: geen restitutie.</li>
                  <li>De deelnemer mag zich laten vervangen door een andere persoon, mits dit vooraf is gemeld.</li>
                </ul>
              </Section>

              <Section title="Artikel 6 – Annulering door Mindful Mind">
                <ul>
                  <li>Mindful Mind behoudt zich het recht voor een training te annuleren bij onvoldoende deelnemers of overmacht.</li>
                  <li>Bij annulering door Mindful Mind wordt het volledige bedrag gerestitueerd of wordt een alternatieve datum aangeboden.</li>
                  <li>Mindful Mind is niet aansprakelijk voor eventuele gevolgschade door annulering.</li>
                </ul>
              </Section>

              <Section title="Artikel 7 – Aansprakelijkheid">
                <ul>
                  <li>Deelname aan trainingen, coaching en retreats geschiedt op eigen risico van de deelnemer.</li>
                  <li>Mindful Mind is niet aansprakelijk voor directe of indirecte schade die voortvloeit uit deelname.</li>
                  <li>De trainingen van Mindful Mind zijn geen vervanging voor professionele psychologische of medische hulp.</li>
                  <li>Bij twijfel over geschiktheid adviseert Mindful Mind om vooraf contact op te nemen.</li>
                </ul>
              </Section>

              <Section title="Artikel 8 – Vertrouwelijkheid">
                <ul>
                  <li>Mindful Mind en de trainer(s) behandelen alle persoonlijke informatie van deelnemers vertrouwelijk.</li>
                  <li>Deelnemers wordt gevraagd om hetgeen door andere deelnemers wordt gedeeld vertrouwelijk te behandelen.</li>
                </ul>
              </Section>

              <Section title="Artikel 9 – Intellectueel eigendom">
                <ul>
                  <li>Alle materialen (teksten, audio, werkboeken) die tijdens trainingen worden verstrekt, zijn eigendom van Mindful Mind.</li>
                  <li>Het is niet toegestaan materialen te verveelvoudigen, verspreiden of commercieel te gebruiken zonder schriftelijke toestemming.</li>
                </ul>
              </Section>

              <Section title="Artikel 10 – Privacy">
                <p>
                  Mindful Mind verwerkt persoonsgegevens conform de Algemene Verordening Gegevensbescherming (AVG).
                  Zie onze{" "}
                  <a href="/privacy" className="text-terracotta-600 hover:underline">
                    privacyverklaring
                  </a>{" "}
                  voor meer informatie.
                </p>
              </Section>

              <Section title="Artikel 11 – Klachten">
                <ul>
                  <li>Klachten dienen binnen 14 dagen na het ontstaan schriftelijk te worden ingediend bij Mindful Mind.</li>
                  <li>Mindful Mind zal binnen 30 dagen reageren op de klacht.</li>
                  <li>Indien de klacht niet naar tevredenheid wordt opgelost, kan de deelnemer zich wenden tot de bevoegde rechter.</li>
                </ul>
              </Section>

              <Section title="Artikel 12 – Toepasselijk recht">
                <p>
                  Op alle overeenkomsten tussen Mindful Mind en de deelnemer/opdrachtgever is Nederlands recht van toepassing.
                  Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement waar Mindful Mind is gevestigd.
                </p>
              </Section>

              <div className="mt-12 p-6 bg-warm-50 rounded-2xl border border-warm-200">
                <p className="text-sm text-muted-foreground">
                  <strong>Mindful Mind</strong><br />
                  KvK: 91593700<br />
                  E-mail:{" "}
                  <a href="mailto:mindful-mind@outlook.com" className="text-terracotta-600 hover:underline">
                    mindful-mind@outlook.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <ScrollReveal>
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-3">{title}</h2>
      <div className="text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </div>
  </ScrollReveal>
);

export default AlgemeneVoorwaarden;
