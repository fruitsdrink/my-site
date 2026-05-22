import type { CollectionEntry } from 'astro:content';

type PaletteEntry = CollectionEntry<'palettes'>;

/** 构建 Agent 可用的 palette JSON 契约 */
export function buildPaletteJson(entry: PaletteEntry, siteOrigin: string) {
  const { data } = entry;
  const cssVariables: Record<string, string> = {};
  for (const color of data.colors) {
    const key = `--color-${color.role === 'other' ? color.name : color.role}`;
    cssVariables[key] = color.hex;
  }

  const tailwindExtend: { colors: Record<string, string> } = { colors: {} };
  for (const color of data.colors) {
    const key = color.name.replace(/\s+/g, '-').toLowerCase();
    tailwindExtend.colors[key] = color.hex;
  }

  return {
    $schema: '/schemas/palette-v1.json',
    id: data.id,
    version: 1,
    title: data.title,
    description: data.description,
    url: `${siteOrigin}/palettes/${data.id}.json`,
    sourceLabel: data.discoveredFrom ?? null,
    style: data.style,
    format: data.format,
    colors: data.colors,
    gradients: data.gradients ?? [],
    cssVariables,
    tailwindExtend,
    usage: data.usage ?? null,
    tags: data.tags,
    searchKeywords: data.searchKeywords,
  };
}
