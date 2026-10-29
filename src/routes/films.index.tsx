import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageIntro } from "@/components/site/PageShell";
import { FilmCard } from "@/components/site/FilmCard";
import { InquirySection } from "@/components/site/InquiryForm";
import { films } from "@/lib/films";

export const Route = createFileRoute("/films/")({
  head: () => ({
    meta: [
      { title: "Wedding Films — KS Media Weddings" },
      {
        name: "description",
        content: "Watch wedding films by KS Media Weddings, a Los Angeles wedding videographer.",
      },
      { property: "og:title", content: "Wedding Films — KS Media Weddings" },
      {
        property: "og:description",
        content: "Real couples, real moments. Watch the full portfolio of wedding films.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FilmsPage,
});

function FilmsPage() {
  return (
    <PageShell>
      <PageIntro title="Love stories, on film">
        Every couple is different, so every film is too. Grab a cozy seat and press play.
      </PageIntro>
      <section className="mx-auto max-w-7xl px-6 pb-28">
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {films.map((f) => (
            <FilmCard key={f.slug} film={f} origin="portfolio" />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
