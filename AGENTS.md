<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Film portfolio data (couples, Vimeo ids, packages) lives in `src/lib/films.ts`; pages read from it so adding a film is one edit.
- Film embeds use the shared `FilmPlayer` with origin-checked Vimeo error handling and direct viewing links; playback remains independent of any database.
- Homepage video uses cropped WebM and MP4 asset pointers with a poster fallback for cross-browser playback without letterboxing.
- Site media from the old Squarespace site is hosted via lovable-assets pointers in `src/assets/*.asset.json`; never commit raw binaries.
- Inquiries are emailed via Web3Forms (public access key) from `InquiryForm.tsx` (no database storage, per owner choice); the old inquiries table is unused.
- SEO tags (canonical, Open Graph, JSON-LD) come from `pageHead` in `src/lib/seo.ts` with site URL https://ks-media-weddings.com; `/sitemap.xml` is generated from `films`, which only publishes films that have a `vimeoId`.
