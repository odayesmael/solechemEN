import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, Globe, Factory, Award, ShieldCheck, MapPin, Target, Handshake, Leaf, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QuoteModal } from '../components/QuoteModal';
import { buildMetadata, buildCanonicalUrl, organizationSchema, buildBreadcrumbSchema } from '../utils/seo';

const stats = [
  { value: '2013', label: 'Established' },
  { value: '50+', label: 'Countries Served' },
  { value: '4,480+', label: 'Products' },
  { value: '3', label: 'ISO Certifications' },
];

const missionPoints = [
  'Consistent, high-quality product sourcing',
  'Transparent and ethical business practices',
  'Sustainable and innovative chemical solutions',
  'Long-term partnership focus',
];

const values = [
  { icon: Target, title: 'Reliability', desc: 'We strive to be the most dependable link in your supply chain, delivering on time, every time.' },
  { icon: Handshake, title: 'Partnership', desc: 'We build long-term relationships based on trust, transparency, and mutual growth.' },
  { icon: Leaf, title: 'Sustainability', desc: 'Environmental responsibility is integrated into every aspect of our operations.' },
  { icon: Sparkles, title: 'Innovation', desc: 'We continuously invest in new technologies and processes to deliver better solutions.' },
];

const certifications = [
  {
    title: 'ISO 9001:2015',
    subtitle: 'Quality Management System',
    desc: 'We ensure consistent quality in our products and services, meeting customer and applicable statutory and regulatory requirements.',
  },
  {
    title: 'ISO 22000:2018',
    subtitle: 'Food Safety Management',
    desc: 'We guarantee the highest level of safety and hygiene for our food and feed additive product lines.',
  },
  {
    title: 'GMP+',
    subtitle: 'Feed Safety Assurance',
    desc: 'SGS Certified feed safety assurance, ensuring the highest standards in feed production and supply chain management.',
  },
];

