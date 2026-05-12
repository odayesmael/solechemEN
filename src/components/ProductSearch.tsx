import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';

export function ProductSearch() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(query)}`);
    } else {
      navigate('/catalog');
    }
  };

  return (
    <section className="bg-slate-50 py-24 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-12"
        >
          <span className="inline-block bg-brand-orange text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
             Extensive Catalog
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-brand-dark leading-[0.9]">
            FIND EXACTLY WHAT YOU NEED
          </h2>
          <p className="text-lg md:text-xl font-bold text-slate-400 mt-4">
            Among <span className="text-brand-orange font-black">4,480+</span> products in our catalog
          </p>
        </motion.div>

        {/* Big Search Bar */}
        <motion.form 
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row rounded-sm overflow-hidden shadow-lg border border-slate-200 bg-white">
             <div className="flex-1 flex items-center px-6">
                <Search className="w-5 h-5 text-slate-300 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="CAS number, chemical name, or application..."
                  className="w-full bg-transparent border-none text-brand-dark text-base p-5 font-medium placeholder-slate-400 focus:outline-none"
                />
             </div>
             <button type="submit" className="bg-brand-orange hover:bg-brand-orange-hover text-white px-10 py-5 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 justify-center">
               <Search className="w-4 h-4" />
               Search
             </button>
          </div>
        </motion.form>

        {/* Alphabetical List */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Browse Alphabetically</p>
          <div className="flex flex-wrap justify-center gap-1">
            {letters.map((letter) => (
              <Link 
                to={`/catalog?q=${letter}`}
                key={letter}
                className="w-10 h-10 md:w-12 md:h-12 bg-white hover:bg-brand-dark text-slate-600 hover:text-white flex items-center justify-center font-black text-lg transition-colors border border-slate-200 hover:border-brand-dark"
              >
                {letter}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
