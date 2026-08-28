# Content migration inventory (FR-28)

Every piece of content that existed on the old Cobalt site, where it went in v2, and
whether it was kept, rewritten, or dropped. Nothing was dropped silently.

> **Update 2026-08-28:** `cscusuo.org` lapsed. The `CNAME` row below no longer
> applies — `public/CNAME` was removed and v2 serves from `cscu-ok.github.io`.
> The contact email changed to `cscu.okanagan@gmail.com`. RSS/canonical URLs now
> come from `astro.config.mjs` `site:` (`cscu-ok.github.io`). See
> `docs-site/OPEN-QUESTIONS.md` and `docs-site/TODO.md`.

| Old content | Source | v2 destination | Status |
|---|---|---|---|
| 6 quick links (election nomination, Rubric membership, regulations, BC Hacks 6.0/5.0/4.0 project galleries) | `index.liquid` front matter `data.links` | `src/content/resources/*.md`, one file per link | **Kept.** Categorized for FR-18. The election nomination link's copy is flagged `TODO(content)` — it references a "2025-2026" cycle with a March 28 deadline that's almost certainly stale; the URL is preserved, the claim that it's the *current* election is not asserted. |
| CSCU logo (`assets/img/logo.png`) | image asset | `public/assets/img/logo.png` | **Kept**, unchanged. Also the source for the sampled brand colors in `src/styles/tokens.css` (M1). |
| Favicon, Instagram/Discord/mail icons | image assets | `public/assets/img/*.png` | **Kept**, unchanged. |
| Instagram link (`instagram.com/cscu.ok`) | `index.liquid` body | `Nav`/`Footer` components | **Kept.** |
| Discord invite (`discord.gg/9ZD8VDW7gf`) | `index.liquid` body | `Footer`, and several empty-state messages sitewide | **Kept.** |
| Contact email (`mailto:contact@cscusuo.org`) | `index.liquid` body | `Footer`, `/contact` | **Kept.** This is also the answer to spec Q3 — the address already existed, it wasn't invented (see `OPEN-QUESTIONS.md`). |
| "Computer Science Course Union" site title | `_cobalt.yml` | Page titles, `Footer`, meta descriptions | **Kept** as the org's name throughout. |
| BC Hacks subsite (`bchacks/index.html`) | static HTML page | `public/bchacks/index.html` | **Kept verbatim**, byte-for-byte — explicit non-goal to redesign it. |
| RSS feed | `_cobalt.yml` (`posts: rss: rss.xml`) | `src/pages/rss.xml.ts` | **Rewritten.** Same path, but the old feed's `<link>` pointed at the stale `cscu.io` (the config-drift bug the spec calls out); v2's points at `cscusuo.org`. Currently empty — no posts exist to migrate, and none are being invented. |
| `CNAME` (`cscusuo.org`) | Pages config file | `public/CNAME` | **Kept**, unchanged content. |
| `LICENSE` (AGPL-3.0) | repo root | `public/LICENSE` (symlink) | **Kept**, unchanged — also the answer to spec Q7 by default (C6: new code inherits AGPL-3.0 unless a deliberate relicensing decision is recorded; none was). |
| `README.md` | repo root | `README.md` | **Rewritten.** Cobalt install/`cobalt serve` instructions replaced with the Astro `npm install` / `npm run dev` flow (C5). |
| `_layouts/default.liquid`, `_defaults/pages.md`, `_defaults/posts.md` | Cobalt scaffolding | — | **Dropped.** Confirmed at the very start of this project (before any v2 work began) that these were unmodified `cobalt new` boilerplate with no real content — the "Blog!" collection page and "First Post" example draft — never referenced by the live site. |
| `_cobalt.yml` | Cobalt config | — | **Dropped**, replaced by `astro.config.mjs`. Its stale `base_url: https://cscu.io` doesn't carry forward — v2's `site` is `https://cscusuo.org` throughout (FR-10). |

## Content that could not be migrated because it never existed

These aren't gaps in the migration — the old site simply never had this content, so
there's nothing to carry over. They're new v2 sections, currently shipping as honest
empty states or `TODO(content)` stubs rather than invented copy (Section 0 rule 6):

- Events (collection exists, zero entries)
- Team / exec roster (collection exists, zero entries — blocked on Q9)
- News / posts (collection exists, zero entries)
- About page's department-relationship and history copy
- Get Involved's volunteer process, election process/timing, and exec role
  descriptions (blocked on Q9)
- Constitution document itself (blocked on Q8)
