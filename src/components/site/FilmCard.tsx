import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import type { Film } from "@/lib/films";

export function FilmCard({
  film,
  large = false,
  origin,
}: {
  film: Film;
  large?: boolean;
  origin: "home" | "portfolio";
}) {
  return (
    <Link
      to="/films/$slug"
      params={{ slug: film.slug }}
      search={{ from: origin }}
      className="group block"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={film.image}
          alt={`${film.couple} wedding film`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-overlay/10 transition-colors group-hover:bg-overlay/30" />
        <span className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full border border-on-image/80 text-on-image opacity-0 transition-opacity group-hover:opacity-100">
          <Play className="ml-0.5 h-5 w-5" />
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <h3 className={large ? "text-3xl" : "text-2xl"}>{film.couple}</h3>
        <span className="eyebrow text-muted-foreground">Watch</span>
      </div>
    </Link>
  );
}
