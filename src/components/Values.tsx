import { motion } from 'motion/react';
import { ShieldCheck, Zap, Award, Handshake } from 'lucide-react';
import { MoleculeMotif } from './MoleculeMotif';

const limits = [
  {
    title: "Reliability & Scale",
    desc: "We run complex supply chains with consistency. From drum quantities to full ISO tanks.",
    icon: <ShieldCheck className="w-8 h-8" />,
    number: "01"
  },
  {
    title: "Technical Support",
    desc: "Speak directly with qualified chemists and industry specialists. No call centers, just experts.",
    icon: <Zap className="w-8 h-8" />,
    number: "02"
  },
  {
    title: "Fast Logistics",
    desc: "48–72h delivery across Europe from our central hubs. EXW, DAP, and DDP terms available.",
    icon: <Award className="w-8 h-8" />,
    number: "03"
  },
  {
    title: "Manufacturing & Blends",
    desc: "In-house lab for custom formulations, toll manufacturing, and white-label production.",
    icon: <Handshake className="w-8 h-8" />,
    number: "04"
  }
];

export function Values() {
  return (
    <section className="py-24 bg-white border-b border-slate-200 relative overflow-hidden">
      <MoleculeMotif variant="circles" intensity="medium" position="bottom-left" animated={true} />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 border-l-4 border-brand-orange pl-6 text-left">
          <h2 className="text-brand-orange font-bold tracking-widest uppercase text-xs mb-4">
            Why SoleChem
          </h2>
          <h3 className="text-5xl md:text-6xl font-black text-brand-dark mb-6 leading-tight tracking-tight">
            THE FOUNDATION OF OUR GLOBAL OPERATIONS
          </h3>
          <p className="text-base text-text-secondary font-medium">
            More than just a supplier, we are your strategic partner in chemical manufacturing and distribution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-slate-200 relative z-10">
          {limits.map((val, i) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={i}
              className="bg-white p-8 md:p-12 border-b border-r border-slate-200 hover:bg-slate-50 transition-colors group relative"
            >
              <div className="absolute top-8 right-8 text-text-tertiary text-6xl font-black opacity-40 group-hover:text-accent-blue/20 transition-colors">
                {val.number}
              </div>
              <div className="w-16 h-16 bg-accent-blue/10 border-2 border-accent-blue/20 flex items-center justify-center text-accent-blue mb-8 mt-12 group-hover:bg-accent-blue group-hover:text-white transition-colors duration-300">
                {val.icon}
              </div>
              <h4 className="text-xl font-black text-text-primary mb-4 uppercase tracking-tight">
                {val.title}
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed font-medium">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
