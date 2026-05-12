import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ChevronDown,
  Search,
  HelpCircle,
  Building2,
  FlaskConical,
  ShoppingCart,
  Truck,
  ShieldCheck,
  Factory,
  Headset,
  ArrowRight,
  Mail,
} from 'lucide-react';
import { faqCategories, getAllFAQItems } from '../data/faq';
import { buildMetadata, buildCanonicalUrl, buildBreadcrumbSchema, buildFAQSchema } from '../utils/seo';

const meta = buildMetadata({
  title: 'FAQ | SoleChem — Frequently Asked Questions',
  description: 'Find answers to common questions about SoleChem products, ordering, shipping, quality, compliance, manufacturing services, and technical support.',
  canonical: buildCanonicalUrl('/faq'),
  ogType: 'website',
  keywords: 'SoleChem FAQ, chemical supplier FAQ, REACH compliance, COA, SDS, B2B chemicals, toll manufacturing, chemical shipping',
});

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://solechem.com' },
  { name: 'FAQ', url: 'https://solechem.com/faq' },
]);

const allFaqItems = getAllFAQItems();
const faqSchema = buildFAQSchema(allFaqItems);

const categoryIcons: Record<string, typeof Building2> = {
  building: Building2,
  flask: FlaskConical,
  cart: ShoppingCart,
  truck: Truck,
  shield: ShieldCheck,
  factory: Factory,
  headset: Headset,
};

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      if (activeCategory) {
        return faqCategories.filter((c) => c.name === activeCategory);
      }
      return faqCategories;
    }

    const q = searchQuery.toLowerCase();
    return faqCategories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [searchQuery, activeCategory]);

  const totalResults = filteredCategories.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href={meta.canonical} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:type" content={meta.ogType} />
        <meta property="og:url" content={meta.canonical} />
        <meta name="twitter:title" content={meta.twitterTitle} />
        <meta name="twitter:description" content={meta.twitterDescription} />
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-brand-dark text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5 text-brand-orange" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                Frequently Asked Questions
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              How Can We
              <span className="text-brand-orange"> Help You?</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-10">
              Find answers to common questions about our products, services, ordering, shipping, and compliance. Can't find what you're looking for? Contact us directly.
            </p>

            {/* Search */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search all questions..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActiveCategory(null);
                }}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-orange focus:bg-white/15 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="border-b border-slate-200 bg-white sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            <button
              onClick={() => {
                setActiveCategory(null);
                setSearchQuery('');
              }}
              className={`shrink-0 px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-all ${
                !activeCategory && !searchQuery
                  ? 'bg-brand-dark text-white'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`}
            >
              All ({allFaqItems.length})
            </button>
            {faqCategories.map((cat) => {
              const Icon = categoryIcons[cat.icon] || HelpCircle;
              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    setActiveCategory(activeCategory === cat.name ? null : cat.name);
                    setSearchQuery('');
                  }}
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-all ${
                    activeCategory === cat.name
                      ? 'bg-brand-dark text-white'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search Results Info */}
      {searchQuery && (
        <div className="max-w-4xl mx-auto px-6 md:px-10 pt-8">
          <p className="text-sm text-slate-500">
            Found <span className="font-bold text-brand-dark">{totalResults}</span> result{totalResults !== 1 ? 's' : ''} for "<span className="font-bold text-brand-dark">{searchQuery}</span>"
          </p>
        </div>
      )}

      {/* FAQ Sections */}
      <section className="max-w-4xl mx-auto px-6 md:px-10 py-16">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-lg text-slate-400 mb-2">No questions found</p>
            <p className="text-sm text-slate-400 mb-6">Try a different search term or browse all categories.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory(null);
              }}
              className="text-brand-orange text-xs font-bold uppercase tracking-widest hover:text-brand-orange-hover transition-colors"
            >
              View All Questions
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredCategories.map((cat, catIdx) => {
              const Icon = categoryIcons[cat.icon] || HelpCircle;
              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: catIdx * 0.05 }}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 bg-brand-orange/10 flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5 text-brand-orange" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-brand-dark tracking-tight">{cat.name}</h2>
                      <p className="text-xs text-slate-400">{cat.description}</p>
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="space-y-2 mt-4">
                    {cat.items.map((item, itemIdx) => {
                      const key = `${cat.name}-${itemIdx}`;
                      const isOpen = openItems[key];

                      return (
                        <div
                          key={key}
                          className={`border transition-colors ${
                            isOpen ? 'border-brand-orange/30 bg-brand-orange/[0.02]' : 'border-slate-200 bg-white'
                          }`}
                        >
                          <button
                            onClick={() => toggleItem(key)}
                            className="w-full flex items-start justify-between gap-4 p-5 text-left group"
                          >
                            <span
                              className={`text-sm font-bold leading-snug transition-colors ${
                                isOpen ? 'text-brand-orange' : 'text-brand-dark group-hover:text-brand-orange'
                              }`}
                            >
                              {item.question}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 shrink-0 mt-0.5 transition-all ${
                                isOpen ? 'text-brand-orange rotate-180' : 'text-slate-400'
                              }`}
                            />
                          </button>

                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              transition={{ duration: 0.2 }}
                              className="px-5 pb-5"
                            >
                              <div className="h-px bg-slate-200 mb-4" />
                              <p className="text-sm text-slate-600 leading-relaxed">
                                {item.answer}
                              </p>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Stats Row */}
      <section className="border-t border-b border-slate-200 bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '4,480+', label: 'Products' },
              { value: '50+', label: 'Countries' },
              { value: '<24h', label: 'Response Time' },
              { value: '3', label: 'ISO Certifications' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-black text-brand-dark">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark text-white py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <Mail className="w-8 h-8 text-brand-orange mx-auto mb-4" />
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-4 block">
            Still Have Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            We're Here to Help
          </h2>
          <p className="text-slate-400 leading-relaxed mb-8">
            Our team of experts is available to answer any question about our products, services, or capabilities. We guarantee a response within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              Contact Our Team <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="mailto:info@solechem.com"
              className="border border-white/20 hover:border-white/40 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              info@solechem.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
