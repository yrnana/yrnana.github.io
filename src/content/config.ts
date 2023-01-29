import { defineCollection, z } from 'astro:content';

const post = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string().transform((str) => new Date(str)),
    excerpt: z.string().optional(),
    tags: z.array(z.string()),
    preview: z.string().optional(),
    draft: z.boolean(),
  }),
});

export const collections = { post };
