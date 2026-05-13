import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, ChevronDown, ChevronLeft, ChevronRight, X, Tag, Factory, MessageSquareQuote } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { categories } from '../data/categories';
import { industries } from '../data/industries';
import { QuoteModal } from '../components/QuoteModal';
import { buildMetadata, buildCanonicalUrl, buildBreadcrumbSchema } from '../utils/seo';

export function Catalog() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || '';
  const activeCategory = searchParams.get('category') || '';
  const activeIndustry = searchParams.get('industry') || '';

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialQuery);
  const [page, setPage] = useState(1);
  const [quoteProduct, setQuoteProduct] = useState<{ name: string; cas: string } | null>(null);
  const itemsPerPage = 50;

  useEffect(() => {
    setSearch(searchParams.get('q') || '');
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    fetch('/data/products.json')
      .then(r => r.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(p => {
    if (activeCategory) {
      if (!p.category || p.category.toLowerCase() !== activeCategory.toLowerCase()) return false;
    }
    if (activeIndustry) {
      const industries = Array.isArray(p.industry) ? p.industry : [p.industry];
      if (!industries.some((ind: string) => ind && ind.toLowerCase() === activeIndustry.toLowerCase())) return false;
    }
    if (!search) return true;
    if (search === '#') {
      return p.name && /^[0-9]/.test(p.name);
    }
    const s = search.toLowerCase();
    if (search.length === 1 && /^[a-z]$/i.test(search)) {
      return p.name && p.name.toLowerCase().startsWith(s);
    }
    return p.name.toLowerCase().includes(s) ||
      (p.cas && p.cas.toLowerCase().includes(s)) ||
      (p.category && p.category.toLowerCase().includes(s));
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const headerImage = useMemo(() => {
    if (activeCategory) {
      return categories.find(c => c.name.toLowerCase() === activeCategory.toLowerCase())?.image;
    }
    if (activeIndustry) {
      return industries.find(i => i.name.toLowerCase() === activeIndustry.toLowerCase())?.image;
    }
    return null;
  }, [activeCategory, activeIndustry]);

  const pageTitle = activeCategory && activeIndustry
    ? `${activeCategory} for ${activeIndustry} | SoleChem`
    : activeCategory
    ? `${activeCategory} Chemicals | SoleChem`
    : activeIndustry
    ? `Chemicals for ${activeIndustry} | SoleChem`
    : 'Product Catalog | 4,480+ Industrial Chemicals | SoleChem';

  const pageDescription = activeCategory && activeIndustry
    ? `Browse ${activeCategory.toLowerCase()} chemicals for ${activeIndustry.toLowerCase()} from SoleChem. ISO 9001 certified products for industrial applications.`
    : activeCategory
    ? `Browse high-quality ${activeCategory.toLowerCase()} chemicals from SoleChem. ISO 9001 certified products for industrial applications.`
    : activeIndustry
    ? `Chemical solutions for ${activeIndustry.toLowerCase()}. Find specialty chemicals, APIs, and raw materials for your industry needs.`
    : 'Explore our comprehensive catalog of 4,480+ industrial chemicals, active pharmaceutical ingredients, and specialty compounds. Search by product name, CAS, or EC number.';

  const canonicalParams = new URLSearchParams();
  if (activeCategory) canonicalParams.set('category', activeCategory);
  if (activeIndustry) canonicalParams.set('industry', activeIndustry);

  const metadata = buildMetadata({
    title: pageTitle,
    description: pageDescription,
    canonical: buildCanonicalUrl('/catalog' + (canonicalParams.toString() ? `?${canonicalParams}` : '')),
    ogImage: buildCanonicalUrl('/og-catalog.webp'),
  });

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Catalog', url: buildCanonicalUrl('/catalog') },
    ...(activeCategory ? [{ name: activeCategory, url: buildCanonicalUrl(`/catalog?category=${activeCategory}`) }] : []),
    ...(activeIndustry ? [{ name: activeIndustry, url: buildCanonicalUrl(`/catalog?industry=${activeIndustry}`) }] : []),
  ]);

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="chemical catalog, product search, CAS number, industrial chemicals, specialty chemicals, APIs" />
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

    <div className="flex-1 bg-slate-50 flex flex-col">
      <div className="bg-brand-dark pt-32 pb-16 px-4 md:px-10 border-b border-brand-dark relative overflow-hidden">
        {headerImage && (
          <>
            <img src={headerImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-brand-dark/55"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-brand-dark/30"></div>
          </>
        )}
        {!headerImage && (
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        )}
        <div className="max-w-7xl mx-auto relative z-10">
          {(activeCategory || activeIndustry) && (
            <Link to="/catalog" className="text-slate-400 hover:text-white uppercase tracking-widest text-[10px] font-bold flex items-center gap-2 group transition-colors">
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              Back to Full Catalog
            </Link>
          )}
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {activeCategory && activeIndustry
              ? `${activeCategory} · ${activeIndustry}`
              : activeCategory || activeIndustry || 'PRODUCT CATALOG'}
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm leading-relaxed mb-8">
            {activeCategory && activeIndustry
              ? `Showing "${activeCategory}" products for the "${activeIndustry}" industry.`
              : activeCategory
              ? `Showing all products in the "${activeCategory}" category.`
              : activeIndustry
                ? `Showing all products for the "${activeIndustry}" industry.`
                : 'Browse our comprehensive database of over 4,480+ industrial chemicals, active pharmaceutical ingredients, and specialty compounds.'}
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex-1 bg-white/10 backdrop-blur-sm flex items-center px-4 md:px-6 border border-white/20 focus-within:border-brand-orange transition-colors">
              <Search className="w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Search by product name, CAS, or EC number..."
                className="w-full bg-transparent border-none text-white p-4 font-bold placeholder-white/50 focus:outline-none"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  value={activeCategory}
                  onChange={e => {
                    const val = e.target.value;
                    const params = new URLSearchParams();
                    if (val) params.set('category', val);
                    if (activeIndustry) params.set('industry', activeIndustry);
                    navigate('/catalog' + (params.toString() ? `?${params}` : ''));
                  }}
                  className="w-full appearance-none bg-white/10 backdrop-blur-sm text-white pl-11 pr-10 py-4 text-sm font-bold border border-white/20 focus:border-brand-orange focus:outline-none cursor-pointer transition-colors"
                >
                  <option value="">All Categories</option>
                  {categories.map(c => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <div className="relative flex-1">
                <Factory className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  value={activeIndustry}
                  onChange={e => {
                    const val = e.target.value;
                    const params = new URLSearchParams();
                    if (activeCategory) params.set('category', activeCategory);
                    if (val) params.set('industry', val);
                    navigate('/catalog' + (params.toString() ? `?${params}` : ''));
                  }}
                  className="w-full appearance-none bg-white/10 backdrop-blur-sm text-white pl-11 pr-10 py-4 text-sm font-bold border border-white/20 focus:border-brand-orange focus:outline-none cursor-pointer transition-colors"
                >
                  <option value="">All Industries</option>
                  {industries.map(i => (
                    <option key={i.name} value={i.name}>{i.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              {(activeCategory || activeIndustry) && (
                <button
                  onClick={() => navigate('/catalog')}
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 text-xs font-bold uppercase tracking-widest transition-colors border border-white/20 shrink-0"
                >
                  <X className="w-4 h-4" /> Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 md:px-10 py-12 flex-1">
        {/* Alphabet Bar in Catalog */}
        <div className="mb-8 flex flex-wrap justify-center sm:justify-start gap-1">
            <button
                onClick={() => { setSearch('#'); setPage(1); }}
                className={`w-8 h-8 md:w-10 md:h-10 border flex items-center justify-center font-bold text-sm transition-colors ${search === '#' ? 'bg-brand-orange text-white border-brand-orange' : 'bg-white hover:bg-brand-dark hover:text-white text-slate-600 border-slate-200'}`}
              >
                #
              </button>
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
              <button
                onClick={() => { setSearch(letter); setPage(1); }}
                key={letter}
                className={`w-8 h-8 md:w-10 md:h-10 border flex items-center justify-center font-bold text-sm transition-colors ${search.toUpperCase() === letter ? 'bg-brand-orange text-white border-brand-orange' : 'bg-white hover:bg-brand-dark hover:text-white text-slate-600 border-slate-200'}`}
              >
                {letter}
              </button>
            ))}
            {(search === '#' || (search.length === 1 && /^[a-z]$/i.test(search))) && (
              <button
                onClick={() => { setSearch(''); setPage(1); }}
                className="h-8 md:h-10 px-3 border border-brand-orange bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold text-xs uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-colors gap-1"
              >
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-brand-blue/20 border-t-brand-orange rounded-full animate-spin"></div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Loading Catalog...</div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Showing {((page - 1) * itemsPerPage) + 1}-{Math.min(page * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} Results
              </div>
            </div>

            <div className="bg-white border text-sm border-slate-200 overflow-x-auto shadow-sm">
              <table className="w-full text-left whitespace-nowrap">
                <thead>
                  <tr className="bg-brand-dark text-white text-xs uppercase tracking-widest font-bold">
                    <th className="p-4">Product Name</th>
                    <th className="p-4 hidden sm:table-cell">CAS</th>
                    <th className="p-4 hidden sm:table-cell">EC</th>
                    <th className="p-4 hidden md:table-cell">Category</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedProducts.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="p-4 font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
                        <Link to={`/products/cas-${p.cas}`}>{p.name}</Link>
                      </td>
                      <td className="p-4 text-slate-500 font-mono text-xs hidden sm:table-cell">{p.cas || '-'}</td>
                      <td className="p-4 text-slate-500 font-mono text-xs hidden sm:table-cell">{p.ec || '-'}</td>
                      <td className="p-4 text-slate-600 hidden md:table-cell">{p.category || '-'}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Link to={`/products/cas-${p.cas}`} className="text-xs font-bold uppercase tracking-widest text-brand-orange hover:text-brand-dark transition-colors">
                            View Details &rarr;
                          </Link>
                          <button
                            onClick={(e) => { e.stopPropagation(); setQuoteProduct({ name: p.name, cas: p.cas }); }}
                            title="Request Quote"
                            className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-1.5 bg-brand-orange/10 hover:bg-brand-orange text-brand-orange hover:text-white rounded-sm"
                          >
                            <MessageSquareQuote className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {paginatedProducts.length === 0 && (
                <div className="p-12 text-center text-slate-500 font-medium">
                  No products found matching your search criteria.
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-between items-center">
                <button 
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 border border-slate-200 bg-white text-brand-dark font-bold text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Page {page} of {totalPages}
                </div>
                <button 
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 border border-slate-200 bg-white text-brand-dark font-bold text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors flex items-center gap-1"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {quoteProduct && (
        <QuoteModal
          productName={quoteProduct.name}
          cas={quoteProduct.cas}
          onClose={() => setQuoteProduct(null)}
        />
      )}
    </div>
    </>
  );
}
