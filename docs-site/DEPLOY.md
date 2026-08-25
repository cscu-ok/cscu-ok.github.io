# Deployment

## How this works (Section 6 of the spec)

**Right now:** `main` still serves the live site at `cscusuo.org` from `main` +
`/docs`, completely untouched by this branch. All v2 work happens on `v2` (this
branch) and short-lived branches off it. `.github/workflows/build.yml` runs on every
PR into `v2` or `main` — install, type check, build, redirect check, link check,
accessibility check, performance budget, tracker/CNAME guards. It never deploys
anything.

`.github/workflows/deploy.yml` already exists (added in M5) but does nothing useful
yet: GitHub Pages' publishing source is still "Deploy from a branch" (`main` +
`/docs`), so there's nothing wired up to receive what this workflow would build. It
starts mattering the moment an admin flips the Pages source to "GitHub Actions" —
that's cutover step 6 below.

**At cutover:** an admin switches the Pages publishing source to "GitHub Actions",
`v2` merges into `main`, and `deploy.yml` (gated on pushes to `main`) takes over
publishing. DNS is never touched — `cscusuo.org`'s CNAME record already points at
GitHub Pages, and GitHub Pages doesn't care whether its publishing source is a branch
or an Actions workflow. No propagation delay, no downtime.

## Cutover checklist (FR-29)

Run in order. Items marked **[ADMIN]** need repo/org admin access this session
doesn't have (see `docs-site/OPEN-QUESTIONS.md` Q2) — someone with that access has to
do those specific steps; everything else can be prepared ahead of time.

1. [ ] All milestone work (M0–M5) merged into `v2`, its own PR build check green.
   *(As of this writing: all six milestones are committed to `v2` locally. `v2`
   itself hasn't been pushed to `origin` yet — see "Known blockers" below.)*
2. [ ] Manual keyboard-only pass on every route, plus a mobile-viewport pass. The
   automated a11y check (axe/pa11y in CI) is a floor, not a substitute (FR-23).
3. [ ] `docs-site/REDIRECTS.md` complete, `npm run test:redirects` reports all old
   paths resolved. *(Currently: yes, 11/11, and this runs in CI on every PR.)*
4. [ ] No `TODO(content)` remaining anywhere in `dist/` after `npm run build`. Run:
   ```
   npm run build
   grep -rIlE 'TODO\(content\)|lorem ipsum' dist
   ```
   This should print nothing. *(Currently: it will print several files — see
   "Content still needed before cutover" below. `deploy.yml` also enforces this and
   will refuse to deploy if it's not clean, so this step can't be skipped by
   accident.)*
5. [ ] Tag current `main` as `v1-final` and push the tag:
   ```
   git checkout main
   git pull
   git tag v1-final
   git push origin v1-final
   ```
6. [ ] **[ADMIN]** Repo Settings → Pages → Build and deployment → Source → change
   from "Deploy from a branch" to "GitHub Actions".
7. [ ] Merge `v2` into `main` (merge commit, not squash, so the milestone history
   stays readable — the spec asks for "keep the branch history readable").
8. [ ] Confirm the `deploy.yml` workflow run on `main` succeeds — check the Actions
   tab, not just that the site looks right afterward.
9. [ ] `https://cscusuo.org` serves v2 over HTTPS with a valid certificate.
10. [ ] `dig cscusuo.org` matches what it was before cutover (it should — nothing
    touched DNS in this process).
11. [ ] Spot-check every path in `docs-site/REDIRECTS.md`, especially `/bchacks/`
    and `/rss.xml`.
12. [ ] **[ADMIN]** Confirm "Enforce HTTPS" is still checked in Pages settings
    (FR-5) — this can silently reset when the publishing source changes.
13. [ ] If a temporary Cloudflare/Netlify preview was set up during development
    (Section 6.2's suggested way to show the design around before merging), remove
    it now.
14. [ ] Announce in the CSCU Discord and to the department contact.

## Content still needed before cutover

Per Section 0 rule 6 ("do not invent CSCU facts"), these are shipping as honest
`TODO(content)` stubs rather than guessed-at copy. All of them are also logged in
`docs-site/OPEN-QUESTIONS.md` with which open question blocks them:

- About page: department relationship specifics, CSCU's history
- Constitution page: the actual governing document (blocked on Q8)
- Get Involved: volunteer process, election process/timing, exec role descriptions
  (blocked on Q9)
- Team page: exec roster (blocked on Q9) — currently zero entries
- Events / News: zero entries exist to migrate (not a gap, just genuinely empty)

## Known blockers (as of this writing)

- **Repo push access.** The GitHub account used to build this branch doesn't have
  write access to `cscu-ok/cscu-ok.github.io`. `v2` is local-only. This has to be
  resolved (collaborator access, or fork + PR) before step 1 above is even
  meaningful — see `docs-site/OPEN-QUESTIONS.md`.
- **Q2 (org/DNS admin access)** is logged as open and intentionally not chased down
  by this session. Steps 6 and 12 above need whoever that turns out to be.

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

Either path leaves `cscusuo.org` back on the pre-cutover site with no DNS change and
no propagation delay.
