import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const root = new URL('../dist', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
async function walk(dir) { const entries = await readdir(dir, { withFileTypes: true }); return (await Promise.all(entries.map(e => e.isDirectory() ? walk(join(dir,e.name)) : [join(dir,e.name)]))).flat(); }
const allFiles = await walk(root);
const htmlFiles = allFiles.filter(file => file.endsWith('.html'));
const required = ['<html lang="en">', '<title>', 'rel="canonical"', '<main id="main-content">', '<h1>', 'application/ld+json', 'class="skip-link"'];
const errors = [];
for (const file of htmlFiles) {
  const source = await readFile(file, 'utf8');
  for (const token of required) if (!source.includes(token)) errors.push(`${file}: missing ${token}`);
  const canonicals = [...source.matchAll(/rel="canonical" href="([^"]+)"/g)];
  if (canonicals.length !== 1 || !canonicals[0][1].startsWith('https://elkhorn.info/')) errors.push(`${file}: invalid canonical`);
  for (const match of source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(match[1]); } catch { errors.push(`${file}: invalid JSON-LD`); } }
  for (const [, href] of source.matchAll(/href="(\/[^"]*)"/g)) {
    const clean = href.split(/[?#]/)[0];
    const target = clean.endsWith('/') ? join(root, clean, 'index.html') : join(root, clean);
    try { await access(target); } catch { errors.push(`${file}: broken internal link ${href}`); }
  }
  if (source.includes('target="_blank"') && !source.includes('noopener')) errors.push(`${file}: unsafe blank target`);
}
const robots = await readFile(join(root, 'robots.txt'), 'utf8');
const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
if (!robots.includes('Sitemap: https://elkhorn.info/sitemap.xml')) errors.push('robots.txt: sitemap missing');
for (const route of ['/golf/','/grill/','/weddings/','/events/spaces/','/contact/']) if (!sitemap.includes(`<loc>https://elkhorn.info${route}</loc>`)) errors.push(`sitemap.xml: missing ${route}`);
for (const route of ['calendar','gallery','grill/specials']) { const source=await readFile(join(root,route,'index.html'),'utf8'); if(!source.includes('empty-state')) errors.push(`${route}: accessible empty state missing`); }
if (errors.length) { console.error([...new Set(errors)].join('\n')); process.exit(1); }
console.log(`Validated ${htmlFiles.length} HTML files, internal links, metadata, canonicals, JSON-LD, sitemap, robots, and empty states.`);
