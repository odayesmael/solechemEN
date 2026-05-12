import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Linkedin, Mail, Globe, Award, Users, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buildMetadata, buildCanonicalUrl, buildBreadcrumbSchema } from '../utils/seo';

interface TeamMember {
  name: string;
  role: string;
  department: string;
  bio: string;
  expertise: string[];
  linkedin?: string;
  email?: string;
  image?: string;
}

const leadership: TeamMember[] = [
  {
    name: 'Marco Ferretti',
    role: 'Chief Executive Officer & Co-Founder',
    department: 'Executive',
    bio: 'With over 20 years in the global chemical industry, Marco founded SoleChem in 2013 with a vision to bridge the gap between chemical manufacturers and industrial buyers worldwide. Under his leadership, SoleChem has grown from a regional distributor to a global supplier serving 50+ countries.',
    expertise: ['Strategic Leadership', 'Global Trade', 'Business Development', 'Chemical Distribution'],
    linkedin: 'https://linkedin.com/in/',
  },
  {
    name: 'Elena Marchetti',
    role: 'Chief Operating Officer & Co-Founder',
    department: 'Executive',
    bio: 'Elena oversees global operations, supply chain optimization, and quality assurance at SoleChem. Her background in chemical engineering and logistics has been instrumental in building the company\'s certified manufacturing and distribution capabilities across 50+ countries.',
    expertise: ['Operations Management', 'Supply Chain', 'Quality Assurance', 'ISO Compliance'],
    linkedin: 'https://linkedin.com/in/',
  },
  {
    name: 'Thomas Richter',
    role: 'Chief Commercial Officer',
    department: 'Commercial',
    bio: 'Thomas leads SoleChem\'s commercial strategy, overseeing international sales, key account management, and market expansion. His deep expertise in European and Middle Eastern chemical markets has driven SoleChem\'s expansion into new territories and industry verticals.',
    expertise: ['Commercial Strategy', 'International Sales', 'Market Expansion', 'Key Account Management'],
    linkedin: 'https://linkedin.com/in/',
  },
];

const management: TeamMember[] = [
  {
    name: 'Sophie Laurent',
    role: 'Head of Supply Chain & Logistics',
    department: 'Operations',
    bio: 'Sophie manages SoleChem\'s global logistics network, coordinating shipments across 50+ countries. She ensures every delivery meets regulatory requirements including REACH, ADR, and IMDG compliance.',
    expertise: ['Global Logistics', 'REACH Compliance', 'Freight Management', 'Customs & Trade'],
  },
  {
    name: 'Dr. Luca Bianchi',
    role: 'Head of Technical & R&D',
    department: 'Technical',
    bio: 'Dr. Bianchi leads the technical team, providing expert product consultation to clients and driving custom formulation development. With a PhD in Organic Chemistry, he brings deep scientific expertise to every client interaction.',
    expertise: ['Custom Formulations', 'Product Development', 'Technical Consulting', 'Organic Chemistry'],
  },
  {
    name: 'Anna Kowalski',
    role: 'Head of Quality & Compliance',
    department: 'Quality',
    bio: 'Anna oversees SoleChem\'s quality management systems, ensuring compliance with ISO 9001:2015, ISO 22000:2018, and GMP+ standards. She manages all certifications and conducts regular audits across the supply chain.',
    expertise: ['ISO 9001', 'ISO 22000', 'GMP+', 'REACH Regulation'],
  },
  {
    name: 'David Al-Rashid',
    role: 'Head of Business Development — MENA',
    department: 'Commercial',
    bio: 'David spearheads SoleChem\'s expansion across the Middle East and North Africa, building strategic partnerships with industrial buyers and manufacturers. His multilingual capabilities and regional expertise have opened key markets.',
    expertise: ['MENA Markets', 'Strategic Partnerships', 'B2B Sales', 'Market Entry Strategy'],
  },
  {
    name: 'Julia Weber',
    role: 'Head of Digital & Marketing',
    department: 'Marketing',
    bio: 'Julia drives SoleChem\'s digital presence and B2B marketing strategy. She oversees the company\'s online platforms, content strategy, and lead generation programs that support global sales efforts.',
    expertise: ['B2B Marketing', 'Digital Strategy', 'Content & SEO', 'Lead Generation'],
  },
  {
    name: 'Paolo Esposito',
    role: 'Head of Finance & Administration',
    department: 'Finance',
    bio: 'Paolo manages SoleChem\'s financial operations, including international trade finance, risk management, and regulatory compliance. His expertise ensures sound financial governance across all global operations.',
    expertise: ['Trade Finance', 'Risk Management', 'Financial Governance', 'International Compliance'],
  },
];

