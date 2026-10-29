import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/films";

export function SiteFooter() {
  return (
    <footer className="grain bg-espresso pb-24 pt-16 text-espresso-foreground md:pb-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl">
            KS Media <span className="italic">Weddings</span>
          </p>
          <p className="mt-3 text-sm opacity-70">
            Wedding films from Los Angeles — wherever your love goes.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/films" className="hover:underline">
            Portfolio
          </Link>
          <Link to="/packages" className="hover:underline">
            Packages
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 hover:underline">
            <Mail className="h-4 w-4" /> {CONTACT_EMAIL}
          </a>
          <a
            href="https://www.instagram.com/kscinematography/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:underline"
          >
            <Instagram className="h-4 w-4" /> @kscinematography
          </a>
          <p className="opacity-60">Southern California & destination</p>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl px-6 text-xs opacity-50">
        © {new Date().getFullYear()} KS Media Weddings
      </p>
    </footer>
  );
}
