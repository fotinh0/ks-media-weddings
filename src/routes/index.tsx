import { createFileRoute, Link } from "@tanstack/react-router";
import heroVideo from "@/assets/hero-cropped.mp4.asset.json";
import heroWebm from "@/assets/hero-cropped.webm.asset.json";
import heroPoster from "@/assets/hero-cropped.jpg.asset.json";
import portrait from "@/assets/ks-portrait.jpg.asset.json";
import { PageShell } from "@/components/site/PageShell";
import { FilmCard } from "@/components/site/FilmCard";
import { InquirySection } from "@/components/site/InquiryForm";
import { films, packages } from "@/lib/films";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KS Media Weddings — Wedding Videographer in Los Angeles" },
      { name: "description", content: "Cinematic, heartfelt wedding films in Los Angeles and Southern California. Watch the films and check your date." },
      { property: "og:title", content: "KS Media Weddings — Wedding Videographer in Los Angeles" },
      { property: "og:description", content: "Cinematic, heartfelt wedding films in Los Angeles and Southern California." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const steps = [
  ["Inquire", "Send a few details about your day and I'll confirm availability."],
  ["Plan together", "A free consultation to learn your story, style and timeline."],
  ["Wedding day", "Calm, unobtrusive filming of every little and big moment."],
  ["Your film", "A tailored film that feels like you — to relive for a lifetime."],
];

function Index() {
  return (
    <PageShell overlay>
      {/* Hero */}
      <section className="relative h-[85svh] min-h-[520px] max-h-[900px] overflow-hidden">
        <img src={heroPoster.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster={heroPoster.url}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={heroWebm.url} type="video/webm" />
          <source src={heroVideo.url} type="video/mp4" />
        </video>
        <div className="hero-scrim absolute inset-0" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-24 text-center text-on-image">
          <p className="eyebrow fade-up">Wedding videographer · Los Angeles, California</p>
          <h1 className="fade-up mt-6 max-w-5xl text-5xl md:text-8xl" style={{ animationDelay: "150ms" }}>
            Films that let you <em>feel it all</em> again
          </h1>
          <div className="fade-up mt-10 flex flex-col gap-4 sm:flex-row" style={{ animationDelay: "300ms" }}>
            <Link to="/films" className="eyebrow bg-primary px-10 py-5 text-primary-foreground transition-colors hover:bg-on-image">
              Watch the films
            </Link>
            <Link to="/contact" className="eyebrow border border-on-image/70 px-10 py-5 transition-colors hover:bg-on-image hover:text-foreground">
              Check your date
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="grain py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2">
          <div className="film-frame">
            <img src={portrait.url} alt="KS Media Weddings filmmaker" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </div>
          <div>
            <p className="script text-4xl text-accent">hello, friends</p>
            <h2 className="mt-2 text-5xl md:text-6xl">Capturing all the little and big moments of your day.</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Based in Southern California and filming wherever your love goes. With a film production degree from NYU and seven years behind the
              camera at weddings, I tailor every film to your personality and style — so it feels unmistakably yours.
            </p>
            <Link to="/about" className="eyebrow mt-8 inline-block border-b border-foreground pb-1 hover:text-accent hover:border-accent">
              More about me
            </Link>
          </div>
        </div>
      </section>

      {/* Featured films */}
      <section className="border-t py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-muted-foreground">Recent work</p>
              <h2 className="mt-3 text-5xl md:text-6xl">Featured films</h2>
            </div>
            <Link to="/films" className="eyebrow border-b border-foreground pb-1 hover:text-accent hover:border-accent">
              View all films
            </Link>
          </div>
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
            {films.slice(0, 4).map((f) => (
              <FilmCard key={f.slug} film={f} large />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="grain bg-espresso py-28 text-espresso-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <p className="script text-center text-4xl text-primary">how it works</p>
          <h2 className="mt-2 text-center text-5xl md:text-6xl">From hello to happily ever after</h2>
          <div className="mt-16 grid gap-10 md:grid-cols-4">
            {steps.map(([t, d], i) => (
              <div key={t} className="border-t border-espresso-foreground/25 pt-6">
                <p className="font-display text-5xl italic text-primary">0{i + 1}</p>
                <h3 className="mt-4 text-3xl">{t}</h3>
                <p className="mt-3 text-sm opacity-75">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections teaser */}
      <section className="py-28">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="eyebrow text-muted-foreground">Collections</p>
          <h2 className="mt-3 text-5xl md:text-6xl">Every package includes drone & 4K+</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {packages.map((p) => (
              <div key={p.name} className={`border p-10 ${p.featured ? "bg-card shadow-sm" : ""}`}>
                <h3 className="text-3xl">{p.name}</h3>
                <p className="mt-3 font-display text-5xl text-accent">{p.price}</p>
                <p className="mt-4 text-sm text-muted-foreground">{p.items[p.items.length - 1]}</p>
              </div>
            ))}
          </div>
          <Link to="/packages" className="eyebrow mt-12 inline-block border-b border-foreground pb-1 hover:text-accent hover:border-accent">
            Compare packages
          </Link>
        </div>
      </section>

      <InquirySection />
    </PageShell>
  );
}
