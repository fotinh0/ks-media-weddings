import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function PageShell({
  children,
  overlay = false,
}: {
  children: ReactNode;
  overlay?: boolean;
}) {
  return (
    <>
      <SiteHeader overlay={overlay} />
      <main className={overlay ? "" : "pt-20"}>{children}</main>
      <SiteFooter />
    </>
  );
}

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-12 pt-16 text-center fade-up">
      <p className="script text-4xl text-accent">{eyebrow}</p>
      <h1 className="mt-2 text-6xl md:text-7xl">{title}</h1>
      {children && (
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{children}</p>
      )}
    </section>
  );
}
