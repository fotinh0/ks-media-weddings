import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageIntro } from "@/components/site/PageShell";
import { InquiryForm } from "@/components/site/InquiryForm";
import { CONTACT_EMAIL } from "@/lib/films";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact & Check Your Date — Los Angeles Wedding Videographer",
      description:
        "Check availability for your wedding date and book a free consultation with KS Media Weddings, a Los Angeles and Southern California wedding videographer.",
      path: "/contact",
    }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell>
      <PageIntro title="Let's talk about your day">
        Share a few details and I'll reply with availability and a time for a free consultation.
        Prefer email? Write to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">
          {CONTACT_EMAIL}
        </a>
        .
      </PageIntro>
      <section className="mx-auto max-w-4xl px-6 pb-28">
        <div className="grain border bg-card p-8 md:p-14">
          <InquiryForm />
        </div>
      </section>
    </PageShell>
  );
}
