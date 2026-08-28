# Open questions

Tracks Section 14 of the v2 spec, plus anything else surfaced during implementation
that the spec says not to guess at silently. Update the status as answers come in.

**Answers received 2026-08-28** (from the org owner). Remaining follow-up work is
tracked in `docs-site/TODO.md`.

| # | Question | Status |
|---|---|---|
| Q1 | Is `cscusuo.org` the permanent domain, or is `cscu.io` intended to be used at some point? Affects FR-10. | **Answered.** `cscusuo.org` lapsed. A new domain will be bought after v2 is deployed. v2 ships on the default Pages domain `cscu-ok.github.io` in the meantime — `public/CNAME` removed, `site` re-pointed. Re-domaining steps in `docs-site/TODO.md`. |
| Q2 | Who has admin rights on the `cscu-ok` org and the DNS registrar? Two cutover steps (Section 11) need that person. | **Answered.** The user is now org owner and holds admin rights. The `[ADMIN]` cutover steps (Pages source → GitHub Actions, Enforce HTTPS) are theirs to do. |
| Q3 | Does CSCU have a role-based email for the Contact page (FR-20)? | **Answered.** `cscu.okanagan@gmail.com`. Updated in the Footer and `/contact` (replacing the old `contact@cscusuo.org`). |
| Q4 | Is a contact form wanted? Conflicts with C8 (no third-party trackers/services) if yes. | **Answered — deferred.** Form wanted (student number + email), but a static host can't process submissions and student numbers shouldn't go through a third party. `/contact` uses a `mailto:` with a "include name + student number + UBCO email" prompt for now. Follow-up in `docs-site/TODO.md`. |
| Q5 | Analytics: none, or a cookieless option? | **Answered.** Cookieless option wanted. None implemented yet — follow-up in `docs-site/TODO.md`. Ships with no analytics. |
| Q6 | Add a Git-backed CMS (Decap/Sveltia) for non-technical editing? | **Answered — not now.** Out of scope, as before. |
| Q7 | Does AGPL-3.0 stay? | **Pending explanation.** User asked what AGPL is. No relicensing decision made, so AGPL-3.0 stays unchanged per C6 (default). |
| Q8 | Is there an approved constitution document to publish at `/about/constitution`? | **Still open.** Not answered. `/about/constitution` now points at `github.com/cscu-ok/regulations` (the real governing-docs repo) as the source of record, instead of a `TODO(content)` stub. Publish a readable version when there is one — `docs-site/TODO.md`. |
| Q9 | Confirmed exec roster, term labels, and photo consent per person? | **Partially answered.** Roster (name + role): Soumil Chhabra (President), Muhammad Mustafa (VP Finance), Noah Stewart (VP Events), seeded under term `2026-2027`. Photos, bios, links, remaining roles, and confirmation of the term label to follow — `docs-site/TODO.md`. |
| Q10 | Does BCHacks stay on this domain long-term? | **Answered.** Keep `/bchacks/` for now, unchanged (as before). |

## Also surfaced during implementation

- **Repo push access.** ~~The GitHub account used in this environment does not have
  write access to `cscu-ok/cscu-ok.github.io`.~~ **Resolved 2026-08-28** — access
  granted, `v2` pushed, PR #1 (`v2` → `main`, draft) open.
- **Content collection config path.** The spec's Section 7 lists `src/content/config.ts`.
  Astro 7 (the version in use) moved this to `src/content.config.ts` at the src root —
  this is a framework API change since the spec was written, not a deviation from intent.
