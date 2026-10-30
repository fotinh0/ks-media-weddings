import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Real client reviews (Zola and wedding directories), excerpted verbatim to fit the carousel.
export const testimonials = [
  {
    quote:
      "Kristi went above and beyond to ensure our wedding day was absolutely perfect. He truly felt like another one of our guests.",
    name: "Gabrielle B.",
  },
  {
    quote:
      "The first 30 seconds we were bawling our eyes out… it captured the everlasting love we truly have for each other, while also capturing many of our most important people in our lives.",
    name: "Juliette E.",
  },
  {
    quote:
      "On our wedding day, it rained for a good part… The improvisation KS Media had was phenomenal.",
    name: "Kevin B.",
  },
  {
    quote:
      "He worked seamlessly throughout the day, capturing every special moment without ever feeling intrusive.",
    name: "Mylee M.",
  },
  {
    quote:
      "My husband is usually quite shy, but they made him feel completely comfortable and relaxed in front of the camera. The final product they delivered was truly top-notch and so heart-warming.",
    name: "Mk V.",
  },
  {
    quote:
      "Words cannot describe the wedding video that KS media production made for me and my husband! We were astounded watching it in tears!",
    name: "Juliette L.",
  },
];

export function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!paused.current) {
        setIndex((i) => (i + 1) % testimonials.length);
      }
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i: number) => setIndex((i + testimonials.length) % testimonials.length);

  return (
    <section className="grain bg-espresso py-28 text-espresso-foreground">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="eyebrow text-primary">Kind words</p>
        {/* <p className="script mt-3 text-4xl text-primary fade-up">love letters</p> */}

        <div
          className="mt-10 grid"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
          onTouchStart={() => (paused.current = true)}
        >
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              aria-hidden={i !== index}
              className={`[grid-area:1/1] transition-opacity duration-700 ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <blockquote className="font-display text-3xl italic leading-snug md:text-4xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="eyebrow mt-8 opacity-80">— {t.name}</figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            type="button"
            aria-label="Previous story"
            onClick={() => goTo(index - 1)}
            className="border border-espresso-foreground/40 p-2 transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-3">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Show story ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === index
                    ? "bg-primary"
                    : "bg-espresso-foreground/35 hover:bg-espresso-foreground/60"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next story"
            onClick={() => goTo(index + 1)}
            className="border border-espresso-foreground/40 p-2 transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
