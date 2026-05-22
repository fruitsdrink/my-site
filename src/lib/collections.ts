import { getCollection } from 'astro:content';

/** 过滤未发布草稿 */
export function isPublished<T extends { draft?: boolean }>(entry: { data: T }): boolean {
  return !entry.data.draft;
}

export async function getPublishedNotes() {
  return (await getCollection('notes')).filter(isPublished);
}

export async function getPublishedDocs() {
  return (await getCollection('docs')).filter(isPublished);
}

export async function getPublishedResources() {
  return (await getCollection('resources')).filter(isPublished);
}

export async function getPublishedProjects() {
  return (await getCollection('projects')).filter(isPublished);
}

export async function getPublishedPalettes() {
  return (await getCollection('palettes')).filter(isPublished);
}
