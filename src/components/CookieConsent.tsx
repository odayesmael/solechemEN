import { useState, useEffect } from 'react';
import { X, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie-consent');
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      const parsed = JSON.parse(savedConsent);
      setPreferences(parsed);
    }
  }, []);

  const handleAcceptAll = () => {
    const newPrefs = { essential: true, analytics: true, marketing: true };
    localStorage.setItem('cookie-consent', JSON.stringify(newPrefs));
    setPreferences(newPrefs);
    setShowBanner(false);
  };

  const handleAcceptEssential = () => {
    const newPrefs = { essential: true, analytics: false, marketing: false };
    localStorage.setItem('cookie-consent', JSON.stringify(newPrefs));
    setPreferences(newPrefs);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleToggle = (key: keyof typeof preferences) => {
    if (key === 'essential') return;
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay */}
      {(showBanner && (showSettings || true)) && (
        <div className="fixed inset-0 z-40 bg-black/30 opacity-0 pointer-events-none" />
      )}

      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-2xl animate-in">
        {showSettings ? (
          // Settings Panel
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Cookie Preferences</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-8">
              {/* Essential */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <input
                  type="checkbox"
                  id="essential"
                  checked={true}
                  disabled
                  className="w-5 h-5 accent-brand-orange cursor-not-allowed"
                />
                <div className="flex-1">
                  <label htmlFor="essential" className="font-semibold text-slate-900 cursor-not-allowed">
                    Essential Cookies (Always On)
                  </label>
                  <p className="text-sm text-slate-600 mt-1">
                    Required for website functionality, security, and basic features.
                  </p>
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                onClick={() => handleToggle('analytics')}
              >
                <input
                  type="checkbox"
                  id="analytics"
                  checked={preferences.analytics}
                  onChange={() => handleToggle('analytics')}
                  className="w-5 h-5 accent-brand-orange cursor-pointer"
                />
                <div className="flex-1">
                  <label htmlFor="analytics" className="font-semibold text-slate-900 cursor-pointer">
                    Analytics Cookies
                  </label>
                  <p className="text-sm text-slate-600 mt-1">
                    Help us understand how you use our website to improve performance.
                  </p>
                </div>
              </div>

              {/* Marketing */}
              <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                onClick={() => handleToggle('marketing')}
              >
                <input
                  type="checkbox"
                  id="marketing"
                  checked={preferences.marketing}
                  onChange={() => handleToggle('marketing')}
                  className="w-5 h-5 accent-brand-orange cursor-pointer"
                />
                <div className="flex-1">
                  <label htmlFor="marketing" className="font-semibold text-slate-900 cursor-pointer">
                    Marketing Cookies
                  </label>
                  <p className="text-sm text-slate-600 mt-1">
                    Used to track your interests and display relevant content.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSavePreferences}
                className="flex-1 px-6 py-2 bg-brand-orange text-white font-semibold rounded-lg hover:bg-brand-orange/90 transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-6 py-2 border-2 border-brand-orange text-brand-orange font-semibold rounded-lg hover:bg-brand-orange hover:text-white transition-colors"
              >
                Accept All
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-4">
              See our <Link to="/cookies" className="underline hover:text-slate-700">Cookie Policy</Link> for more details.
            </p>
          </div>
        ) : (
          // Main Banner
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 mb-2">We use cookies</h3>
              <p className="text-sm text-slate-600">
                We use cookies to enhance your experience, analyze traffic, and enable marketing features.
                Essential cookies are always active. Learn more in our{' '}
                <Link to="/cookies" className="underline hover:text-slate-900 font-semibold">
                  Cookie Policy
                </Link>.
              </p>
            </div>

            <div className="flex gap-3 shrink-0">
              <button
                onClick={handleAcceptEssential}
                className="px-6 py-2 text-slate-900 font-semibold hover:bg-slate-100 rounded-lg transition-colors"
              >
                Essential Only
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 bg-brand-orange text-white font-semibold rounded-lg hover:bg-brand-orange/90 transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={() => setShowBanner(false)}
                className="p-2 text-slate-500 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
