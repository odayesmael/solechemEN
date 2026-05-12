/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Categories } from './pages/Categories';
import { Industries } from './pages/Industries';
import { ProductDetails } from './pages/ProductDetails';
import { Manufacturing } from './pages/Manufacturing';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Cookies } from './pages/Cookies';
import { Careers } from './pages/Careers';
import { Team } from './pages/Team';
import { Blog } from './pages/Blog';
import { BlogArticle } from './pages/BlogArticle';
import { FAQ } from './pages/FAQ';
import { NotFound } from './pages/NotFound';
import { ScrollToTop } from './components/ScrollToTop';
import { ExitIntentPopup } from './components/ExitIntentPopup';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-white font-sans flex flex-col text-slate-900">
          <Navbar />
          <main className="flex-1 flex flex-col">
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/manufacturing" element={<Manufacturing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/team" element={<Team />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </main>
          <Footer />
          <CookieConsent />
          <ExitIntentPopup />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

