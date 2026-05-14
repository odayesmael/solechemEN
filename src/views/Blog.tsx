import { useState } from 'react';

import { ArrowRight, Calendar, Clock, User, BookOpen, Search } from 'lucide-react';
import { blogArticles, blogCategories } from '../data/blog';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = blogArticles.filter((a) => {
    const matchCategory = activeCategory === 'All' || a.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const featured = blogArticles[0];

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div data-animate>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-brand-orange" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                Blog & Insights
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              Chemical Industry
              <span className="text-brand-orange"> Knowledge Hub</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
              Expert guides, compliance updates, and industry insights for B2B chemical buyers. Stay informed with practical knowledge from SoleChem's technical team.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 -mt-10 relative z-10 mb-16">
        <div data-animate>
          <a
            href={`/blog/${featured.slug}`}
            className="group block bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all overflow-hidden"
          >
            <div className="grid md:grid-cols-2">
              <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                    Featured
                  </span>
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                    {featured.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-brand-dark group-hover:text-brand-orange transition-colors mb-4 tracking-tight">
                  {featured.title}
                </h2>
                <p className="text-slate-500 leading-relaxed mb-6 line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(featured.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readTime}
                  </span>
                </div>
                <div className="mt-6 flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-widest group-hover:gap-3 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-dark text-white'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg mb-2">No articles found</p>
            <p className="text-slate-400 text-sm">Try a different category or search term.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article, i) => (
              <div
                key={article.slug}
                data-animate
                data-delay={i * 80}
              >
                <a
                  href={`/blog/${article.slug}`}
                  className="group block bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all h-full flex flex-col"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">
                        {article.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-brand-dark group-hover:text-brand-orange transition-colors mb-3 tracking-tight line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <Calendar className="w-3 h-3" />
                        {formatDate(article.date)}
                      </div>
                      <span className="flex items-center gap-1.5 text-brand-orange text-[11px] font-bold uppercase tracking-widest group-hover:gap-2.5 transition-all">
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-brand-dark text-white py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-4 block">
            Stay Updated
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Need a Chemical Supply Partner?
          </h2>
          <p className="text-slate-400 leading-relaxed mb-8">
            Get expert guidance on chemical procurement, compliance, and manufacturing. Our team responds within 24 hours.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors"
          >
            Contact Our Team <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
