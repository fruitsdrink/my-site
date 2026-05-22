import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { isPublished } from '../../lib/collections';

export const GET: APIRoute = async ({ site }) => {
  const origin = site?.toString().replace(/\/$/, '') ?? 'https://example.com';
  const entries = (await getCollection('palettes')).filter(isPublished);

  const list = entries.map((entry) => ({
    id: entry.data.id,
    title: entry.data.title,
    description: entry.data.description,
    style: entry.data.style,
    tags: entry.data.tags,
    jsonUrl: `${origin}/palettes/${entry.data.id}.json`,
  }));

  return new Response(JSON.stringify(list, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};
