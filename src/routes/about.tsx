import { createFileRoute, Link } from "@tanstack/react-router";
import portrait from "@/assets/ks-portrait.jpg.asset.json";
import { PageShell, PageIntro } from "@/components/site/PageShell";
import { InquirySection } from "@/components/site/InquiryForm";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — KS Media Weddings" },
      { name: "description", content: "NYU-trained filmmaker with 7 years filming weddings across Southern California and beyond." },
      { property: "og:title", content: "About — KS Media Weddings" },
      { property: "og:description", content: "Meet the filmmaker behind KS Media Weddings." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <PageIntro eyebrow="our story" title="Nice to meet you" />
      <section className="mx-auto grid max-w-6xl items-start gap-16 px-6 pb-28 md:grid-cols-2">
        <div className="film-frame">
          <img src={portrait.url} alt="The filmmaker with a vintage camera" className="aspect-[4/5] w-full object-cover" />
        </div>
        <div className="space-y-6 text-lg">
          <h2 className="text-4xl md:text-5xl">I'm here to capture all of the little and big moments of your special day.</h2>
          <p className="text-muted-foreground">
            Based in Southern California — filming wherever your love goes. I have a background in film production with a degree from NYU.
          </p>
          <p className="text-muted-foreground">
            With seven years as a wedding cinematographer, I discovered a passion for filming weddings and documenting moments that'll last
            forever. My approach is built around you: your personality and style, woven into a film that's uniquely your own.
          </p>
          <div className="grid grid-cols-3 gap-4 border-y py-8 text-center">
            <div><p className="font-display text-5xl text-accent">7</p><p className="eyebrow mt-2 text-muted-foreground">Years</p></div>
            <div><p className="font-display text-5xl text-accent">NYU</p><p className="eyebrow mt-2 text-muted-foreground">Film degree</p></div>
            <div><p className="font-display text-5xl text-accent">6K</p><p className="eyebrow mt-2 text-muted-foreground">Cinema cameras</p></div>
          </div>
          <Link to="/contact" className="eyebrow inline-block bg-espresso px-10 py-5 text-espresso-foreground hover:bg-accent hover:text-accent-foreground">
            Work with me
          </Link>
        </div>
      </section>
      <InquirySection />
    </PageShell>
  );
}
