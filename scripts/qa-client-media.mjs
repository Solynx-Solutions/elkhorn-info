import { readFile } from 'node:fs/promises';

const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const home = await read('dist/index.html');
const weddings = await read('dist/weddings/index.html');
const spaces = await read('dist/events/spaces/index.html');
const gallery = await read('dist/gallery/index.html');
const css = await read('dist/assets/poc-client-media.css');
const couple = await read('dist/assets/client/couple-arch.svg');
const reception = await read('dist/assets/client/reception-long.svg');
const pages = [home,weddings,spaces,gallery];
const checks = [
  ['client media stylesheet loads on presentation routes', pages.every(html => html.includes('/assets/poc-client-media.css'))],
  ['client-provided couple and reception assets are present', couple.includes('data:image/webp;base64,') && reception.includes('data:image/webp;base64,')],
  ['homepage includes real Elkhorn wedding proof section', home.includes('Real celebrations') && home.includes('Client-provided Elkhorn photography')],
  ['Weddings includes real client media', weddings.includes('Real weddings at Elkhorn') && weddings.includes('/assets/client/couple-arch.svg') && weddings.includes('/assets/client/reception-long.svg')],
  ['Event Spaces includes real venue-in-use media', spaces.includes('The setting in use') && spaces.includes('From ceremony to reception.')],
  ['Gallery includes real Elkhorn celebration media', gallery.includes('Real moments, real Elkhorn.')],
  ['chat-resolution assets are kept out of hero backgrounds', !pages.some(html => /poc-hero-media[\s\S]{0,300}assets\/client\//.test(html))],
  ['client media is responsive and reduced-motion safe', css.includes('@media(max-width:48rem)') && css.includes('@media(prefers-reduced-motion:reduce)')],
  ['client media carries descriptive alt text', weddings.includes('alt="Newlyweds beneath a ceremony arch at Elkhorn"') && weddings.includes('alt="Floral reception table prepared at Elkhorn"')]
];
const failures = checks.filter(([, pass]) => !pass);
for (const [name, pass] of checks) console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`);
if (failures.length) process.exit(1);
console.log('PASS client-provided Elkhorn media integration QA.');
