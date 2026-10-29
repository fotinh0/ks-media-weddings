import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/films", label: "Films" },
  { to: "/about", label: "About" },
  { to: "/packages", label: "Packages" },
] as const;

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  const light = overlay && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        light ? "text-on-image" : "border-b bg-background/95 text-foreground backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-2xl tracking-wide" onClick={() => setOpen(false)}>
          KS Media <span className="italic">Weddings</span>
        </Link>
        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="eyebrow opacity-90 hover:opacity-100" activeProps={{ className: "underline underline-offset-8" }}>
              {n.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className={`eyebrow border px-5 py-3 transition-colors ${
              light ? "border-on-image/70 hover:bg-on-image hover:text-foreground" : "border-primary bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent"
            }`}
          >
            Check availability
          </Link>
        </nav>
        <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-6 border-t px-6 py-8 md:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="font-display text-3xl" onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
          <Link to="/contact" className="font-display text-3xl italic text-accent" onClick={() => setOpen(false)}>
            Check availability
          </Link>
        </nav>
      )}
    </header>
  );
}

export function MobileCta() {
  return (
    <Link
      to="/contact"
      className="eyebrow fixed inset-x-4 bottom-4 z-40 bg-espresso py-4 text-center text-espresso-foreground shadow-lg md:hidden"
    >
      Check your date
    </Link>
  );
}
