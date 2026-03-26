import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';

const RUNS = Number(process.env.E2E_STABILITY_RUNS || 3);
const NPM_CMD = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const startedAt = Date.now();

function runPlaywrightOnce(runIndex) {
  return new Promise((resolve) => {
    const runStartedAt = Date.now();
    const child = spawn(`${NPM_CMD} run test:e2e`, {
      stdio: 'inherit',
      shell: true,
      env: {
        ...process.env,
        E2E_STABILITY: '1',
      },
    });

    child.on('error', (error) => {
      resolve({
        run: runIndex,
        ok: false,
        durationMs: Date.now() - runStartedAt,
        error: error instanceof Error ? error.message : String(error),
      });
    });

    child.on('exit', (code) => {
      resolve({
        run: runIndex,
        ok: code === 0,
        durationMs: Date.now() - runStartedAt,
        exitCode: code ?? 1,
      });
    });
  });
}

function formatDuration(ms) {
  return `${(ms / 1000).toFixed(1)}s`;
}

async function writeSummary(results, totalMs) {
  const passed = results.filter((result) => result.ok).length;
  const failed = results.length - passed;

  const lines = [
    '# E2E Stability Summary',
    '',
    `- Total runs: ${results.length}`,
    `- Passed: ${passed}`,
    `- Failed: ${failed}`,
    `- Total duration: ${formatDuration(totalMs)}`,
    '',
    '| Run | Status | Duration | Exit Code |',
    '| --- | --- | --- | --- |',
    ...results.map((result) => {
      const status = result.ok ? 'PASS' : 'FAIL';
      const exitCode = typeof result.exitCode === 'number' ? String(result.exitCode) : 'n/a';
      return `| ${result.run} | ${status} | ${formatDuration(result.durationMs)} | ${exitCode} |`;
    }),
    '',
    failed === 0
      ? 'Result: STABLE (all runs passed)'
      : 'Result: UNSTABLE (at least one run failed)',
  ];

  await mkdir('test-results', { recursive: true });
  await writeFile('test-results/e2e-stability-summary.md', `${lines.join('\n')}\n`, 'utf8');
}

async function main() {
  if (!Number.isInteger(RUNS) || RUNS < 1) {
    throw new Error(`E2E_STABILITY_RUNS must be a positive integer, received: ${String(RUNS)}`);
  }

  console.log(`E2E stability check started with ${RUNS} run(s).`);

  const results = [];
  for (let index = 1; index <= RUNS; index += 1) {
    console.log(`\n=== E2E Stability Run ${index}/${RUNS} ===`);
    // Intentional serial execution to surface intermittent/flaky behavior.
    const result = await runPlaywrightOnce(index);
    results.push(result);
  }

  const totalMs = Date.now() - startedAt;
  await writeSummary(results, totalMs);

  const failed = results.some((result) => !result.ok);
  console.log('\nE2E_STABILITY_SUMMARY_PATH=test-results/e2e-stability-summary.md');
  console.log(`E2E_STABILITY_TOTAL_RUNS=${results.length}`);
  console.log(`E2E_STABILITY_FAILED_RUNS=${results.filter((result) => !result.ok).length}`);
  console.log(`E2E_STABILITY_DURATION_MS=${totalMs}`);

  if (failed) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
