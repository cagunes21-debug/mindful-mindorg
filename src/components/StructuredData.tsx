import { Helmet } from "react-helmet-async";

interface FAQItem {
  question: string;
  answer: string;
}

interface OrganizationSchemaProps {
  name?: string;
  description?: string;
  url?: string;
  logo?: string;
  email?: string;
}

interface FAQSchemaProps {
  items: FAQItem[];
}

export function OrganizationSchema({
  name = "Zelfcompassie Training",
  description = "Mindful Self-Compassion trainingen voor meer rust, veerkracht en welzijn. Gecertificeerde MSC trainers begeleiden je op je reis naar meer zelfcompassie.",
  url = "https://zelfcompassietraining.nl",
  logo = "/og-image.jpg",
  email = "info@zelfcompassietraining.nl",
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    description,
    url,
    logo: `${url}${logo}`,
    email,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email,
      availableLanguage: ["Dutch", "English"],
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

export function FAQSchema({ items }: FAQSchemaProps) {
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
}

export function CourseSchema({
  name,
  description,
  provider = "Zelfcompassie Training",
  duration = "8 weeks",
  price = "550",
  currency = "EUR",
}: CourseSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
    },
    timeRequired: duration,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: currency,
      availability: "https://schema.org/InStock",
    },
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
    name: "Zelfcompassie Training",
    url: "https://zelfcompassietraining.nl",
    description: "Mindful Self-Compassion trainingen voor meer rust, veerkracht en welzijn.",
    inLanguage: ["nl", "en"],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
