import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { Shield } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Privacybeleid & Algemene Voorwaarden"
        description="Lees ons privacybeleid en onze algemene voorwaarden. Mindful Mind hecht veel waarde aan de bescherming van je persoonsgegevens."
      />
      <Navigation />

      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 mb-8 rounded-full bg-sage-100 border border-sage-200 px-5 py-2.5 text-sm font-medium text-sage-700">
              <Shield className="h-4 w-4" />
              Juridisch
            </span>
            <h1 className="mb-4 text-4xl font-light tracking-tight text-foreground md:text-5xl leading-[1.1]">
              Privacy <span className="font-serif italic text-terracotta-600">& Voorwaarden</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-12">

            {/* Privacybeleid */}
            <ScrollReveal>
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-warm-200 shadow-sm">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Privacybeleid</h2>
                
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">1. Verantwoordelijke</h3>
                    <p>Mindful Mind is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in dit privacybeleid. Voor vragen kun je contact opnemen via mindful-mind@outlook.com.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">2. Welke gegevens verzamelen wij</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Naam en contactgegevens (e-mailadres, telefoonnummer)</li>
                      <li>Betalingsgegevens bij inschrijving voor trainingen</li>
                      <li>Gegevens die je zelf verstrekt via het contactformulier</li>
                      <li>Technische gegevens zoals IP-adres en browsertype (via cookies)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">3. Doel van de verwerking</h3>
                    <p>Wij verwerken je gegevens voor de volgende doeleinden:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li>Het verwerken van inschrijvingen en betalingen</li>
                      <li>Het versturen van relevante informatie over trainingen</li>
                      <li>Het beantwoorden van vragen via het contactformulier</li>
                      <li>Het verbeteren van onze website en diensten</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">4. Bewaartermijn</h3>
                    <p>Wij bewaren je gegevens niet langer dan noodzakelijk voor de doeleinden waarvoor ze zijn verzameld, tenzij we wettelijk verplicht zijn ze langer te bewaren.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">5. Delen met derden</h3>
                    <p>Wij delen je gegevens niet met derden, tenzij dit noodzakelijk is voor de uitvoering van onze diensten (bijv. betalingsverwerking via Stripe) of wanneer wij wettelijk verplicht zijn.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">6. Jouw rechten</h3>
                    <p>Je hebt het recht om je persoonsgegevens in te zien, te corrigeren of te verwijderen. Ook heb je het recht om bezwaar te maken tegen de verwerking. Neem hiervoor contact op via mindful-mind@outlook.com.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">7. Cookies</h3>
                    <p>Onze website maakt gebruik van cookies om je ervaring te verbeteren. Bij je eerste bezoek kun je aangeven welke cookies je accepteert. Je kunt je voorkeuren op elk moment aanpassen.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Algemene Voorwaarden */}
            <ScrollReveal delay={0.1}>
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-warm-200 shadow-sm">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Algemene Voorwaarden</h2>
                
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">1. Toepasselijkheid</h3>
                    <p>Deze algemene voorwaarden zijn van toepassing op alle diensten en producten aangeboden door Mindful Mind, gevestigd in Nederland.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">2. Inschrijving & Betaling</h3>
                    <p>Na inschrijving voor een training ontvang je een bevestiging per e-mail. Betaling dient te geschieden via de aangeboden betaalmethoden. Bij niet-tijdige betaling kan de inschrijving worden geannuleerd.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">3. Annulering</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Tot 14 dagen voor aanvang: volledige restitutie</li>
                      <li>7–14 dagen voor aanvang: 50% restitutie</li>
                      <li>Minder dan 7 dagen voor aanvang: geen restitutie</li>
                      <li>Je kunt altijd een vervanger aanwijzen</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">4. Aansprakelijkheid</h3>
                    <p>Deelname aan trainingen en coaching is geheel op eigen risico. Mindful Mind is niet aansprakelijk voor enige schade die voortvloeit uit de deelname, tenzij er sprake is van opzet of grove nalatigheid.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">5. Vertrouwelijkheid</h3>
                    <p>Alles wat tijdens trainingen en sessies wordt gedeeld, wordt vertrouwelijk behandeld. Wij verwachten hetzelfde van alle deelnemers.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">6. Intellectueel eigendom</h3>
                    <p>Alle materialen, inclusief meditaties, werkboeken en andere content, zijn eigendom van Mindful Mind en mogen niet zonder toestemming worden verspreid of gekopieerd.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">7. Toepasselijk recht</h3>
                    <p>Op deze voorwaarden is Nederlands recht van toepassing. Eventuele geschillen worden voorgelegd aan de bevoegde rechter in Nederland.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;
