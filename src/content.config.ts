import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

// FR-11: typed, schema-validated content collections. Invalid content fails the
// build with a readable error naming the file and field (Zod does this natively).

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    end: z.coerce.date().optional(),
    location: z.string(),
    type: z.enum(['workshop', 'social', 'talk', 'hackathon', 'meeting', 'other']),
    summary: z.string().max(160),
    registrationUrl: z.url().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const execs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/execs' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    roleOrder: z.number(),
    term: z.string(),
    photo: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: z.url() })).optional(),
    bio: z.string().max(300).optional(),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    url: z.url(),
    description: z.string().optional(),
    category: z.enum(['academics', 'career', 'community', 'tooling', 'ubco']),
    order: z.number().optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().optional(),
    summary: z.string(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

const photos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/photos' }),
  schema: z.object({
    image: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
    // Academic year label, e.g. "2024-2025" — matches execs' `term` format.
    // Optional: an undated recent photo can still show on the homepage wall
    // without belonging to a Past Years archive entry.
    year: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = { events, execs, resources, posts, photos };
