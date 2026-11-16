# Keystone Blog Web

Keystone Blog Web is a Next.js blog whose articles are stored as local
Markdown and loaded during the build. It does not call a blog CMS or backend
API at runtime.

## Development

Use Node.js `26.13.0` (the minimum supported version is also enforced by
`package.json`):

```bash
nvm use
```

Then install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

`NEXT_PUBLIC_CDN_DOMAIN` is optional. It defaults to `keyst.one` and can be
overridden when a deployment uses a different public asset domain.

Useful verification commands:

```bash
pnpm test
pnpm lint
pnpm exec tsc --noEmit
pnpm build
pnpm audit --prod
```

## Content directories

Articles live in one of six fixed category directories:

```text
content/blog/
├── hardware-wallet/
├── crypto-security/
├── bitcoin/
├── partnerships/
├── enterprise/
└── other/
```

The directory determines the article category. Do not add a `category` field
to the article. The home and category lists are ordered by `updatedAt`, newest
first. Article slugs must be unique across all categories.

## Add an article

Copy `content/article-template.md` into the appropriate category directory and
rename it to a descriptive filename. The filename is used only by the content
loader; the public URL comes from `slug`. A Markdown file inside one of the six
category directories is considered published; keep drafts outside those
directories.

Every article uses this YAML Front Matter format:

```markdown
---
title: 'Article title'
slug: 'article-slug'
summary: 'Short article summary'
publishedAt: '2026-10-29'
updatedAt: '2026-10-29'
heroImage: '/images/blog/hardware-wallet/article-slug/hero.webp'
locale: 'en'
seo:
  title: 'Optional SEO title'
  description: 'Optional SEO description'
  canonicalURL: 'https://blog.keyst.one/article-slug'
---

Write the article body in Markdown.
```

| Field              | Description                                               | Required | Default or fallback                           | Example                                          |
| ------------------ | --------------------------------------------------------- | -------- | --------------------------------------------- | ------------------------------------------------ |
| `title`            | Article title displayed on the site.                      | Yes      | —                                             | `Article title`                                  |
| `slug`             | Globally unique public URL segment.                       | Yes      | —                                             | `article-slug`                                   |
| `summary`          | Short article summary used by cards and metadata.         | Yes      | —                                             | `Short article summary`                          |
| `publishedAt`      | Original publication date for historical articles.        | No       | `updatedAt`                                   | `2026-10-29`                                     |
| `updatedAt`        | Last update date and the value used for article ordering. | Yes      | —                                             | `2026-10-29`                                     |
| `heroImage`        | Root-relative path to the article Hero image.             | Yes      | —                                             | `/images/blog/hardware-wallet/article/hero.webp` |
| `locale`           | Content language locale.                                  | No       | `en`                                          | `en`                                             |
| `seo`              | Nested mapping for optional SEO overrides.                | No       | Built-in SEO values                           | See the Front Matter example above.              |
| `seo.title`        | Title used by search and social metadata.                 | No       | `<article title> \| Keystone Hardware Wallet` | `Optional SEO title`                             |
| `seo.description`  | Description used by search and social metadata.           | No       | `summary`, then `title`                       | `Optional SEO description`                       |
| `seo.canonicalURL` | Canonical public URL for the article.                     | No       | `https://blog.keyst.one/<slug>`               | `https://blog.keyst.one/article-slug`            |

The supported Front Matter format intentionally stays small: string values,
plus the two-space-indented `seo` mapping shown above. Arrays, tabs, aliases,
multiline YAML values, and deeper nesting are rejected with a build error.

## Images

Store each article's hero and body images together under `public`:

```text
public/images/blog/<category>/<article-slug>/hero.webp
public/images/blog/<category>/<article-slug>/<body-image>.<ext>
```

Reference them from Markdown with root-relative URLs, for example
`/images/blog/hardware-wallet/article-slug/hero.webp`.

## Homepage Heroes

Configure the three optional Hero positions in `content/homepage.json`. Paths
are relative to `content/blog/`:

```json
{
  "description": "",
  "heroPost": "hardware-wallet/article-slug.md",
  "subHeroFirst": "bitcoin/second-article.md",
  "subHeroSecond": null
}
```

A Hero value may be `null`. A non-null value must point to an existing article
or the build fails. Leaving `description` empty uses the built-in Keystone Blog
description.

## Deployment

This migration keeps the existing Next.js deployment model. Enabling a fully
static `output: 'export'` build is deferred until the deployment setup is
updated.
