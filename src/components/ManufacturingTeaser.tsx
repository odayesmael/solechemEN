import { motion } from 'motion/react';
import { ArrowRight, FlaskConical, Settings, Beaker, PackageCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MoleculeMotif } from './MoleculeMotif';

const features = [
  { icon: Settings, label: 'Toll Manufacturing' },
  { icon: PackageCheck, label: 'Contract Manufacturing' },
  { icon: Beaker, label: 'Custom Formulations' },
  { icon: FlaskConical, label: 'Blending & Masterbatches' },
];

export function ManufacturingTeaser() {
  return (
    <section className="bg-white border-b border-slate-200 relative overflow-hidden">
      <MoleculeMotif variant="orbits" intensity="prominent" position="center" animated={true} />
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative z-20"
          >
            <h2 className="text-brand-orange font-bold tracking-widest uppercase text-xs mb-4">
              Manufacturing Services
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-brand-dark leading-tight tracking-tight mb-6">
              YOUR DEDICATED<br className="hidden md:block" /> MANUFACTURING PARTNER
            </h3>
            <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-lg">
              State-of-the-art facilities equipped with cutting-edge technology. From custom formulations to large-scale toll manufacturing, we deliver premium-quality chemical products with full regulatory compliance.
            </p>
            <Link
              to="/manufacturing"
              className="inline-flex items-center gap-2 bg-brand-dark hover:bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors group"
            >
              Explore Manufacturing
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 relative z-20"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-slate-50 border border-slate-200 p-6 group hover:border-brand-orange/30 hover:bg-brand-orange/5 transition-colors"
              >
                <f.icon className="w-8 h-8 text-brand-orange mb-4" />
                <h4 className="text-sm font-bold text-brand-dark">{f.label}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
