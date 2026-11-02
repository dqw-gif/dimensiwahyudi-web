import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/admin-auth';
import { readdir } from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'projects'; // 'projects' | 'clients'

    const dirRelative = type === 'clients' ? 'images/clients' : 'projects';
    const targetDir = path.join(process.cwd(), 'public', dirRelative);

    const files = await readdir(targetDir, { withFileTypes: true });
    const imageExtensions = new Set(['.webp', '.png', '.jpg', '.jpeg', '.svg', '.gif']);

    const images = files
      .filter((file) => file.isFile() && imageExtensions.has(path.extname(file.name).toLowerCase()))
      .map((file) => ({
        name: file.name,
        url: `/${dirRelative}/${file.name}`,
      }))
      .reverse();

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error('Error listing media files:', error);
    return NextResponse.json({ success: true, images: [] });
  }
}
