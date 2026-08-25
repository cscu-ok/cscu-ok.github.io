// FR-9: every path the old Cobalt site served (docs/ on `main`, as of the v2 branch
// point) must still resolve on v2. Run after `astro build`. Exits non-zero and lists
// unhandled paths if any of the old paths don't exist in dist/.
import { existsSync } from 'node:fs';
import { join } from 'node:path';

// One-time snapshot from `git ls-tree -r --name-only main -- docs`, recorded in
// docs-site/REDIRECTS.md. Update both together if `main`'s docs/ ever changes before
// cutover (it shouldn't — main stays untouched per Section 6.1).
const OLD_PATHS_TO_NEW_DIST_FILES = {
  '/': 'index.html',
  '/bchacks/': 'bchacks/index.html',
  '/rss.xml': 'rss.xml',
  '/CNAME': 'CNAME',
  '/LICENSE': 'LICENSE',
  '/assets/img/bchacks.png': 'assets/img/bchacks.png',
  '/assets/img/discord.png': 'assets/img/discord.png',
  '/assets/img/favicon.png': 'assets/img/favicon.png',
  '/assets/img/instagram.png': 'assets/img/instagram.png',
  '/assets/img/logo.png': 'assets/img/logo.png',
  '/assets/img/mail.png': 'assets/img/mail.png',
};

const distDir = new URL('../dist/', import.meta.url).pathname;
const unhandled = Object.entries(OLD_PATHS_TO_NEW_DIST_FILES).filter(
  ([, relPath]) => !existsSync(join(distDir, relPath))
);

if (unhandled.length > 0) {
  console.error('Old paths with no v2 equivalent in dist/:');
  for (const [oldPath] of unhandled) console.error(`  ${oldPath}`);
  process.exit(1);
}

console.log(`All ${Object.keys(OLD_PATHS_TO_NEW_DIST_FILES).length} old paths still resolve.`);
