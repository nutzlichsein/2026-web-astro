import type { ImageMetadata } from 'astro';

const photographyImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/photography/**/*.{jpg,jpeg,png,gif,webp}',
  { eager: true }
);

export function getPhotographyImageUrl(slug: string, relativePath: string): string {
  const cleanPath = relativePath.replace(/^\.\//, '');
  const fullPath = `/src/content/photography/${slug}/${cleanPath}`;
  const mod = photographyImages[fullPath];
  if (!mod) {
    console.warn(`[images] Image not found in glob: ${fullPath}`);
    return '';
  }
  return mod.default?.src ?? '';
}
