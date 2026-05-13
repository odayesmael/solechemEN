import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { categories } from '../data/categories';

export function Categories() {
  const [search, setSearch] = useState('');

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 bg-white flex flex-col min-h-screen">
      <div className="relative pt-32 pb-16 px-4 md:px-10 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-9 grid-rows-2 opacity-15">
          {categories.slice(0, 18).map((cat) => (
            <div
              key={cat.name}
              className="bg-cover bg-center"
              style={{ backgroundImage: `url("${cat.image}")` }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white"></div>

        <div className="max-w-7xl mx-auto relative z-10 w-full flex flex-col items-start gap-4">
          <a href="/" className="text-slate-500 hover:text-brand-dark uppercase tracking-widest text-[10px] font-bold flex items-center gap-2 group mb-4 transition-colors">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </a>
          <span className="inline-block bg-brand-orange text-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest">
            Complete Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-brand-dark mb-4">ALL CATEGORIES</h1>
          <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
            Explore our comprehensive range of {categories.length} distinct product categories, tailored for industrial, pharmaceutical, and nutritional applications globally.
          </p>

          <div className="w-full max-w-md mt-4 bg-white/80 backdrop-blur border border-slate-200 flex items-center px-4 focus-within:border-brand-orange transition-colors">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-transparent border-none text-brand-dark p-3 text-sm font-medium placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 md:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {filteredCategories.map((cat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02, duration: 0.5 }}
              key={cat.name}
              onClick={() => { window.location.href = `/catalog?category=${encodeURIComponent(cat.name)}`; }}
              className="group flex flex-col gap-5 cursor-pointer"
            >
              <div className="w-full relative aspect-[4/3] overflow-hidden bg-slate-100 rounded-sm">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>
              <div className="flex flex-col flex-1 justify-between gap-4">
                <h4 className="text-lg font-bold text-brand-dark group-hover:text-brand-orange transition-colors">
                  {cat.name}
                </h4>
                <div className="flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  View Products
                  <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="w-full h-px bg-slate-200 scale-x-100 origin-left transition-transform duration-300 group-hover:bg-brand-orange/50"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-medium">No categories found matching "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
