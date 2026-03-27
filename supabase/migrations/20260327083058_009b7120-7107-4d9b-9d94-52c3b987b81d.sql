UPDATE public.msc_items
SET instructions_translations = jsonb_set(
  COALESCE(instructions_translations, '{}'::jsonb),
  '{individual}',
  to_jsonb('## 🌿 Script – Liefdevolle vriendelijkheid (individuele sessie)

**Duur:** ±10–15 minuten (flexibel)

### 🌱 Start (afstemmen)

"Laten we even samen landen.
Neem een houding die voor jou prettig is… zittend of liggend.

Als het oké voelt, kun je je ogen sluiten…
of je blik zacht houden."

*Pauze*

"Misschien is het fijn om even iets dieper in en uit te ademen…
zonder dat het moet…
gewoon om wat meer aan te komen in dit moment."

*Pauze*

"En voel even… hoe het nu met je is.
Je hoeft niets te veranderen.
Alleen opmerken."

### 🤍 Zachte uitnodiging (belangrijk in 1-op-1)

"Als het helpend is, kun je jezelf een zachte, steunende aanraking geven…
bijvoorbeeld een hand op je hart… of ergens anders waar het prettig voelt.

En als dat niet prettig is, dan is dat ook helemaal oké."

### 🌬️ Aandacht naar het lichaam

"Breng je aandacht rustig naar je ademhaling…
voel waar je de adem het makkelijkst kunt waarnemen.

Misschien in je buik… je borst… of bij je neus."

*Pauze*

"En als je merkt dat je afdwaalt,
breng jezelf dan vriendelijk terug…
zonder oordeel."

### 💛 Overgang naar zelfcompassie-zinnen

"En als je er klaar voor bent…
nodig ik je uit om de woorden of zinnen te gebruiken
die we eerder hebben gekozen…

woorden die vriendelijk voor je zijn…
woorden die je misschien nodig hebt om te horen."

*Lange pauze*

"Je kunt ze in jezelf herhalen…
of heel zachtjes fluisteren…
op jouw manier."

### 🌊 Verdieping (meer ruimte dan in groep)

"Voel eens hoe het is
om deze woorden aan jezelf te geven…

misschien komen ze makkelijk…
misschien ook helemaal niet…
en alles daartussenin is welkom."

*Pauze*

"Je hoeft niets te forceren.
Je mag het tempo volgen dat voor jou klopt."

### 🧠 Werken met weerstand (belangrijk 1-op-1)

"En als je merkt dat er weerstand is…
of dat de woorden niet binnenkomen…

kijk dan of je daar ook met een beetje vriendelijkheid bij kunt zijn.
Misschien is dát op dit moment genoeg."

### 🌿 Integratie in het lichaam

"Misschien kun je de woorden een beetje laten landen in je lichaam…
zonder dat het perfect hoeft…

gewoon een klein beetje voelen
wat ze doen… of niet doen."

### 🏠 Terugkomen

"En als je merkt dat je aandacht afdwaalt,
kom dan rustig terug…

via je adem…
of via je lichaam…
of via de aanraking…

en dan weer terug naar je woorden.

Steeds weer terug naar vriendelijkheid."

### 🌙 Afronding

"En laat dan nu langzaam de woorden los…

en neem even een moment
om gewoon te zijn…

zoals je nu bent."

*Pauze*

"Voel je lichaam…
de ruimte om je heen…
de adem die vanzelf beweegt."

### 👁️ Terugkomen

"En wanneer je er klaar voor bent…
breng dan rustig wat beweging terug…

en open langzaam je ogen."

### 💬 Mini inquiry (1-op-1, meer verdiepend)

In plaats van standaard vragen, kun je meer afgestemd werken:

- "Hoe was dit voor je?"
- "Wat viel je op?"
- "Hoe was het om deze woorden tegen jezelf te zeggen?"
- "Kwam er iets wat lastig was?"
- "Wat had je misschien nodig in dat moment?"

> 👉 Laat hier echt ruimte voor stilte en proces

### 🔑 Belangrijk verschil met groep

In 1-op-1:

- Meer pauzes en vertraging
- Meer normaliseren van weerstand
- Meer ruimte voor ''het werkt niet''
- Minder strak script, meer voelen en volgen

### ✨ Tip voor jouw stijl

Je kunt tussendoor ook zeggen:

- "Je hoeft het niet goed te doen"
- "Ook dit mag er zijn"
- "We doen dit samen"

> 👉 Dit versterkt veiligheid en co-regulatie'::text)
),
    updated_at = now()
WHERE id = '2ee49baf-9d27-4d7c-b9c3-1340f38b78d5';