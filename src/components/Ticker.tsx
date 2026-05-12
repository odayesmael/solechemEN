import { motion } from 'motion/react';

export function Ticker() {
  const partners = [
    "REACH COMPLIANT", "GMP CERTIFIED", "ISO 9001:2015", "50+ COUNTRIES", "2013 ESTABLISHED", "1,438+ PARTNERS", "FAST FULFILLMENT", "GLOBAL SOURCING",
    "REACH COMPLIANT", "GMP CERTIFIED", "ISO 9001:2015", "50+ COUNTRIES", "2013 ESTABLISHED", "1,438+ PARTNERS", "FAST FULFILLMENT", "GLOBAL SOURCING"
  ];

  return (
    <div className="py-6 bg-slate-50 border-b border-slate-200 overflow-hidden flex items-center">
      <div className="px-8 border-r border-slate-200 hidden md:block shrink-0 z-10 bg-slate-50">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
          OUR CAPABILITIES
        </span>
      </div>
      <div className="flex w-[200%] overflow-hidden relative">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="flex whitespace-nowrap items-center w-full justify-around"
        >
          {partners.map((partner, index) => (
            <div key={index} className="text-xl font-black text-slate-300 uppercase tracking-widest mx-10 cursor-default hover:text-brand-blue transition-colors">
              {partner}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
