# Contributing to the CSCU website

This is the source for the CSCU website, rebuilt on [Astro](https://astro.build/).

## Setup

```bash
git clone https://github.com/cscu-ok/cscu-ok.github.io
cd cscu-ok.github.io
npm install
npm run dev
```

Open `http://localhost:4321` to see a live preview that updates as you edit.

Node version is pinned in `.nvmrc`. If you use [nvm](https://github.com/nvm-sh/nvm), run `nvm use` before installing.

## Branch workflow

- All work happens on `v2` (and short-lived feature branches off `v2`) until cutover. `main` keeps serving the live site from the old build in the meantime — do not touch `main` directly.
- Open PRs into `v2`. Every PR must pass the build/link/accessibility check before merge (see `.github/workflows/build.yml`).
- If you're only editing content (an event, a team member, a resource, a post) and not code, see [CONTENT.md](./CONTENT.md) — you don't need to run anything locally, the GitHub web editor is enough.

## Project structure

See the repository root for `src/pages` (routes), `src/content` (Markdown content collections), `src/components`, `src/layouts`, and `src/styles/tokens.css` (the single source of truth for design tokens — no raw hex values elsewhere).

## Deploying

See [DEPLOY.md](./DEPLOY.md).
