import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// SAMPLE testimonials — placeholders for Foti to replace with real client quotes.
const testimonials = [
  {
    quote:
      "We watch our film every anniversary. It's the one thing from the day that puts us right back there.",
    couple: "Sara & Daniel",
  },
  {
    quote:
      "The quiet moments — my dad's hands, her laugh — became the most powerful parts of the film. I cry every time.",
    couple: "Priya & Marcus",
  },
  {
    quote:
      "He was invisible all day and somehow caught everything. It feels like our wedding, exactly as it felt.",
    couple: "Lauren & Tom",
  },
  {
    quote:
      "Worth every penny. Our families have watched it more times than we have.",
    couple: "Jess & Andre",
  },
  {
    quote:
      "When the film played at our reception, the whole room went quiet. Pure magic.",
    couple: "Camille & Rob",
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
        <p className="eyebrow text-muted-foreground">Kind words</p>
        <p className="script mt-3 text-4xl text-primary fade-up">love letters</p>

        <div
          className="mt-10 grid"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
          onTouchStart={() => (paused.current = true)}
        >
          {testimonials.map((t, i) => (
            <figure
              key={t.couple}
              aria-hidden={i !== index}
              className={`[grid-area:1/1] transition-opacity duration-700 ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <blockquote className="font-display text-3xl italic leading-snug md:text-4xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="eyebrow mt-8 opacity-80">— {t.couple}</figcaption>
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
                key={t.couple}
                type="button"
                aria-label={`Show story ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === index ? "bg-primary" : "bg-espresso-foreground/35 hover:bg-espresso-foreground/60"
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
