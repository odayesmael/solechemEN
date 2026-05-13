import { useState, useRef } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Briefcase, MapPin, Clock, Globe, Users, GraduationCap, Heart, Zap, Send, ChevronDown, ChevronUp, Building2, X, Upload, FileText, CheckCircle, Paperclip } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const jobs: Job[] = [
  {
    id: 'sales-manager-eu',
    title: 'Sales Manager — Europe',
    department: 'Sales',
    location: 'Cassina de\' Pecchi (MI), Italy',
    type: 'Full-time',
    description: 'Drive B2B sales across European markets, managing key accounts and developing new business relationships with industrial chemical buyers.',
    responsibilities: [
      'Manage and grow existing client portfolio across European markets',
      'Identify and develop new business opportunities',
      'Negotiate contracts and pricing with B2B clients',
      'Coordinate with supply chain and logistics teams',
      'Attend industry trade shows and conferences',
    ],
    requirements: [
      '5+ years B2B sales experience in chemicals or related industries',
      'Strong network in European chemical markets',
      'Fluent in English; Italian, German, or French is a plus',
      'Excellent negotiation and relationship-building skills',
      'Willingness to travel across Europe (30-40%)',
    ],
  },
  {
    id: 'supply-chain-specialist',
    title: 'Supply Chain Specialist',
    department: 'Operations',
    location: 'Cassina de\' Pecchi (MI), Italy',
    type: 'Full-time',
    description: 'Optimize global supply chain operations, coordinate international shipments, and ensure timely delivery of chemical products to 50+ countries.',
    responsibilities: [
      'Coordinate international logistics and freight forwarding',
      'Manage supplier relationships and procurement processes',
      'Monitor inventory levels and demand forecasting',
      'Ensure compliance with REACH and transport regulations',
      'Optimize shipping routes and reduce lead times',
    ],
    requirements: [
      '3+ years supply chain or logistics experience',
      'Knowledge of chemical industry regulations (REACH, ADR)',
      'Experience with international trade and customs procedures',
      'Strong analytical and problem-solving skills',
      'Fluent in English; additional languages preferred',
    ],
  },
  {
    id: 'technical-sales-engineer',
    title: 'Technical Sales Engineer',
    department: 'Technical Sales',
    location: 'Remote / Hybrid',
    type: 'Full-time',
    description: 'Provide technical expertise to clients, support product selection, and bridge the gap between customer needs and our product portfolio.',
    responsibilities: [
      'Provide technical consultation to B2B customers',
      'Assist clients with product selection and specifications',
      'Prepare technical documentation and product comparisons',
      'Support the sales team with technical product knowledge',
      'Conduct product presentations and webinars',
    ],
    requirements: [
      'Degree in Chemistry, Chemical Engineering, or related field',
      '2+ years in technical sales or applications engineering',
      'Strong knowledge of industrial chemicals and their applications',
      'Excellent communication and presentation skills',
      'Fluent in English; other languages are a plus',
    ],
  },
  {
    id: 'digital-marketing-specialist',
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    location: 'Remote / Hybrid',
    type: 'Full-time',
    description: 'Lead digital marketing efforts to increase brand visibility, generate B2B leads, and position SoleChem as a global leader in chemical distribution.',
    responsibilities: [
      'Develop and execute B2B digital marketing strategies',
      'Manage SEO, SEM, and content marketing initiatives',
      'Create compelling content for website, blog, and social media',
      'Analyze marketing performance and optimize campaigns',
      'Manage email marketing and lead nurturing workflows',
    ],
    requirements: [
      '3+ years B2B digital marketing experience',
      'Strong SEO and content marketing skills',
      'Experience with marketing automation tools',
      'Knowledge of the chemical or industrial sector is a plus',
      'Fluent in English; additional languages preferred',
    ],
  },
];

const benefits = [
  { icon: Globe, title: 'Global Exposure', desc: 'Work with clients and partners in 50+ countries across every continent.' },
  { icon: GraduationCap, title: 'Growth & Learning', desc: 'Continuous professional development, training programs, and industry certifications.' },
  { icon: Heart, title: 'Health & Wellbeing', desc: 'Comprehensive health benefits, flexible work arrangements, and work-life balance.' },
  { icon: Users, title: 'Collaborative Culture', desc: 'A tight-knit, multicultural team where every voice matters and ideas are valued.' },
  { icon: Zap, title: 'Innovation-Driven', desc: 'Access to cutting-edge tools and technologies in an industry shaping the future.' },
  { icon: Building2, title: 'Competitive Package', desc: 'Market-leading salary, performance bonuses, and career progression opportunities.' },
];

const culturePoints = [
  { title: 'Multilingual Environment', desc: 'Our team communicates in English, Italian, German, and French — reflecting the global nature of our business.' },
  { title: 'Entrepreneurial Spirit', desc: 'We encourage initiative and ownership. Great ideas can come from anyone, regardless of title or tenure.' },
  { title: 'Industry Impact', desc: 'Your work directly supports industries ranging from aerospace to food production across 50+ countries.' },
  { title: 'Continuous Growth', desc: 'From day one, you\'ll be challenged to learn, grow, and take on increasing responsibility.' },
];

