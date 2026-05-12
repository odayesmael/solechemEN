import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { industries } from '../data/industries';
import { buildMetadata, buildCanonicalUrl, buildBreadcrumbSchema } from '../utils/seo';

export function Industries() {
  const navigate = useNavigate();

  const metadata = buildMetadata({
    title: 'Industry Solutions | Chemical Supplier for Manufacturing & Life Sciences',
    description: `Chemical solutions for ${industries.length}+ industries. Manufacturing, life sciences, food, agriculture, cosmetics, and more. Specialized supply chain for every sector.`,
    canonical: buildCanonicalUrl('/industries'),
    ogImage: buildCanonicalUrl('/og-industries.webp'),
  });

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Industries', url: buildCanonicalUrl('/industries') },
  ]);

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="industry solutions, manufacturing, life sciences, food industry, agriculture, cosmetics, chemical supplier" />
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
          {JSON.stringify(breadcrumb)}
        </script>
      </Helmet>

    <div className="flex-1 bg-white flex flex-col min-h-screen">
      <div className="bg-white pt-32 pb-16 px-4 md:px-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto relative w-full flex flex-col items-start gap-4">
          <Link to="/" className="text-slate-500 hover:text-brand-dark uppercase tracking-widest text-[10px] font-bold flex items-center gap-2 group mb-4 transition-colors">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <span className="inline-block bg-brand-orange text-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest">
            Markets We Serve
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-brand-dark mb-4">ALL INDUSTRIES</h1>
          <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
            From heavy manufacturing to life sciences, we provide strategic chemical sourcing and supply chain solutions tailored to your industry's exact requirements and regulatory standards.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {industries.map((ind, i) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.5 }}
              key={ind.name}
              onClick={() => navigate(`/catalog?industry=${encodeURIComponent(ind.name)}`)}
              className="group flex flex-col gap-5 cursor-pointer"
            >
              <div className="w-full relative aspect-[4/3] overflow-hidden bg-slate-100 rounded-sm">
                <img 
                  src={ind.image} 
                  alt={ind.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>
              <div className="flex flex-col flex-1 justify-between gap-4">
                <h4 className="text-lg font-bold text-brand-dark group-hover:text-brand-orange transition-colors">
                  {ind.name}
                </h4>
                <div className="flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  View Products
                  <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="w-full h-px bg-slate-200 scale-x-100 origin-left transition-transform duration-300 group-hover:bg-brand-orange/50"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
