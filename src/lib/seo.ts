import type { DetailedHTMLProps, MetaHTMLAttributes } from "react";
import heroPoster from "@/assets/hero-cropped.jpg.asset.json";
import { CONTACT_EMAIL, packages, type Film } from "@/lib/films";

export const SITE_URL = "https://ks-media-weddings.com";
export const SITE_NAME = "KS Media Weddings";
export const INSTAGRAM_URL = "https://www.instagram.com/kscinematography/";
export const DEFAULT_IMAGE = heroPoster.url;

type MetaTag = DetailedHTMLProps<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>;

/** A JSON-LD block for a route's head meta; TanStack renders it as a <script type="application/ld+json">. */
export const jsonLd = (data: object) => ({ "script:ld+json": data }) as MetaTag;

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

/** Per-page title, description, canonical and social tags. The root route supplies site-wide defaults. */
export function pageHead({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  imageAlt,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string | undefined;
  imageAlt?: string | undefined;
  type?: string;
}): { meta: MetaTag[]; links: { rel: string; href: string }[] } {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { property: "og:image", content: imageUrl },
      ...(imageAlt ? [{ property: "og:image:alt", content: imageAlt }] : []),
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

const prices = packages.map((p) => Number(p.price.replace(/[^0-9]/g, "")));
export const STARTING_PRICE = `$${Math.min(...prices).toLocaleString("en-US")}`;

export const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  description:
    "Cinematic wedding videography in Los Angeles and Southern California, plus destination weddings.",
  url: `${SITE_URL}/`,
  image: absoluteUrl(DEFAULT_IMAGE),
  email: CONTACT_EMAIL,
  priceRange: `${STARTING_PRICE}–$${Math.max(...prices).toLocaleString("en-US")}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Los Angeles",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Los Angeles" },
    { "@type": "State", name: "California" },
  ],
  founder: { "@type": "Person", name: "Kristi Sanxhaku" },
  sameAs: [INSTAGRAM_URL],
};

/** Seconds → ISO 8601 duration, e.g. 369 → "PT6M9S". */
const isoDuration = (s: number) => `PT${Math.floor(s / 60)}M${s % 60}S`;

export function filmJsonLd(film: Film, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${film.couple} — Wedding Film`,
    description,
    thumbnailUrl: [absoluteUrl(film.image)],
    ...(film.uploadDate && { uploadDate: film.uploadDate }),
    ...(film.duration && { duration: isoDuration(film.duration) }),
    ...(film.vimeoId && { embedUrl: `https://player.vimeo.com/video/${film.vimeoId}` }),
    url: absoluteUrl(`/films/${film.slug}`),
    publisher: { "@id": `${SITE_URL}/#business` },
  };
}

export function faqJsonLd(faqs: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
