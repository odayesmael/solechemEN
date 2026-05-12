import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, ChevronDown, Share2, BookOpen } from 'lucide-react';
import { getBlogArticleBySlug, getRelatedArticles, type BlogSection } from '../data/blog';
import {
  buildMetadata,
  buildCanonicalUrl,
  buildBreadcrumbSchema,
  buildArticleSchema,
  buildFAQSchema,
} from '../utils/seo';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function ContentRenderer({ sections }: { sections: BlogSection[] }) {
  return (
    <div className="prose-solechem">
      {sections.map((section, i) => {
        switch (section.type) {
          case 'paragraph':
            return (
              <p key={i} className="text-slate-600 leading-relaxed mb-6 text-[15px]">
                {section.content}
              </p>
            );
          case 'heading':
            return section.level === 3 ? (
              <h3 key={i} className="text-xl font-black text-brand-dark mt-10 mb-4 tracking-tight">
                {section.content}
              </h3>
            ) : (
              <h2 key={i} className="text-2xl font-black text-brand-dark mt-12 mb-5 tracking-tight">
                {section.content}
              </h2>
            );
          case 'list':
            return (
              <ul key={i} className="mb-6 space-y-2.5 pl-1">
                {section.items?.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-[15px] text-slate-600 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case 'quote':
            return (
              <blockquote
                key={i}
                className="border-l-4 border-brand-orange bg-brand-orange/5 px-6 py-5 my-8 text-[15px] text-slate-700 italic leading-relaxed"
              >
                {section.content}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

function FAQAccordion({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-slate-200 bg-white">
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-slate-50 transition-colors"
          >
            <span className="text-sm font-bold text-brand-dark leading-snug pr-4">
              {faq.question}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 shrink-0 mt-0.5 transition-transform ${
                openIdx === i ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openIdx === i && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="px-5 pb-5"
            >
              <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

export function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getBlogArticleBySlug(slug) : undefined;

  if (!article) return <Navigate to="/blog" replace />;

  const related = getRelatedArticles(article.slug, article.category);
  const articleUrl = buildCanonicalUrl(`/blog/${article.slug}`);

  const meta = buildMetadata({
    title: `${article.title} | SoleChem Blog`,
    description: article.excerpt,
    canonical: articleUrl,
    ogType: 'article',
    ogImage: article.image,
    author: article.author,
  });

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://solechem.com' },
    { name: 'Blog', url: 'https://solechem.com/blog' },
    { name: article.title, url: articleUrl },
  ]);

  const articleSchema = buildArticleSchema({
    title: article.title,
    description: article.excerpt,
    url: articleUrl,
    image: article.image,
    datePublished: article.date,
    author: article.author,
  });

  const faqSchema = article.faq.length > 0 ? buildFAQSchema(article.faq) : null;

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={meta.canonical} />
        {meta.ogImage && <meta property="og:image" content={meta.ogImage} />}
        <meta name="twitter:title" content={meta.twitterTitle} />
        <meta name="twitter:description" content={meta.twitterDescription} />
        <meta name="author" content={article.author} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      {/* Hero */}
      <section className="bg-brand-dark text-white pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-brand-orange transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span className="bg-brand-orange/20 text-brand-orange text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                {article.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(article.date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 -mt-8 relative z-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="aspect-[2/1] overflow-hidden border border-slate-200 shadow-lg"
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 md:px-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12"
        >
          {/* Main content */}
          <div>
            <ContentRenderer sections={article.content} />

            {/* Tags / Share */}
            <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Category:</span>
                <Link
                  to={`/blog?category=${article.category}`}
                  className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                >
                  {article.category}
                </Link>
              </div>
              <button
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-brand-orange transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8">
              {/* Table of Contents */}
              <div className="bg-slate-50 border border-slate-200 p-5">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-dark mb-4">
                  In This Article
                </h4>
                <nav className="space-y-2">
                  {article.content
                    .filter((s) => s.type === 'heading' && s.level === 2)
                    .map((s, i) => (
                      <div key={i} className="text-xs text-slate-500 leading-snug hover:text-brand-orange transition-colors cursor-pointer">
                        {s.content}
                      </div>
                    ))}
                </nav>
              </div>

              {/* CTA Card */}
              <div className="bg-brand-dark p-5 text-white">
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">
                  Need Help?
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Our team responds within 24 hours to all inquiries.
                </p>
                <Link
                  to="/contact"
                  className="block bg-brand-orange hover:bg-brand-orange-hover text-white text-center py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </aside>
        </motion.div>
      </article>

      {/* FAQ Section */}
      {article.faq.length > 0 && (
        <section className="bg-slate-50 border-t border-slate-200 py-16">
          <div className="max-w-3xl mx-auto px-6 md:px-10">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3 block">
                FAQ
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>
            <FAQAccordion faqs={article.faq} />
          </div>
        </section>
      )}

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-16 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">
                  Keep Reading
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
                  Related Articles
                </h2>
              </div>
              <Link
                to="/blog"
                className="hidden md:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-orange hover:text-brand-orange-hover transition-colors"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((rel, i) => (
                <motion.div
                  key={rel.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link
                    to={`/blog/${rel.slug}`}
                    className="group block bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all h-full flex flex-col"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange mb-2">
                        {rel.category}
                      </span>
                      <h3 className="text-base font-black text-brand-dark group-hover:text-brand-orange transition-colors mb-2 tracking-tight line-clamp-2">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 flex-1">
                        {rel.excerpt}
                      </p>
                      <div className="flex items-center gap-1.5 text-brand-orange text-[10px] font-bold uppercase tracking-widest mt-3 group-hover:gap-2.5 transition-all">
                        Read Article <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="bg-brand-dark text-white py-16">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <BookOpen className="w-8 h-8 text-brand-orange mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">
            Looking for a Reliable Chemical Supplier?
          </h2>
          <p className="text-slate-400 leading-relaxed mb-8">
            SoleChem supplies 4,480+ chemicals to 50+ countries with ISO-certified quality and under-24-hour response times.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/catalog"
              className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Browse Catalog
            </Link>
            <Link
              to="/contact"
              className="border border-white/20 hover:border-white/40 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
