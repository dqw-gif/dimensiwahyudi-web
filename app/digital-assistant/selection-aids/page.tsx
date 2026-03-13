import { Metadata } from 'next';
import SelectionAidsClient from './SelectionAidsClient';

export const metadata: Metadata = {
  title: 'Selection Aids | PT Dimensi Quantum Wahyudi',
  description: 'Digital assistant for precise vacuum system configuration',
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