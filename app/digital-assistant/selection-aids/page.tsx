import { Metadata } from 'next';
import SelectionAidsClient from './SelectionAidsClient';
import { spacingTokens } from '../../../constants/spacingTokens';

export const metadata: Metadata = {
  title: 'Engineering Selection Aids | PT Dimensi Quantum Wahyudi',
  description: 'Interactive engineering assistant to configure vacuum lifters and vacuum generators for industrial handling applications.',
  keywords: [
    'vacuum lifter calculator indonesia',
    'vacuum generator selection tool',
    'industrial handling assistant',
    'schmalz indonesia',
    'binar handling indonesia',
    'pt dimensi quantum wahyudi',
  ],
  alternates: {
    canonical: 'https://dimensiwahyudi.com/digital-assistant/selection-aids',
    languages: {
      'en-ID': 'https://dimensiwahyudi.com/digital-assistant/selection-aids',
      'id-ID': 'https://dimensiwahyudi.com/digital-assistant/selection-aids',
      'x-default': 'https://dimensiwahyudi.com/digital-assistant/selection-aids',
    },
  },
  openGraph: {
    title: 'Engineering Selection Aids | PT Dimensi Quantum Wahyudi',
    description: 'Configure vacuum lifters and vacuum generators through guided, step-by-step engineering recommendations.',
    url: 'https://dimensiwahyudi.com/digital-assistant/selection-aids',
    locale: 'en_ID',
    type: 'website',
  },
};

export default function SelectionAidsPage() {
  return (
    <main className="w-full min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-[#005596] relative overflow-hidden">
      {/* Contained Ambient Specular Glow Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-1/4 w-[600px] h-[400px] bg-[#005596]/5 rounded-full blur-[150px]" />
        <div className="absolute top-2/3 right-1/4 w-[500px] h-[350px] bg-[#1d4ed8]/4 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      <div className={`${spacingTokens.page.shell} relative z-10 flex-1 px-4 sm:px-6 lg:px-8`}>
        <div className="mx-auto w-full max-w-[1440px]">
          <SelectionAidsClient />
        </div>
      </div>
    </main>
  );
}
