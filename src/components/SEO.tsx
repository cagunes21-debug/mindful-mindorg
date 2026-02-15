import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  keywords?: string;
  noindex?: boolean;
}

const BASE_URL = "https://mindfulmind.nl";

const defaultMeta = {
  siteName: "Mindful Mind",
  title: "Mindful Self-Compassion Training | Zelfcompassie Leren – Mindful Mind",
  description: "Ontdek de kracht van zelfcompassie met onze 8-weekse MSC training. Gecertificeerde trainers begeleiden je naar meer rust, veerkracht en welzijn. Online & in kleine groepen.",
  ogImage: "/og-image.jpg",
  keywords: "zelfcompassie, mindful self-compassion, MSC training, mindfulness training, zelfcompassie training, meditatie, welzijn, coaching, online training",
};

export function SEO({
  title,
  description = defaultMeta.description,
  canonical,
  ogImage = defaultMeta.ogImage,
  ogType = "website",
  keywords = defaultMeta.keywords,
  noindex = false,
}: SEOProps) {
  const fullTitle = title 
    ? `${title} | ${defaultMeta.siteName}` 
    : defaultMeta.title;

  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;
  const canonicalUrl = canonical || undefined;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Mindful Mind" />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <html lang="nl" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content={defaultMeta.siteName} />
      <meta property="og:locale" content="nl_NL" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Canonical */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
}

export default SEO;