const stats = [
  { value: '30+', label: 'Team Members' },
  { value: '12', label: 'Nationalities' },
  { value: '4', label: 'Languages' },
  { value: '50+', label: 'Countries Covered' },
];

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function getDeptColor(dept: string) {
  const colors: Record<string, string> = {
    Executive: 'bg-brand-orange/10 text-brand-orange',
    Commercial: 'bg-blue-50 text-blue-600',
    Operations: 'bg-emerald-50 text-emerald-600',
    Technical: 'bg-purple-50 text-purple-600',
    Quality: 'bg-amber-50 text-amber-700',
    Marketing: 'bg-pink-50 text-pink-600',
    Finance: 'bg-slate-100 text-slate-600',
  };
  return colors[dept] || 'bg-slate-100 text-slate-600';
}

function MemberCard({ member, featured = false }: { member: TeamMember; featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`border border-slate-200 bg-white hover:border-brand-orange/30 hover:shadow-lg transition-all duration-300 group ${featured ? 'p-8 md:p-10' : 'p-6 md:p-8'}`}
    >
      <div className={`flex ${featured ? 'flex-col md:flex-row gap-8' : 'flex-col gap-5'}`}>
        {/* Avatar */}
        <div className={`${featured ? 'w-24 h-24 md:w-28 md:h-28' : 'w-16 h-16'} bg-brand-dark flex items-center justify-center shrink-0`}>
          <span className={`${featured ? 'text-2xl md:text-3xl' : 'text-lg'} font-black text-white`}>
            {getInitials(member.name)}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Department badge */}
          <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-1 mb-3 ${getDeptColor(member.department)}`}>
            {member.department}
          </span>

          <h3 className={`${featured ? 'text-xl md:text-2xl' : 'text-lg'} font-black text-brand-dark mb-1 group-hover:text-brand-orange transition-colors`}>
            {member.name}
          </h3>
          <p className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-4">
            {member.role}
          </p>
          <p className={`text-sm text-slate-600 leading-relaxed ${featured ? 'mb-6' : 'mb-4'}`}>
            {member.bio}
          </p>

          {/* Expertise */}
          <div className="flex flex-wrap gap-2 mb-4">
            {member.expertise.map(tag => (
              <span key={tag} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border border-slate-200 px-2 py-1">
                {tag}
              </span>
            ))}
          </div>

          {/* Social Links */}
          {(member.linkedin || member.email) && (
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-brand-orange transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="text-slate-400 hover:text-brand-orange transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Team() {
  const metadata = buildMetadata({
    title: 'Our Team | SoleChem Leadership & Experts',
    description: 'Meet the SoleChem team — experienced leaders and technical experts driving global chemical distribution across 50+ countries. Multilingual, multicultural, and committed to excellence.',
    canonical: buildCanonicalUrl('/team'),
  });

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Our Team', url: buildCanonicalUrl('/team') },
  ]);

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="SoleChem team, chemical industry leaders, global chemical experts, SoleChem management, chemical distribution team" />
        <link rel="canonical" href={metadata.canonical} />
        <meta property="og:title" content={metadata.ogTitle} />
        <meta property="og:description" content={metadata.ogDescription} />
        <meta property="og:url" content={metadata.ogUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={metadata.twitterTitle} />
        <meta name="twitter:description" content={metadata.twitterDescription} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumb)}
        </script>
      </Helmet>

      <div className="flex-1 bg-white flex flex-col">
        {/* Hero Header */}
        <div className="bg-brand-dark pt-32 pb-20 px-4 md:px-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/about.webp')] bg-cover bg-center opacity-15"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/85 to-brand-dark"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white uppercase tracking-widest text-[10px] font-bold group mb-6 transition-colors">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <span className="block bg-brand-orange text-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest w-fit mb-4">
              Leadership & Experts
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              THE TEAM BEHIND <span className="text-brand-orange">SOLECHEM</span>
            </h1>
            <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed mb-12">
              A multilingual, multicultural team of industry experts committed to delivering chemical excellence across 50+ countries.
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

        {/* Leadership */}
        <section className="max-w-7xl mx-auto w-full px-4 md:px-10 py-20">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-orange/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-brand-orange" />
              </div>
              <div>
                <h2 className="text-brand-orange font-bold tracking-widest uppercase text-[10px]">Leadership</h2>
                <h3 className="text-2xl md:text-3xl font-black text-brand-dark leading-tight">
                  FOUNDERS & EXECUTIVES
                </h3>
              </div>
            </div>
            <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
              The visionaries who built SoleChem from the ground up and continue to drive its global expansion.
            </p>
          </div>

          <div className="space-y-6">
            {leadership.map(member => (
              <MemberCard key={member.name} member={member} featured />
            ))}
          </div>
        </section>

        {/* Management Team */}
        <section className="bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto w-full px-4 md:px-10 py-20">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-orange/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <h2 className="text-brand-orange font-bold tracking-widest uppercase text-[10px]">Management</h2>
                  <h3 className="text-2xl md:text-3xl font-black text-brand-dark leading-tight">
                    DEPARTMENT HEADS
                  </h3>
                </div>
              </div>
              <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
                Experienced professionals leading each function — from supply chain and R&D to quality assurance and commercial strategy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {management.map(member => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </section>

        {/* Our Expertise */}
        <section className="max-w-7xl mx-auto w-full px-4 md:px-10 py-20">
          <div className="text-center mb-16">
            <h2 className="text-brand-orange font-bold tracking-widest uppercase text-[10px] mb-4">Our Expertise</h2>
            <h3 className="text-3xl md:text-4xl font-black text-brand-dark leading-tight mb-4">
              WHAT SETS US APART
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-slate-200 p-8 text-center hover:border-brand-orange/30 hover:shadow-lg transition-all"
            >
              <Globe className="w-10 h-10 text-brand-orange mx-auto mb-5" />
              <h4 className="text-sm font-bold text-brand-dark mb-2">Global Perspective</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                12 nationalities across our team bring local market knowledge to a global operation spanning 50+ countries.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="border border-slate-200 p-8 text-center hover:border-brand-orange/30 hover:shadow-lg transition-all"
            >
              <Award className="w-10 h-10 text-brand-orange mx-auto mb-5" />
              <h4 className="text-sm font-bold text-brand-dark mb-2">Industry Expertise</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our team combines deep chemical knowledge with commercial and technical expertise across 20 industry verticals.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="border border-slate-200 p-8 text-center hover:border-brand-orange/30 hover:shadow-lg transition-all"
            >
              <Users className="w-10 h-10 text-brand-orange mx-auto mb-5" />
              <h4 className="text-sm font-bold text-brand-dark mb-2">Multilingual Support</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                We communicate fluently in English, Italian, German, and French — ensuring seamless interactions with clients worldwide.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-dark">
          <div className="max-w-7xl mx-auto w-full px-4 md:px-10 py-20 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
                WANT TO JOIN OUR TEAM?
              </h3>
              <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
                We're always looking for talented professionals. Explore open positions and become part of the SoleChem story.
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <Link
                to="/careers"
                className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
              >
                View Open Positions <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="border border-white/20 hover:border-white/40 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
