UPDATE msc_items
SET
  instructions_markdown = $md$## 🌿 Script – Sessiethema: Vriendelijkheid Beoefenen

**Duur:** ± 1 minuut

---

*"Voordat we beginnen, wil ik kort het thema van de sessie van vandaag introduceren."*

*(pauze)*

*"In de vorige sessie hebben we mindfulness verkend…"*

*"we leerden hoe we een zachte aandacht naar onze ervaring kunnen brengen."*

*(pauze)*

*"Je zou kunnen zeggen dat we begonnen zijn met het opwarmen van ons bewustzijn."*

*(pauze)*

*"En vandaag zetten we de volgende stap…"*

*"door vriendelijkheid in dat bewustzijn te brengen."*

*"Wanneer die vriendelijkheid op onszelf gericht is…"*

*"vooral in moeilijke momenten…"*

*"dan wordt het zelfcompassie."*

*(pauze)*

*"In deze sessie verkennen we het verschil tussen vriendelijkheid en compassie…"*

*"niet alleen conceptueel, maar ook door directe ervaring."*

*(pauze)*

*"We oefenen samen, inclusief een oefening in tweetallen…"*

*"en we beginnen met het werken met zinnen in meditatie…"*

*"om een meer vriendelijke en ondersteunende innerlijke stem te cultiveren."*

*(pauze)*

*"En je krijgt ook de gelegenheid om woorden of zinnen te ontdekken…"*

*"die authentiek en betekenisvol voor je voelen."*

*"Deze sessie is dus echt een uitnodiging…"*

*"om met meer vriendelijkheid naar jezelf te leren kijken."*

*(pauze)*$md$,
  instructions_translations = COALESCE(instructions_translations, '{}'::jsonb) || jsonb_build_object(
    'en', $en$## 🌿 Script – Session Theme: Practicing Kindness

**Duration:** ± 1 minute

---

*"Before we begin, I'd like to briefly introduce the theme of today's session."*

*(pause)*

*"In the previous session, we explored mindfulness…"*

*"learning how to bring a gentle awareness to our experience."*

*(pause)*

*"You could say we began to warm up our awareness."*

*(pause)*

*"And today, we take the next step…"*

*"by bringing kindness into that awareness."*

*"When this kindness is directed toward ourselves…"*

*"especially in moments of difficulty…"*

*"it becomes self-compassion."*

*(pause)*

*"In this session, we'll explore the difference between kindness and compassion…"*

*"not only conceptually, but also through direct experience."*

*(pause)*

*"We'll practice together, including an exercise in pairs…"*

*"and we'll begin working with phrases in meditation…"*

*"to help cultivate a more kind and supportive inner voice."*

*(pause)*

*"And you'll also have the opportunity to discover words or phrases…"*

*"that feel authentic and meaningful to you."*

*"So this session is really an invitation…"*

*"to begin relating to yourself with more kindness."*

*(pause)*$en$,
    'es', $es$## 🌿 Guion – Tema de la Sesión: Practicar la Amabilidad

**Duración:** ± 1 minuto

---

*"Antes de comenzar, me gustaría presentar brevemente el tema de la sesión de hoy."*

*(pausa)*

*"En la sesión anterior, exploramos el mindfulness…"*

*"aprendiendo a llevar una conciencia suave a nuestra experiencia."*

*(pausa)*

*"Se podría decir que empezamos a calentar nuestra conciencia."*

*(pausa)*

*"Y hoy, damos el siguiente paso…"*

*"trayendo amabilidad a esa conciencia."*

*"Cuando esa amabilidad se dirige hacia nosotros mismos…"*

*"especialmente en momentos de dificultad…"*

*"se convierte en autocompasión."*

*(pausa)*

*"En esta sesión, exploraremos la diferencia entre amabilidad y compasión…"*

*"no solo conceptualmente, sino también a través de la experiencia directa."*

*(pausa)*

*"Practicaremos juntos, incluyendo un ejercicio en parejas…"*

*"y comenzaremos a trabajar con frases en meditación…"*

*"para ayudar a cultivar una voz interior más amable y solidaria."*

*(pausa)*

*"Y también tendrás la oportunidad de descubrir palabras o frases…"*

*"que se sientan auténticas y significativas para ti."*

*"Así que esta sesión es realmente una invitación…"*

*"a comenzar a relacionarte contigo mismo con más amabilidad."*

*(pausa)*$es$,
    'tr', $tr$## 🌿 Senaryo – Oturum Teması: Nazikliği Uygulamak

**Süre:** ± 1 dakika

---

*"Başlamadan önce, bugünkü oturumun temasını kısaca tanıtmak istiyorum."*

*(duraklama)*

*"Önceki oturumda farkındalığı keşfettik…"*

*"deneyimimize nazik bir farkındalık getirmeyi öğrendik."*

*(duraklama)*

*"Farkındalığımızı ısıtmaya başladığımızı söyleyebilirsiniz."*

*(duraklama)*

*"Ve bugün bir sonraki adımı atıyoruz…"*

*"bu farkındalığa naziklik getirerek."*

*"Bu naziklik kendimize yöneltildiğinde…"*

*"özellikle zor anlarda…"*

*"öz-şefkate dönüşür."*

*(duraklama)*

*"Bu oturumda naziklik ve şefkat arasındaki farkı keşfedeceğiz…"*

*"sadece kavramsal olarak değil, aynı zamanda doğrudan deneyim yoluyla."*

*(duraklama)*

*"Birlikte pratik yapacağız, ikili bir alıştırma da dahil…"*

*"ve meditasyonda cümlelerle çalışmaya başlayacağız…"*

*"daha nazik ve destekleyici bir iç ses geliştirmeye yardımcı olmak için."*

*(duraklama)*

*"Ve ayrıca sizin için otantik ve anlamlı hissedilen…"*

*"kelimeler veya cümleler keşfetme fırsatınız olacak."*

*"Yani bu oturum gerçekten bir davet…"*

*"kendinize daha fazla naziklikle yaklaşmaya başlamak için."*

*(duraklama)*$tr$
  ),
  updated_at = now()
WHERE id = '7ca67327-80e9-4348-a360-c54525bbc2b2'