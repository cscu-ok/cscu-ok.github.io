# Open questions

Tracks Section 14 of the v2 spec, plus anything else surfaced during implementation
that the spec says not to guess at silently. Update the status as answers come in.

| # | Question | Status |
|---|---|---|
| Q1 | Is `cscusuo.org` the permanent domain, or is `cscu.io` intended to be used at some point? Affects FR-10. | Open. Built against `cscusuo.org` per the live CNAME — this is what the spec calls the domain that "must not change." |
| Q2 | Who has admin rights on the `cscu-ok` org and the DNS registrar? Two cutover steps (Section 11) need that person. | Open, left unresolved by request — not pinging anyone. Only blocks the M5 cutover, not the build. |
| Q3 | Does CSCU have a role-based email (e.g. `hello@cscusuo.org`) for the Contact page (FR-20)? | Open. Needed before M3 (Contact page) ships real content. |
| Q4 | Is a contact form wanted? Conflicts with C8 (no third-party trackers/services) if yes. | Open. Building without one per the spec's default (FR-20: "no contact form in v2"). |
| Q5 | Analytics: none, or a cookieless option? | Open. Building with none per C8 until decided. |
| Q6 | Add a Git-backed CMS (Decap/Sveltia) for non-technical editing? | Deferred, per spec — out of scope for v2. Content schemas (FR-11) are being kept simple enough not to block this later. |
| Q7 | Does AGPL-3.0 stay? | Open. Keeping AGPL-3.0 unchanged per C6 (default) until told otherwise. |
| Q8 | Is there an approved constitution document to publish at `/about/constitution`? | Open. Blocks real content for that page in M3/M4 — will ship as `TODO(content)` until answered. |
| Q9 | Confirmed exec roster, term labels, and photo consent per person? | Open. Blocks real content for the Team page in M2 — will ship as `TODO(content)` until answered. |
| Q10 | Does BCHacks stay on this domain long-term? | Not blocking. v2 preserves `/bchacks/` unchanged either way (non-goal: don't redesign it). |

## Also surfaced during implementation

- **Repo push access.** The GitHub account used in this environment (`SoumilChhabra`)
  does not have write access to `cscu-ok/cscu-ok.github.io` (push returns 403). `v2`
  work is local-only until this is resolved — either by adding that account as a
  collaborator, or by forking and opening PRs from the fork. Per instruction, work is
  continuing locally in the meantime; nothing has been pushed.
- **Content collection config path.** The spec's Section 7 lists `src/content/config.ts`.
  Astro 7 (the version in use) moved this to `src/content.config.ts` at the src root —
  this is a framework API change since the spec was written, not a deviation from intent.
