import { createFileRoute } from "@tanstack/react-router";
import { films } from "@/lib/films";
import { absoluteUrl } from "@/lib/seo";

// Built from the films list, so adding a film in src/lib/films.ts adds it here too.
export function buildSitemap() {
  const pages = ["/", "/films", "/packages", "/about", "/contact"].map((path) => ({ path }));
  const filmPages = films.map((f) => ({ path: `/films/${f.slug}`, lastmod: f.uploadDate }));
  const urls = [...pages, ...filmPages]
    .map(
      ({ path, lastmod }: { path: string; lastmod?: string }) =>
        `  <url><loc>${absoluteUrl(path)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
