import { useState, FormEvent } from 'react';
import { X, Calendar, CheckCircle, Clock, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingModalProps {
  onClose: () => void;
}

const TOPICS = [
  'Product Sourcing & Availability',
  'Custom Formulations',
  'Toll / Contract Manufacturing',
  'Bulk Pricing & Supply Agreements',
  'Technical Support & SDS',
  'Logistics & Shipping',
  'Other',
];

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30',
  '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
];

function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

function getMaxDate() {
  const d = new Date();
  d.setMonth(d.getMonth() + 2);
  return d.toISOString().split('T')[0];
}

function isWeekend(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.getDay() === 0 || d.getDay() === 6;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export function BookingModal({ onClose }: BookingModalProps) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    topic: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [dateError, setDateError] = useState('');

  function update(field: string, value: string) {
    if (field === 'date') {
      setDateError(isWeekend(value) ? 'Please select a weekday (Mon–Fri).' : '');
    }
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isWeekend(form.date)) {
      setDateError('Please select a weekday (Mon–Fri).');
      return;
    }
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
              <h2 className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-2">Strategy Call</h2>
              <p className="text-lg font-black leading-tight">Book a Call with Our Team</p>
              <p className="text-xs text-slate-400 mt-1">30-minute consultation · CET timezone</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="p-10 flex flex-col items-center text-center gap-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <h3 className="text-xl font-black text-brand-dark">Call Booked!</h3>
              <div className="bg-slate-50 border border-slate-200 p-4 w-full text-left space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-brand-orange" />
                  <span className="text-slate-700 font-semibold">{formatDate(form.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-brand-orange" />
                  <span className="text-slate-700 font-semibold">{form.time} CET</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-brand-orange" />
                  <span className="text-slate-700 font-semibold">{form.topic}</span>
                </div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                A confirmation email has been sent to <strong>{form.email}</strong>. Our team will reach out to confirm the call details.
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
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Topic *</label>
                <select
                  required
                  value={form.topic}
                  onChange={e => update('topic', e.target.value)}
                  className="w-full border border-slate-200 p-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition-colors bg-white"
                >
                  <option value="">Select a topic...</option>
                  {TOPICS.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    min={getMinDate()}
                    max={getMaxDate()}
                    value={form.date}
                    onChange={e => update('date', e.target.value)}
                    className={`w-full border p-3 text-sm text-brand-dark focus:outline-none transition-colors ${dateError ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-brand-orange'}`}
                  />
                  {dateError && <p className="text-red-500 text-xs mt-1">{dateError}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Preferred Time (CET) *</label>
                  <select
                    required
                    value={form.time}
                    onChange={e => update('time', e.target.value)}
                    className="w-full border border-slate-200 p-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition-colors bg-white"
                  >
                    <option value="">Select time...</option>
                    {TIME_SLOTS.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Additional Notes</label>
                <textarea
                  value={form.notes}
                  onChange={e => update('notes', e.target.value)}
                  rows={3}
                  className="w-full border border-slate-200 p-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition-colors resize-none"
                  placeholder="Briefly describe what you'd like to discuss..."
                />
              </div>

              <button
                type="submit"
                disabled={sending || !!dateError}
                className="w-full bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-70 text-white py-4 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    Confirm Booking
                  </>
                )}
              </button>

              <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                Our team will confirm your booking via email within 24 hours. All calls are conducted in English, Italian, German, or French.
              </p>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
