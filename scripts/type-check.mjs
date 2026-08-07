import { spawnSync } from 'node:child_process';
for (const file of ['scripts/build.mjs', 'scripts/validate.mjs', 'scripts/qa.mjs', 'src/site.js']) {
  const result = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
console.log('JavaScript syntax check passed. TypeScript is not used.');
