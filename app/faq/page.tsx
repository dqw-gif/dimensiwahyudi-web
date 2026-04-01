'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Script from 'next/script';

const faqs = [
  {
    category: "Technical Specifications",
    questions: [
      {
        q: "What is the maximum load capacity of your vacuum lifting systems?",
        a: "Our vacuum lifting systems, primarily from Schmalz, can handle a wide range of payloads. The JumboFlex series is ideal for rapid handling up to 50 kg, the JumboErgo can lift up to 300 kg, and heavy-duty VacuMaster systems can safely lift metal sheets, glass, or wood panels weighing several tons."
      },
      {
        q: "Can vacuum lifters handle porous materials like carton boxes or MDF boards?",
        a: "Yes. For porous materials, we utilize high-flow vacuum blowers designed to compensate for leakage, ensuring a secure grip. We match the specific suction pad material and blower capacity to your product's porosity."
      },
      {
        q: "Can your handling systems be integrated into our existing crane infrastructure?",
        a: "Absolutely. Our vacuum lifters can be suspended from your existing overhead cranes, jib cranes, or monorail systems. We also provide complete standalone aluminum or steel crane systems if you require a new workstation."
      },
      {
        q: "Are there solutions available for cleanrooms or food-grade environments?",
        a: "Yes, we offer systems constructed with stainless steel components and FDA-approved suction cups specifically engineered for the food, pharmaceutical, and chemical industries."
      },
      {
        q: "What happens in the event of a sudden power failure while lifting?",
        a: "All our specialized vacuum lifters feature integrated safety check valves and a vacuum reservoir. If power fails, the valve closes instantly, holding the vacuum level to ensure the load is lowered slowly and safely, preventing catastrophic drops."
      }
    ]
  },
  {
    category: "Safety & Ergonomics",
    questions: [
      {
        q: "How do vacuum lifters prevent workplace injuries?",
        a: "By transferring 100% of the material's weight to the lifter, operators are relieved from the physical strain of manual lifting. This eliminates the risk of spinal injuries, muscle fatigue, and cumulative trauma disorders, ensuring compliance with strict occupational health rules."
      },
      {
        q: "Are the handling systems certified by international health boards?",
        a: "Yes, our Schmalz handling systems are certified by the AGR (Aktion Gesunder Rücken e. V.), an independent German association that tests and verifies products contributing to spinal health."
      },
      {
        q: "Is specialized operator training required to use the equipment?",
        a: "The systems are designed for intuitive operation; however, PT Dimensi Quantum Wahyudi provides comprehensive on-site operator and safety training upon installation to ensure maximum safety and efficiency from day one."
      }
    ]
  },
  {
    category: "Business & ROI",
    questions: [
      {
        q: "What is the typical Return on Investment (ROI) timeframe?",
        a: "Most of our B2B clients experience full ROI within 8 to 18 months. This is driven by eliminating two-person lifting tasks (reducing labor costs), minimizing product damage during handling, and drastically reducing medical leaves due to injury."
      },
      {
        q: "How do we request a site assessment or technical audit?",
        a: "You can use the ROI Calculator on our website, or directly reach out to our engineering team via the Contact page. We offer free initial site audits to map your process flow and propose the most optimal lifting solution."
      },
      {
        q: "Does PT Dimensi Quantum Wahyudi provide after-sales service and maintenance contracts?",
        a: "Yes, we are a full-service partner. We offer preventative maintenance contracts, emergency repair services, and periodic system audits to ensure your production line never stops unexpectedly."
      },
      {
        q: "Are spare parts readily available in Indonesia?",
        a: "We maintain a robust stock of critical spare parts, suction cups, and vacuum filters at our Bekasi warehouse to ensure extremely fast turnaround times for our local manufacturing clients."
      }
    ]
  },
  {
    category: "Procurement & Installation",
    questions: [
      {
        q: "What is the typical lead time from ordering to installation?",
        a: "Standard systems typically require 4-8 weeks, while highly customized heavy-handling solutions may take 10-14 weeks depending on the complexity of the crane infrastructure required."
      },
      {
        q: "Do you offer turnkey installation?",
        a: "Yes. Our mechanical and electrical engineering teams provide end-to-end turnkey solutions: from structural calculation of your factory ceiling, crane assembly, vacuum system commissioning, up to final testing."
      },
      {
        q: "Can we test our materials with your vacuum lifters before purchasing?",
        a: "Yes! We encourage clients to send material samples to our workshop or request an on-site demonstration unit so we can perfectly match the vacuum grippers to your unique product surface."
      }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>("0-0");

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  // Construct JSON-LD
  const schemaEntities = faqs.flatMap(cat => cat.questions).map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": schemaEntities
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20 selection:bg-cyan-500 selection:text-white">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-blue-100/50 rounded-2xl mb-6 shadow-sm border border-blue-100">
            <HelpCircle size={40} className="text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Questions</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Technical answers, installation details, and business queries about introducing ergonomic vacuum lifting systems to your production line.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${catIndex * 100}ms` }}>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-cyan-500"></span>
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, qIndex) => {
                  const id = `${catIndex}-${qIndex}`;
                  const isOpen = openIndex === id;
                  
                  return (
                    <div 
                      key={qIndex} 
                      className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                        isOpen ? 'bg-white border-blue-200 shadow-lg shadow-blue-100/50' : 'bg-white/60 border-slate-200 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <button
                        onClick={() => toggleFAQ(id)}
                        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl"
                        aria-expanded={isOpen}
                      >
                        <span className={`font-bold text-lg leading-snug transition-colors ${isOpen ? 'text-blue-700' : 'text-slate-800'}`}>
                          {faq.q}
                        </span>
                        <div className={`shrink-0 p-1 mt-1 rounded-full transition-transform duration-300 ${isOpen ? 'bg-blue-100 text-blue-600 rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                          <ChevronDown size={20} />
                        </div>
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="px-6 pb-6 pt-2">
                              <div className="h-px w-full bg-slate-100 mb-4"></div>
                              <p className="text-slate-600 leading-relaxed">
                                {faq.a}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner Area */}
        <div className="mt-16 bg-slate-900 text-white p-8 md:p-12 rounded-[2rem] text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 blur-3xl rounded-full pointer-events-none"></div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">Didn't find your answer?</h3>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto relative z-10">Our engineers are standing by to offer custom calculations and material testing for your specific handling needs.</p>
          <a href="/contact" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-cyan-500/25 relative z-10">
            Talk to an Expert
          </a>
        </div>
      </div>
    </main>
  );
}
