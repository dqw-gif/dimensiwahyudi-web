import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Selection Aids | PT Dimensi Quantum Wahyudi',
  description: 'Asisten digital untuk konfigurasi sistem vakum presisi',
};

export default function SelectionAidsPage() {
  return (
    // Menambahkan pt-[100px] untuk mendorong konten ke bawah navbar yang fixed/sticky
    <main className="w-full min-h-screen pt-[100px] bg-[#F8FAFC]">
      {/* Iframe memuat file HTML secara penuh, tingginya disesuaikan sisa layar */}
      <iframe
        src="/selection-aids.html"
        className="w-full h-[calc(100vh-100px)] border-none"
        title="DQW Selection Assistant"
        loading="lazy"
      />
    </main>
  );
}