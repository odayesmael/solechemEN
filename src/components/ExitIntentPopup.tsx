import { useState, useEffect, useCallback, FormEvent } from 'react';
import { X, Search, CheckCircle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = [
  'Amino Acids & Peptides',
  'Agrochemicals',
  'Alcohols & Glycols',
  'Amines',
  'Catalysts & Catalyst Precursors',
  'Flavors & Fragrances',
  'Organic Acids',
  'Pharmaceutical Intermediates',
  'Pigments & Colorants',
  'Polymers & Resins',
  'Solvents',
  'Surfactants',
  'Vitamins & Nutrients',
  'Other',
];

const SESSION_KEY = 'solechem_exit_intent_shown';

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    category: '',
    search: '',
  });

  const show = useCallback(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, '1');
    setVisible(true);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    let timeout: ReturnType<typeof setTimeout>;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) {
        show();
      }
    };

    // mobile: detect back-button / tab-switch via visibilitychange
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        show();
      }
    };

    // delay listener registration so the popup doesn't fire on page load
    timeout = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('visibilitychange', handleVisibility);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [show]);

  function close() {
    setVisible(false);
  }

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSubmitted(true);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="bg-brand-dark text-white p-6 flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="w-4 h-4 text-brand-orange" />
                  <h2 className="text-xs font-bold text-brand-orange uppercase tracking-widest">Before You Go</h2>
                </div>
                <p className="text-lg font-black leading-tight">Looking for Something Specific?</p>
                <p className="text-xs text-slate-400 mt-1">Tell us what you need — we'll help you find it.</p>
              </div>
              <button onClick={close} className="text-slate-400 hover:text-white transition-colors p-1 shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="p-10 flex flex-col items-center text-center gap-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
                <h3 className="text-xl font-black text-brand-dark">Thank You!</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  We received your request. Our team will get back to you at <strong>{form.email}</strong> with the information you need.
                </p>
                <button
                  onClick={close}
                  className="mt-4 bg-brand-dark hover:bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => update('name', e.target.value)}
                    className="w-full border border-slate-200 p-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                    className="w-full border border-slate-200 p-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Product Category</label>
                  <select
                    value={form.category}
                    onChange={e => update('category', e.target.value)}
                    className="w-full border border-slate-200 p-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition-colors bg-white"
                  >
                    <option value="">Select a category...</option>
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">What are you looking for? *</label>
                  <textarea
                    required
                    value={form.search}
                    onChange={e => update('search', e.target.value)}
                    rows={3}
                    className="w-full border border-slate-200 p-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition-colors resize-none"
                    placeholder="e.g. Citric Acid in bulk, custom formulation for cosmetics, specific CAS number..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-70 text-white py-4 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Request
                    </>
                  )}
                </button>

                <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                  Our team typically responds within 24 hours. Your data is handled per our privacy policy.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
