# 2026-web-astro

Personal portfolio website built with [Astro](https://astro.build) v4.

## Local Development

```bash
npm install          # install dependencies
npm run dev          # start dev server (http://localhost:4321)
npm run build        # production build + type check
npm run preview      # preview production build
```

## Project Structure

```
src/
├── components/       # Astro components (Navbar, Footer)
├── content/
│   └── photography/  # Photography projects (one folder per project)
│       ├── afp-tattoo/
│       ├── ambalat/
│       └── ...
├── layouts/          # Page layout (Layout.astro)
├── pages/            # Routes
│   ├── index.astro       # Homepage (fullscreen slideshow)
│   ├── stills.astro      # Stills listing
│   ├── stills/
│   │   └── [slug].astro  # Project detail page
│   ├── motion.astro
│   └── about.astro
├── styles/           # Global CSS
├── utils/
│   └── images.ts     # import.meta.glob image resolver
└── env.d.ts

public/
├── media/slideshow/  # Homepage slideshow images
├── profile-sw.jpg    # About page photo
└── logo2.svg         # Navbar logo
```

## Adding a New Photography Project

### 1. Create the folder & images

```
src/content/photography/<project-slug>/
├── index.md       # project metadata & content
├── image-01.jpg   # photos (any name, any number)
└── image-02.jpg
```

### 2. Create `index.md`

```markdown
---
title: "Project Title"
date: 2025-06-01
location: "Indonesia"
category: "Story"                # or "Editorial", "Personal", etc.
coverImage: ./image-01.jpg       # cover photo for listing page
gallery:
  - type: "text"
    content: "<p>Intro paragraph here.</p>"
    fullWidth: true

  - type: "image"
    src: ./image-01.jpg
    caption: "Optional caption"
    alt: "Alt text"

  - type: "image"
    src: ./image-02.jpg
    caption: ""
    alt: ""

  - type: "text"
    content: "<p>More text between photos.</p>"
    fullWidth: true

  - type: "image"
    src: ./image-03.jpg
    caption: ""
    alt: ""
    fullWidth: true
---

Body text below frontmatter (optional). This appears as the intro
paragraph above the gallery.
```

### Gallery Item Types

**image:**
```yaml
- type: "image"
  src: ./filename.jpg
  caption: "Optional caption shown below image"
  alt: "Accessibility alt text"
  fullWidth: true    # optional — spans full width (default: false)
```

**text:**
```yaml
- type: "text"
  content: "<p>HTML formatted text</p>"
  fullWidth: true    # optional — wider text block (default: false)
```

### 3. Done

The project automatically appears on `/photography` and its detail page at `/photography/<project-slug>/`. No code changes needed — the glob in `src/utils/images.ts` picks up new images automatically.

## Adding a New Page

### Simple page
Create `src/pages/<name>.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Page Title">
  <div class="container">
    <h1>Page Title</h1>
    <p>Content here.</p>
  </div>
</Layout>
```

### Dynamic route
Create `src/pages/<name>/[slug].astro`. See `src/pages/photography/[slug].astro` as example.

### Update Navigation
Add links in `src/components/Navbar.astro` (both `desktop-nav` and `mobile-nav` sections).

## Image System

Images in `src/content/photography/` are loaded via `import.meta.glob` in `src/utils/images.ts`:

```ts
const photographyImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/photography/**/*.{jpg,jpeg,png,gif,webp}',
  { eager: true }
);
```

The function `getPhotographyImageUrl(slug, relativePath)` resolves the correct URL.
Images referenced in `coverImage` and gallery `src` fields use **relative paths** (e.g. `./photo.jpg`).

### Slideshow images (homepage)
Homepage images are in `public/media/slideshow/`. Update the `slides` array in `src/pages/index.astro` to add/change images.

## Design Notes

- **Fonts**: Newsreader (display headlines) + IBM Plex Mono (body)
- **Theme**: Dark/light toggle with localStorage persistence
- **Accent color**: `#8C2A2A` (light) / `#D44545` (dark)
- **Masonry gallery**: 2-column, supports full-width items via `fullWidth: true`
- **PhotoSwipe**: Lightbox for gallery images on project detail pages

## Deploy to Production (Cloudflare Pages)

Setiap perubahan otomatis deploy setelah push ke GitHub.

```bash
git add -A
git commit -m "pesan perubahan"
git push
```

Cloudflare Pages otomatis rebuild & deploy (biasanya ~2 menit).

### Alur kerja harian

```
Edit di VSCode → git commit → git push → Cloudflare auto-deploy
```

Cek status deploy di: **Cloudflare Dashboard → Workers & Pages → 2026-web-astro**
