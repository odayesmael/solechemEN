import { Helmet } from 'react-helmet-async';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Stats } from '../components/Stats';
import { IndustriesBlock } from '../components/IndustriesBlock';
import { CategoriesGrid } from '../components/CategoriesGrid';
import { ProductSearch } from '../components/ProductSearch';
import { Values } from '../components/Values';
import { ManufacturingTeaser } from '../components/ManufacturingTeaser';
import { CTA } from '../components/CTA';
import { TrustedBy } from '../components/TrustedBy';
import { buildMetadata, buildCanonicalUrl, organizationSchema, buildWebsiteSchema, buildBreadcrumbSchema } from '../utils/seo';

export function Home() {
  const metadata = buildMetadata({
    title: 'SoleChem | Global Chemical Distributor & Manufacturer | 4,480+ Products',
    description: 'Global B2B chemical distributor supplying 4,480+ high-purity products to 50+ countries worldwide. ISO 9001 & GMP+ certified. Polyurethane systems, adhesives, paints, and industrial raw materials.',
    canonical: buildCanonicalUrl('/'),
    ogImage: buildCanonicalUrl('/og-home.webp'),
  });

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
  ]);

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="global chemical distributor, chemical manufacturer, B2B chemicals, industrial chemicals, international chemical supplier, ISO 9001, GMP+" />
        <link rel="canonical" href={metadata.canonical} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={metadata.ogTitle} />
        <meta property="og:description" content={metadata.ogDescription} />
        <meta property="og:image" content={metadata.ogImage} />
        <meta property="og:url" content={metadata.ogUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter Card Tags */}
        <meta name="twitter:title" content={metadata.twitterTitle} />
        <meta name="twitter:description" content={metadata.twitterDescription} />
        <meta name="twitter:image" content={metadata.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(buildWebsiteSchema())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumb)}
        </script>
      </Helmet>

      <Hero />
      <Stats />
      <IndustriesBlock />
      <About />
      <CategoriesGrid />
      <ProductSearch />
      <Values />
      <TrustedBy />
      <ManufacturingTeaser />
      <CTA />
    </>
  );
}
