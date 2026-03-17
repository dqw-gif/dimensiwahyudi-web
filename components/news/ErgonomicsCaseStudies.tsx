import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ergonomicsCasesByTopic } from '../../data/ergonomicsCases';
import { SolidCaseIcon } from '../icons/ErgonomicsSolidIcons';

type TopicKey = 'health' | 'productivity' | 'safety';

export default function ErgonomicsCaseStudies({ topic }: { topic: TopicKey }) {
  const cases = ergonomicsCasesByTopic[topic] || [];

  if (cases.length === 0) return null;

  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5F7F99] to-[#2F4E67] border border-[#3F617A]/40 text-white flex items-center justify-center shadow-[0_10px_24px_-10px_rgba(47,78,103,0.85)] ring-1 ring-white/20">
          <SolidCaseIcon className="w-4.5 h-4.5" />
        </div>
        <div>
          <p className="text-xs font-bold text-[#3F617A] uppercase tracking-[0.2em] mb-1">Implementation Snapshot</p>
          <h2 className="text-2xl font-black text-slate-900">Case-style examples</h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {cases.map((item) => (
          <article key={item.title} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.16em] mb-2">{item.industry}</p>
            <h3 className="text-lg font-black text-slate-900 mb-2">{item.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">{item.summary}</p>
            <p className="text-slate-800 text-sm font-medium mb-4">{item.impact}</p>
            <Link href={item.href} className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:text-blue-500 transition-colors">
              Discuss this scenario
              <ArrowRight size={14} />
            </Link>
          </article>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-4">
        DEV: Replace with verified customer stories, real KPI outcomes, and approved client references.
      </p>
    </section>
  );
}
