import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, Clock, FlaskConical, Hash, Tag, TrendingUp } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  cas: string;
  ec: string;
  category: string;
  industry: string[];
  otherNames?: string[];
}

interface SearchResult {
  product: Product;
  matchType: 'name' | 'cas' | 'ec' | 'synonym';
  matchText: string;
}

const TRENDING_SEARCHES = [
  'MDI',
  'Titanium Dioxide',
  'Epoxy Resin',
  'Sodium Hydroxide',
  'Isopropyl Alcohol',
  'Polyethylene Glycol',
];

const MAX_RESULTS = 8;

let productsCache: Product[] | null = null;

async function loadProducts(): Promise<Product[]> {
  if (productsCache) return productsCache;
  const res = await fetch('/data/products.json');
  const data = await res.json();
  const products = Array.isArray(data) ? data : data.products || [];
  productsCache = products.map((p: any) => ({
    id: p.id,
    name: p.name,
    cas: p.cas,
    ec: p.ec,
    category: p.category,
    industry: p.industry,
    otherNames: p.otherNames || [],
  }));
  return productsCache!;
}

function highlightMatch(text: string, query: string): JSX.Element {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-brand-orange font-bold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

function searchProducts(products: Product[], query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q || q.length < 2) return [];

  const results: SearchResult[] = [];
  const seen = new Set<number>();

  // Pass 1: exact CAS match
  for (const p of products) {
    if (results.length >= MAX_RESULTS) break;
    if (p.cas && p.cas.toLowerCase() === q && !seen.has(p.id)) {
      results.push({ product: p, matchType: 'cas', matchText: p.cas });
      seen.add(p.id);
    }
  }

  // Pass 2: CAS starts with
  for (const p of products) {
    if (results.length >= MAX_RESULTS) break;
    if (p.cas && p.cas.toLowerCase().startsWith(q) && !seen.has(p.id)) {
      results.push({ product: p, matchType: 'cas', matchText: p.cas });
      seen.add(p.id);
    }
  }

  // Pass 3: name starts with
  for (const p of products) {
    if (results.length >= MAX_RESULTS) break;
    if (p.name.toLowerCase().startsWith(q) && !seen.has(p.id)) {
      results.push({ product: p, matchType: 'name', matchText: p.name });
      seen.add(p.id);
    }
  }

  // Pass 4: name contains
  for (const p of products) {
    if (results.length >= MAX_RESULTS) break;
    if (p.name.toLowerCase().includes(q) && !seen.has(p.id)) {
      results.push({ product: p, matchType: 'name', matchText: p.name });
      seen.add(p.id);
    }
  }

  // Pass 5: EC number
  for (const p of products) {
    if (results.length >= MAX_RESULTS) break;
    if (p.ec && p.ec.toLowerCase().includes(q) && !seen.has(p.id)) {
      results.push({ product: p, matchType: 'ec', matchText: p.ec });
      seen.add(p.id);
    }
  }

  // Pass 6: synonyms / other names
  for (const p of products) {
    if (results.length >= MAX_RESULTS) break;
    if (seen.has(p.id)) continue;
    const match = p.otherNames?.find((n) => n.toLowerCase().includes(q));
    if (match) {
      results.push({ product: p, matchType: 'synonym', matchText: match });
      seen.add(p.id);
    }
  }

  return results;
}

const matchIcons = {
  name: FlaskConical,
  cas: Hash,
  ec: Hash,
  synonym: Tag,
};

