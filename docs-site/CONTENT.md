# Adding content (no build tools required)

Everything below can be done entirely in the GitHub web editor — click a file, click
the pencil icon to edit (or "Add file" → "Create new file" for a new one), paste,
commit. GitHub will offer to open a pull request for you if you don't have push
access; if you do, you can commit straight to a branch. Either way, the PR check
(`.github/workflows/build.yml`) builds your change automatically and tells you if
something's wrong — you'll see a red X with details, or a green check.

You don't need to run anything locally for this. `npm run dev` (see
[CONTRIBUTING.md](./CONTRIBUTING.md)) is only useful if you want to preview your
change before opening the PR.

## Add an event

Create a new file in `src/content/events/`, named `your-event-slug.md` (the filename
becomes the URL: `your-event-slug` → `/events/your-event-slug/`). Paste this and fill
it in:

```md
---
title: Intro to Git Workshop
date: 2026-09-15T18:00:00-07:00
end: 2026-09-15T19:30:00-07:00
location: EME 1153
type: workshop
summary: A hands-on intro to Git and GitHub for anyone who's never used them.
registrationUrl: https://forms.gle/example
---

Write the full event description here in Markdown. This shows on the event's own
page — the `summary` above is just the short version used in cards and previews.
```

Notes:
- `type` must be one of: `workshop`, `social`, `talk`, `hackathon`, `meeting`, `other`.
- `end`, `registrationUrl`, and `image` are optional — delete the lines you don't need.
- `summary` should stay under 160 characters (it's used in the page's meta
  description too).
- Add `draft: true` to a file to keep working on it without it showing up on the
  live site yet.
- The date format is `YYYY-MM-DDTHH:MM:SS-07:00` (that `-07:00` is the Pacific
  timezone offset — keep it, or times will be off).

## Add an exec / team member

New file in `src/content/execs/`, e.g. `jane-doe.md`:

```md
---
name: Jane Doe
role: President
roleOrder: 1
term: 2026-2027
bio: Third-year Computer Science, running CSCU's events and department liaison work.
links:
  - label: LinkedIn
    url: https://linkedin.com/in/example
---
```

Notes:
- `roleOrder` controls display order within a term (1 = shown first) — it is *not*
  alphabetical.
- `term` should match across everyone on the same exec team (e.g. `2026-2027`) so
  they group together on the Team page.
- `photo` is optional — add `photo: /assets/img/team/jane-doe.jpg` and upload the
  image to `public/assets/img/team/` if you have one. Without it, the page shows the
  person's initials instead.
- `links` is optional and opt-in only — per the spec's C7, no personal contact info
  beyond what someone consents to publish (name, role, optional photo, optional
  public link). Never add a personal phone number or address.

## Add a resource (a link on the Resources page)

New file in `src/content/resources/`, e.g. `career-services.md`:

```md
---
title: UBCO Career Services
url: https://students.ok.ubc.ca/career/
description: Resume help, job postings, and co-op support.
category: career
order: 1
---
```

Notes:
- `category` must be one of: `academics`, `career`, `community`, `tooling`, `ubco`.
- `order` controls position within a category (lower = higher up). It's optional —
  omit it and the item just goes near the bottom of its category.
- `description` is optional.

## Publish a news post

New file in `src/content/posts/`, e.g. `2026-fall-kickoff-recap.md`:

```md
---
title: Fall Kickoff Recap
date: 2026-09-20
author: CSCU Exec
summary: How the fall kickoff social went — turnout, photos, what's next.
tags: [social, recap]
---

Write the full post here in Markdown.
```

Notes:
- `author` can be a role ("CSCU Exec") instead of a person's name — that's often
  better for something that outlives any one exec's term.
- Posts automatically show up in `/news` and in the RSS feed at `/rss.xml`.
- `draft: true` works the same way as for events.

## If something goes wrong

If your PR's build check fails, click "Details" on the red X — it'll usually be one
of:
- A required field is missing or the wrong type (Zod, the validation library, gives
  a specific file/field in the error).
- A broken link somewhere in your content.
- `TODO(content)` or `lorem ipsum` literally appearing in what you wrote (the build
  guards against placeholder text — if you're intentionally leaving a note for later,
  that's fine during review, just don't merge it in that state).

If you're stuck, ask in the CSCU Discord rather than guessing — someone with more
context on the current setup can probably spot it fast.
