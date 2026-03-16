import { spawn } from 'node:child_process';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const NPM_CMD = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function runCommand(commandLine, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(commandLine, {
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, ...options.env },
    });

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${commandLine} failed with code ${code}`));
      }
    });
  });
}

async function waitForServer(url, timeoutMs = 45_000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url, { redirect: 'manual' });
      if (response.status < 500) {
        return;
      }
    } catch {
      // Continue polling.
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error(`Server did not become ready within ${timeoutMs}ms`);
}

async function stopServer(child) {
  if (!child || child.killed) {
    return;
  }

  if (process.platform === 'win32') {
    await runCommand(`taskkill /pid ${String(child.pid)} /T /F`).catch(() => undefined);
  } else {
    child.kill('SIGTERM');
  }
}

async function main() {
  await runCommand(`${NPM_CMD} run lint`);
  await runCommand(`${NPM_CMD} run build`);

  const server = spawn(`${NPM_CMD} run start`, {
    stdio: 'inherit',
    shell: true,
    env: process.env,
  });

  try {
    await waitForServer(`${BASE_URL}/`);
    await runCommand('node scripts/route-health-check.mjs', {
      env: {
        BASE_URL,
        SLOW_PAGE_THRESHOLD_MS: process.env.SLOW_PAGE_THRESHOLD_MS || '3000',
        MAX_SLOW_PAGES: process.env.MAX_SLOW_PAGES || '0',
      },
    });

    const healthRes = await fetch(`${BASE_URL}/api/health/wordpress`);
    if (!healthRes.ok) {
      throw new Error(`Health endpoint failed: ${healthRes.status}`);
    }

    const health = await healthRes.json();
    if (!health || !health.metrics || !health.breaker) {
      throw new Error('Health endpoint payload is incomplete');
    }

    console.log('RELIABILITY_GATE=PASS');
    console.log(`WP_STATUS=${health.status}`);
    console.log(`WP_BREAKER_STATE=${health.breaker.state}`);
    console.log(`WP_ERROR_RATE=${Number(health.metrics.errorRate || 0).toFixed(4)}`);
    console.log(`WP_FALLBACK_RATE=${Number(health.metrics.fallbackRate || 0).toFixed(4)}`);
  } finally {
    await stopServer(server);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
