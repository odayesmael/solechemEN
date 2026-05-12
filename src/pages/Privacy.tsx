import { Helmet } from 'react-helmet-async';
import { buildMetadata, buildCanonicalUrl, buildBreadcrumbSchema } from '../utils/seo';

export function Privacy() {
  const metadata = buildMetadata({
    title: 'Privacy Policy | SoleChem',
    description: 'SoleChem Privacy Policy - Learn how we protect and handle your personal data in compliance with GDPR and international regulations.',
    canonical: buildCanonicalUrl('/privacy'),
  });

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Privacy Policy', url: buildCanonicalUrl('/privacy') },
  ]);

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="privacy policy, GDPR, data protection, personal data" />
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
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-slate-600 mb-12">Last updated: May 8, 2026</p>

          <div className="prose prose-lg max-w-none text-slate-700 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
              <p>
                SoleChem Europe S.r.l. ("we," "us," or "our") operates the solechem.com website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">2.1 Information You Provide</h3>
                  <p>
                    When you request a quote, contact us, or create an account, we may collect:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Name and contact information (email, phone, address)</li>
                    <li>Company information</li>
                    <li>Product preferences and order history</li>
                    <li>Payment information (processed securely)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">2.2 Information Collected Automatically</h3>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Browser type, IP address, and pages visited</li>
                    <li>Device information</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>Analytics data</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Process and fulfill your orders and inquiries</li>
                <li>Communicate with you about products and services</li>
                <li>Improve our website and customer experience</li>
                <li>Comply with legal obligations (GDPR, REACH)</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Data Protection & GDPR Compliance</h2>
              <p>
                We process personal data in accordance with the EU General Data Protection Regulation (GDPR). Your rights include:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Right of access to your data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact <strong>info@solechem.com</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Cookies & Tracking</h2>
              <p>
                We use cookies to enhance your experience. You can control cookie preferences through our Cookie Consent banner. See our Cookie Policy for details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Third-Party Services</h2>
              <p>
                We may share data with trusted partners (payment processors, analytics providers, CRM systems) only as necessary to provide our services. All third parties are GDPR-compliant.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Data Security</h2>
              <p>
                We implement industry-standard security measures including SSL/TLS encryption, secure authentication, and regular security audits.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Contact Us</h2>
              <div className="bg-slate-100 p-6 rounded-lg">
                <p className="font-semibold mb-2">Data Protection Officer:</p>
                <p>SoleChem Europe S.r.l.</p>
                <p>Via Cassina de' Pecchi, 12</p>
                <p>20060 Cassina de' Pecchi (MI), Italy</p>
                <p className="mt-4">Email: <strong>info@solechem.com</strong></p>
                <p>Phone: <strong>+39 02 3055 6150</strong></p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy occasionally. We will notify you of material changes via email or by posting the updated policy on our website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
