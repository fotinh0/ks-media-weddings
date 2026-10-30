import { describe, expect, it } from "vitest";
import { buildSitemap } from "@/routes/sitemap[.]xml";
import { films, packages } from "@/lib/films";
import { pageHead, STARTING_PRICE } from "@/lib/seo";

describe("SEO", () => {
  it("lists every published film in the sitemap", () => {
    const xml = buildSitemap();
    for (const f of films) {
      expect(xml).toContain(`<loc>https://ks-media-weddings.com/films/${f.slug}</loc>`);
    }
    expect(xml).toContain("<loc>https://ks-media-weddings.com/</loc>");
  });

  it("only publishes films that have a video", () => {
    expect(films.every((f) => f.vimeoId)).toBe(true);
  });

  it("derives the starting price from the cheapest package", () => {
    const cheapest = Math.min(...packages.map((p) => Number(p.price.replace(/[^0-9]/g, ""))));
    expect(STARTING_PRICE).toBe(`$${cheapest.toLocaleString("en-US")}`);
  });

  it("gives each page an absolute canonical and share image", () => {
    const head = pageHead({ title: "T", description: "D", path: "/packages" });
    expect(head.links).toContainEqual({
      rel: "canonical",
      href: "https://ks-media-weddings.com/packages",
    });
    const image = head.meta.find((m) => "property" in m && m.property === "og:image");
    expect(image && "content" in image && image.content).toMatch(
      /^https:\/\/ks-media-weddings\.com\//,
    );
  });
});
