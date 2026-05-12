import { Helmet } from 'react-helmet-async';
import { buildMetadata, buildCanonicalUrl, buildBreadcrumbSchema } from '../utils/seo';

export function Cookies() {
  const metadata = buildMetadata({
    title: 'Cookie Policy | SoleChem',
    description: 'SoleChem Cookie Policy - Learn how we use cookies, tracking technologies, and your consent preferences.',
    canonical: buildCanonicalUrl('/cookies'),
  });

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Cookie Policy', url: buildCanonicalUrl('/cookies') },
  ]);

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="cookies, cookie policy, tracking, analytics, consent" />
        <link rel="canonical" href={metadata.canonical} />
        <meta property="og:title" content={metadata.ogTitle} />
        <meta property="og:description" content={metadata.ogDescription} />
        <meta property="og:url" content={metadata.ogUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumb)}
        </script>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-20">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Cookie Policy</h1>
          <p className="text-slate-600 mb-12">Last updated: May 8, 2026</p>

          <div className="prose prose-lg max-w-none text-slate-700 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files stored on your device when you visit a website. They allow websites to remember your preferences and improve your experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">2.1 Essential Cookies</h3>
                  <p>
                    Required for the website to function properly. These include session management, security, and authentication cookies. These cannot be disabled.
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Session cookies for navigation</li>
                    <li>CSRF protection tokens</li>
                    <li>Authentication/login tokens</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">2.2 Performance & Analytics Cookies</h3>
                  <p>
                    Help us understand how you use our website to improve performance and user experience.
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Google Analytics (ga, _gid, _ga_*)</li>
                    <li>Microsoft Clarity</li>
                    <li>Performance metrics</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">2.3 Functional Cookies</h3>
                  <p>
                    Remember your preferences (language, region, theme) to personalize your experience.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">2.4 Marketing & Advertising Cookies</h3>
                  <p>
                    Used to track your interests and display relevant content. You can opt-out at any time.
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>LinkedIn Insight Tag</li>
                    <li>Facebook Pixel</li>
                    <li>Google Ads</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Cookie Duration</h2>
              <p>
                <strong>Session Cookies:</strong> Deleted when you close your browser
              </p>
              <p>
                <strong>Persistent Cookies:</strong> Remain on your device until their expiration date (typically 1-2 years)
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Your Cookie Preferences</h2>
              <p>
                You have full control over cookies. You can:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Accept all cookies</li>
                <li>Accept only essential cookies</li>
                <li>Customize preferences for each category</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="mt-4">
                Use our <strong>Cookie Consent banner</strong> (bottom of page) to manage your preferences at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Browser Settings</h2>
              <p>
                You can also control cookies through your browser:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Preferences → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                <li><strong>Edge:</strong> Settings → Privacy → Cookies and other site permissions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Third-Party Cookies</h2>
              <p>
                Some cookies are set by third-party services (analytics, advertising, social media). We do not control these cookies but ensure all partners are GDPR-compliant.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Do Not Track</h2>
              <p>
                If your browser has "Do Not Track" enabled, we respect this preference for non-essential cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy to reflect changes in our practices or applicable laws. Changes take effect upon posting.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Contact Us</h2>
              <div className="bg-slate-100 p-6 rounded-lg">
                <p>If you have questions about our cookie practices:</p>
                <p className="mt-4">Email: <strong>info@solechem.com</strong></p>
                <p>Phone: <strong>+39 02 3055 6150</strong></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
