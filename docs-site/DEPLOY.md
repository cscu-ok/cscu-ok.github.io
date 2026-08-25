# Deployment

TODO(content): the deploy workflow (FR-2), cutover checklist (FR-29), and rollback
procedure (FR-30) are written up here in M5, once the site is ready to cut over.

## Current state (M0)

- `.github/workflows/build.yml` runs on every PR into `v2` or `main`: install, build,
  link check, accessibility check. It does **not** deploy anything.
- No deploy workflow exists yet. The live site at `cscusuo.org` is still served from
  `main` + `/docs` (the old Cobalt build) and is untouched by this branch.
- `public/CNAME` is already set to `cscusuo.org` so it's correct the moment a deploy
  workflow does exist (FR-4).
