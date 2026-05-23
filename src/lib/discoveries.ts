import type { CollectionEntry } from 'astro:content';
import { getPublishedDiscoveries } from './collections';

export type DiscoveryEntry = CollectionEntry<'discoveries'>;

export const statusLabel: Record<string, string> = {
  bookmarked: '收藏',
  tried: '试过',
  using: '在用',
};

/** 列表用：排除 deprecated，按发现日期降序 */
export async function getSortedDiscoveries(): Promise<DiscoveryEntry[]> {
  return (await getPublishedDiscoveries())
    .filter((e) => e.data.status !== 'deprecated')
    .sort((a, b) => b.data.discoveredAt.getTime() - a.data.discoveredAt.getTime());
}
