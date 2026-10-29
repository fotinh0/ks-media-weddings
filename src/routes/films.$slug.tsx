import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { InquirySection } from "@/components/site/InquiryForm";
import { films, getFilm } from "@/lib/films";

export const Route = createFileRoute("/films/$slug")({
  loader: ({ params }) => {
    const film = getFilm(params.slug);
    if (!film) throw notFound();
    return film;
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.couple} — Wedding Film | KS Media Weddings` : "Film not found";
    const d = loaderData ? `Watch ${loaderData.couple}'s wedding film by KS Media Weddings.` : "This film could not be found.";
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "video.other" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <PageShell>
      <div className="py-40 text-center">
        <h1 className="text-5xl">Film not found</h1>
        <Link to="/films" className="eyebrow mt-6 inline-block underline">Back to films</Link>
      </div>
    </PageShell>
  ),
  component: FilmPage,
});

function FilmPage() {
  const film = Route.useLoaderData();
  const idx = films.findIndex((f) => f.slug === film.slug);
  const next = films[(idx + 1) % films.length] ?? films[0]!;

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-14">
        <p className="eyebrow text-center text-muted-foreground">A wedding film</p>
        <h1 className="mt-3 text-center text-6xl md:text-7xl">{film.couple}</h1>
        <div className="film-frame mt-12 aspect-video w-full bg-espresso">
          {film.vimeoId ? (
            <iframe
              src={`https://player.vimeo.com/video/${film.vimeoId}?title=0&byline=0&portrait=0&dnt=1`}
              title={`${film.couple} wedding film`}
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img src={film.image} alt={film.couple} className="h-full w-full object-cover" />
          )}
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t pt-8 md:flex-row">
          <Link to="/contact" className="eyebrow bg-espresso px-10 py-5 text-espresso-foreground hover:bg-accent hover:text-accent-foreground">
            Book your film
          </Link>
          <Link to="/films/$slug" params={{ slug: next.slug }} className="group text-right">
            <span className="eyebrow text-muted-foreground">Next film</span>
            <span className="block font-display text-3xl group-hover:text-accent">{next.couple} →</span>
          </Link>
        </div>
      </section>
      <InquirySection />
    </PageShell>
  );
}
