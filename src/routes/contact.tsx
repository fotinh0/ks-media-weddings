import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageIntro } from "@/components/site/PageShell";
import { InquiryForm } from "@/components/site/InquiryForm";
import { CONTACT_EMAIL } from "@/lib/films";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Check Your Date — KS Media Weddings" },
      { name: "description", content: "Inquire about wedding videography availability and book a free consultation." },
      { property: "og:title", content: "Check Your Date — KS Media Weddings" },
      { property: "og:description", content: "Tell me about your wedding and book a free consultation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell>
      <PageIntro eyebrow="say hello" title="Let's talk about your day">
        Share a few details and I'll reply with availability and a time for a free consultation. Prefer email? Write to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">{CONTACT_EMAIL}</a>.
      </PageIntro>
      <section className="mx-auto max-w-4xl px-6 pb-28">
        <div className="grain border bg-card p-8 md:p-14">
          <InquiryForm />
        </div>
      </section>
    </PageShell>
  );
}
