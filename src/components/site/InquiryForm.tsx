import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

// Inquiries are relayed by FormSubmit to this inbox; nothing is stored.
const INQUIRY_EMAIL = "foti.ceci@gmail.com";

const schema = z.object({
  names: z.string().trim().min(1, "Please tell us your names").max(150),
  email: z.string().trim().email("Please enter a valid email").max(255),
  wedding_date: z.string().optional(),
  venue: z.string().trim().max(200).optional(),
  guest_count: z.string().trim().max(50).optional(),
  budget: z.string().trim().max(50).optional(),
  heard_from: z.string().trim().max(200).optional(),
  message: z.string().trim().max(2000).optional(),
});

const field =
  "w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none focus:ring-0";

export function InquiryForm() {
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setBusy(true);
    const d = parsed.data;
    let ok = false;
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${INQUIRY_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New wedding inquiry from ${d.names}`,
          _template: "table",
          _captcha: "false",
          _replyto: d.email,
          Names: d.names,
          Email: d.email,
          "Wedding date": d.wedding_date || "—",
          Venue: d.venue || "—",
          "Guest count": d.guest_count || "—",
          "Package interest": d.budget || "Not sure yet",
          "Heard about us": d.heard_from || "—",
          Message: d.message || "—",
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: string | boolean };
      ok = res.ok && String(json.success) !== "false";
    } catch {
      ok = false;
    }
    setBusy(false);
    if (!ok) {
      toast.error("Something went wrong sending your note. Please try again or email us directly.");
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="py-16 text-center">
        <p className="script text-5xl text-accent">Thank you</p>
        <p className="mt-4 text-lg">
          Your note is on its way. I'll be in touch soon to talk about your day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-x-10 gap-y-6 md:grid-cols-2" noValidate>
      <label className="block">
        <span className="eyebrow text-muted-foreground">Your names *</span>
        <input name="names" className={field} placeholder="Angie & Matt" />
        {errors["names"] && <span className="text-sm text-destructive">{errors["names"]}</span>}
      </label>
      <label className="block">
        <span className="eyebrow text-muted-foreground">Email *</span>
        <input name="email" type="email" className={field} placeholder="you@email.com" />
        {errors["email"] && <span className="text-sm text-destructive">{errors["email"]}</span>}
      </label>
      <label className="block">
        <span className="eyebrow text-muted-foreground">Wedding date</span>
        <input name="wedding_date" type="date" className={field} />
      </label>
      <label className="block">
        <span className="eyebrow text-muted-foreground">Venue / location</span>
        <input name="venue" className={field} placeholder="Malibu, CA" />
      </label>
      <label className="block">
        <span className="eyebrow text-muted-foreground">Guest count</span>
        <input name="guest_count" className={field} placeholder="About 120" />
      </label>
      <label className="block">
        <span className="eyebrow text-muted-foreground">Package interest</span>
        <select name="budget" className={field} defaultValue="">
          <option value="">Not sure yet</option>
          <option>The Highlight — $2,850</option>
          <option>The Story — $3,250</option>
          <option>The Heirloom — $4,050</option>
        </select>
      </label>
      <label className="block md:col-span-2">
        <span className="eyebrow text-muted-foreground">How did you hear about me?</span>
        <input name="heard_from" className={field} placeholder="Instagram, a friend, your venue…" />
      </label>
      <label className="block md:col-span-2">
        <span className="eyebrow text-muted-foreground">Tell me about your day</span>
        <textarea
          name="message"
          rows={4}
          className={field}
          placeholder="The vibe, the people, the little things you want to remember…"
        />
      </label>
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={busy}
          className="eyebrow w-full bg-espresso px-10 py-5 text-espresso-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-60 md:w-auto"
        >
          {busy ? "Sending…" : "Send inquiry"}
        </button>
      </div>
    </form>
  );
}

export function InquirySection({ title = "Tell us about your special day!" }: { title?: string }) {
  return (
    <section id="inquire" className="grain border-t bg-secondary py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-[1fr_1.6fr]">
        <div>
          <h2 className="mt-2 text-5xl md:text-6xl">{title}</h2>
          <p className="mt-6 text-muted-foreground">
            Share a few details and I'll reply with availability and set up a free consultation to
            talk through your day.
          </p>
        </div>
        <InquiryForm />
      </div>
    </section>
  );
}
