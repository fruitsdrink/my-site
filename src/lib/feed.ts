import { formatDate } from './dates';
import {
  getPublishedDiscoveries,
  getPublishedDocs,
  getPublishedNotes,
  getPublishedProjects,
  getPublishedResources,
} from './collections';

export type FeedKind = 'notes' | 'docs' | 'projects' | 'discoveries' | 'resources';

export interface FeedItem {
  kind: FeedKind;
  title: string;
  date: Date;
  dateLabel: string;
  href: string;
  badge?: string;
}

const kindLabels: Record<FeedKind, string> = {
  notes: '笔记',
  docs: '文档',
  projects: '作品',
  discoveries: '开源发现',
  resources: '资源',
};

export function getKindLabel(kind: FeedKind): string {
  return kindLabels[kind];
}

/** 首页「最近动态」：notes + docs + projects + discoveries + resources，按日期降序 */
export async function getHomeFeed(limit: number): Promise<FeedItem[]> {
  const [notes, docs, projects, discoveries, resources] = await Promise.all([
    getPublishedNotes(),
    getPublishedDocs(),
    getPublishedProjects(),
    getPublishedDiscoveries(),
    getPublishedResources(),
  ]);

  const items: FeedItem[] = [
    ...notes.map((entry) => ({
      kind: 'notes' as const,
      title: entry.data.title,
      date: entry.data.pubDate,
      dateLabel: formatDate(entry.data.pubDate),
      href: `/notes/${entry.id}`,
      badge: entry.data.tags[0],
    })),
    ...docs.map((entry) => ({
      kind: 'docs' as const,
      title: entry.data.title,
      date: entry.data.pubDate,
      dateLabel: formatDate(entry.data.pubDate),
      href: `/docs/${entry.id}`,
      badge: entry.data.tags[0],
    })),
    ...projects.map((entry) => ({
      kind: 'projects' as const,
      title: entry.data.title,
      date: entry.data.pubDate,
      dateLabel: formatDate(entry.data.pubDate),
      href: `/projects/${entry.id}`,
      badge: entry.data.tags[0],
    })),
    ...discoveries.map((entry) => ({
      kind: 'discoveries' as const,
      title: entry.data.title,
      date: entry.data.discoveredAt,
      dateLabel: formatDate(entry.data.discoveredAt),
      href: '/discoveries',
      badge: entry.data.status,
    })),
    ...resources.map((entry) => ({
      kind: 'resources' as const,
      title: entry.data.title,
      date: entry.data.discoveredAt,
      dateLabel: formatDate(entry.data.discoveredAt),
      href: '/resources',
      badge: entry.data.status,
    })),
  ];

  return items
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit);
}
