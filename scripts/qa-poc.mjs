import { readFile } from 'node:fs/promises';

const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const core = {
  home: await read('dist/index.html'),
  golf: await read('dist/golf/index.html'),
  grill: await read('dist/grill/index.html'),
  weddings: await read('dist/weddings/index.html'),
  spaces: await read('dist/events/spaces/index.html'),
  contact: await read('dist/contact/index.html')
};
const support = {
  menu: await read('dist/grill/menu/index.html'),
  tee: await read('dist/tee-times/index.html'),
  membership: await read('dist/golf/membership/index.html'),
  tournaments: await read('dist/golf/tournaments/index.html'),
  calendar: await read('dist/calendar/index.html'),
  newsletter: await read('dist/newsletter/index.html'),
  gallery: await read('dist/gallery/index.html'),
  inquiry: await read('dist/events/request-information/index.html')
};
const css = await read('dist/assets/poc.css');
const js = await read('dist/assets/poc.js');
const siteJs = await read('dist/assets/site.js');
const pocConfig = JSON.parse(await read('config/poc.json'));
const integrations = JSON.parse(await read('config/integrations.json'));
const adapters = JSON.parse(await read('config/adapters.json'));
const redirects = await read('config/redirects.draft.csv');
const allPoc = [...Object.values(core), ...Object.values(support)];
const coreJoined = Object.values(core).join('\n');
const forbiddenPresentationText = ['Development preview','Awaiting verified content','Foundation ready','POC intentionally','placeholder','debug'];
const checks = [
  ['POC configuration is explicitly non-production and provisional', pocConfig.status === 'client-facing-non-production-concept' && pocConfig.brand.provisional === true && pocConfig.safety.production === false],
  ['provisional brand and positioning appear on homepage', core.home.includes('Elkhorn Golf, Grill & Events') && core.home.includes('Where Stockton Plays, Gathers & Celebrates.')],
  ['homepage includes all three experience pillars', ['Play','Gather','Celebrate'].every(v => core.home.includes(v))],
  ['homepage includes required primary CTAs', ['Book a Tee Time','Plan an Event','View Hours & Menus'].every(v => core.home.includes(v))],
  ['homepage presentation sections are complete', ['Golf','Elkhorn Grill','Weddings & Events','Corporate Events','Golf Tournaments','Membership','What’s happening at Elkhorn','Gallery','Visit & Connect','Email Updates'].every(v => core.home.includes(v))],
  ['representative POC pages all use client concept layer', Object.values(core).every(html => html.includes('data-poc="client-concept"') && html.includes('/assets/poc.css') && html.includes('/assets/poc.js'))],
  ['supporting conversion destinations use client concept layer', Object.values(support).every(html => html.includes('data-poc="client-concept"'))],
  ['no visible development-shell language remains on core POC pages', forbiddenPresentationText.every(text => !coreJoined.toLowerCase().includes(text.toLowerCase()))],
  ['golf POC emphasizes tee times membership and tournaments', ['Book a Tee Time','Explore Membership','Plan an Outing'].every(v => core.golf.includes(v))],
  ['grill POC emphasizes menus community and contact', core.grill.includes('View Hours & Menus') && core.grill.includes('clubhouse table') && core.grill.includes('Grill Contact')],
  ['weddings POC includes event spaces and inquiry path', core.weddings.includes('Explore Event Spaces') && core.weddings.includes('Plan an Event')],
  ['event spaces POC includes wedding celebration and corporate pathways', ['Weddings','Celebrations','Business & Groups'].every(v => core.spaces.includes(v))],
  ['contact POC preserves four department anchors', ['id="golf-contact"','id="grill-contact"','id="events-contact"','id="general-contact"'].every(v => core.contact.includes(v))],
  ['mobile sticky action navigation exists across POC routes', allPoc.every(html => html.includes('poc-mobile-dock'))],
  ['POC motion is restrained and reduced-motion safe', js.includes('IntersectionObserver') && css.includes('prefers-reduced-motion:reduce') && !css.includes('scroll-snap-type')],
  ['POC responsive rules provide dedicated mobile composition', css.includes('@media(max-width:48rem)') && css.includes('.poc-mobile-dock') && css.includes('.poc-grid-2,.poc-grid-3,.poc-contact-paths{grid-template-columns:1fr}')],
  ['gallery uses only existing project asset paths', ['/assets/golf.jpg','/assets/dining.jpg','/assets/events.jpg','/assets/sunset.jpg'].every(v => core.home.includes(v) || core.spaces.includes(v))],
  ['tee-time path uses inactive EZLinks holder', integrations.teeTimeBooking.status === 'connection-url-pending' && integrations.teeTimeBooking.url === null && integrations.teeTimeBooking.activateNewWorkflow === false && support.tee.includes('EZLinks') && support.tee.includes('Link coming soon')],
  ['LeadConnector event endpoint remains unchanged', siteJs.includes('services.leadconnectorhq.com/hooks/dqx7xejokriuUHqNrGvU/webhook-trigger/bac0de25-7a7c-433c-8312-f54d9abcc1f7')],
  ['all new adapters remain disabled', Object.values(adapters).filter(v => typeof v === 'object').every(v => v.enabled === false)],
  ['redirect registry remains draft-only', redirects.split('\n').slice(1).filter(Boolean).every(line => line.startsWith('draft,'))],
  ['event inquiry form remains present and accessible', support.inquiry.includes('id="eventForm"') && support.inquiry.includes('role="status"') && support.inquiry.includes('aria-live="polite"')],
  ['no operational price or hour claims are introduced in core POC pages', !/\$\s?\d/.test(coreJoined) && !/\b\d{1,2}:\d{2}\s?(AM|PM)\b/i.test(coreJoined)],
  ['no AI property photography references are introduced', !allPoc.some(html => /ai-generated|synthetic property|generated property/i.test(html))]
];
const failures = checks.filter(([, pass]) => !pass);
for (const [name, pass] of checks) console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`);
if (failures.length) process.exit(1);
console.log('PASS POC presentation QA: premium client-facing layer validated across 14 routes.');
