import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildPaletteJson } from '../../lib/palette-json';
import { isPublished } from '../../lib/collections';

export async function getStaticPaths() {
  const entries = (await getCollection('palettes')).filter(isPublished);
  return entries.map((entry) => ({
    params: { id: entry.data.id },
    props: { entry },
  }));
}

export const GET: APIRoute = ({ props, site }) => {
  const origin = site?.toString().replace(/\/$/, '') ?? 'https://example.com';
  const body = buildPaletteJson(props.entry, origin);
  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};
