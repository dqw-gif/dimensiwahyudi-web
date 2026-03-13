import { cookies } from 'next/headers';

export type SiteLang = 'id' | 'en';

export async function getServerLang(): Promise<SiteLang> {
  const cookieStore = await cookies();
  const lang = cookieStore.get('site-lang')?.value;
  return lang === 'en' ? 'en' : 'id';
}
