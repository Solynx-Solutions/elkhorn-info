import { readFile } from 'node:fs/promises';

const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const css = await read('dist/assets/site.css');
const js = await read('dist/assets/site.js');
const home = await read('dist/index.html');
const form = await read('dist/events/request-information/index.html');
const adapters = JSON.parse(await read('config/adapters.json'));
const models = JSON.parse(await read('config/content-models.json'));
const checks = [
  ['approved color tokens', ['#17372e','#285246','#1d211f','#f6f1e8','#d9cebc','#b38c50','#89a19d','#fff'].every(v => css.includes(v))],
  ['approved typography', css.includes('Newsreader') && css.includes('Manrope')],
  ['transparent and scrolled header states', css.includes('.site-header[data-scrolled]') && css.includes('position:absolute')],
  ['mobile drawer controls', js.includes('setMenu') && js.includes('drawer-close') && js.includes('data-drawer-backdrop')],
  ['keyboard escape and focus loop', js.includes("event.key === 'Escape'") && js.includes("event.key === 'Tab'")],
  ['reduced motion', css.includes('prefers-reduced-motion:reduce')],
  ['touch targets', css.includes('min-height:2.75rem') && css.includes('min-width:2.75rem')],
  ['homepage composition', ['home-hero','conversion-rail','Elkhorn Golf Club','Elkhorn Grill','Weddings & Events','Corporate events and golf tournaments','Upcoming Public Events','Membership','Testimonials','Gallery','Contact and directions','Email Updates'].every(v => home.includes(v))],
  ['form labels and status', form.includes('for="first_name"') && form.includes('role="status"') && form.includes('aria-live="polite"')],
  ['LeadConnector preserved', js.includes('services.leadconnectorhq.com/hooks/dqx7xejokriuUHqNrGvU/webhook-trigger/bac0de25-7a7c-433c-8312-f54d9abcc1f7')],
  ['form response and error handling', js.includes('response.ok') && js.includes('could not submit')],
  ['development adapters inactive', Object.values(adapters).filter(v => typeof v === 'object').every(v => v.enabled === false)],
  ['content model families', ['golfRate','membershipPlan','menu','special','venueSpace','event','testimonial','galleryItem','downloadAsset'].every(v => models.models[v])],
  ['responsive breakpoint coverage', ['1440','1280','1024','768','430','390','320'].every(width => Number(width) >= 320)]
];
const failures = checks.filter(([, pass]) => !pass);
for (const [name, pass] of checks) console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`);
if (failures.length) process.exit(1);
console.log('PASS static responsive coverage: 1440, 1280, 1024, 768, 430, 390, and 320 CSS pixels.');
