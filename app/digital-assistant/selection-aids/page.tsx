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
    <main className="w-full min-h-screen bg-[#F8FAFC]">
      <div className={`${spacingTokens.page.shell} relative flex-1 px-4 sm:px-6 lg:px-8`}>
        <div className="mx-auto w-full max-w-[1440px]">
          <SelectionAidsClient />
        </div>
      </div>
    </main>
  );
}