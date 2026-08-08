import { readFile } from 'node:fs/promises';

const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const routes = [
  '/', '/golf/', '/golf/course/', '/golf/rates/', '/golf/membership/', '/golf/tournaments/', '/golf/pro-shop/', '/golf/faqs/', '/tee-times/',
  '/grill/', '/grill/menu/', '/grill/specials/', '/grill/reservations/', '/weddings/', '/events/', '/events/banquets/', '/events/corporate-events/',
  '/events/celebrations/', '/events/spaces/', '/events/request-information/', '/gallery/', '/gallery/golf/', '/gallery/grill/', '/gallery/weddings/',
  '/gallery/events/', '/calendar/', '/newsletter/', '/about/', '/contact/', '/privacy/', '/terms/', '/accessibility/', '/downloads/'
];
const enhancedRoutes = routes.filter(route => !['/', '/privacy/', '/terms/'].includes(route));
const pathFor = route => route === '/' ? 'dist/index.html' : `dist${route}index.html`;
const pages = new Map(await Promise.all(routes.map(async route => [route, await read(pathFor(route))])));
const adapters = JSON.parse(await read('config/adapters.json'));
const integrations = JSON.parse(await read('config/integrations.json'));
const analytics = JSON.parse(await read('config/analytics.json'));
const structured = JSON.parse(await read('config/structured-data-models.json'));
const m3Models = JSON.parse(await read('config/m3-content-models.json'));
const redirects = await read('config/redirects.draft.csv');
const m3css = await read('dist/assets/m3.css');
const analyticsJs = await read('dist/assets/analytics.js');
const siteJs = await read('dist/assets/site.js');

const allPages = [...pages.values()];
const schemasParse = allPages.every(html => {
  const match = html.match(/<script type="application\/ld\+json" data-m3-schema>([\s\S]*?)<\/script>/);
  if (!match) return false;
  try { return JSON.parse(match[1])['@type'] === 'BreadcrumbList'; } catch { return false; }
});
const everyRedirectDraft = redirects.trim().split('\n').slice(1).every(row => row.startsWith('draft,'));
const noActiveIntegration = Object.values(integrations).every(value => typeof value !== 'object' || value.activateNewWorkflow === false || value.activateNewWorkflow === undefined);
const checks = [
  ['all 33 routes receive M3 development instrumentation', routes.length === 33 && allPages.every(html => html.includes('data-analytics-mode="development"') && html.includes('data-m3="verified-content"'))],
  ['all remaining content routes receive completed M3 modules', enhancedRoutes.every(route => pages.get(route).includes('data-m3-complete="true"'))],
  ['M3 styles and local analytics asset load on every route', allPages.every(html => html.includes('/assets/m3.css') && html.includes('/assets/analytics.js'))],
  ['development breadcrumbs parse on every route', schemasParse],
  ['structured-data guardrails defer unverified business schemas', ['LocalBusiness','Restaurant','GolfCourse','Event','Offer','Product'].every(type => structured.deferredTypes.includes(type))],
  ['analytics architecture is development-only with no network vendor', analytics.status === 'development-only' && analytics.provider === null && analytics.networkDispatchEnabled === false && analytics.rules.noPIIInEventPayloads === true],
  ['analytics client queues local events without network dispatch', analyticsJs.includes('__ELKHORN_ANALYTICS__') && analyticsJs.includes('CustomEvent') && !analyticsJs.includes('fetch(') && !analyticsJs.includes('sendBeacon')],
  ['tee-time conversion preserves existing external booking URL', pages.get('/tee-times/').includes('https://www.elkhorngc.com/book-a-tee-time/') && integrations.teeTimeBooking.activateNewWorkflow === false],
  ['event inquiry production endpoint remains preserved', siteJs.includes('services.leadconnectorhq.com/hooks/dqx7xejokriuUHqNrGvU/webhook-trigger/bac0de25-7a7c-433c-8312-f54d9abcc1f7') && integrations.eventInquiries.activateNewWorkflow === false],
  ['all development adapters remain inactive', Object.values(adapters).filter(value => typeof value === 'object').every(value => value.enabled === false)],
  ['no integration workflow is activated', noActiveIntegration],
  ['redirect registry remains draft-only', everyRedirectDraft],
  ['accessible HTML-first menu architecture completed', pages.get('/grill/menu/').includes('Accessible HTML-first menu architecture') && pages.get('/grill/menu/').includes('Menu sections')],
  ['membership and tournament page families completed', pages.get('/golf/membership/').includes('Membership decision path') && pages.get('/golf/tournaments/').includes('Outing planning path')],
  ['weddings and full events family completed', ['/weddings/','/events/','/events/banquets/','/events/corporate-events/','/events/celebrations/','/events/spaces/','/events/request-information/'].every(route => pages.get(route).includes('data-m3-complete="true"'))],
  ['gallery family uses permission-aware structure', ['/gallery/','/gallery/golf/','/gallery/grill/','/gallery/weddings/','/gallery/events/'].every(route => pages.get(route).includes('Permission-aware media collection'))],
  ['calendar and newsletter remain intentionally inactive', pages.get('/calendar/').includes('Calendar adapter:</strong> Disabled') && pages.get('/newsletter/').includes('Signup inactive')],
  ['department contact routing stays separated', ['golf-contact','grill-contact','events-contact','general-contact'].every(id => pages.get('/contact/').includes(`id="${id}"`))],
  ['verified identity framework uses only approved structural facts', pages.get('/about/').includes('December 1995') && pages.get('/about/').includes('Elkhorn Golf Club') && pages.get('/about/').includes('Elkhorn Grill') && pages.get('/about/').includes('Elkhorn Banquet Facility')],
  ['M3 content extension models exist', ['departmentContact','faqItem','golfCourseDetail','reservationPolicy','newsletterConfig','calendarConfig','galleryCollection','testimonialCollection'].every(model => m3Models.models[model])],
  ['responsive and reduced-motion rules extend through M3', m3css.includes('@media(max-width:48rem)') && m3css.includes('prefers-reduced-motion:reduce')],
  ['performance guardrail adds no external analytics dependency', !allPages.some(html => /<script[^>]+src="https?:\/\//.test(html))]
];

const failures = checks.filter(([, pass]) => !pass);
for (const [name, pass] of checks) console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`);
if (failures.length) process.exit(1);
console.log(`PASS M3 coverage: ${routes.length} routes instrumented; ${enhancedRoutes.length} routes receive completed M3 composition modules.`);
