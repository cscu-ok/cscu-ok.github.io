// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // cscusuo.org lapsed; serving from the default Pages domain until a new domain
  // is bought. Re-point this (+ public/CNAME, public/robots.txt) at that point —
  // see docs-site/TODO.md.
  site: 'https://cscu-ok.github.io',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
