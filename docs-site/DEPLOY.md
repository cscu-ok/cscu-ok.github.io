# Deployment

## Domain note (2026-08-28)

`cscusuo.org` lapsed. v2 deploys to the **default Pages domain**,
`https://cscu-ok.github.io`. `public/CNAME` was removed and `astro.config.mjs`
`site:` re-pointed; the CNAME-verification steps were dropped from both workflows.
Re-domaining steps are in `docs-site/TODO.md`. Everything below that referenced
`cscusuo.org` now means `cscu-ok.github.io`.

## How this works (Section 6 of the spec)

**Right now:** `main` still serves the old site from `main` + `/docs`, completely
untouched by this branch. All v2 work happens on `v2` (this branch) and short-lived
branches off it. `.github/workflows/build.yml` runs on every PR into `v2` or `main` —
install, type check, build, redirect check, link check, accessibility check,
performance budget, tracker guard. It never deploys anything.

`.github/workflows/deploy.yml` already exists (added in M5) but does nothing useful
yet: GitHub Pages' publishing source is still "Deploy from a branch" (`main` +
`/docs`), so there's nothing wired up to receive what this workflow would build. It
starts mattering the moment an admin flips the Pages source to "GitHub Actions" —
that's cutover step 6 below.

**At cutover:** an admin switches the Pages publishing source to "GitHub Actions",
`v2` merges into `main`, and `deploy.yml` (gated on pushes to `main`) takes over
publishing. With no custom domain, the site serves at `cscu-ok.github.io` as soon as
the first Actions deploy succeeds.

## Cutover checklist (FR-29)

Run in order. Items marked **[ADMIN]** need repo/org admin access — the org owner
does these; everything else can be prepared ahead of time.

1. [x] All milestone work (M0–M5) merged into `v2`, its own PR build check green.
   *(Done: `v2` pushed, PR #1 (`v2` → `main`, draft) open, `build.yml` green.)*
2. [ ] Manual keyboard-only pass on every route, plus a mobile-viewport pass. The
   automated a11y check (axe/pa11y in CI) is a floor, not a substitute (FR-23).
3. [x] `docs-site/REDIRECTS.md` complete, `npm run test:redirects` reports all old
   paths resolved. *(10/10 — `/CNAME` intentionally dropped with the domain. Runs
   in CI on every PR.)*
4. [x] No `TODO(content)` remaining anywhere in `dist/` after `npm run build`. Run:
   ```
   npm run build
   grep -rIlE 'TODO\(content\)|lorem ipsum' dist
   ```
   This prints nothing. The remaining stub pages now carry honest "being finalized"
   copy instead of `TODO(content)` markers; the real content is tracked in
   `docs-site/TODO.md`. `deploy.yml` also enforces this and will refuse to deploy if
   it regresses.
5. [ ] Tag current `main` as `v1-final` and push the tag:
   ```
   git checkout main
   git pull
   git tag v1-final
   git push origin v1-final
   ```
6. [ ] **[ADMIN]** Repo Settings → Pages → Build and deployment → Source → change
   from "Deploy from a branch" to "GitHub Actions". Also confirm the **custom
   domain** field is **empty** (it may still hold `cscusuo.org` — clear it).
7. [ ] Merge PR #1 (`v2` → `main`) with a **merge commit**, not squash, so the
   milestone history stays readable.
8. [ ] Confirm the `deploy.yml` workflow run on `main` succeeds — check the Actions
   tab, not just that the site looks right afterward.
9. [ ] `https://cscu-ok.github.io` serves v2 over HTTPS with a valid certificate.
10. [ ] Spot-check every path in `docs-site/REDIRECTS.md`, especially `/bchacks/`
    and `/rss.xml`.
11. [ ] **[ADMIN]** Confirm "Enforce HTTPS" is checked in Pages settings (FR-5) —
    this can silently reset when the publishing source changes.
12. [ ] If a temporary Cloudflare/Netlify preview was set up during development,
    remove it now.
13. [ ] Announce in the CSCU Discord and to the department contact.

## Post-launch follow-ups

Real CSCU content and decisions that were deliberately deferred so v2 could ship are
tracked in **`docs-site/TODO.md`** — homepage Vision statement, constitution
document, full exec details, Get Involved copy, upcoming events, the first news
post, the contact form, cookieless analytics, and re-domaining. None block launch;
the pages ship with honest interim copy.

## Known blockers

- None outstanding. Push access is resolved; the org owner handles the `[ADMIN]`
  steps above.

## Rollback (FR-30)

Two independent paths, either one takes minutes:

**Path A — revert the merge commit on `main`:**
```
git checkout main
git pull
git revert -m 1 <merge-commit-sha>
git push origin main
```
`deploy.yml` runs again on the push and republishes the pre-cutover state. The tag
`v1-final` still points at the last-known-good commit if you need to compare.

**Path B — restore the old Pages source:**
1. **[ADMIN]** Repo Settings → Pages → Build and deployment → Source → back to
   "Deploy from a branch" → `main` / `/docs`.
2. The old build output is still in git history (recoverable from the `v1-final` tag
   even after `docs/` is deleted from `main` at cutover, per FR-6) — GitHub Pages
   will start serving it again immediately, no rebuild needed.

Either path leaves `cscu-ok.github.io` back on the pre-cutover site with no
propagation delay.
