import { Metadata } from 'next';
import SelectionAidsClient from './SelectionAidsClient';

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
  },
  openGraph: {
    title: 'Engineering Selection Aids | PT Dimensi Quantum Wahyudi',
    description: 'Configure vacuum lifters and vacuum generators through guided, step-by-step engineering recommendations.',
    url: 'https://dimensiwahyudi.com/digital-assistant/selection-aids',
    type: 'website',
  },
};

export default function SelectionAidsPage() {
  return (
    <main className="w-full min-h-screen pt-[100px] bg-[#F8FAFC]">
      <div className="relative flex-1 p-4 md:p-8">
        <div className="mx-auto w-full max-w-[1440px]">
          <SelectionAidsClient />
        </div>
      </div>
    </main>
  );
}