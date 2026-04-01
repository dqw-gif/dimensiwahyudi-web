import React from 'react';
import Link from 'next/link';
import { Route, Folder, FileText, Package, Briefcase, Zap, Info, Headphones } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sitemap | PT Dimensi Quantum Wahyudi',
  description: 'Complete directory of PT Dimensi Quantum Wahyudi website including industrial solutions, insights, tools, and company information.',
};

export default function HTMLSitemapPage() {
  const structure = [
    {
      title: 'Company & Information',
      icon: <Briefcase className="text-blue-600" size={24} />,
      links: [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/career' },
        { name: 'Contact Sales & Engineering', href: '/contact' },
        { name: 'Frequently Asked Questions', href: '/faq' },
      ],
    },
    {
      title: 'Products & Solutions',
      icon: <Package className="text-blue-600" size={24} />,
      links: [
        { name: 'All Products Hub', href: '/products' },
        { name: 'Schmalz Vacuum Technology', href: '/products/schmalz' },
        { name: '↳ Vacuum Tube Lifters (Jumbo)', href: '/products/schmalz/vacuum-tube-lifter' },
        { name: '↳ Vacuum Lifting Devices (VacuMaster)', href: '/products/schmalz/vacuum-lifting-device' },
        { name: '↳ Crane Systems & Jib Cranes', href: '/products/schmalz/crane-systems' },
        { name: '↳ Vacuum Components & Spare Parts', href: '/products/schmalz/vacuum-components' },
        { name: 'Binar Handling Systems', href: '/products/binar' },
      ],
    },
    {
      title: 'Digital Assistants & Calculators',
      icon: <Zap className="text-blue-600" size={24} />,
      links: [
        { name: 'Vacuum Automation Calculator', href: '/digital-assistant/vacuum-calculator' },
        { name: 'ROI & Ergonomic Simulator', href: '/#roi-calculator' },
      ],
    },
    {
      title: 'Industrial Insights & Cases',
      icon: <FileText className="text-blue-600" size={24} />,
      links: [
        { name: 'All Insights Hub', href: '/news' },
        { name: 'Ergonomics & Safety Standards', href: '/news/ergonomics/safety-standards' },
        { name: 'Handling Productivity', href: '/news/ergonomics/productivity' },
        { name: 'Health Risks & Mitigation', href: '/news/ergonomics/health-risks' },
      ],
    },
    {
      title: 'Legal & Compliance',
      icon: <Info className="text-blue-600" size={24} />,
      links: [
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Service', href: '/terms-of-service' },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-20 selection:bg-cyan-500 selection:text-white">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100/50 border border-blue-200 rounded-full text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
            <Route size={14} /> Site Directory
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            HTML <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Sitemap</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl">
            A complete overview of our web ecosystem. Navigate quickly to our technical products, interactive simulators, or corporate information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {structure.map((section, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100">
                {section.icon}
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{section.title}</h2>
              <ul className="space-y-3">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx} className="flex items-start">
                    <span className="text-blue-300 mr-2 opacity-50 block mt-0.5">↳</span>
                    <Link href={link.href} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
