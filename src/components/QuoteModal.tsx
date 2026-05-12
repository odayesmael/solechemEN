import { useState, FormEvent } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuoteModalProps {
  productName: string;
  cas?: string;
  onClose: () => void;
}

export function QuoteModal({ productName, cas, onClose }: QuoteModalProps) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    quantity: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <div className="bg-brand-dark text-white p-6 flex items-start justify-between">
            <div>
              <h2 className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-2">Request a Quote</h2>
              <p className="text-lg font-black leading-tight">{productName}</p>
              {cas && <p className="text-xs text-slate-400 font-mono mt-1">CAS: {cas}</p>}
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="p-10 flex flex-col items-center text-center gap-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <h3 className="text-xl font-black text-brand-dark">Quote Request Sent!</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Thank you for your interest in <strong>{productName}</strong>. Our team will review your request and get back to you within 24 hours.
              </p>
              <button
                onClick={onClose}
                className="mt-4 bg-brand-dark hover:bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="bg-slate-50 border border-slate-200 p-3 flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest shrink-0">Product</span>
                <span className="text-sm font-bold text-brand-dark truncate">{productName}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Full Name *</label>
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
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Company *</label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={e => update('company', e.target.value)}
                    className="w-full border border-slate-200 p-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="Company Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => update('phone', e.target.value)}
                    className="w-full border border-slate-200 p-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Required Quantity</label>
                <input
                  type="text"
                  value={form.quantity}
                  onChange={e => update('quantity', e.target.value)}
                  className="w-full border border-slate-200 p-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition-colors"
                  placeholder="e.g. 500 kg, 1 MT, 20 drums"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Additional Notes</label>
                <textarea
                  value={form.message}
                  onChange={e => update('message', e.target.value)}
                  rows={3}
                  className="w-full border border-slate-200 p-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition-colors resize-none"
                  placeholder="Purity requirements, delivery terms, packaging preferences..."
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
                    Submit Quote Request
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
