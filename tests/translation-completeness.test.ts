import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const localesRoot = join(__dirname, '..', 'src', 'locales');

const BASE_LOCALE = 'en';
const OTHER_LOCALES = ['es', 'pt'];

/**
 * Recursively extracts all dot-notation keys from a nested JSON object.
 * Example: { hero: { title: "..." } } → ["hero.title"]
 */
function getKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) => {
    const full = prefix ? `${prefix}.${k}` : k;
    return v !== null && typeof v === 'object' && !Array.isArray(v)
      ? getKeys(v as Record<string, unknown>, full)
      : [full];
  });
}

function loadLocale(locale: string): Record<string, unknown> {
  const path = join(localesRoot, locale, 'common.json');
  return JSON.parse(readFileSync(path, 'utf-8'));
}

const baseKeys = getKeys(loadLocale(BASE_LOCALE));

describe('translation completeness', () => {
  for (const locale of OTHER_LOCALES) {
    const localeKeys = new Set(getKeys(loadLocale(locale)));

    for (const key of baseKeys) {
      it(`[${locale}] has key "${key}"`, () => {
        expect(
          localeKeys.has(key),
          `Key "${key}" exists in ${BASE_LOCALE}/common.json but is missing in ${locale}/common.json`
        ).toBe(true);
      });
    }
  }
});
