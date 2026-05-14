import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Clock, Globe, Shield, FlaskConical, Send, CheckCircle } from 'lucide-react';

const enquiryTypes = ['RFQ / Pricing', 'Custom Formulation', 'Supply Agreement', 'Toll Manufacturing', 'Sample Request'];

const badges = [
  { icon: Clock, label: 'Under 24h Response' },
  { icon: Globe, label: 'EN / IT / DE / FR' },
  { icon: FlaskConical, label: 'Qualified Chemists' },
  { icon: Shield, label: 'NDA on Request' },
];

export function Contact() {
  const [form, setForm] = useState({
    name: '', jobTitle: '', company: '', vat: '',
    email: '', phone: '', enquiryType: '', requirements: '', nda: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function update(field: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSubmitted(true);
  }

  return (
    <div className="flex-1 bg-white flex flex-col">
      {/* Header */}
      <div className="bg-brand-dark pt-32 pb-16 px-4 md:px-10 border-b border-brand-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <a href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white uppercase tracking-widest text-[10px] font-bold group mb-6 transition-colors">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </a>
          <span className="block bg-brand-orange text-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest w-fit mb-4">
            B2B Enquiries Welcome
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            CONTACT <span className="text-brand-orange">US</span>
          </h1>
          <p className="text-slate-400 max-w-xl text-sm leading-relaxed mb-8">
            Speak directly with a technical expert — not a call centre. We respond to all B2B inquiries within 24 business hours.
          </p>
          <div className="flex flex-wrap gap-3">
            {badges.map(b => (
              <div key={b.label} className="flex items-center gap-2 border border-white/15 px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <b.icon className="w-4 h-4 text-brand-orange" />
                {b.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 border border-slate-200 p-6 md:p-10">
            {submitted ? (
              <div
                data-animate="fade"
                className="py-20 flex flex-col items-center text-center gap-4"
              >
                <CheckCircle className="w-16 h-16 text-green-500" />
                <h3 className="text-2xl font-black text-brand-dark">Enquiry Submitted!</h3>
                <p className="text-slate-500 text-sm max-w-md">
                  Thank you for reaching out. Our team will review your enquiry and respond within 24 business hours.
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', jobTitle: '', company: '', vat: '', email: '', phone: '', enquiryType: '', requirements: '', nda: false }); }} className="mt-4 bg-brand-dark hover:bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest transition-colors">
                  New Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Contact Info */}
                <h3 className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-6 pb-3 border-b border-slate-200">Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Full Name *</label>
                    <input required value={form.name} onChange={e => update('name', e.target.value)} placeholder="John Doe" className="w-full border border-slate-200 p-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Job Title *</label>
                    <input required value={form.jobTitle} onChange={e => update('jobTitle', e.target.value)} placeholder="Procurement Manager" className="w-full border border-slate-200 p-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition-colors" />
                  </div>
                </div>

                {/* Company Details */}
                <h3 className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-6 pb-3 border-b border-slate-200">Company Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Company Name *</label>
                    <input required value={form.company} onChange={e => update('company', e.target.value)} placeholder="Acme Corp S.r.l." className="w-full border border-slate-200 p-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">VAT / Tax Number</label>
                    <input value={form.vat} onChange={e => update('vat', e.target.value)} placeholder="IT12345678901" className="w-full border border-slate-200 p-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition-colors" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Business Email *</label>
                    <input type="email" required value={form.email} onChange={e => update('email', e.target.value)} placeholder="john@acme.com" className="w-full border border-slate-200 p-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Phone / WhatsApp</label>
                    <input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+39 ..." className="w-full border border-slate-200 p-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition-colors" />
                  </div>
                </div>

                {/* Enquiry Details */}
                <h3 className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-6 pb-3 border-b border-slate-200">Enquiry Details</h3>
                <div className="mb-4">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Enquiry Type</label>
                  <div className="flex flex-wrap gap-2">
                    {enquiryTypes.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => update('enquiryType', form.enquiryType === type ? '' : type)}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-colors ${form.enquiryType === type ? 'bg-brand-orange text-white border-brand-orange' : 'bg-white text-slate-500 border-slate-200 hover:border-brand-orange hover:text-brand-orange'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Requirements</label>
                  <textarea value={form.requirements} onChange={e => update('requirements', e.target.value)} rows={4} placeholder="Describe requirements: product, CAS, quantity, purity grade, application, Incoterms..." className="w-full border border-slate-200 p-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition-colors resize-none" />
                </div>

                {/* NDA */}
                <label className="flex items-start gap-3 bg-brand-orange/5 border border-brand-orange/20 p-4 mb-8 cursor-pointer">
                  <input type="checkbox" checked={form.nda} onChange={e => update('nda', e.target.checked)} className="mt-0.5 accent-brand-orange" />
                  <div>
                    <span className="text-sm font-bold text-brand-dark block">Request an NDA before sharing details</span>
                    <span className="text-xs text-slate-500">We'll send a mutual NDA within 4 business hours for confidential projects.</span>
                  </div>
                </label>

                <button type="submit" disabled={sending} className="w-full bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-70 text-white py-4 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                  {sending ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Submit B2B Enquiry</>
                  )}
                </button>

                <div className="flex justify-center gap-6 mt-6">
                  {['GDPR Compliant', '24h Response', 'ISO 9001'].map(label => (
                    <span key={label} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Shield className="w-3 h-3" /> {label}
                    </span>
                  ))}
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Direct Contact */}
            <div className="bg-brand-dark p-8 text-white">
              <h3 className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-6">Direct Contact</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">B2B Sales & Technical</div>
                    <div className="text-lg font-black">+39 02 3055 6150</div>
                    <div className="text-xs text-slate-400">Mon–Fri 9–18 CET</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">B2B Email (RFQ/NDA)</div>
                    <div className="text-lg font-black">info@solechem.com</div>
                    <div className="text-xs text-slate-400">24h guaranteed response</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="border border-slate-200 p-8">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Our Location</h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-brand-dark mb-1">SoleChem Europe S.r.l.</div>
                  <div className="text-xs text-slate-500 leading-relaxed">
                    Via Cassina de' Pecchi, 12<br />
                    20060 Cassina de' Pecchi (MI)<br />
                    Italy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
