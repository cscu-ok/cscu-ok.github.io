# URL preservation (FR-9)

Every path served by the old Cobalt site (`docs/` on `main`, snapshotted via
`git ls-tree -r --name-only main -- docs` at the time v2 branched) still resolves on
v2 at the identical path. No renames, no redirects needed — v2 only added new routes,
it never removed or moved an old one.

`scripts/check-redirects.mjs` encodes this table and runs in CI (`npm run
test:redirects`, wired into `.github/workflows/build.yml`) so a future PR can't
silently break one of these without the build going red. Update both the script and
this table together if `main`'s `docs/` output ever changes before cutover (it
shouldn't — `main` stays untouched per Section 6.1 of the spec until the merge).

| Old path (`main` / `docs/`) | v2 path | Notes |
|---|---|---|
| `/` | `/` | Full redesign, same URL |
| `/bchacks/` | `/bchacks/` | Preserved byte-for-byte (non-goal: don't redesign it) |
| `/rss.xml` | `/rss.xml` | Regenerated — old feed's `<link>` pointed at the stale `cscu.io` (the config-drift bug noted in the spec background); v2's points at `context.site` (currently `cscu-ok.github.io`) |
| `/CNAME` | — | **Dropped.** `cscusuo.org` lapsed; v2 serves from the default Pages domain (`cscu-ok.github.io`) with no custom-domain CNAME. Restore `public/CNAME` and this row when a new domain is bought — see `docs-site/TODO.md`. |
| `/LICENSE` | `/LICENSE` | Symlinked from the repo-root `LICENSE` so it can't drift out of sync |
| `/assets/img/bchacks.png` | `/assets/img/bchacks.png` | Unchanged |
| `/assets/img/discord.png` | `/assets/img/discord.png` | Unchanged |
| `/assets/img/favicon.png` | `/assets/img/favicon.png` | Unchanged |
| `/assets/img/instagram.png` | `/assets/img/instagram.png` | Unchanged |
| `/assets/img/logo.png` | `/assets/img/logo.png` | Unchanged — also the source for the sampled brand colors in `src/styles/tokens.css` |
| `/assets/img/mail.png` | `/assets/img/mail.png` | Unchanged |

Everything else on v2 (`/about`, `/events`, `/team`, `/get-involved`, `/resources`,
`/news`, `/contact`, `/404`) is new — there's nothing old to preserve at those paths.
