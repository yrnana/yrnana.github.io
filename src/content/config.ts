import { defineCollection, z } from 'astro:content';

import json from './_authors/author.json';

const post = defineCollection({
  schema: z.object({
    authors: z.array(z.string()).transform((arr) => {
      return arr.map((a) => json.find(({ userName }) => userName === a)!);
    }),
    title: z.string(),
    // Transform string to Date object
    date: z.string().transform((str) => new Date(str)),
    excerpt: z.string(),
    tags: z.array(z.string()),
    preview: z.string(),
  }),
});

export const collections = { post };
