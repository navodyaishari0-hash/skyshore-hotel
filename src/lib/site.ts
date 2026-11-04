import type { Metadata } from 'next';

export const SITE_URL = 'https://navodyaishari0-hash.github.io/skyshore-hotel';

export const BASE_PATH = '/skyshore-hotel';

/** Prefix a public-folder asset with the GitHub Pages base path. */
export function assetUrl(path: string) {
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;
}

export const SITE_NAME = 'Skyshore';

export const SITE_DESCRIPTION =
  'Discover Skyshore, a private villa retreat in Tangalle, Sri Lanka shaped by tropical gardens, A-frame architecture, and warm island hospitality.';

const OG_IMAGE =
  'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1920&h=1080&fit=crop';

export function canonicalUrl(path = '/') {
  const normalized = path === '/' ? '' : `/${path.replace(/^\/|\/$/g, '')}`;
  return `${SITE_URL}${normalized}/`;
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = canonicalUrl(path);
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: OG_IMAGE,
          width: 1920,
          height: 1080,
          alt: `${SITE_NAME} — ${title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}
