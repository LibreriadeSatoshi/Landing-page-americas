import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { beforeAll, describe, expect, it } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dist = join(root, 'dist');

/**
 * Production build smoke test. Catches broken TypeScript or Vite build errors.
 */
describe('production build', () => {
  beforeAll(() => {
    execSync('npm run build', { cwd: root, stdio: 'inherit' });
  }, 180_000);

  it('writes index.html', () => {
    expect(existsSync(join(dist, 'index.html'))).toBe(true);
  });

  it('writes assets directory', () => {
    expect(existsSync(join(dist, 'assets'))).toBe(true);
  });
});
