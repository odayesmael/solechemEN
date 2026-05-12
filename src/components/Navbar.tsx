import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronRight, ChevronDown, Search, Globe, ArrowRight, Tag, Factory, FlaskConical, Phone, Settings, PackageCheck, Beaker, Droplets, ShieldCheck, Award, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { industries } from '../data/industries';
import { QuoteModal } from './QuoteModal';
import { SearchOverlay } from './SearchOverlay';

type MegaMenu = 'products' | 'industries' | 'manufacturing' | null;

const mfgServices = [
  { icon: Settings, title: 'Toll Manufacturing', desc: 'Process your raw materials in our facilities to your exact specifications.' },
  { icon: PackageCheck, title: 'Contract Manufacturing', desc: 'End-to-end production from raw materials to final delivery.' },
  { icon: Beaker, title: 'Custom Formulations', desc: 'Tailored chemical formulations developed by our R&D team.' },
  { icon: Droplets, title: 'Blending & Masterbatches', desc: 'Liquid and solid blends with precise quality control.' },
];

const mfgCerts = [
  { icon: Award, title: 'ISO 9001:2015', desc: 'Quality Management' },
  { icon: ShieldCheck, title: 'ISO 22000:2018', desc: 'Food Safety' },
  { icon: Award, title: 'GMP+', desc: 'Feed Safety — SGS Certified' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaMenu>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const navRef = useRef<HTMLElement>(null);

  function openMega(menu: MegaMenu) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMega(menu);
  }

  function closeMega() {
    timeoutRef.current = setTimeout(() => setActiveMega(null), 150);
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMega(null);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Cmd+K / Ctrl+K to open search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <nav ref={navRef} className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="h-20 px-4 md:px-10 flex items-center justify-between max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link to="/" className="shrink-0 hover:opacity-80 transition-opacity">
          <img
            src="/logo.webp"
            alt="SoleChem Logo"
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Products */}
          <div
            onMouseEnter={() => openMega('products')}
            onMouseLeave={closeMega}
          >
            <Link
              to="/catalog"
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-1 ${activeMega === 'products' ? 'text-brand-orange' : 'text-slate-500 hover:text-brand-orange'}`}
            >
              Products
              <ChevronDown className={`w-3 h-3 transition-transform ${activeMega === 'products' ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          {/* Industries */}
          <div
            onMouseEnter={() => openMega('industries')}
            onMouseLeave={closeMega}
          >
            <Link
              to="/industries"
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-1 ${activeMega === 'industries' ? 'text-brand-orange' : 'text-slate-500 hover:text-brand-orange'}`}
            >
              Industries
              <ChevronDown className={`w-3 h-3 transition-transform ${activeMega === 'industries' ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          {/* Manufacturing */}
          <div
            onMouseEnter={() => openMega('manufacturing')}
            onMouseLeave={closeMega}
          >
            <Link
              to="/manufacturing"
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-1 ${activeMega === 'manufacturing' ? 'text-brand-orange' : 'text-slate-500 hover:text-brand-orange'}`}
            >
              Manufacturing
              <ChevronDown className={`w-3 h-3 transition-transform ${activeMega === 'manufacturing' ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          <Link to="/about" className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-brand-orange transition-colors">
            About
          </Link>

          <Link to="/blog" className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-brand-orange transition-colors">
            Blog
          </Link>

          <Link to="/contact" className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-brand-orange transition-colors">
            Contact
          </Link>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => setShowSearch(true)} className="text-slate-400 hover:text-brand-orange transition-colors p-2">
            <Search className="w-5 h-5" />
          </button>
          <div className="h-4 w-px bg-slate-200"></div>
          <button className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-brand-orange transition-colors p-2">
            <Globe className="w-4 h-4" />
            EN
          </button>
          <button
            onClick={() => setShowQuote(true)}
            className="ml-2 bg-brand-orange text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-brand-orange-hover transition-colors"
          >
            Request Quote
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-slate-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* === MEGA MENUS === */}
      <AnimatePresence>
        {activeMega === 'products' && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => openMega('products')}
            onMouseLeave={closeMega}
            className="absolute left-0 w-full bg-white border-b border-slate-200 shadow-xl z-40"
          >
            <div className="max-w-[1440px] mx-auto flex">
              {/* Left panel */}
              <div className="w-72 bg-slate-50 border-r border-slate-200 p-8 flex flex-col justify-between shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-brand-orange" />
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-dark">Product Categories</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    Browse our catalog of 4,480+ chemicals across {categories.length} categories.
                  </p>
                  <Link
                    to="/categories"
                    onClick={() => setActiveMega(null)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-orange hover:text-brand-orange-hover transition-colors group"
                  >
                    View All Categories
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <Link
                  to="/catalog"
                  onClick={() => setActiveMega(null)}
                  className="mt-8 bg-brand-dark hover:bg-black text-white px-5 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors text-center flex items-center justify-center gap-2"
                >
                  <Search className="w-3.5 h-3.5" />
                  Search All Products
                </Link>
              </div>

              {/* Categories grid */}
              <div className="flex-1 p-8">
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      to={`/catalog?category=${encodeURIComponent(cat.name)}`}
                      onClick={() => setActiveMega(null)}
                      className="flex items-center gap-3 py-2.5 px-3 -mx-3 rounded-sm hover:bg-slate-50 group transition-colors"
                    >
                      <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-brand-orange transition-colors" />
                      <span className="text-sm text-slate-600 group-hover:text-brand-dark font-medium transition-colors">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeMega === 'industries' && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => openMega('industries')}
            onMouseLeave={closeMega}
            className="absolute left-0 w-full bg-white border-b border-slate-200 shadow-xl z-40"
          >
            <div className="max-w-[1440px] mx-auto flex">
              {/* Left panel */}
              <div className="w-72 bg-slate-50 border-r border-slate-200 p-8 flex flex-col justify-between shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Factory className="w-4 h-4 text-brand-orange" />
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-dark">Industries We Serve</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    Specialized chemical solutions for {industries.length} global industries.
                  </p>
                  <Link
                    to="/industries"
                    onClick={() => setActiveMega(null)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-orange hover:text-brand-orange-hover transition-colors group"
                  >
                    Explore All Industries
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="mt-8 bg-brand-dark p-5 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-3.5 h-3.5 text-brand-orange" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Need Help?</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">Talk to our industry specialists.</p>
                  <button
                    onClick={() => { setShowQuote(true); setActiveMega(null); }}
                    className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors"
                  >
                    Request Quote
                  </button>
                </div>
              </div>

              {/* Industries grid */}
              <div className="flex-1 p-8">
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-1">
                  {industries.map((ind) => (
                    <Link
                      key={ind.name}
                      to={`/catalog?industry=${encodeURIComponent(ind.name)}`}
                      onClick={() => setActiveMega(null)}
                      className="flex items-center gap-3 py-2.5 px-3 -mx-3 rounded-sm hover:bg-slate-50 group transition-colors"
                    >
                      <img src={ind.image} alt="" className="w-8 h-8 rounded-sm object-cover shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                      <span className="text-sm text-slate-600 group-hover:text-brand-dark font-medium transition-colors">{ind.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {activeMega === 'manufacturing' && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => openMega('manufacturing')}
            onMouseLeave={closeMega}
            className="absolute left-0 w-full bg-white border-b border-slate-200 shadow-xl z-40"
          >
            <div className="max-w-[1440px] mx-auto flex">
              {/* Left panel */}
              <div className="w-72 bg-slate-50 border-r border-slate-200 p-8 flex flex-col justify-between shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FlaskConical className="w-4 h-4 text-brand-orange" />
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-dark">Manufacturing</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    State-of-the-art facilities delivering premium-quality chemical products through batch and continuous processes.
                  </p>
                  <Link
                    to="/manufacturing"
                    onClick={() => setActiveMega(null)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-orange hover:text-brand-orange-hover transition-colors group"
                  >
                    Explore Manufacturing
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="mt-8 space-y-3">
                  {mfgCerts.map(cert => (
                    <div key={cert.title} className="flex items-center gap-3 text-xs">
                      <cert.icon className="w-4 h-4 text-brand-orange shrink-0" />
                      <div>
                        <span className="font-bold text-brand-dark">{cert.title}</span>
                        <span className="text-slate-400 ml-1">— {cert.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services grid */}
              <div className="flex-1 p-8">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                  {mfgServices.map((svc) => (
                    <Link
                      key={svc.title}
                      to="/manufacturing"
                      onClick={() => setActiveMega(null)}
                      className="flex items-start gap-4 p-5 rounded-sm hover:bg-slate-50 group transition-colors border border-transparent hover:border-slate-200"
                    >
                      <div className="w-10 h-10 bg-brand-orange/10 flex items-center justify-center shrink-0">
                        <svc.icon className="w-5 h-5 text-brand-orange" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-brand-dark group-hover:text-brand-orange transition-colors mb-1">{svc.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{svc.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between">
                  <p className="text-xs text-slate-500">Need a manufacturing partner? Let's discuss your project.</p>
                  <button
                    onClick={() => { setShowQuote(true); setActiveMega(null); }}
                    className="bg-brand-orange hover:bg-brand-orange-hover text-white px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
                  >
                    Request Quote <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === MOBILE MENU === */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 absolute top-20 left-0 w-full overflow-hidden z-40"
          >
            <div className="p-4 flex flex-col max-h-[80vh] overflow-y-auto">
              <Link to="/catalog" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-800 p-4 border-b border-slate-100 hover:text-brand-orange transition-colors">
                Products <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link to="/categories" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-800 p-4 border-b border-slate-100 hover:text-brand-orange transition-colors">
                Categories <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link to="/industries" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-800 p-4 border-b border-slate-100 hover:text-brand-orange transition-colors">
                Industries <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link to="/manufacturing" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-800 p-4 border-b border-slate-100 hover:text-brand-orange transition-colors">
                Manufacturing <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-800 p-4 border-b border-slate-100 hover:text-brand-orange transition-colors">
                About <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-800 p-4 border-b border-slate-100 hover:text-brand-orange transition-colors">
                Contact <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link to="/team" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-800 p-4 border-b border-slate-100 hover:text-brand-orange transition-colors">
                Our Team <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-800 p-4 border-b border-slate-100 hover:text-brand-orange transition-colors">
                Blog <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link to="/faq" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-800 p-4 border-b border-slate-100 hover:text-brand-orange transition-colors">
                FAQ <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link to="/careers" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-800 p-4 border-b border-slate-100 hover:text-brand-orange transition-colors">
                Sole Talent <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <div className="flex gap-3 pt-6 pb-2">
                <button className="flex-1 border border-brand-dark text-brand-dark px-4 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                  <Globe className="w-4 h-4" /> EN
                </button>
                <button onClick={() => { setShowQuote(true); setMobileMenuOpen(false); }} className="flex-[2] bg-brand-orange text-white px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-brand-orange-hover transition-colors">
                  Request Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showQuote && (
        <QuoteModal productName="General Inquiry" onClose={() => setShowQuote(false)} />
      )}

      <SearchOverlay isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </nav>
  );
}
