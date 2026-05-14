import { useState } from 'react';
import { QuoteModal } from './QuoteModal';
import { BookingModal } from './BookingModal';

export function CTA() {
  const [showQuote, setShowQuote] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  return (
    <section className="bg-brand-dark border-b border-brand-dark">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-700 relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20 mix-blend-luminosity grayscale pointer-events-none"
            style={{
              backgroundImage: 'url("/about.webp")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div data-animate="left">
            <span className="text-xs font-bold text-accent-blue uppercase tracking-widest mb-4 block">
              GLOBAL PRESENCE
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
              READY TO <br /> OPTIMIZE YOUR <br /> SUPPLY CHAIN?
            </h2>
            <p className="text-base border-l-2 border-accent-blue pl-4 text-slate-300 max-w-sm mb-12">
              Get a quote within 24 hours for any of our 4,480+ products. Dedicated support from industry experts.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-[#313032] flex flex-col items-start justify-center p-12 md:p-24 relative overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-4 opacity-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border-r border-white"></div>
            ))}
          </div>

          <div data-animate="right" data-delay="200" className="flex flex-col w-full max-w-sm gap-4 z-10">
            <button
              onClick={() => setShowQuote(true)}
              className="bg-brand-orange text-white w-full py-6 text-sm font-black uppercase tracking-widest hover:bg-brand-orange-hover transition-colors border border-brand-orange"
            >
              Contact Sales
            </button>
            <button
              onClick={() => setShowBooking(true)}
              className="bg-transparent text-white w-full py-6 text-sm font-black uppercase tracking-widest hover:bg-slate-700 transition-colors border border-slate-600"
            >
              Book a Strategy Call
            </button>
          </div>
        </div>
      </div>

      {showQuote && (
        <QuoteModal
          productName="General Inquiry"
          onClose={() => setShowQuote(false)}
        />
      )}

      {showBooking && (
        <BookingModal onClose={() => setShowBooking(false)} />
      )}
    </section>
  );
}
