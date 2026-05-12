import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { QuoteModal } from './QuoteModal';
import { MoleculeMotif } from './MoleculeMotif';

export function Hero() {
  const [showQuote, setShowQuote] = useState(false);

  return (
    <section className="bg-brand-dark flex flex-col md:flex-row relative border-b border-brand-dark min-h-[700px] overflow-hidden">
      {/* Molecule Motif Background */}
      <MoleculeMotif variant="orbits" intensity="subtle" position="top-right" animated={true} />

      {/* Left Content */}
      <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-20 flex flex-col justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="self-start inline-flex items-center gap-2 text-xs text-white font-bold uppercase tracking-widest mb-6"
        >
          <span className="w-8 h-px bg-brand-orange"></span>
          Global Chemical Leader Since 2013
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6"
        >
          YOUR GLOBAL<br />
          <span className="text-brand-orange">CHEMICAL</span><br />
          PARTNER.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-light text-base md:text-lg max-w-md mb-10 leading-relaxed"
        >
          Sourcing, manufacturing, and delivering high-purity chemicals tailored to your industry's exact requirements.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link to="/catalog" className="bg-brand-orange text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-orange-hover transition-colors flex items-center justify-center gap-2 group">
            Explore Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button
            onClick={() => setShowQuote(true)}
            className="border border-white/20 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            Request Quote
          </button>
        </motion.div>
      </div>

      {/* Right Content - Hero Image */}
      <div className="w-full md:w-1/2 relative min-h-[400px] border-t md:border-t-0 md:border-l border-white/10 overflow-hidden">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          src="/hero.webp"
          alt="SoleChem chemical laboratory"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-brand-dark/20"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-brand-dark/30"></div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-8 bg-white shadow-2xl border-l-4 border-brand-orange"
        >
          <div className="px-6 pt-5 pb-3">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest">Certified Quality</span>
          </div>
          <div className="flex divide-x divide-slate-200 px-4 pb-4">
            <div className="px-3 text-center">
              <span className="text-xl font-black text-brand-dark block leading-tight">ISO 9001</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Quality</span>
            </div>
            <div className="px-3 text-center">
              <span className="text-lg font-black text-brand-dark block leading-tight">REACH</span>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Compliant</span>
            </div>
            <div className="px-3 text-center">
              <span className="text-lg font-black text-brand-dark block leading-tight">GMP</span>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Certified</span>
            </div>
          </div>
        </motion.div>
      </div>

      {showQuote && (
        <QuoteModal productName="General Inquiry" onClose={() => setShowQuote(false)} />
      )}
    </section>
  );
}
