# Post-launch TODO

Things deliberately deferred so v2 could deploy. None of these block the site being
live and correct — they're follow-ups. Grouped by area; each has enough context to
pick up cold in a later commit.

Answers that resolved the pre-launch open questions are recorded in
`docs-site/OPEN-QUESTIONS.md`.

## Domain

`cscusuo.org` lapsed. v2 deploys to the default Pages domain `https://cscu-ok.github.io`
until a new domain is bought. When that happens:

- [ ] Buy the domain, set its DNS (CNAME/ALIAS) to GitHub Pages per
  <https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site>
- [ ] Re-add `public/CNAME` containing the bare domain
- [ ] Point `astro.config.mjs` `site:` at `https://<newdomain>`
- [ ] Update `public/robots.txt` `Sitemap:` line
- [ ] Restore the `/CNAME` row in `scripts/check-redirects.mjs` and
  `docs-site/REDIRECTS.md`
- [ ] Repo Settings → Pages → set the custom domain, then re-check **Enforce HTTPS**
  once the cert issues
- [ ] `src/pages/index.astro` and `src/pages/events/[slug].astro` already read
  `Astro.site`, so JSON-LD picks up the new domain automatically — no change needed
  there. `src/lib/ics.ts` has the domain hard-coded in `PRODID`/`UID` (cosmetic
  identifiers); update if you want it to match.

## Content

- [ ] **Homepage Vision statement** (`src/pages/index.astro`, VISION section) —
  currently says the statement is being finalized. Drop in the real text when the
  exec team has it.
- [ ] **Constitution** (`src/pages/about/constitution.astro`) — page points at
  `github.com/cscu-ok/regulations` as the source of record. Publish a readable
  version of the constitution on the page itself when there is one.
- [ ] **Team** (`src/content/execs/*.md`) — three execs seeded with name + role only:
  Soumil Chhabra (President), Muhammad Mustafa (VP Finance), Noah Stewart (VP Events).
  Add: remaining exec roles, `photo` (with consent), `bio`, `links`. Confirm the
  `term` label — seeded as `2026-2027`, change across all three files if that's wrong.
- [ ] **Get Involved** (`src/pages/get-involved.astro`) — volunteer and elections
  cards currently point people to Discord/Instagram; "Exec roles" section names the
  three roles but not what they do. Replace with the real volunteer process, the
  actual election timeline, and per-role descriptions.
- [ ] **Events** — all four current entries are past-dated (VerTech Gala Apr 2025,
  C² Hacks Nov 2025, LinkedIn & LockedIn Feb 2026, Trivia Night Mar 2026). Add
  upcoming events so the homepage hero calendar and `/events` "upcoming" view aren't
  empty.
- [ ] **News** — zero posts. `src/content/posts/*.md`; schema in
  `src/content.config.ts`. The RSS feed and `/news` are wired and will populate
  automatically. (The build prints a harmless "collection posts ... is empty"
  warning until the first post lands.)
- [ ] **Election nomination resource** — `src/content/resources/cscu-general-election-nomination.md`
  was removed at launch: it linked to a cryptpad form referencing a 2025-2026 cycle
  with a March 28 deadline, both stale. Re-add a resource entry pointing at the
  current cycle's nomination form when one exists.

## Contact form

Requested: a form collecting student number + email. Deferred — GitHub Pages is
static and can't process submissions, and student numbers are sensitive to route
through a third-party form service (spec constraint C8 also rules third parties out).
`/contact` currently shows `cscu.okanagan@gmail.com` with a prompt to include name +
student number + UBCO email.

- [ ] Revisit if a backend / serverless option becomes available, or decide a
  vetted form service (e.g. Formspree) is acceptable — if so, collect name + email +
  message only, not student number.

## Analytics

Decision: cookieless analytics wanted; none is implemented yet.

- [ ] Add a cookieless, no-third-party-cookie option (e.g. self-hosted Plausible or
  GoatCounter). Keep it clear of the tracker guard in
  `.github/workflows/build.yml` (FR-26/C8) — that guard blocks GA/GTM/Hotjar/etc.

## Housekeeping

- [ ] `public/robots.txt` advertises `sitemap-index.xml`, but no sitemap is
  generated (`@astrojs/sitemap` isn't installed). Either add the integration or
  drop the `Sitemap:` line.
- [ ] Hero populated weekly-calendar path is still un-exercised (all events are
  past-dated). `src/components/Hero.astro` has a `TODO(a11y)` note: the day/hour
  grid cells aren't `<th>`/`role="columnheader"` — give it an ARIA grid pattern or a
  visually-hidden table once there's a current-week event to test against.
- [ ] `npm run test:links` still skips `cscusuo.org` (`package.json`); harmless, but
  can be removed.
