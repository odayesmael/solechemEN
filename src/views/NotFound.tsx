import { ArrowLeft, Home, Search } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="text-9xl font-black text-brand-orange opacity-20 mb-4">404</div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            We couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </div>

        <div className="space-y-4 mb-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-brand-orange text-white font-semibold rounded-lg hover:bg-brand-orange/90 transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </a>
          <div className="text-slate-600">or</div>
          <a
            href="/catalog"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-slate-300 text-slate-900 font-semibold rounded-lg hover:border-brand-orange hover:text-brand-orange transition-colors"
          >
            <Search className="w-5 h-5" />
            Browse Products
          </a>
        </div>

        <div className="bg-slate-100 p-8 rounded-lg">
          <p className="text-slate-700 mb-4">
            Looking for something specific? <strong>Contact our team:</strong>
          </p>
          <p className="text-slate-600">
            Email: <strong>info@solechem.com</strong>
          </p>
          <p className="text-slate-600">
            Phone: <strong>+39 02 3055 6150</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
