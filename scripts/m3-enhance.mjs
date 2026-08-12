import { copyFile, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
const out = join(root, 'dist');
const siteUrl = 'https://elkhorn.info';

const routes = [
  ['/', 'Welcome'], ['/golf/', 'Golf'], ['/golf/course/', 'Course'], ['/golf/rates/', 'Golf Rates'],
  ['/golf/membership/', 'Membership'], ['/golf/tournaments/', 'Golf Tournaments'], ['/golf/pro-shop/', 'Pro Shop'], ['/golf/faqs/', 'Golf FAQs'],
  ['/tee-times/', 'Tee Times'], ['/grill/', 'Grill'], ['/grill/menu/', 'Menu'], ['/grill/specials/', 'Specials'], ['/grill/reservations/', 'Reservations'],
  ['/weddings/', 'Weddings'], ['/events/', 'Events'], ['/events/banquets/', 'Banquets'], ['/events/corporate-events/', 'Corporate Events'],
  ['/events/celebrations/', 'Celebrations'], ['/events/spaces/', 'Event Spaces'], ['/events/request-information/', 'Request Event Information'],
  ['/gallery/', 'Gallery'], ['/gallery/golf/', 'Golf Gallery'], ['/gallery/grill/', 'Grill Gallery'], ['/gallery/weddings/', 'Wedding Gallery'], ['/gallery/events/', 'Events Gallery'],
  ['/calendar/', 'Calendar'], ['/newsletter/', 'Newsletter'], ['/about/', 'About'], ['/contact/', 'Contact'], ['/privacy/', 'Privacy Policy'],
  ['/terms/', 'Terms of Service'], ['/accessibility/', 'Accessibility'], ['/downloads/', 'Downloads']
];

const routeFile = route => route === '/' ? join(out, 'index.html') : join(out, route, 'index.html');
const card = (title, body, href = '', label = '') => `<article class="intent-card"><span class="verification-badge" data-state="pending">Controlled</span><h3>${title}</h3><p>${body}</p>${href ? `<a class="text-link" href="${href}">${label || 'Continue'}</a>` : ''}</article>`;
const module = ({ eyebrow, title, body, cards = [], tone = 'soft', extra = '' }) => `<section class="m3-module" data-m3-complete="true" data-tone="${tone}"><div class="shell"><div class="m3-heading"><div><p class="eyebrow">${eyebrow}</p><h2>${title}</h2></div><p>${body}</p></div>${cards.length ? `<div class="intent-grid">${cards.join('')}</div>` : ''}${extra}<p class="m3-route-note">M3 development composition. Operational values remain verification-controlled.</p></div></section>`;
const process = items => `<ol class="process-list">${items.map(([title, body]) => `<li><h3>${title}</h3><p>${body}</p></li>`).join('')}</ol>`;
const galleryNav = `<nav class="gallery-categories" aria-label="Gallery categories"><a href="/gallery/golf/">Golf</a><a href="/gallery/grill/">Grill</a><a href="/gallery/weddings/">Weddings</a><a href="/gallery/events/">Events</a></nav>`;

function moduleFor(route) {
  if (route === '/') return '';
  if (route === '/golf/') return module({ eyebrow:'Golf', title:'Plan the golf journey', body:'Course discovery, rates, membership, tournaments, pro shop, FAQs, and tee-time booking now share one conversion path.', cards:[card('Course','Verified course details can be inserted without changing the page structure.','/golf/course/','Course information'),card('Membership','Plan data remains empty until approved.','/golf/membership/','Membership pathway'),card('Golf outings','Tournament conversion is prepared without publishing packages.','/golf/tournaments/','Tournament pathway')] });
  if (route === '/golf/course/') return module({ eyebrow:'Golf / Course', title:'Course information architecture', body:'The page is ready for verified course overview, playing information, accessibility details, and approved scorecard assets.', cards:[card('Course overview','Identity and narrative fields are ready for Controller-approved copy.'),card('Playing information','Policies, conditions, routing, and operational guidance remain unpublished.'),card('Scorecard & downloads','Accessible scorecard files can be added only after asset review.','/downloads/','Downloads')] });
  if (route === '/golf/rates/') return module({ eyebrow:'Golf / Rates', title:'Rate publishing framework', body:'No rate is hardcoded. The model supports audience, amount, effective date, terms, and verification metadata.', cards:[card('Current rates','Awaiting verified pricing and effective dates.'),card('Rate conditions','Cart, walking, timing, eligibility, and other terms remain approval-controlled.'),card('Book after review','The existing external booking dependency remains separate from rate content.','/tee-times/','Tee Times')] });
  if (route === '/golf/membership/') return module({ eyebrow:'Golf / Membership', title:'Membership decision path', body:'The page is composed to compare approved plans, explain verified terms, and route interest without inventing benefits or pricing.', extra:process([['Compare approved options','Plan cards will render only records marked verified.'],['Review terms','Benefits, pricing, dates, and restrictions must carry verification metadata.'],['Express interest','Development-only inquiry routing remains inactive until approved.']]) });
  if (route === '/golf/tournaments/') return module({ eyebrow:'Golf / Tournaments', title:'Outing planning path', body:'Tournament discovery and conversion structure is complete while packages, field limits, policies, and pricing stay unpublished.', extra:process([['Explore the outing','Future approved content can explain the experience without changing structure.'],['Define requirements','Group size, date, food-and-beverage, and format fields are model-ready.'],['Route the inquiry','Tournament adapter remains development-only and disabled.']]) });
  if (route === '/golf/pro-shop/') return module({ eyebrow:'Golf / Pro Shop', title:'Pro shop content framework', body:'The page can support verified shop overview, services, merchandise categories, and contact routing without making inventory claims.', cards:[card('Shop overview','Awaiting approved operating details.'),card('Services','No club, fitting, repair, rental, or merchandise service is assumed.'),card('Golf contact','Use the controlled Golf contact pathway for future routing.','/contact/#golf-contact','Golf Contact')] });
  if (route === '/golf/faqs/') return module({ eyebrow:'Golf / FAQs', title:'Verified FAQ architecture', body:'FAQ disclosure is ready for approved answers; no policy is inferred from legacy content.', extra:`<div class="intent-grid"><details class="intent-card"><summary>Tee-time booking</summary><p>Booking continues through the preserved external tee-time experience.</p></details><details class="intent-card"><summary>Rates and policies</summary><p>Answers remain unpublished until current rates and policies are verified.</p></details><details class="intent-card"><summary>Membership and tournaments</summary><p>Answers remain controlled until plan and outing details are approved.</p></details></div>` });
  if (route === '/tee-times/') return module({ eyebrow:'Golf / Booking', title:'EZLinks connection pending', body:'The booking system remains untouched while the approved direct URL is verified.', extra:process([['Review golf information','Visitors can understand the golf journey before booking.'],['Connection holder','No guessed or temporary external destination is published.'],['Return to Elkhorn','Unified navigation remains available while the connection is pending.']]) });
  if (route === '/grill/') return module({ eyebrow:'Grill', title:'Dining conversion framework', body:'Menu, specials, reservation guidance, and contact routing share a consistent hospitality journey without publishing unverified operating facts.', cards:[card('Menu','HTML-first menu architecture is ready.','/grill/menu/','Menu framework'),card('Specials','Time-bound offers remain empty until verified.','/grill/specials/','Specials status'),card('Reservations','No reservation channel is assumed.','/grill/reservations/','Reservation status')] });
  if (route === '/grill/menu/') return module({ eyebrow:'Grill / Menu', title:'Accessible HTML-first menu architecture', body:'Approved menu records will render as semantic HTML; PDFs are secondary downloads only.', extra:`<div class="intent-grid">${card('Menu sections','Section names, items, descriptions, prices, and dietary indicators require approved source data.')}${card('Dietary information','Legend and accommodation wording remain verification-controlled.')}${card('Accessible download','An approved accessible file can be offered as a secondary option.','/downloads/','Downloads')}</div>` });
  if (route === '/grill/specials/') return module({ eyebrow:'Grill / Specials', title:'Time-aware specials architecture', body:'Specials require title, dates, terms, status, and verification before rendering.', cards:[card('Current offers','No active promotion is assumed.'),card('Expired offers','The model can suppress expired records automatically once data is connected.'),card('Terms','Offer restrictions remain tied to verified source records.')] });
  if (route === '/grill/reservations/') return module({ eyebrow:'Grill / Reservations', title:'Reservation routing state', body:'The experience is composed but intentionally inactive until the reservation channel and policy are verified.', extra:`<div class="adapter-state" role="note"><strong>Adapter status:</strong> No reservation provider or phone workflow has been activated.</div>` });
  if (route === '/weddings/') return module({ eyebrow:'Weddings', title:'Wedding planning journey', body:'Storytelling, gallery discovery, space exploration, and the preserved event inquiry path now form one controlled journey.', cards:[card('Explore spaces','Names and capacities remain verification-controlled.','/events/spaces/','Event Spaces'),card('View approved media','Gallery structure is permission-aware.','/gallery/weddings/','Wedding Gallery'),card('Request information','The existing LeadConnector submission destination remains preserved.','/events/request-information/','Plan an Event')] });
  if (route === '/events/') return module({ eyebrow:'Events', title:'Event family hub', body:'Banquets, corporate events, celebrations, spaces, and inquiries now share a complete route-family composition.', cards:[card('Banquets','Package and capacity data remain empty.','/events/banquets/','Banquets'),card('Corporate events','Business-event use cases are structured without unsupported claims.','/events/corporate-events/','Corporate Events'),card('Celebrations','Private-event content remains neutral until approved.','/events/celebrations/','Celebrations'),card('Event spaces','Space records are model-driven.','/events/spaces/','Event Spaces')] });
  if (route === '/events/banquets/') return module({ eyebrow:'Events / Banquets', title:'Banquet planning framework', body:'The composition supports approved occasion types, service descriptions, spaces, packages, and inquiry routing without inventing availability.', cards:[card('Occasion','Approved banquet use cases can be added as verified copy.'),card('Space fit','Capacity and configuration fields remain empty.'),card('Inquiry','Use the preserved event inquiry workflow.','/events/request-information/','Request Information')] });
  if (route === '/events/corporate-events/') return module({ eyebrow:'Events / Corporate', title:'Corporate event conversion path', body:'Meeting, gathering, golf-outing, dining, and event-space needs can be presented once verified without changing the conversion architecture.', extra:process([['Define the gathering','Future content can explain approved corporate use cases.'],['Explore fit','Spaces and golf-tournament pathways are linked without unsupported capacities.'],['Plan the event','The preserved event inquiry workflow remains the conversion endpoint.']]) });
  if (route === '/events/celebrations/') return module({ eyebrow:'Events / Celebrations', title:'Celebration planning framework', body:'The page supports approved private-event messaging while packages, policies, capacities, and promotions remain controlled.', cards:[card('Explore spaces','Only verified space records will render.','/events/spaces/','Event Spaces'),card('See approved events media','Permission-controlled gallery architecture is ready.','/gallery/events/','Events Gallery'),card('Start planning','Existing event inquiry flow remains preserved.','/events/request-information/','Plan an Event')] });
  if (route === '/events/spaces/') return module({ eyebrow:'Events / Spaces', title:'Verified space record framework', body:'Each future space record has fields for name, description, capacity, layouts, accessibility, media, and verification status.', cards:[card('Capacity','No number is published until verified.'),card('Layouts','No configuration is assumed.'),card('Accessibility','Dedicated fields support approved access information.')] });
  if (route === '/events/request-information/') return module({ eyebrow:'Events / Conversion', title:'Preserved event inquiry handoff', body:'M3 adds conversion measurement architecture around the existing form without changing the LeadConnector destination or production consent copy.', cards:[card('Submission destination','Existing LeadConnector endpoint remains unchanged.'),card('Analytics','Only non-PII submit intent is recorded in the development event queue.'),card('Routing','Tripleseat and downstream ownership remain unchanged pending Controller direction.')] });
  if (route.startsWith('/gallery/')) return module({ eyebrow:'Gallery', title:'Permission-aware media collection', body:'Gallery composition supports approved assets, alt text, captions, credits, focal points, responsive sources, and permission state.', extra:`<div class="gallery-shell">${galleryNav}<div class="adapter-state" role="status"><strong>Gallery status:</strong> No additional media is published until asset rights and category placement are approved.</div></div>` });
  if (route === '/calendar/') return module({ eyebrow:'Calendar', title:'Public-event integration state', body:'The page is ready for a verified event feed while the development adapter remains disabled.', extra:`<div class="adapter-state" role="status"><strong>Calendar adapter:</strong> Disabled — provider, ownership, timezone, and feed source require approval.</div>` });
  if (route === '/newsletter/') return module({ eyebrow:'Email Updates', title:'Consent-first newsletter state', body:'Signup composition is prepared without collecting data until provider, audience, consent language, and routing are approved.', extra:`<form class="disabled-preview" aria-label="Newsletter preview"><label for="newsletter-preview-email">Email preview</label><input id="newsletter-preview-email" type="email" disabled placeholder="Signup not active"><button class="button" type="button" disabled>Signup inactive</button><p>No information is collected by this development preview.</p></form>` });
  if (route === '/about/') return module({ eyebrow:'About', title:'Verified identity framework', body:'Only the December 1995 operating history and currently used Golf Club, Grill, and Banquet Facility identities are structurally safe today.', cards:[card('Elkhorn Golf Club','Current golf identity usage.'),card('Elkhorn Grill','Current restaurant identity usage.'),card('Elkhorn Banquet Facility','Current event identity usage.')] });
  if (route === '/contact/') return module({ eyebrow:'Contact', title:'Department routing architecture', body:'Golf, Grill, Events, and General contact records are isolated so verified phone, email, hours, and ownership can be inserted independently.', cards:[card('Golf routing','Awaiting verified channel details.','/contact/#golf-contact','Golf contact'),card('Grill routing','Awaiting verified channel details.','/contact/#grill-contact','Grill contact'),card('Events routing','Existing inquiry path remains available while direct channel details are verified.','/contact/#events-contact','Events contact')] });
  if (route === '/downloads/') return module({ eyebrow:'Downloads', title:'Accessible asset library framework', body:'Scorecards, menus, event packages, tournament packages, and other files require approval plus an accessible alternative before publishing.', cards:[card('Golf assets','Scorecard and golf documents await source approval.'),card('Dining assets','HTML menu remains primary; downloads are secondary.'),card('Event assets','Packages and floor plans remain unpublished until verified.')] });
  if (route === '/accessibility/') return module({ eyebrow:'Accessibility', title:'Pre-merge accessibility checklist', body:'M3 keeps WCAG 2.2 AA as the target and carries keyboard, focus, motion, touch-target, semantic, and form-feedback requirements into staging QA.' });
  return '';
}

function breadcrumbSchema(route, title) {
  const parts = route.split('/').filter(Boolean);
  const items = [{ '@type':'ListItem', position:1, name:'Home', item:`${siteUrl}/` }];
  let path = '';
  parts.forEach((part, index) => {
    path += `/${part}`;
    const name = index === parts.length - 1 ? title : part.replaceAll('-', ' ').replace(/\b\w/g, c => c.toUpperCase());
    items.push({ '@type':'ListItem', position:index + 2, name, item:`${siteUrl}${path}/` });
  });
  return { '@context':'https://schema.org', '@type':'BreadcrumbList', itemListElement:items };
}

const conversionMap = [
  ['/tee-times/', 'tee_time_intent'],
  ['/events/request-information/', 'event_planning_intent'],
  ['/grill/menu/', 'grill_menu_intent'],
  ['/golf/membership/', 'membership_intent'],
  ['/golf/tournaments/', 'tournament_intent'],
  ['/newsletter/', 'newsletter_intent'],
  ['/contact/', 'contact_route_intent']
];
const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function instrument(html) {
  for (const [href, event] of conversionMap) {
    const pattern = new RegExp(`<a(?![^>]*data-conversion-event)([^>]*?)href="${escapeRegex(href)}"`, 'g');
    html = html.replace(pattern, `<a data-conversion-event="${event}"$1href="${href}"`);
  }
  return html;
}

await copyFile(join(root, 'src', 'm3.css'), join(out, 'assets', 'm3.css'));
await copyFile(join(root, 'src', 'analytics.js'), join(out, 'assets', 'analytics.js'));

for (const [route, title] of routes) {
  const file = routeFile(route);
  let html = await readFile(file, 'utf8');
  const content = moduleFor(route);
  if (content) html = html.replace('</main>', `${content}</main>`);
  html = html.replace('<link rel="stylesheet" href="/assets/site.css">', '<link rel="stylesheet" href="/assets/site.css"><link rel="stylesheet" href="/assets/m3.css">');
  html = html.replace('<body ', '<body data-analytics-mode="development" data-m3="verified-content" ');
  html = html.replace('</head>', `<script type="application/ld+json" data-m3-schema>${JSON.stringify(breadcrumbSchema(route, title)).replaceAll('<', '\\u003c')}</script></head>`);
  html = html.replace('</body>', '<script src="/assets/analytics.js" defer></script></body>');
  html = instrument(html);
  await writeFile(file, html);
}

await copyFile(join(out, 'privacy', 'index.html'), join(out, 'privacy.html'));
await copyFile(join(out, 'terms', 'index.html'), join(out, 'terms.html'));
console.log(`Applied M3 verified-content, structured-data, and analytics architecture to ${routes.length} routes.`);
