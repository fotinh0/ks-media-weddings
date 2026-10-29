# KS Media Weddings — Site Revamp Plan

## What works today (keep it)
- Full-screen film hero of a real couple — emotional and cinematic.
- Elegant serif type (Cormorant-style), warm tan button, soft natural palette.
- Simple navigation: Home, Work, About, Bookings.

## What holds it back
- Homepage ends after the hero — no films, no story, no reviews, no reason to stay.
- Only one call to action ("View Portfolio"); booking is buried in the menu.
- No proof (testimonials, venues, press), no pricing hints, no process explained.
- Leftover store "cart" link feels unfinished.

## Visual direction: "Golden-hour rustic"
- Palette: warm linen/cream background, deep espresso text, tan/terracotta accent (evolved from your current button), sage green secondary.
- Type: Cormorant Garamond headlines (keeps your current feel) + a clean, readable body font; small handwritten script accents ("our story", "say hello").
- Texture: subtle paper grain, thin hairline dividers, film-frame borders around videos, soft fade-in on scroll.

## New homepage, top to bottom
1. **Hero film** — looping highlight reel, "Wedding films for couples who want to feel it all again", two buttons: Watch Films / Check Your Date.
2. **Intro** — short personal note with a portrait of you, Los Angeles + travel.
3. **Featured films** — 3–6 large video cards (couple names, venue); click opens a player in a lightbox.
4. **Kind words** — 2–3 couple testimonials with a still frame each.
5. **How it works** — Inquire, Plan together, Wedding day, Receive your film.
6. **Collections** — 3 packages with "starting at" pricing to pre-qualify leads.
7. **FAQ** — turnaround, travel, drone, audio, deposits.
8. **Final invitation** — big "Is your date still open?" with the inquiry form right there.
9. **Footer** — Instagram feed strip, email, service area.

## Other pages
- **Films** — full gallery, filterable (Ceremony, Elopement, Destination).
- **Film detail** — the video, the couple's story, venue, vendors, next-film link + inquiry button.
- **About** — your story, approach, behind-the-scenes photos.
- **Contact** — inquiry form: names, date, venue, guest count, budget, how you heard about us.

## Making people contact you
- Sticky "Check Availability" button in the header and on mobile.
- Inquiry form repeated at the bottom of every page.
- Inquiries saved and emailed to you, with a friendly confirmation for the couple.

## What I'll need from you
- Links to your films (Vimeo/YouTube) and a few still frames.
- Real testimonials, package prices, and a portrait photo.
- Until then I'll use tasteful placeholders and clearly flag them.

## Technical details
- TanStack Start routes: `/`, `/films`, `/films/$slug`, `/about`, `/contact`, each with own SEO metadata.
- Design tokens in `src/styles.css` (oklch), Google Fonts via root head links.
- Inquiries stored with Lovable Cloud; email notification added after Cloud is enabled.
