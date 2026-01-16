import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  keywords?: string;
}

const defaultMeta = {
  siteName: "Zelfcompassie Training",
  title: "Mindful Self-Compassion Training | Leer Zelfcompassie",
  description: "Ontdek de kracht van zelfcompassie met onze 8-weekse MSC training. Leer mindfulness en zelfcompassie technieken voor meer rust, veerkracht en welzijn.",
  ogImage: "/og-image.jpg",
  keywords: "zelfcompassie, mindful self-compassion, MSC, training, mindfulness, welzijn, meditatie, zelfzorg",
};

export function SEO({
  title,
  description = defaultMeta.description,
  canonical,
  ogImage = defaultMeta.ogImage,
  ogType = "website",
  keywords = defaultMeta.keywords,
}: SEOProps) {
  const fullTitle = title 
    ? `${title} | ${defaultMeta.siteName}` 
    : defaultMeta.title;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Zelfcompassie Training" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={defaultMeta.siteName} />
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
}

export default SEO;
