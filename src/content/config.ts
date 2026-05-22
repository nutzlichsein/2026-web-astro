// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Schema untuk gallery item (bisa image atau text)
const GalleryItemSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('image'),
    src: z.string(),
    caption: z.string().optional(),
    alt: z.string().optional(),
    fullWidth: z.boolean().optional(),  // ← TAMBAHKAN INI
  }),
  z.object({
    type: z.literal('text'),
    content: z.string(),
    align: z.enum(['left', 'center', 'right']).optional(),
    background: z.enum(['light', 'dark', 'none']).optional(),
    fullWidth: z.boolean().optional(),  // ← TAMBAHKAN INI JUGA
  }),
]);

const photographyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.date(),
    location: z.string(),
    category: z.string(),
    coverImage: z.string(),
    gallery: z.array(GalleryItemSchema).optional(),
  }),
});

export const collections = {
  'photography': photographyCollection,
};