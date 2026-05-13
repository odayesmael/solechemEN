import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, FlaskConical, ShieldCheck, Leaf, Settings, Beaker, PackageCheck, Droplets, Award, ArrowRight } from 'lucide-react';
import { QuoteModal } from '../components/QuoteModal';

const capabilities = [
  {
    icon: Settings,
    title: 'Batch & Continuous Processes',
    description: 'Niche chemicals for specialized applications and large-scale, high-volume solutions tailored to diverse requirements.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    description: 'Every stage — from raw material qualification to final release — is supervised by experienced technical teams.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'Advanced waste management, energy-efficient technologies, and responsible sourcing are integrated into all operations.',
  },
  {
    icon: FlaskConical,
    title: 'Toll Manufacturing',
    description: 'Custom formulation, toll processing, and private-label manufacturing for partners worldwide.',
  },
];

const services = [
  {
    icon: Settings,
    title: 'Toll Manufacturing',
    description: 'We process your raw materials using our facilities and expertise, delivering finished products to your exact specifications while you maintain ownership of the formulation.',
  },
  {
    icon: PackageCheck,
    title: 'Contract Manufacturing',
    description: 'End-to-end production services — from raw material sourcing to final product delivery. We handle the entire manufacturing process on your behalf.',
  },
  {
    icon: Beaker,
    title: 'Custom Formulations',
    description: 'Our R&D team develops tailored chemical formulations to meet unique application requirements, working closely with clients from concept to production.',
  },
  {
    icon: Droplets,
    title: 'Blending & Masterbatches',
    description: 'Production of liquid and solid blends, masterbatches, and other specialized solutions with precise quality control at every stage.',
  },
];

const certifications = [
  { title: 'ISO 9001:2015', subtitle: 'Quality Management System' },
  { title: 'ISO 22000:2018', subtitle: 'Food Safety Management' },
  { title: 'GMP+', subtitle: 'Feed Safety Assurance — SGS Certified' },
];

export function Manufacturing() {
  const [showQuote, setShowQuote] = useState(false);

  return (
    <div className="flex-1 bg-white flex flex-col">
      {/* Hero */}
      <div className="relative bg-brand-dark pt-32 pb-20 px-4 md:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1600&q=80')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/60 to-brand-dark/80"></div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-start gap-4">
          <a href="/" className="text-slate-400 hover:text-white uppercase tracking-widest text-[10px] font-bold flex items-center gap-2 group mb-4 transition-colors">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </a>
          <span className="inline-block bg-brand-orange text-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest">
            Manufacturing
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            POWERING INDUSTRIES<br className="hidden md:block" /> WITH THOUSANDS<br className="hidden md:block" /> OF CHEMICALS
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed mt-2">
            State-of-the-art facilities equipped with cutting-edge technology, delivering premium-quality chemical products through superior batch and continuous processes.
          </p>
        </div>
      </div>

      {/* About Manufacturing */}
      <section className="max-w-7xl mx-auto w-full px-4 md:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-brand-orange font-bold tracking-widest uppercase text-[10px] mb-4">
              Our Manufacturing Capabilities
            </h2>
            <h3 className="text-3xl md:text-4xl font-black text-brand-dark leading-tight mb-8">
              WORLD-CLASS CHEMICAL PRODUCTION
            </h3>
            <div className="space-y-5 text-slate-600 text-sm leading-relaxed">
              <p>
                At SoleChem, our manufacturing operations are carried out in facilities equipped with cutting-edge technology. Our plants specialize in toll manufacturing and the production of premium-quality chemical products, offering superior competence in both batch and continuous processes.
              </p>
              <p>
                Our experienced technical teams supervise every stage of production — from raw material qualification and processing to final quality assurance and release — ensuring exceptional purity, batch-to-batch consistency, performance reliability, and full compliance with the strictest international safety and regulatory standards.
              </p>
              <p>
                Sustainability is at the core of everything we do: advanced waste management systems, energy-efficient technologies, and responsible sourcing practices minimize environmental impact without compromising quality or delivery timelines.
              </p>
              <p>
                This integrated, customer-centric approach has positioned SoleChem as a trusted long-term partner — delivering innovative, high-performance chemical solutions that enhance operational efficiency, reduce total cost of ownership, and create measurable added value for businesses worldwide.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-slate-50 border border-slate-200 p-6 group hover:border-brand-orange/30 hover:bg-brand-orange/5 transition-colors"
              >
                <cap.icon className="w-8 h-8 text-brand-orange mb-4" />
                <h4 className="text-sm font-bold text-brand-dark mb-2">{cap.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-10 py-20">
          <div className="text-center mb-16">
            <h2 className="text-brand-orange font-bold tracking-widest uppercase text-[10px] mb-4">
              What We Offer
            </h2>
            <h3 className="text-3xl md:text-4xl font-black text-brand-dark leading-tight">
              MANUFACTURING SERVICES
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white border border-slate-200 p-8 group hover:shadow-lg hover:border-brand-orange/20 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center shrink-0">
                    <service.icon className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-brand-dark mb-3 group-hover:text-brand-orange transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="max-w-7xl mx-auto w-full px-4 md:px-10 py-20">
        <div className="text-center mb-16">
          <h2 className="text-brand-orange font-bold tracking-widest uppercase text-[10px] mb-4">
            Standards & Compliance
          </h2>
          <h3 className="text-3xl md:text-4xl font-black text-brand-dark leading-tight mb-4">
            CERTIFIED QUALITY
          </h3>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            All our manufacturing operations comply with international standards.
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
              className="text-center p-8 border border-slate-200 bg-white group hover:border-brand-orange/30 transition-colors"
            >
              <Award className="w-10 h-10 text-brand-orange mx-auto mb-5" />
              <h4 className="text-xl font-black text-brand-dark mb-2">{cert.title}</h4>
              <p className="text-sm text-slate-500">{cert.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-10 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
              NEED A MANUFACTURING PARTNER?
            </h3>
            <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
              Let's discuss your toll manufacturing, custom formulations, or bulk chemical production needs.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <button
              onClick={() => setShowQuote(true)}
              className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              Request Quote <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/contact"
              className="border border-white/20 hover:border-white/40 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </section>

      {showQuote && (
        <QuoteModal
          productName="Manufacturing Inquiry"
          onClose={() => setShowQuote(false)}
        />
      )}
    </div>
  );
}
