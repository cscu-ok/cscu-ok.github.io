import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildIcs } from '../../lib/ics';

export async function getStaticPaths() {
  const events = await getCollection('events', ({ data }) => !data.draft);
  return events.map((event) => ({
    params: { slug: event.id },
    props: { event },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { event } = props as Awaited<ReturnType<typeof getStaticPaths>>[number]['props'];
  const body = buildIcs({
    uid: event.id,
    title: event.data.title,
    description: event.data.summary,
    location: event.data.location,
    start: event.data.date,
    end: event.data.end,
  });
  return new Response(body, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${event.id}.ics"`,
    },
  });
};
