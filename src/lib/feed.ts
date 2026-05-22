import { formatDate } from './dates';
import {
  getPublishedDocs,
  getPublishedNotes,
  getPublishedProjects,
  getPublishedResources,
} from './collections';

export type FeedKind = 'notes' | 'docs' | 'projects' | 'resources';

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
  resources: '资源',
};

export function getKindLabel(kind: FeedKind): string {
  return kindLabels[kind];
}

/** 首页「最近动态」：notes + docs + projects + resources，按日期降序 */
export async function getHomeFeed(limit: number): Promise<FeedItem[]> {
  const [notes, docs, projects, resources] = await Promise.all([
    getPublishedNotes(),
    getPublishedDocs(),
    getPublishedProjects(),
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
