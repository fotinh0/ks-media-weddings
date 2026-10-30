import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageIntro } from "@/components/site/PageShell";
import { FilmCard } from "@/components/site/FilmCard";
import { InquirySection } from "@/components/site/InquiryForm";
import { films } from "@/lib/films";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/films/")({
  head: () =>
    pageHead({
      title: "Wedding Films Portfolio — KS Media Weddings, Los Angeles",
      description:
        "Real couples, real moments. Watch the full portfolio of cinematic wedding films by KS Media Weddings, a Los Angeles wedding videographer.",
      path: "/films",
      image: films[0]?.image,
      imageAlt: films[0] ? `${films[0].couple} wedding film` : undefined,
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
