import React from 'react';

export const metadata = {
  title: 'Terms of Service | PT Dimensi Quantum Wahyudi',
  description: 'Terms of Service and legal agreements for using PT Dimensi Quantum Wahyudi website and services.',
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Terms of Service</h1>
          <p className="text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the website of PT Dimensi Quantum Wahyudi (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>

            <h2>2. Use of the Website</h2>
            <p>
              Our website provides information about our industrial vacuum lifting solutions, products, and services. The content is for general information purposes only. You must not use our website in any way that causes damage to the website or impairs its availability or accessibility.
            </p>

            <h2>3. Intellectual Property Rights</h2>
            <p>
              Unless otherwise stated, PT Dimensi Quantum Wahyudi and/or our licensed partners (such as Schmalz and Binar Handling) own the intellectual property rights for all materials on this website. All intellectual property rights are reserved. You may view and print pages for your personal, non-commercial use, subject to restrictions set in these terms.
            </p>

            <h2>4. Product Information and Calculations</h2>
            <p>
              The product specifications, technical configurations, and outputs from digital tools (such as the Vacuum Calculator or ROI Calculator) provided on this site are indicative and intended for estimation purposes only. Always consult directly with our engineers for final system design and binding quotations.
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. PT Dimensi Quantum Wahyudi shall not be liable for any indirect, special, or consequential loss or damage arising under these terms or in connection with our website.
            </p>

            <h2>6. Governing Law</h2>
            <p>
              These Terms will be governed by and interpreted in accordance with the laws of the Republic of Indonesia. Any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts of Indonesia.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at <strong>sales@dimensiwahyudi.com</strong>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
