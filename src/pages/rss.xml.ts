import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

// FR-19: preserved at the same path as the old Cobalt site (_cobalt.yml's
// `posts: rss: rss.xml`), now with correct absolute URLs on cscusuo.org
// instead of the stale cscu.io from the old config (FR-10).
export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return rss({
    title: 'CSCU News',
    description: 'Announcements and recaps from the Computer Science Course Union at UBC Okanagan.',
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((post) => ({
        title: post.data.title,
        description: post.data.summary,
        pubDate: post.data.date,
        link: `/news/${post.id}/`,
      })),
  });
}
