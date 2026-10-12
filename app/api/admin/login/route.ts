import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, createAdminToken, isValidAdminPin } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const pin = body.pin;

    if (!pin || typeof pin !== 'string') {
      return NextResponse.json({ success: false, message: 'PIN is required' }, { status: 400 });
    }

    const isValid = await isValidAdminPin(pin);
    if (!isValid) {
      return NextResponse.json({ success: false, message: 'Invalid Admin PIN' }, { status: 401 });
    }

    const token = await createAdminToken(pin);
    const response = NextResponse.json({ success: true, message: 'Authentication successful' });

    // Set secure HttpOnly cookie for 7 days
    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    const err = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, message: err }, { status: 500 });
  }
}
