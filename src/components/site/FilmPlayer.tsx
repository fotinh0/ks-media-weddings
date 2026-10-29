import { useEffect, useRef, useState } from "react";
import { ExternalLink, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Film } from "@/lib/films";

export function FilmPlayer({ film }: { film: Film }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setUnavailable(false);
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== "https://player.vimeo.com" || event.source !== frame.current?.contentWindow) return;
      let data = event.data;
      if (typeof data === "string") {
        try { data = JSON.parse(data); } catch { return; }
      }
      if (data?.event === "error") setUnavailable(true);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [film.vimeoId, attempt]);

  return (
    <>
      <div className="film-frame relative mt-12 aspect-video w-full overflow-hidden bg-espresso">
        {film.vimeoId && !unavailable ? (
          <iframe
            key={`${film.vimeoId}-${attempt}`}
            ref={frame}
            src={`https://player.vimeo.com/video/${film.vimeoId}?app_id=122963&title=0&byline=0&portrait=0&dnt=1`}
            title={`${film.couple} wedding film`}
            className="h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onError={() => setUnavailable(true)}
          />
        ) : (
          <img src={film.image} alt={film.couple} className="h-full w-full object-cover" />
        )}
        {unavailable && (
          <div role="status" className="hero-scrim absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center text-on-image">
            <p className="max-w-sm text-lg">Vimeo is currently blocking this film’s playback.</p>
            <Button variant="secondary" onClick={() => { setUnavailable(false); setAttempt((value) => value + 1); }}>
              <RotateCcw /> Try again
            </Button>
          </div>
        )}
      </div>
      {film.vimeoId && (
        <div className="mt-6 flex justify-center">
          <Button asChild variant="link">
            <a href={`https://vimeo.com/${film.vimeoId}`} target="_blank" rel="noopener noreferrer">
              Watch on Vimeo <ExternalLink />
            </a>
          </Button>
        </div>
      )}
    </>
  );
}