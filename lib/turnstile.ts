export async function verifyTurnstileToken(
  token: string | undefined,
  ip?: string
): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // If secret key is not configured, bypass verification so forms never break
  if (!secretKey) {
    return { success: true };
  }

  if (!token) {
    return { success: false, error: 'Anti-bot verification token missing' };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (ip && ip !== 'unknown') {
      formData.append('remoteip', ip);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = (await response.json()) as { success?: boolean; 'error-codes'?: string[] };
    if (data.success) {
      return { success: true };
    }

    return {
      success: false,
      error: data['error-codes']?.join(', ') || 'Anti-bot verification failed',
    };
  } catch (error) {
    console.error('Turnstile verification network error:', error);
    // Fail open on network errors to protect legitimate client inquiry conversions
    return { success: true };
  }
}
