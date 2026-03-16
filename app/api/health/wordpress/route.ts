import { NextResponse } from 'next/server';
import { getWordPressReliabilitySnapshot } from '../../../../services/wordpress';

export async function GET() {
  const snapshot = getWordPressReliabilitySnapshot();
  const isDegraded =
    snapshot.breaker.state === 'open' ||
    snapshot.metrics.errorRate >= 0.2 ||
    snapshot.metrics.fallbackRate >= 0.2;

  return NextResponse.json(
    {
      status: isDegraded ? 'degraded' : 'ok',
      service: 'wordpress',
      timestamp: new Date().toISOString(),
      ...snapshot,
    },
    { status: 200 }
  );
}
