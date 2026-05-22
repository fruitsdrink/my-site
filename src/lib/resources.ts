import type { CollectionEntry } from 'astro:content';
import { getPublishedResources } from './collections';

export type ResourceEntry = CollectionEntry<'resources'>;

export const RESOURCE_TYPES = [
  'ui',
  'icons',
  'npm',
  'service',
  'tool',
  'template',
  'article',
] as const;

export const RESOURCE_CATEGORIES = [
  'auth',
  'database',
  'backend',
  'storage',
  'email',
  'payments',
  'observability',
  'ai',
  'styling',
  'utils',
] as const;

export type ResourceType = (typeof RESOURCE_TYPES)[number];
export type ResourceCategory = (typeof RESOURCE_CATEGORIES)[number];

export const statusLabel: Record<string, string> = {
  bookmarked: '收藏',
  tried: '试过',
  using: '在用',
};

/** 列表用：排除 deprecated，按发现日期降序 */
export async function getSortedResources(): Promise<ResourceEntry[]> {
  return (await getPublishedResources())
    .filter((e) => e.data.status !== 'deprecated')
    .sort((a, b) => b.data.discoveredAt.getTime() - a.data.discoveredAt.getTime());
}

export interface ResourceFilters {
  type?: ResourceType;
  category?: ResourceCategory;
}

/** 按类型、分类组合筛选（未传的维度不限制） */
export function filterResources(
  resources: ResourceEntry[],
  filters: ResourceFilters,
): ResourceEntry[] {
  return resources.filter((entry) => {
    if (filters.type && entry.data.type !== filters.type) return false;
    if (filters.category && entry.data.category !== filters.category) return false;
    return true;
  });
}

/** 生成筛选页 URL，用于链接与移除条件 */
export function resourcesFilterUrl(filters: ResourceFilters): string {
  if (filters.type && filters.category) {
    return `/resources/type/${filters.type}/category/${filters.category}`;
  }
  if (filters.type) return `/resources/type/${filters.type}`;
  if (filters.category) return `/resources/category/${filters.category}`;
  return '/resources';
}

/** 内容里实际存在的 type+category 组合，用于静态路由 */
export async function getResourceTypeCategoryPairs(): Promise<
  { type: ResourceType; category: ResourceCategory }[]
> {
  const resources = await getSortedResources();
  const seen = new Set<string>();
  const pairs: { type: ResourceType; category: ResourceCategory }[] = [];

  for (const entry of resources) {
    const key = `${entry.data.type}|${entry.data.category}`;
    if (seen.has(key)) continue;
    seen.add(key);
    pairs.push({ type: entry.data.type, category: entry.data.category });
  }

  return pairs;
}

export function isResourceType(value: string): value is ResourceType {
  return (RESOURCE_TYPES as readonly string[]).includes(value);
}

export function isResourceCategory(value: string): value is ResourceCategory {
  return (RESOURCE_CATEGORIES as readonly string[]).includes(value);
}
