import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/admin-auth';
import EditorClient from './EditorClient';

export const metadata = {
  title: 'Editor Artikel | PT Dimensi Quantum Wahyudi',
  robots: { index: false, follow: false },
};

export default async function EditorPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const isAuth = await verifyAdminToken(token);

  if (!isAuth) {
    redirect('/admin/login');
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">
          Memuat editor...
        </div>
      }
    >
      <EditorClient />
    </Suspense>
  );
}
