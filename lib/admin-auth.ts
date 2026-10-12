// lib/admin-auth.ts
export const ADMIN_COOKIE_NAME = 'dwq_admin_token';

// Secret salt used for hashing session token
const SESSION_SALT = 'dwq-secret-admin-session-salt-2026';

async function sha256(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function createAdminToken(pin: string): Promise<string> {
  return sha256(`${pin}:${SESSION_SALT}`);
}

export async function isValidAdminPin(inputPin: string): Promise<boolean> {
  const validPin = process.env.ADMIN_SECRET_PIN || '241353';
  return inputPin.trim() === validPin.trim();
}

export async function verifyAdminToken(token?: string | null): Promise<boolean> {
  if (!token) return false;
  const validPin = process.env.ADMIN_SECRET_PIN || '241353';
  const expectedToken = await createAdminToken(validPin);
  return token === expectedToken;
}
