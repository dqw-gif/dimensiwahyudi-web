// app/digital-assistant/vacuum-calculator/page.tsx
import VacuumCalculator from '@/components/VacuumCalculator';

export const metadata = {
  title: 'Vacuum Calculator | Digital Assistant',
  description: 'Advanced engineering calculator for vacuum systems.',
};

export default function VacuumCalculatorPage() {
  return (
    <main className="w-full min-h-screen bg-slate-50">
      {/* Panggil komponen kalkulator di sini */}
      <VacuumCalculator />
    </main>
  );
}