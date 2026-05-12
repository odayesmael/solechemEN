import { Helmet } from 'react-helmet-async';
import { buildMetadata, buildCanonicalUrl, buildBreadcrumbSchema } from '../utils/seo';

export function Terms() {
  const metadata = buildMetadata({
    title: 'Terms of Service | SoleChem',
    description: 'SoleChem Terms of Service - Legal terms governing use of our website, B2B orders, chemical products, and services.',
    canonical: buildCanonicalUrl('/terms'),
  });

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Terms of Service', url: buildCanonicalUrl('/terms') },
  ]);

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="terms of service, legal terms, conditions of use" />
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
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
          <p className="text-slate-600 mb-12">Last updated: May 8, 2026</p>

          <div className="prose prose-lg max-w-none text-slate-700 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using solechem.com, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on solechem.com for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for commercial purposes or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on solechem.com</li>
                <li>Transmit or distribute the materials in any form or by any means</li>
                <li>Attempt to gain unauthorized access to any portion of solechem.com</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Product Information & Availability</h2>
              <p>
                All product descriptions, specifications, and availability information on solechem.com are subject to change without notice. We strive for accuracy but do not warrant that product information is error-free.
              </p>
              <p className="mt-3">
                <strong>Disclaimers:</strong> Always request a current Certificate of Analysis (CoA) and Safety Data Sheet (SDS) before purchase. Product suitability for your specific application is your responsibility.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Ordering & Pricing</h2>
              <p>
                Quote requests are valid for 30 days. Prices are subject to change. Bulk orders may require minimum quantities. Payment terms are specified in individual quotes and invoices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Delivery & Shipping</h2>
              <p>
                We ship via DHL, UPS, or partner logistics. Risk of loss passes to you upon delivery to the carrier. We are not responsible for delays or loss caused by carriers. International orders are subject to customs duties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Warranties & Disclaimers</h2>
              <p>
                Materials on solechem.com are provided on an 'as is' basis. SoleChem makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Limitation of Liability</h2>
              <p>
                In no event shall SoleChem or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on solechem.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Accuracy of Materials</h2>
              <p>
                The materials appearing on solechem.com could include technical, typographical, or photographic errors. SoleChem does not warrant that any of the materials on its website are accurate, complete, or current.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Links</h2>
              <p>
                SoleChem has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by SoleChem of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Modifications</h2>
              <p>
                SoleChem may revise these Terms of Service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Governing Law</h2>
              <p>
                These Terms and Conditions are governed by and construed in accordance with the laws of Italy, and you irrevocably submit to the exclusive jurisdiction of the competent courts in Italy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Contact Information</h2>
              <div className="bg-slate-100 p-6 rounded-lg">
                <p>SoleChem Europe S.r.l.</p>
                <p>Via Cassina de' Pecchi, 12</p>
                <p>20060 Cassina de' Pecchi (MI), Italy</p>
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
