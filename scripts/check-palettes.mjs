/**
 * 配色收录去重检查。新增 palette 前/构建前应运行：npm run check:palettes
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PALETTES_DIR = path.join(__dirname, '../src/content/palettes');

/** @typedef {{ file: string, data: Record<string, unknown>, body: string }} PaletteFile */

/**
 * @param {string} dir
 * @returns {PaletteFile[]}
 */
function loadPalettes(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => /\.mdx?$/i.test(name))
    .map((name) => {
      const file = path.join(dir, name);
      const raw = fs.readFileSync(file, 'utf8');
      const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
      if (!match) {
        throw new Error(`${name}: 无法解析 frontmatter`);
      }
      const data = yaml.load(match[1]);
      if (!data || typeof data !== 'object') {
        throw new Error(`${name}: frontmatter 无效`);
      }
      return { file: name, data, body: match[2] ?? '' };
    });
}

/**
 * @param {unknown} colors
 * @returns {string}
 */
function colorFingerprint(colors) {
  if (!Array.isArray(colors)) return '';
  const hexes = colors
    .map((c) => (c && typeof c === 'object' && 'hex' in c ? String(c.hex) : ''))
    .map((h) => h.trim().toLowerCase())
    .filter((h) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/.test(h))
    .sort();
  return hexes.join('|');
}

/**
 * @param {string} body
 * @param {Record<string, unknown>} data
 */
function extractSourceUrl(body, data) {
  if (typeof data.sourceUrl === 'string' && data.sourceUrl.trim()) {
    return data.sourceUrl.trim();
  }
  const m = body.match(
    /https?:\/\/mp\.weixin\.qq\.com\/s\/[A-Za-z0-9_\-]+/,
  );
  return m ? m[0] : '';
}

/**
 * @param {PaletteFile[]} entries
 */
export function validatePalettes(entries) {
  /** @type {string[]} */
  const errors = [];
  /** @type {string[]} */
  const warnings = [];

  const published = entries.filter((e) => e.data.draft !== true);

  /** @type {Map<string, string>} */
  const idToFile = new Map();
  /** @type {Map<string, string>} */
  const titleToFile = new Map();
  /** @type {Map<string, string>} */
  const fingerprintToFile = new Map();
  /** @type {Map<string, string[]>} */
  const sourceToIds = new Map();

  for (const entry of published) {
    const { file, data, body } = entry;
    const id = typeof data.id === 'string' ? data.id.trim() : '';
    const title = typeof data.title === 'string' ? data.title.trim() : '';
    const slug = file.replace(/\.mdx?$/i, '');

    if (!id) {
      errors.push(`${file}: 缺少 id`);
      continue;
    }

    const sourceUrl =
      typeof data.sourceUrl === 'string' ? data.sourceUrl.trim() : '';
    if (!sourceUrl) {
      errors.push(`${file}: 缺少 sourceUrl（数据来源，用于署名）`);
    } else if (!/^https?:\/\//i.test(sourceUrl)) {
      errors.push(`${file}: sourceUrl 须为 http(s) 链接`);
    }

    if (slug !== id) {
      warnings.push(`${file}: 文件名「${slug}」与 id「${id}」不一致，建议保持一致`);
    }

    if (idToFile.has(id)) {
      errors.push(`重复 id「${id}」: ${idToFile.get(id)} 与 ${file}`);
    } else {
      idToFile.set(id, file);
    }

    const titleKey = title.toLowerCase();
    if (title) {
      if (titleToFile.has(titleKey)) {
        errors.push(`重复标题「${title}」: ${titleToFile.get(titleKey)} 与 ${file}`);
      } else {
        titleToFile.set(titleKey, file);
      }
    }

    const fp = colorFingerprint(data.colors);
    if (fp) {
      if (fingerprintToFile.has(fp)) {
        errors.push(
          `重复色值组合（与 ${fingerprintToFile.get(fp)} 相同）: ${file}`,
        );
      } else {
        fingerprintToFile.set(fp, file);
      }
    }

    const sourceKey = sourceUrl || extractSourceUrl(body, data);
    if (sourceKey) {
      const list = sourceToIds.get(sourceKey) ?? [];
      list.push(id);
      sourceToIds.set(sourceKey, list);
    }
  }

  return { errors, warnings, sourceToIds, count: published.length };
}

function main() {
  const entries = loadPalettes(PALETTES_DIR);
  const { errors, warnings, sourceToIds, count } = validatePalettes(entries);

  console.log(`检查配色：${count} 条（已排除 draft）`);

  for (const [url, ids] of sourceToIds) {
    if (ids.length > 1) {
      console.log(`  来源 ${url} → ${ids.length} 条: ${ids.join(', ')}`);
    }
  }

  for (const w of warnings) {
    console.warn(`警告: ${w}`);
  }

  if (errors.length > 0) {
    console.error('\n配色检查未通过：');
    for (const e of errors) {
      console.error(`  ✗ ${e}`);
    }
    console.error(
      '\n新增前请先运行 npm run check:palettes，确认 id / 标题 / 色值未重复。',
    );
    process.exit(1);
  }

  console.log('配色检查通过。');
}

main();
