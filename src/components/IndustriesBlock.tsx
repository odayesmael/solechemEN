import { ArrowRight } from 'lucide-react';
import { industries } from '../data/industries';

export function IndustriesBlock() {

  return (
    <section id="industries" className="bg-white flex flex-col py-16 px-8 md:px-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-brand-orange font-bold tracking-widest uppercase text-xs mb-4">
              Markets & Industries
            </h2>
            <h3 className="text-5xl md:text-6xl font-black text-brand-dark leading-tight tracking-tight">
              KEY INDUSTRIES <br className="hidden md:block"/> WE SERVE
            </h3>
          </div>
          <a href="/industries" className="flex items-center gap-2 text-slate-500 hover:text-brand-orange font-bold uppercase tracking-widest text-xs transition-colors group">
            Explore All 20 Industries
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
          {industries.slice(0, 12).map((ind) => (
            <div 
              key={ind.name}
              onClick={() => window.location.href = `/catalog?industry=${encodeURIComponent(ind.name)}`}
              className="group flex flex-col gap-3 cursor-pointer"
            >
              <div className="w-full relative aspect-[4/3] overflow-hidden bg-slate-100 rounded-sm">
                <img 
                  src={ind.image} 
                  alt={ind.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-bold text-brand-dark group-hover:text-brand-orange transition-colors">
                  {ind.name}
                </h4>
                <div className="w-full h-px bg-slate-200 scale-x-100 origin-left transition-transform duration-300 group-hover:bg-brand-orange/50"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