export function About() {
  const [showQuote, setShowQuote] = useState(false);

  const metadata = buildMetadata({
    title: 'About SoleChem | Global Chemical Distributor & Manufacturer',
    description: 'Learn about SoleChem, a leading global B2B chemical distributor and manufacturer since 2013. ISO 9001, ISO 22000 & GMP+ certified. Serving 50+ countries with 4,480+ high-purity chemical products.',
    canonical: buildCanonicalUrl('/about'),
    ogImage: buildCanonicalUrl('/og-about.webp'),
  });

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'About Us', url: buildCanonicalUrl('/about') },
  ]);

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="global chemical distributor, chemical manufacturer, B2B chemicals, international chemical supplier, worldwide chemicals, ISO 9001, GMP+" />
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
          {JSON.stringify(breadcrumb)}
        </script>
      </Helmet>

    <div className="flex-1 bg-white flex flex-col">
      {/* Hero Header */}
      <div className="bg-brand-dark pt-32 pb-20 px-4 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/about.webp')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/60 to-brand-dark/90"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white uppercase tracking-widest text-[10px] font-bold group mb-6 transition-colors">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <span className="block bg-brand-orange text-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest w-fit mb-4">
            Global Supplier · Since 2013
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            ABOUT <span className="text-brand-orange">SOLECHEM</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed mb-12">
            A premier global chemical trading and manufacturing company serving over 50 countries worldwide with uncompromising quality and reliability.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-brand-dark/80 backdrop-blur-sm p-6 text-center"
              >
                <span className="text-3xl md:text-4xl font-black text-white block">{stat.value}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <section className="max-w-7xl mx-auto w-full px-4 md:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-brand-orange font-bold tracking-widest uppercase text-[10px] mb-4">Our Mission</h2>
            <h3 className="text-3xl md:text-4xl font-black text-brand-dark leading-tight mb-8">
              BRIDGING THE GAP IN GLOBAL CHEMICAL SUPPLY
            </h3>
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed mb-8">
              <p>
                At SoleChem Europe S.r.l., our mission is to provide high-quality chemical raw materials to industries worldwide. We strive to be the most reliable link in your supply chain, combining international quality standards with global logistical expertise.
              </p>
            </div>
            <div className="space-y-3">
              {missionPoints.map(point => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                  <span className="text-sm font-medium text-brand-dark">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img src="/about.webp" alt="SoleChem headquarters" className="w-full h-[400px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-10 py-20">
          <div className="text-center mb-16">
            <h2 className="text-brand-orange font-bold tracking-widest uppercase text-[10px] mb-4">Our Values</h2>
            <h3 className="text-3xl md:text-4xl font-black text-brand-dark leading-tight">
              WHAT DRIVES US FORWARD
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white border border-slate-200 p-8 group hover:border-brand-orange/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center mb-5">
                  <val.icon className="w-6 h-6 text-brand-orange" />
                </div>
                <h4 className="text-sm font-bold text-brand-dark mb-2 group-hover:text-brand-orange transition-colors">{val.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality & Compliance */}
      <section className="max-w-7xl mx-auto w-full px-4 md:px-10 py-20">
        <div className="text-center mb-16">
          <h2 className="text-brand-orange font-bold tracking-widest uppercase text-[10px] mb-4">Quality & Compliance</h2>
          <h3 className="text-3xl md:text-4xl font-black text-brand-dark leading-tight mb-4">
            CERTIFIED EXCELLENCE
          </h3>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            We operate under strict international standards to ensure safety, quality, and reliability in every shipment.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="border border-slate-200 p-8 group hover:border-brand-orange/30 transition-colors"
            >
              <Award className="w-10 h-10 text-brand-orange mb-5" />
              <h4 className="text-xl font-black text-brand-dark mb-1">{cert.title}</h4>
              <p className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-4">{cert.subtitle}</p>
              <p className="text-sm text-slate-500 leading-relaxed">{cert.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trading & Manufacturing */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-brand-orange font-bold tracking-widest uppercase text-[10px] mb-4">Trading & Manufacturing</h2>
              <h3 className="text-3xl md:text-4xl font-black text-brand-dark leading-tight mb-8">
                CERTIFIED QUALITY, GLOBAL REACH
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                SoleChem operates a worldwide chemical supply network, combining an extensive global trading reach with robust manufacturing capabilities to offer unparalleled flexibility across 50+ countries.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-white border border-slate-200 p-6 group hover:border-brand-orange/30 transition-colors">
                  <Globe className="w-8 h-8 text-brand-orange mb-4" />
                  <h4 className="text-sm font-bold text-brand-dark mb-2">Global Trading</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Sourcing and distributing raw materials across 50+ countries with optimized logistics.</p>
                </div>
                <div className="bg-white border border-slate-200 p-6 group hover:border-brand-orange/30 transition-colors">
                  <Factory className="w-8 h-8 text-brand-orange mb-4" />
                  <h4 className="text-sm font-bold text-brand-dark mb-2">Manufacturing</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Custom formulations, toll manufacturing, and blending services tailored to your needs.</p>
                </div>
              </div>

              <Link
                to="/manufacturing"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-orange hover:text-brand-orange-hover transition-colors group"
              >
                Explore Manufacturing Capabilities
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="bg-white border border-slate-200 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-brand-orange" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-brand-dark">Headquarters</h4>
                  <p className="text-sm text-slate-500">Cassina de' Pecchi (MI), Italy</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Our strategic operations allow us to efficiently manage supply chains worldwide and coordinate global shipments with precision across 50+ countries.
              </p>
              <div className="bg-slate-50 border border-slate-200 p-6">
                <div className="text-sm font-bold text-brand-dark mb-1">SoleChem Europe S.r.l.</div>
                <div className="text-xs text-slate-500 leading-relaxed">
                  Via Cassina de' Pecchi, 12<br />
                  20060 Cassina de' Pecchi (MI)<br />
                  Italy
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-10 py-20 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
              READY TO WORK WITH US?
            </h3>
            <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
              Whether you need a reliable supplier or a manufacturing partner, SoleChem is here to support your business growth.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link
              to="/contact"
              className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              Contact Us Today <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/catalog"
              className="border border-white/20 hover:border-white/40 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {showQuote && (
        <QuoteModal productName="General Inquiry" onClose={() => setShowQuote(false)} />
      )}
    </div>
    </>
  );
}
