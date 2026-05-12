import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, FileText, AlertTriangle, ShieldCheck, Beaker, FlaskConical, Tag, Factory, BookOpen } from 'lucide-react';
import { QuoteModal } from '../components/QuoteModal';
import { buildMetadata, buildCanonicalUrl, buildProductSchema, buildBreadcrumbSchema } from '../utils/seo';

export function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showQuote, setShowQuote] = useState(false);

  const cas = slug?.replace('cas-', '') || '';

  useEffect(() => {
    fetch('/data/products.json')
      .then(r => r.json())
      .then((data: any[]) => {
        const found = data.find(p => p.cas === cas);
        setProduct(found);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, [cas]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-32 flex-col space-y-4">
        <div className="w-12 h-12 border-4 border-brand-blue/20 border-t-brand-orange rounded-full animate-spin"></div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Loading Product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <>
        <Helmet>
          <title>Product Not Found | SoleChem</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="flex-1 flex items-center justify-center py-32 flex-col space-y-4">
          <h2 className="text-2xl font-black text-brand-dark">Product Not Found</h2>
          <Link to="/catalog" className="text-brand-orange hover:text-brand-orange-hover uppercase tracking-widest text-xs font-bold transition-colors">
            &larr; Back to Catalog
          </Link>
        </div>
      </>
    );
  }

  const physProps = product.physicalProperties;
  const tradeReg = product.tradeRegulatory;
  const descParagraphs = product.description ? product.description.split('\n\n') : [];

  const metadata = buildMetadata({
    title: `${product.name} | Chemical Product | SoleChem`,
    description: `${product.name} (CAS ${product.cas}). High-purity industrial chemical from SoleChem. ISO 9001 & REACH compliant. Technical specs, safety data, and pricing available.`,
    canonical: buildCanonicalUrl(`/products/cas-${product.cas}`),
    ogImage: buildCanonicalUrl('/og-product.webp'),
  });

  const productSchema = buildProductSchema({
    name: product.name,
    description: descParagraphs[0] || product.name,
    cas: product.cas,
    ec: product.ec,
    molWeight: product.molWeight,
    manufacturer: 'SoleChem',
    url: buildCanonicalUrl(`/products/cas-${product.cas}`),
    image: buildCanonicalUrl('/og-product.webp'),
  });

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Catalog', url: buildCanonicalUrl('/catalog') },
    ...(product.category ? [{ name: product.category, url: buildCanonicalUrl(`/catalog?category=${product.category}`) }] : []),
    { name: product.name, url: buildCanonicalUrl(`/products/cas-${product.cas}`) },
  ]);

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={`${product.name}, CAS ${product.cas}, chemical, ${product.category}, industrial chemical`} />
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
          {JSON.stringify(productSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumb)}
        </script>
      </Helmet>

    <div className="flex-1 bg-slate-50">
      <div className="bg-brand-dark border-b border-slate-800 text-white pt-32 pb-12 px-4 md:px-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/catalog" className="inline-flex items-center gap-2 text-brand-orange hover:text-brand-orange-hover transition-colors text-xs font-bold uppercase tracking-widest mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              {product.category ? (
                <Link to={`/catalog?category=${encodeURIComponent(product.category)}`} className="inline-block bg-brand-orange/20 text-brand-orange hover:bg-brand-orange hover:text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 transition-colors">
                  {product.category}
                </Link>
              ) : (
                <div className="inline-block bg-brand-orange/20 text-brand-orange px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                  Specialty Chemical
                </div>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-2 leading-tight">{product.name}</h1>
              {product.cas && <div className="text-sm font-mono text-slate-400 mt-2">CAS: {product.cas}</div>}
            </div>
            <div className="flex gap-4 shrink-0">
              <button
                onClick={() => setShowQuote(true)}
                className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-4 font-bold uppercase tracking-widest text-xs transition-colors flex items-center gap-2 justify-center border border-brand-orange"
              >
                Request Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2 space-y-12">
            {descParagraphs.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Overview
                </h2>
                <div className="space-y-4">
                  {descParagraphs.map((para: string, i: number) => (
                    <p key={i} className="text-slate-600 leading-relaxed">{para}</p>
                  ))}
                </div>
              </section>
            )}

            {physProps && Object.keys(physProps).length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2 flex items-center gap-2">
                  <Beaker className="w-4 h-4" /> Physical Properties
                </h2>
                <div className="bg-white border border-slate-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-slate-100">
                      {Object.entries(physProps).map(([key, val]: [string, any]) => (
                        <tr key={key} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 font-bold text-brand-dark w-1/3">{key}</td>
                          <td className="p-4 text-slate-600">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {product.safetyHandling && (
              <section>
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Safety & Handling
                </h2>
                <div className="bg-amber-50 border border-amber-200 p-6">
                  <p className="text-slate-700 leading-relaxed text-sm">{product.safetyHandling}</p>
                </div>
              </section>
            )}

            {tradeReg && Object.keys(tradeReg).length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2 flex items-center gap-2">
                  <FlaskConical className="w-4 h-4" /> Trade & Regulatory
                </h2>
                <div className="bg-white border border-slate-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-slate-100">
                      {Object.entries(tradeReg).map(([key, val]: [string, any]) => (
                        <tr key={key} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 font-bold text-brand-dark w-1/3">{key}</td>
                          <td className="p-4 text-slate-600">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {product.otherNames && product.otherNames.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4" /> Other Names
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.otherNames.map((name: string, i: number) => (
                    <span key={i} className="bg-white border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600">
                      {name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {product.relatedProducts && product.relatedProducts.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">
                  Related Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.relatedProducts.map((rp: any) => (
                    <Link
                      key={rp.cas}
                      to={`/products/cas-${rp.cas}`}
                      className="bg-white border border-slate-200 p-4 hover:border-brand-orange transition-colors group flex justify-between items-center"
                    >
                      <div>
                        <div className="font-bold text-brand-dark group-hover:text-brand-orange transition-colors text-sm">{rp.name}</div>
                        <div className="text-xs text-slate-400 font-mono mt-1">CAS: {rp.cas}</div>
                      </div>
                      <span className="text-brand-orange text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-slate-200 p-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Chemical Properties</h3>
              <dl className="space-y-4">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <dt className="text-sm text-slate-500 font-medium">CAS Number</dt>
                  <dd className="text-sm font-bold text-brand-dark font-mono">{product.cas || '-'}</dd>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <dt className="text-sm text-slate-500 font-medium">EC Number</dt>
                  <dd className="text-sm font-bold text-brand-dark font-mono">{product.ec || '-'}</dd>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <dt className="text-sm text-slate-500 font-medium">Mol. Weight</dt>
                  <dd className="text-sm font-bold text-brand-dark">{product.molWeight || '-'}</dd>
                </div>
                {tradeReg?.['HS Code'] && (
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <dt className="text-sm text-slate-500 font-medium">HS Code</dt>
                    <dd className="text-sm font-bold text-brand-dark font-mono">{tradeReg['HS Code']}</dd>
                  </div>
                )}
                <div className="flex justify-between pb-2">
                  <dt className="text-sm text-slate-500 font-medium">Category</dt>
                  <dd className="text-sm font-bold">
                    {product.category ? (
                      <Link to={`/catalog?category=${encodeURIComponent(product.category)}`} className="text-brand-orange hover:text-brand-dark transition-colors">
                        {product.category}
                      </Link>
                    ) : '-'}
                  </dd>
                </div>
              </dl>
            </div>

            <section>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Factory className="w-4 h-4" /> Industries
              </h2>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(product.industry) && product.industry.length > 0
                  ? product.industry.map((ind: string, i: number) => (
                      <Link
                        key={i}
                        to={`/catalog?industry=${encodeURIComponent(ind)}`}
                        className="bg-white border border-slate-200 px-4 py-2 text-xs font-bold text-brand-dark uppercase tracking-widest hover:border-brand-orange hover:text-brand-orange transition-colors"
                      >
                        {ind}
                      </Link>
                    ))
                  : <span className="text-slate-500 italic text-sm">Not specified</span>}
              </div>
            </section>

            <div className="bg-brand-dark p-6 text-white">
              <h3 className="text-[10px] font-bold text-brand-orange uppercase tracking-widest mb-6">Documentation</h3>
              <div className="space-y-3">
                <button className="w-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-brand-orange group-hover:text-white transition-colors" />
                    Technical Data Sheet
                  </div>
                  <Download className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-brand-orange group-hover:text-white transition-colors" />
                    Safety Data Sheet
                  </div>
                  <Download className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {showQuote && (
        <QuoteModal
          productName={product.name}
          cas={product.cas}
          onClose={() => setShowQuote(false)}
        />
      )}
    </div>
    </>
  );
}