const matchLabels = {
  name: 'Product',
  cas: 'CAS',
  ec: 'EC',
  synonym: 'Synonym',
};

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Load products on first open
  useEffect(() => {
    if (isOpen && products.length === 0) {
      setLoading(true);
      loadProducts().then((p) => {
        setProducts(p);
        setLoading(false);
      });
    }
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelectedIdx(-1);
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      return () => document.removeEventListener('keydown', handleKey);
    }
  }, [isOpen, onClose]);

  const results = useMemo(() => searchProducts(products, query), [products, query]);

  const totalMatches = useMemo(() => {
    if (!query.trim() || query.trim().length < 2) return 0;
    const q = query.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.cas && p.cas.toLowerCase().includes(q)) ||
        (p.ec && p.ec.toLowerCase().includes(q)) ||
        p.otherNames?.some((n) => n.toLowerCase().includes(q))
    ).length;
  }, [products, query]);

  const goToProduct = useCallback(
    (product: Product) => {
      onClose();
      navigate(`/products/cas-${product.cas}`);
    },
    [navigate, onClose]
  );

  const goToSearch = useCallback(() => {
    if (query.trim()) {
      onClose();
      navigate(`/catalog?q=${encodeURIComponent(query.trim())}`);
    }
  }, [query, navigate, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const total = results.length;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx((prev) => (prev < total - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx((prev) => (prev > 0 ? prev - 1 : total - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIdx >= 0 && selectedIdx < total) {
        goToProduct(results[selectedIdx].product);
      } else {
        goToSearch();
      }
    }
  };

  const handleTrendingClick = (term: string) => {
    setQuery(term);
    setSelectedIdx(-1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex flex-col"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-sm" onClick={onClose} />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Header / Search Input */}
            <div className="pt-8 pb-4 px-6 md:px-10">
              <div className="max-w-3xl mx-auto">
                {/* Close button */}
                <div className="flex justify-end mb-6">
                  <button
                    onClick={onClose}
                    className="text-slate-500 hover:text-white transition-colors p-2"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search by product name, CAS number, or EC number..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedIdx(-1);
                    }}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-14 pr-14 py-5 bg-white/10 border border-white/10 text-white text-lg placeholder-slate-500 focus:outline-none focus:border-brand-orange focus:bg-white/15 transition-all"
                  />
                  {query && (
                    <button
                      onClick={() => {
                        setQuery('');
                        inputRef.current?.focus();
                      }}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Keyboard hints */}
                <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-600 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <kbd className="bg-white/10 text-slate-400 px-1.5 py-0.5 rounded text-[9px] font-mono">↑↓</kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="bg-white/10 text-slate-400 px-1.5 py-0.5 rounded text-[9px] font-mono">Enter</kbd>
                    Select
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="bg-white/10 text-slate-400 px-1.5 py-0.5 rounded text-[9px] font-mono">Esc</kbd>
                    Close
                  </span>
                </div>
              </div>
            </div>

            {/* Results Area */}
            <div className="flex-1 overflow-y-auto px-6 md:px-10 pb-10">
              <div className="max-w-3xl mx-auto">
                {loading ? (
                  <div className="text-center py-16">
                    <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm text-slate-500">Loading product database...</p>
                  </div>
                ) : query.trim().length < 2 ? (
                  /* Trending / Default State */
                  <div className="pt-8">
                    <div className="flex items-center gap-2 mb-6">
                      <TrendingUp className="w-4 h-4 text-brand-orange" />
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        Trending Searches
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {TRENDING_SEARCHES.map((term) => (
                        <button
                          key={term}
                          onClick={() => handleTrendingClick(term)}
                          className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 hover:border-brand-orange/50 hover:bg-white/10 transition-all text-left group"
                        >
                          <Search className="w-3.5 h-3.5 text-slate-600 group-hover:text-brand-orange transition-colors shrink-0" />
                          <span className="text-sm text-slate-400 group-hover:text-white transition-colors truncate">
                            {term}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="mt-10 text-center">
                      <p className="text-xs text-slate-600">
                        Search across <span className="text-slate-400 font-bold">4,480+</span> products by name, CAS, EC number, or synonym
                      </p>
                    </div>
                  </div>
                ) : results.length === 0 ? (
                  /* No Results */
                  <div className="text-center py-16">
                    <Search className="w-10 h-10 text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-400 mb-2">
                      No products found for "<span className="text-white font-bold">{query}</span>"
                    </p>
                    <p className="text-sm text-slate-600 mb-6">Try a different name, CAS, or EC number</p>
                    <button
                      onClick={goToSearch}
                      className="text-brand-orange text-xs font-bold uppercase tracking-widest hover:text-brand-orange-hover transition-colors"
                    >
                      Search Full Catalog
                    </button>
                  </div>
                ) : (
                  /* Results List */
                  <div>
                    {/* Results count */}
                    <div className="flex items-center justify-between mb-4 pt-2">
                      <p className="text-xs text-slate-500">
                        Showing <span className="text-slate-300 font-bold">{results.length}</span>
                        {totalMatches > MAX_RESULTS && (
                          <> of <span className="text-slate-300 font-bold">{totalMatches}</span></>
                        )}
                        {' '}result{totalMatches !== 1 ? 's' : ''}
                      </p>
                      <button
                        onClick={goToSearch}
                        className="text-brand-orange text-[10px] font-bold uppercase tracking-widest hover:text-brand-orange-hover transition-colors flex items-center gap-1.5"
                      >
                        View All in Catalog <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Result Items */}
                    <div className="space-y-1">
                      {results.map((r, i) => {
                        const Icon = matchIcons[r.matchType];
                        const isSelected = i === selectedIdx;
                        return (
                          <button
                            key={r.product.id}
                            onClick={() => goToProduct(r.product)}
                            onMouseEnter={() => setSelectedIdx(i)}
                            className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-all group ${
                              isSelected
                                ? 'bg-brand-orange/10 border border-brand-orange/30'
                                : 'bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10'
                            }`}
                          >
                            {/* Match type icon */}
                            <div
                              className={`w-9 h-9 flex items-center justify-center shrink-0 ${
                                isSelected ? 'bg-brand-orange/20' : 'bg-white/10'
                              }`}
                            >
                              <Icon
                                className={`w-4 h-4 ${
                                  isSelected ? 'text-brand-orange' : 'text-slate-500'
                                }`}
                              />
                            </div>

                            {/* Product info */}
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-bold text-white truncate">
                                {highlightMatch(r.product.name, query)}
                              </div>
                              <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                                <span>CAS: {highlightMatch(r.product.cas, query)}</span>
                                {r.product.ec && (
                                  <>
                                    <span className="text-slate-700">|</span>
                                    <span>EC: {highlightMatch(r.product.ec, query)}</span>
                                  </>
                                )}
                                {r.matchType === 'synonym' && (
                                  <>
                                    <span className="text-slate-700">|</span>
                                    <span className="text-slate-400">
                                      aka: {highlightMatch(r.matchText, query)}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Match badge + arrow */}
                            <div className="flex items-center gap-3 shrink-0">
                              <span
                                className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 ${
                                  isSelected
                                    ? 'bg-brand-orange/20 text-brand-orange'
                                    : 'bg-white/10 text-slate-500'
                                }`}
                              >
                                {matchLabels[r.matchType]}
                              </span>
                              <ArrowRight
                                className={`w-4 h-4 transition-all ${
                                  isSelected
                                    ? 'text-brand-orange translate-x-0'
                                    : 'text-slate-700 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                                }`}
                              />
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* View All CTA */}
                    {totalMatches > MAX_RESULTS && (
                      <button
                        onClick={goToSearch}
                        className="w-full mt-3 flex items-center justify-center gap-2 px-5 py-4 bg-white/5 border border-white/5 hover:bg-brand-orange/10 hover:border-brand-orange/30 transition-all text-sm text-slate-400 hover:text-brand-orange"
                      >
                        View all {totalMatches} results in catalog
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
