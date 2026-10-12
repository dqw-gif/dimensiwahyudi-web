import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/admin-auth';
import AdminDashboardClient from './AdminDashboardClient';
import postsBackup from '@/data/wordpress-posts.json';

export const metadata = {
  title: 'Admin Dashboard | PT Dimensi Quantum Wahyudi',
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const isAuth = await verifyAdminToken(token);

  if (!isAuth) {
    redirect('/admin/login');
  }

  const legacyCount = Array.isArray(postsBackup) ? postsBackup.length : 88;

  return <AdminDashboardClient initialLegacyCount={legacyCount} />;
}
