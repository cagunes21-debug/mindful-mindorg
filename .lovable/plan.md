# Volledige i18n-refactor — 4 fases

Scope: NL + EN + ES + TR, met `/nl/`, `/en/`, `/es/`, `/tr/` URL-prefixen, verbeterde switcher, audit van hardcoded strings, en SEO-metadata per taal. Ik adviseer fase-voor-fase te werken — elke fase is op zichzelf bruikbaar en goedkeurbaar.

---

## Fase 1 — Switcher UX + i18n-infrastructuur (snel, lage risico)

**Bestanden:** `LanguageToggle.tsx`, `LanguageContext.tsx`, `index.html`, `App.tsx`

- Switcher vervangen door dropdown met vlaggen 🇳🇱 🇬🇧 🇪🇸 🇹🇷 + actieve staat duidelijk (achtergrond + checkmark)
- Werkt identiek op desktop én mobiel (zelfde component)
- `<html lang="">` synchroon met taalkeuze (voorkomt SEO-mismatch)
- Persistentie via `localStorage` (al aanwezig) + cookie als backup voor SSR-toekomst
- Anti-flicker: taal initialiseren vóór eerste render (synchroon uit localStorage), `Suspense`-loze fallback
- Fallback-chain: gekozen taal → NL → key (zoals nu, maar consistent gelogd in dev)

**Deliverable:** Werkende verbeterde toggle, geen content-veranderingen.

---

## Fase 2 — ES + TR vertalingen toevoegen

**Bestanden:** `src/i18n/es.ts` (nieuw), `src/i18n/tr.ts` (nieuw), `LanguageContext.tsx`

- 594 vertaalkeys uit `nl.ts` → ES en TR via Lovable AI (Gemini 2.5 Pro) in batches
- Quality check: vergelijk key-counts, vlag missende keys
- `groupTrainingPageDict.ts` ook uitbreiden naar 4 talen (522 strings)

**Deliverable:** 4-talige UI voor alle reeds-vertaalde teksten. Hardcoded strings blijven NL.

**Let op:** AI-vertaling van 1100+ strings × 2 talen = ~5 min Gemini-calls. Onnauwkeurigheden mogelijk; copy-review door jou later aanbevolen.

---

## Fase 3 — Hardcoded strings extraheren + audit-rapport

**Aanpak:**
- Script dat alle `.tsx`-bestanden scant op letterlijke NL-strings (regex: jsx-tekst die niet binnen `t()`/`tx()` staat)
- Genereert `/mnt/documents/i18n-audit-report.md` met:
  - Bestanden met hardcoded NL-tekst (regel-precies)
  - Ongebruikte vertaalkeys in `nl.ts`/`en.ts`
  - Keys die in NL bestaan maar niet in EN (en omgekeerd)
  - Duplicaten
- Daarna: top 10 zwaarst-getroffen componenten (Footer, Home-secties, Services, Agenda, OverCagla) handmatig extraheren naar i18n-keys

**Realistisch:** ~150-300 hardcoded strings verwacht. Ik extraheer de **top 30 belangrijkste publieke pagina-strings**; volledige extractie van alle admin-componenten valt buiten redelijke scope (en admin is intern, hoeft niet meertalig).

**Deliverable:** Audit-rapport + top-pagina's volledig vertaalbaar.

---

## Fase 4 — Multilingual URLs (/nl/, /en/, /es/, /tr/) + SEO

**Bestanden:** `App.tsx` (router), `SEO.tsx`, alle pagina's met SEO-component, `sitemap.xml` + edge function, `Navigation.tsx` links

- Router restructuur: alle routes nesten onder `/:lang/`-prefix
- Root `/` → redirect naar `/{detected-lang}/` (browser-taal of localStorage)
- `Navigate` helper die taal-prefix automatisch toevoegt (alle `<Link to="/over-ons">` → `<Link to="/over-ons">` blijft werken via wrapper)
- `<link rel="alternate" hreflang="...">` per pagina in `SEO.tsx`
- Canonical per taal-variant
- Sitemap uitbreiden: elke URL × 4 talen
- 301-redirects van oude URLs naar `/nl/`-variant (via `_redirects` of edge function — niet ondersteund op Lovable hosting; in-app redirect via React Router)

**⚠️ Risico's:**
- **Breekt bestaande inbound links/bookmarks/Google-indexering** tot Google opnieuw crawlt (~2-4 weken)
- Alle SEO-canonicals moeten opnieuw
- 40+ pagina's krijgen route-prefix wijziging
- Edge function `sitemap` moet 4× zoveel URLs genereren

**Deliverable:** SEO-vriendelijke multilingual URLs, hreflang-tags, herziene sitemap.

---

## QA (na elke fase)

- Browser-preview testen per taal
- Console + network checken op fouten
- Steekproef SEO-metadata per taal

---

## Mijn sterke aanbeveling

**Doe Fase 1 + 2 eerst** (switcher + vertalingen). Dit lost 80% van het probleem op met minimaal risico. Bekijk daarna of Fase 3 (extractie) en Fase 4 (URL-routing) nog nodig zijn — vooral Fase 4 is een grote ingreep die SEO tijdelijk pijn doet.

**Wil je dat ik:**
- **A.** Alle 4 fases achter elkaar uitvoer (lange run, hoog credit-gebruik, hoog risico)
- **B.** Alleen Fase 1 + 2 nu, daarna opnieuw beslissen ⭐ aanbevolen
- **C.** Alleen Fase 1 nu

Geef de letter en ik start.