// ---------------------------------------------------------------------------
// Application Modal with CV Upload
// ---------------------------------------------------------------------------
function ApplicationModal({ position, onClose }: { position: string; onClose: () => void }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    coverLetter: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleFileChange(files: FileList | null) {
    if (!files || files.length === 0) return;
    const file = files[0];
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF or Word document (.pdf, .doc, .docx)');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be under 10 MB');
      return;
    }
    setCvFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    handleFileChange(e.dataTransfer.files);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!cvFile) {
      alert('Please upload your CV before submitting.');
      return;
    }
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSubmitted(true);
  }

  function formatFileSize(bytes: number) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
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
          {/* Header */}
          <div className="bg-brand-dark text-white p-6 flex items-start justify-between">
            <div>
              <h2 className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-2">Sole Talent</h2>
              <p className="text-lg font-black leading-tight">Apply Now</p>
              <p className="text-xs text-slate-400 mt-1">{position}</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="p-10 flex flex-col items-center text-center gap-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <h3 className="text-xl font-black text-brand-dark">Application Sent!</h3>
              <div className="bg-slate-50 border border-slate-200 p-4 w-full text-left space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-brand-orange" />
                  <span className="text-slate-700 font-semibold">{position}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-brand-orange" />
                  <span className="text-slate-700 font-semibold">{cvFile?.name}</span>
                </div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Thank you for your interest! Our talent team will review your application and get back to you within <strong>5 business days</strong>.
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
              {/* Position badge */}
              <div className="bg-slate-50 border border-slate-200 p-3 flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest shrink-0">Position</span>
                <span className="text-sm font-bold text-brand-dark truncate">{position}</span>
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
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                    className="w-full border border-slate-200 p-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">LinkedIn Profile</label>
                  <input
                    type="url"
                    value={form.linkedin}
                    onChange={e => update('linkedin', e.target.value)}
                    className="w-full border border-slate-200 p-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="linkedin.com/in/..."
                  />
                </div>
              </div>

              {/* CV Upload */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                  Upload CV / Resume *
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={e => handleFileChange(e.target.files)}
                />

                {cvFile ? (
                  <div className="border border-green-200 bg-green-50 p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className="w-8 h-8 text-green-600 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-brand-dark truncate">{cvFile.name}</p>
                        <p className="text-xs text-slate-400">{formatFileSize(cvFile.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCvFile(null)}
                      className="text-slate-400 hover:text-red-500 transition-colors shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed p-8 text-center cursor-pointer transition-all ${
                      dragOver
                        ? 'border-brand-orange bg-brand-orange/5'
                        : 'border-slate-300 hover:border-brand-orange/50 hover:bg-slate-50'
                    }`}
                  >
                    <Upload className={`w-8 h-8 mx-auto mb-3 ${dragOver ? 'text-brand-orange' : 'text-slate-300'}`} />
                    <p className="text-sm font-bold text-brand-dark mb-1">
                      {dragOver ? 'Drop your file here' : 'Drag & drop your CV here'}
                    </p>
                    <p className="text-xs text-slate-400">
                      or <span className="text-brand-orange font-bold">click to browse</span>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-2">PDF, DOC, DOCX — Max 10 MB</p>
                  </div>
                )}
              </div>

              {/* Cover Letter */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Cover Letter / Message</label>
                <textarea
                  value={form.coverLetter}
                  onChange={e => update('coverLetter', e.target.value)}
                  rows={4}
                  className="w-full border border-slate-200 p-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition-colors resize-none"
                  placeholder="Tell us why you're interested in this role and what you'd bring to the team..."
                />
              </div>

              <button
                type="submit"
                disabled={sending || !cvFile}
                className="w-full bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-70 text-white py-4 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Application
                  </>
                )}
              </button>

              <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                By submitting, you agree to our Privacy Policy. Your data will only be used for recruitment purposes.
              </p>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Job Card
// ---------------------------------------------------------------------------
function JobCard({ job, onApply }: { job: Job; onApply: (title: string) => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-slate-200 bg-white hover:border-brand-orange/30 hover:shadow-lg transition-all duration-300"
    >
      <div
        className="p-6 md:p-8 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                {job.department}
              </span>
              <span className="bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                {job.type}
              </span>
            </div>
            <h3 className="text-lg font-black text-brand-dark mb-2">{job.title}</h3>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {job.type}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="text-brand-orange hover:text-brand-orange-hover transition-colors">
              {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <p className="text-sm text-slate-600 mt-3 leading-relaxed">{job.description}</p>
      </div>

      {expanded && (
        <div className="border-t border-slate-100 px-6 md:px-8 pb-8 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-bold text-brand-dark uppercase tracking-widest mb-4">Responsibilities</h4>
              <ul className="space-y-2">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-slate-600">
                    <ArrowRight className="w-3.5 h-3.5 text-brand-orange mt-1 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-brand-dark uppercase tracking-widest mb-4">Requirements</h4>
              <ul className="space-y-2">
                {job.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-slate-600">
                    <ArrowRight className="w-3.5 h-3.5 text-brand-orange mt-1 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <button
              onClick={(e) => { e.stopPropagation(); onApply(job.title); }}
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              <Paperclip className="w-4 h-4" />
              Apply & Upload CV
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export function Careers() {
  const [applyPosition, setApplyPosition] = useState<string | null>(null);

  return (
    <div className="flex-1 bg-white flex flex-col">
      {/* Hero Header */}
      <div className="bg-brand-dark pt-32 pb-20 px-4 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/about.webp')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/80 to-brand-dark"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <a href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white uppercase tracking-widest text-[10px] font-bold group mb-6 transition-colors">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </a>
          <span className="block bg-brand-orange text-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest w-fit mb-4">
            Sole Talent
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            JOIN <span className="text-brand-orange">SOLECHEM</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed mb-8">
            Be part of a fast-growing global chemical company. We're looking for talented professionals who want to make an impact in an industry that powers the world.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-white">
              <Briefcase className="w-5 h-5 text-brand-orange" />
              <span className="text-sm font-bold">{jobs.length} Open Positions</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Globe className="w-5 h-5 text-brand-orange" />
              <span className="text-sm font-bold">50+ Countries</span>
            </div>
            <button
              onClick={() => setApplyPosition('Spontaneous Application')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors border border-white/20"
            >
              <Upload className="w-4 h-4" />
              Upload Your CV
            </button>
          </div>
        </div>
      </div>

      {/* Why SoleChem */}
      <section className="max-w-7xl mx-auto w-full px-4 md:px-10 py-20">
        <div className="text-center mb-16">
          <h2 className="text-brand-orange font-bold tracking-widest uppercase text-[10px] mb-4">Why SoleChem</h2>
          <h3 className="text-3xl md:text-4xl font-black text-brand-dark leading-tight mb-4">
            MORE THAN A JOB — A CAREER
          </h3>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
            At SoleChem, you'll join a dynamic team at the intersection of chemistry, global trade, and innovation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="border border-slate-200 p-8 group hover:border-brand-orange/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center mb-5">
                <b.icon className="w-6 h-6 text-brand-orange" />
              </div>
              <h4 className="text-sm font-bold text-brand-dark mb-2 group-hover:text-brand-orange transition-colors">{b.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Culture */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-brand-orange font-bold tracking-widest uppercase text-[10px] mb-4">Our Culture</h2>
              <h3 className="text-3xl md:text-4xl font-black text-brand-dark leading-tight mb-8">
                WHERE TALENT MEETS OPPORTUNITY
              </h3>
              <div className="space-y-6">
                {culturePoints.map((point, i) => (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-8 h-8 bg-brand-orange/10 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-brand-orange font-black text-sm">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-brand-dark mb-1">{point.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{point.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src="/about.webp" alt="SoleChem team and office" className="w-full h-[400px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 bg-white shadow-xl border-l-4 border-brand-orange px-6 py-4">
                <span className="text-2xl font-black text-brand-dark block">Since 2013</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growing Together</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="max-w-7xl mx-auto w-full px-4 md:px-10 py-20">
        <div className="text-center mb-16">
          <h2 className="text-brand-orange font-bold tracking-widest uppercase text-[10px] mb-4">Open Positions</h2>
          <h3 className="text-3xl md:text-4xl font-black text-brand-dark leading-tight mb-4">
            FIND YOUR ROLE
          </h3>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
            Explore our current openings and find the role that matches your skills and ambitions.
          </p>
        </div>
        <div className="space-y-4">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} onApply={setApplyPosition} />
          ))}
        </div>

        {/* Spontaneous Application */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 border-2 border-dashed border-slate-300 p-8 md:p-12 text-center bg-slate-50"
        >
          <h4 className="text-xl font-black text-brand-dark mb-3">Don't See Your Role?</h4>
          <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed mb-6">
            We're always looking for exceptional talent. Upload your CV and tell us how you can contribute to SoleChem's growth.
          </p>
          <button
            onClick={() => setApplyPosition('Spontaneous Application')}
            className="inline-flex items-center gap-2 bg-brand-dark hover:bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload CV & Apply
          </button>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-10 py-20 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
              READY TO JOIN US?
            </h3>
            <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
              Take the next step in your career. Join a global team that's shaping the future of chemical distribution.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <button
              onClick={() => setApplyPosition('Spontaneous Application')}
              className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              Upload Your CV <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/about"
              className="border border-white/20 hover:border-white/40 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              About SoleChem
            </a>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {applyPosition && (
        <ApplicationModal
          position={applyPosition}
          onClose={() => setApplyPosition(null)}
        />
      )}
    </div>
  );
}
