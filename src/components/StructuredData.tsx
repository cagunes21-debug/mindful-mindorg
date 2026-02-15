import { Helmet } from "react-helmet-async";

const BASE_URL = "https://mindfulmind.nl";

interface FAQItem {
  question: string;
  answer: string;
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Mindful Mind",
    description: "Begeleiding in Mindfulness en Zelfcompassie. Gecertificeerde MSC trainers bieden 8-weekse trainingen, individuele coaching en retreats.",
    url: BASE_URL,
    logo: `${BASE_URL}/og-image.jpg`,
    email: "mindful-mind@outlook.com",
    telephone: "+31625633379",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NL",
    },
    priceRange: "€€",
    areaServed: {
      "@type": "Country",
      name: "Nederland",
    },
    serviceType: ["Mindfulness Training", "Zelfcompassie Training", "Coaching", "Retreat"],
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "mindful-mind@outlook.com",
      telephone: "+31625633379",
      availableLanguage: ["Dutch", "English"],
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

interface CourseSchemaProps {
  name: string;
  description: string;
  provider?: string;
  duration?: string;
  price?: string;
  currency?: string;
  deliveryMode?: string;
  locationName?: string;
}

export function CourseSchema({
  name,
  description,
  provider = "Mindful Mind",
  duration = "P8W",
  price = "550",
  currency = "EUR",
  deliveryMode = "Online",
  locationName,
}: CourseSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
      url: BASE_URL,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: deliveryMode,
      duration,
      ...(locationName && {
        location: {
          "@type": "Place",
          name: locationName,
          address: {
            "@type": "PostalAddress",
            addressLocality: locationName,
            addressCountry: "NL",
          },
        },
      }),
    },
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: currency,
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/agenda`,
    },
    inLanguage: "nl",
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mindful Mind",
    url: BASE_URL,
    description: "Begeleiding in Mindfulness en Zelfcompassie – trainingen, coaching en retreats.",
    inLanguage: "nl",
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

interface LocalBusinessSchemaProps {
  city: string;
  description: string;
}

export function LocalBusinessSchema({ city, description }: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `Mindful Mind – ${city}`,
    description,
    url: `${BASE_URL}/zelfcompassie-training/${city.toLowerCase().replace(/\s+/g, '-')}`,
    telephone: "+31625633379",
    email: "mindful-mind@outlook.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressCountry: "NL",
    },
    areaServed: {
      "@type": "City",
      name: city,
    },
    serviceType: ["Mindfulness Training", "Zelfcompassie Training", "MSC Training"],
    priceRange: "€€",
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
