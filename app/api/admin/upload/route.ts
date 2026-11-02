import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/admin-auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folderType = (formData.get('folder') as string) || 'projects'; // 'projects' | 'clients'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate MIME type (images only)
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const ext = path.extname(file.name) || '.webp';
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();
    const uniqueSuffix = `${Date.now()}`;
    const cleanFileName = `${baseName}-${uniqueSuffix}${ext}`;

    const targetSubdir = folderType === 'clients' ? 'images/clients' : 'projects';
    const uploadDir = path.join(process.cwd(), 'public', targetSubdir);

    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, cleanFileName);
    await writeFile(filePath, buffer);

    const publicUrl = `/${targetSubdir}/${cleanFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: cleanFileName,
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
