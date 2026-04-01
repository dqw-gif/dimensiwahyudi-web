import React from 'react';

export const metadata = {
  title: 'Privacy Policy | PT Dimensi Quantum Wahyudi',
  description: 'Privacy Policy for PT Dimensi Quantum Wahyudi. How we handle your data and privacy.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Privacy Policy</h1>
          <p className="text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600">
            <p>
              PT Dimensi Quantum Wahyudi (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy and personal data. This Privacy Policy outlines how we collect, use, process, and protect your information when you use our website in compliance with the Personal Data Protection Law of Indonesia (UU PDP).
            </p>

            <h2>1. Information We Collect</h2>
            <p>We may collect personal identification information from you in a variety of ways, including, but not limited to, when you:</p>
            <ul>
              <li>Visit our website</li>
              <li>Fill out our contact forms or request a quote</li>
              <li>Use our interactive digital assistants (e.g., Vacuum Calculator, ROI Calculator)</li>
              <li>Communicate with us via WhatsApp, email, or telephone</li>
            </ul>
            <p>
              The types of personal data we may collect include your name, company name, corporate email address, phone number, and any project specifications you voluntarily provide to us.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>We may use the collected information for the following purposes:</p>
            <ul>
              <li>To respond to your inquiries, technical requests, and quotation requests</li>
              <li>To provide customer service and engineering support</li>
              <li>To improve our website functionality, tools, and user experience based on analytics</li>
              <li>To send you relevant technical updates, marketing emails, or product news (only if you have opted in)</li>
            </ul>

            <h2>3. Cookies and Tracking Technologies</h2>
            <p>
              Our website uses cookies and similar tracking technologies (such as Google Analytics) to enhance user experience, analyze site traffic, and understand where our audience comes from. You have the ability to accept or decline cookies through our cookie consent banner. Please refer to your browser settings for more control over tracking.
            </p>

            <h2>4. Data Sharing and Protection</h2>
            <p>
              We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.
              <br/><br/>
              We do not sell, trade, or rent user personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners and trusted affiliates.
            </p>

            <h2>5. Your Rights</h2>
            <p>
              Under applicable data protection laws, you have the right to access, rectify, or erase any personal data we hold about you. You may also withdraw your consent to our processing of your personal data at any time.
            </p>

            <h2>6. Changes to This Privacy Policy</h2>
            <p>
              PT Dimensi Quantum Wahyudi has the discretion to update this privacy policy at any time. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.
            </p>

            <h2>7. Contacting Us</h2>
            <p>
              If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:
              <br /><br />
              <strong>PT Dimensi Quantum Wahyudi</strong><br />
              BizPark 3 Bekasi, Jl. Sultan Agung No.80 No. C37,<br />
              Kali Baru, Medan Satria, Bekasi, West Java 17132<br />
              Email: <strong>sales@dimensiwahyudi.com</strong>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
