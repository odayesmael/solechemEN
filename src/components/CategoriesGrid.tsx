import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { categories } from '../data/categories';

export function CategoriesGrid() {
  const navigate = useNavigate();

  return (
    <section id="categories" className="bg-slate-50 flex flex-col border-b border-slate-200">
      <div className="p-8 md:p-16 border-b border-slate-200 flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white">
        <div>
          <h2 className="text-brand-orange font-bold tracking-widest uppercase text-xs mb-4">
            Browse by Category
          </h2>
          <h3 className="text-5xl md:text-6xl font-black text-brand-dark leading-tight tracking-tight">
            EXPLORE OUR <br className="hidden md:block"/> CHEMICAL PORTFOLIO
          </h3>
        </div>
        <Link to="/categories" className="flex items-center gap-2 text-slate-600 hover:text-brand-orange font-bold uppercase tracking-widest text-xs transition-colors group">
          View all categories
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 w-full border-t border-slate-200">
        {categories.slice(0, 12).map((cat) => (
          <div
            key={cat.name}
            onClick={() => navigate(`/catalog?category=${encodeURIComponent(cat.name)}`)}
            className="group relative h-40 md:h-48 xl:h-56 overflow-hidden cursor-pointer border-b border-r border-slate-200 bg-brand-dark"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
              style={{ backgroundImage: `url("${cat.image}")` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 group-hover:from-black/80 group-hover:via-black/20 transition-all duration-500"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end h-full">
              <span className="text-white font-bold text-sm md:text-base tracking-wide leading-tight group-hover:text-brand-orange transition-colors z-10">
                {cat.name}
              </span>
              <div className="w-8 h-0.5 bg-brand-orange mt-4 transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100 z-10 ease-out"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
