import { MapPin, Phone, Mail, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-slate-400">
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/logo-footer.png"
                alt="SoleChem"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs mb-8">
              Your global chemical partner providing top-tier manufacturing, fast logistics, and exceptional technical support to 50+ countries since 2013.
            </p>
            <div className="flex gap-3">
              <a href="https://linkedin.com/company/solechem" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/10 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all text-slate-500">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm hover:text-brand-orange transition-colors">About Us</Link></li>
              <li><Link to="/team" className="text-sm hover:text-brand-orange transition-colors">Our Team</Link></li>
              <li><Link to="/manufacturing" className="text-sm hover:text-brand-orange transition-colors">Manufacturing</Link></li>
              <li><Link to="/careers" className="text-sm hover:text-brand-orange transition-colors">Sole Talent</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Products</h4>
            <ul className="space-y-3">
              <li><Link to="/catalog" className="text-sm hover:text-brand-orange transition-colors">Product Catalog</Link></li>
              <li><Link to="/categories" className="text-sm hover:text-brand-orange transition-colors">By Category</Link></li>
              <li><Link to="/industries" className="text-sm hover:text-brand-orange transition-colors">By Industry</Link></li>
              <li><Link to="/blog" className="text-sm hover:text-brand-orange transition-colors">Blog & Insights</Link></li>
              <li><Link to="/faq" className="text-sm hover:text-brand-orange transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-brand-orange transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span className="text-sm">Via Cassina de' Pecchi, 12<br />20060 Cassina de' Pecchi (MI), Italy</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="text-sm">+39 02 3055 6150</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="text-sm">info@solechem.com</span>
              </li>
            </ul>

            <div className="mt-8 bg-white/5 border border-white/10 p-4 flex items-center justify-between">
              <div>
                <div className="text-white text-sm font-black tracking-wide">ISO 9001:2015</div>
                <div className="text-xs font-bold text-brand-orange uppercase tracking-widest mt-0.5">Certified Quality</div>
              </div>
              <div className="w-px h-8 bg-slate-700"></div>
              <div>
                <div className="text-white text-sm font-black tracking-wide">REACH</div>
                <div className="text-xs font-bold text-brand-orange uppercase tracking-widest mt-0.5">Compliant</div>
              </div>
              <div className="w-px h-8 bg-slate-700"></div>
              <div>
                <div className="text-white text-sm font-black tracking-wide">GMP</div>
                <div className="text-xs font-bold text-brand-orange uppercase tracking-widest mt-0.5">Certified</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10/50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex flex-col md:flex-row items-center justify-between text-xs font-medium text-slate-500 uppercase tracking-widest">
          <div>&copy; {currentYear} SoleChem Europe S.r.l. &mdash; All Rights Reserved</div>
          <div className="flex gap-6 mt-2 md:mt-0">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-slate-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
