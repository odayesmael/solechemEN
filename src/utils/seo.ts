// SEO Metadata and Structured Data utilities

export interface SEOMetadata {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  robots?: string;
  keywords?: string;
  author?: string;
}

const SITE_URL = 'https://solechem.com';
const SITE_NAME = 'SoleChem';

export const defaultMetadata: SEOMetadata = {
  title: 'SoleChem | Global Chemical Distributor & Manufacturer',
  description: 'Global B2B supplier of 4,480+ premium chemical products serving 50+ countries. ISO 9001, ISO 22000 & GMP+ certified. Polyurethane systems, adhesives, paints, and raw materials.',
  ogType: 'website',
  ogUrl: SITE_URL,
  robots: 'index, follow',
};

export function buildMetadata(overrides: Partial<SEOMetadata>): SEOMetadata {
  return {
    ...defaultMetadata,
    ...overrides,
    ogTitle: overrides.ogTitle || overrides.title,
    ogDescription: overrides.ogDescription || overrides.description,
    ogUrl: overrides.ogUrl || SITE_URL,
    twitterTitle: overrides.twitterTitle || overrides.title,
    twitterDescription: overrides.twitterDescription || overrides.description,
  };
}

export function buildCanonicalUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

// JSON-LD Structured Data

export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  foundingDate: string;
  sameAs: string[];
  certifications?: Array<{
    '@type': string;
    name: string;
  }>;
}

export const organizationSchema: OrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SoleChem Europe S.r.l.',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.webp`,
  description: 'Global B2B chemical distributor and manufacturer serving 50+ countries worldwide with 4,480+ high-purity chemicals.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Cassina de\' Pecchi, 12',
    addressLocality: 'Cassina de\' Pecchi (MI)',
    postalCode: '20060',
    addressCountry: 'IT',
  },
  foundingDate: '2013',
  sameAs: [
    'https://linkedin.com/company/solechem',
    'https://twitter.com/solechem',
    'https://facebook.com/solechem',
  ],
  certifications: [
    { '@type': 'Certification', name: 'ISO 9001:2015' },
    { '@type': 'Certification', name: 'ISO 22000:2018' },
    { '@type': 'Certification', name: 'GMP+ (SGS Certified)' },
  ],
};

export interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  logo: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone: string;
  email: string;
  openingHoursSpecification: Array<{
    '@type': string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
  areaServed: string[];
}

export const localBusinessSchema: LocalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SoleChem Europe S.r.l.',
  description: 'Global chemical distributor and manufacturer serving 50+ countries worldwide.',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.webp`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Cassina de\' Pecchi, 12',
    addressLocality: 'Cassina de\' Pecchi (MI)',
    postalCode: '20060',
    addressCountry: 'IT',
  },
  telephone: '+39 02 3055 6150',
  email: 'info@solechem.com',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  areaServed: ['Europe', 'Asia', 'Americas', 'Middle East', 'Africa', 'Global'],
};

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildProductSchema(product: {
  name: string;
  description: string;
  cas?: string;
  ec?: string;
  molWeight?: string;
  manufacturer: string;
  price?: string;
  image?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    manufacturer: {
      '@type': 'Organization',
      name: product.manufacturer,
    },
    url: product.url,
    ...(product.image && { image: product.image }),
    ...(product.price && {
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
      },
    }),
    additionalProperty: [
      ...(product.cas ? [{ '@type': 'PropertyValue', name: 'CAS Number', value: product.cas }] : []),
      ...(product.ec ? [{ '@type': 'PropertyValue', name: 'EC Number', value: product.ec }] : []),
      ...(product.molWeight ? [{ '@type': 'PropertyValue', name: 'Molecular Weight', value: product.molWeight }] : []),
    ],
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function buildFAQSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  publisher?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image.startsWith('http') ? article.image : `${SITE_URL}${article.image}`,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: article.publisher || SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/catalog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
