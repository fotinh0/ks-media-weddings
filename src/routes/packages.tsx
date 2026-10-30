import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageShell, PageIntro } from "@/components/site/PageShell";
import { InquirySection } from "@/components/site/InquiryForm";
import { packages } from "@/lib/films";
import { faqJsonLd, jsonLd, pageHead, STARTING_PRICE } from "@/lib/seo";

export const Route = createFileRoute("/packages")({
  head: () => {
    const seo = pageHead({
      title: "Wedding Video Packages & Pricing — KS Media Weddings",
      description: `Los Angeles wedding videography packages from ${STARTING_PRICE}, each with up to 10 hours of coverage, drone footage, 4K/6K cameras and a cinematic film.`,
      path: "/packages",
    });
    return { ...seo, meta: [...seo.meta, jsonLd(faqJsonLd(faqs))] };
  },
  component: Packages,
});

const faqs: [string, string][] = [
  [
    "Do you travel?",
    "Yes — I'm based in Southern California and film wherever your love goes. Reach out with your location for details.",
  ],
  [
    "Is drone footage included?",
    "Drone coverage is included in every package, weather and venue rules permitting.",
  ],
  [
    "What's the difference between a highlight and a documentary film?",
    "The highlight is a 4–8 minute cinematic story of your day. The documentary is a 40–60 minute edit that lets you relive the day in full.",
  ],
  [
    "How do we get started?",
    "Send an inquiry with your date. We'll schedule a free consultation to talk through your plans and pick the right package.",
  ],
];

function Packages() {
  return (
    <PageShell>
      <PageIntro title="Wedding packages">
        Every package includes up to 10 hours of coverage, multiple cameras and drone footage.
      </PageIntro>
      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-24 md:grid-cols-3">
        {packages.map((p) => (
          <div
            key={p.name}
            className={`flex flex-col border p-10 ${p.featured ? "bg-espresso text-espresso-foreground" : "bg-card"}`}
          >
            {p.featured && <p className="eyebrow mb-4 text-primary">Most loved</p>}
            <h2 className="text-4xl">{p.name}</h2>
            <p
              className={`mt-3 font-display text-6xl ${p.featured ? "text-primary" : "text-accent"}`}
            >
              {p.price}
            </p>
            <ul className="mt-8 flex-1 space-y-3 text-sm">
              {p.items.map((i) => (
                <li key={i} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 opacity-70" />
                  {i}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className={`eyebrow mt-10 py-4 text-center ${p.featured ? "bg-primary text-primary-foreground hover:bg-on-image" : "border border-foreground hover:bg-espresso hover:text-espresso-foreground"}`}
            >
              Check availability
            </Link>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-3xl px-6 pb-28">
        <h2 className="text-center text-5xl">Questions</h2>
        <div className="mt-10 divide-y border-y">
          {faqs.map(([q, a]) => (
            <details key={q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-2xl">
                {q}
                <span className="text-accent transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </section>
      <InquirySection />
    </PageShell>
  );
}
