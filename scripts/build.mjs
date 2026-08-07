import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
const out = join(root, 'dist');
const siteUrl = 'https://elkhorn.info';

const routes = [
  ['/', 'Welcome', 'The structural foundation for Elkhorn golf, dining, weddings, and events.', 'home'],
  ['/golf/', 'Golf', 'Explore the future home of Elkhorn golf information.', 'golf'],
  ['/golf/course/', 'Course', 'Course information shell awaiting verified content.', 'golf'],
  ['/golf/rates/', 'Golf Rates', 'Golf rates shell awaiting management verification.', 'golf'],
  ['/golf/membership/', 'Membership', 'Membership information and inquiry foundation.', 'membership'],
  ['/golf/tournaments/', 'Golf Tournaments', 'Tournament planning and inquiry foundation.', 'tournaments'],
  ['/golf/pro-shop/', 'Pro Shop', 'Pro shop information shell awaiting verified content.', 'golf'],
  ['/golf/faqs/', 'Golf FAQs', 'Golf FAQ shell awaiting verified policies.', 'golf'],
  ['/tee-times/', 'Tee Times', 'Continue to the existing golf booking experience.', 'tee-times'],
  ['/grill/', 'Grill', 'The structural home for Elkhorn Grill.', 'grill'],
  ['/grill/menu/', 'Menu', 'Menu shell awaiting a verified accessible menu.', 'grill'],
  ['/grill/specials/', 'Specials', 'Specials shell awaiting verified current offers.', 'grill'],
  ['/grill/reservations/', 'Reservations', 'Reservation information shell awaiting verified workflow details.', 'grill'],
  ['/weddings/', 'Weddings', 'Wedding planning information and inquiry foundation.', 'weddings'],
  ['/events/', 'Events', 'Event planning information foundation.', 'events'],
  ['/events/banquets/', 'Banquets', 'Banquet planning information foundation.', 'events'],
  ['/events/corporate-events/', 'Corporate Events', 'Corporate event planning information foundation.', 'events'],
  ['/events/celebrations/', 'Celebrations', 'Celebration planning information foundation.', 'events'],
  ['/events/spaces/', 'Event Spaces', 'Venue spaces shell awaiting verified capacities and details.', 'events'],
  ['/events/request-information/', 'Request Event Information', 'Contact the existing Elkhorn event inquiry workflow.', 'event-form'],
  ['/gallery/', 'Gallery', 'Gallery index awaiting approved media assets.', 'gallery'],
  ['/gallery/golf/', 'Golf Gallery', 'Golf gallery shell awaiting approved media assets.', 'gallery'],
  ['/gallery/grill/', 'Grill Gallery', 'Grill gallery shell awaiting approved media assets.', 'gallery'],
  ['/gallery/weddings/', 'Wedding Gallery', 'Wedding gallery shell awaiting approved media assets.', 'gallery'],
  ['/gallery/events/', 'Events Gallery', 'Events gallery shell awaiting approved media assets.', 'gallery'],
  ['/calendar/', 'Calendar', 'Public events shell awaiting provider verification.', 'calendar'],
  ['/newsletter/', 'Newsletter', 'Newsletter signup shell awaiting provider verification.', 'newsletter'],
  ['/about/', 'About', 'About Elkhorn shell awaiting approved business content.', 'about'],
  ['/contact/', 'Contact', 'Contact directory shell awaiting verified department details.', 'contact'],
  ['/privacy/', 'Privacy Policy', 'Existing Elkhorn privacy policy.', 'privacy'],
  ['/terms/', 'Terms of Service', 'Existing Elkhorn terms of service.', 'terms'],
  ['/accessibility/', 'Accessibility', 'Accessibility commitment and contact foundation.', 'accessibility'],
  ['/downloads/', 'Downloads', 'Downloads index awaiting approved accessible files.', 'downloads']
];

const nav = [
  ['/golf/', 'Golf'], ['/tee-times/', 'Tee Times'], ['/grill/', 'Grill'],
  ['/weddings/', 'Weddings'], ['/events/', 'Events'], ['/calendar/', 'Calendar'], ['/contact/', 'Contact']
];

const esc = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const link = (href, label) => `<a href="${href}">${label}</a>`;

function header() {
  return `<a class="skip-link" href="#main-content">Skip to main content</a>
<header class="site-header" data-site-header>
  <div class="shell header-inner">
    <a class="brand" href="/" aria-label="Elkhorn home"><img src="/assets/Elkhorn.png" alt="" width="54" height="54"><span>Elkhorn</span></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation"><span class="sr-only">Toggle navigation</span><span aria-hidden="true">Menu</span></button>
    <nav id="primary-navigation" class="primary-nav" aria-label="Primary navigation">${nav.map(([href, label]) => link(href, label)).join('')}</nav>
    <div class="header-actions"><a class="button button-small" href="/tee-times/">Book a Tee Time</a><a class="button button-small button-outline" href="/events/request-information/">Plan an Event</a></div>
  </div>
</header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="shell footer-grid"><div><a class="footer-brand" href="/">Elkhorn</a><p>Golf, Grill &amp; Events</p></div><nav aria-label="Footer navigation">${link('/about/', 'About')}${link('/gallery/', 'Gallery')}${link('/newsletter/', 'Newsletter')}${link('/downloads/', 'Downloads')}</nav><nav aria-label="Legal navigation">${link('/privacy/', 'Privacy')}${link('/terms/', 'Terms')}${link('/accessibility/', 'Accessibility')}</nav></div><div class="shell footer-bottom"><p>Development shell — business information pending verification.</p></div></footer>`;
}

const placeholderCards = {
  golf: [['Course', '/golf/course/'], ['Rates', '/golf/rates/'], ['Membership', '/golf/membership/'], ['Tournaments', '/golf/tournaments/'], ['Pro Shop', '/golf/pro-shop/'], ['FAQs', '/golf/faqs/']],
  grill: [['Menu', '/grill/menu/'], ['Specials', '/grill/specials/'], ['Reservations', '/grill/reservations/']],
  events: [['Banquets', '/events/banquets/'], ['Corporate Events', '/events/corporate-events/'], ['Celebrations', '/events/celebrations/'], ['Event Spaces', '/events/spaces/'], ['Request Information', '/events/request-information/']],
  gallery: [['Golf', '/gallery/golf/'], ['Grill', '/gallery/grill/'], ['Weddings', '/gallery/weddings/'], ['Events', '/gallery/events/']]
};

function cards(items) {
  return `<section class="section" aria-labelledby="explore-heading"><div class="shell"><h2 id="explore-heading">Explore</h2><div class="card-grid">${items.map(([label, href]) => `<article class="card"><h3>${label}</h3><p>Controlled page shell ready for verified content.</p>${link(href, `View ${label}`)}</article>`).join('')}</div></div></section>`;
}

function eventForm() {
  return `<section class="section"><div class="shell narrow"><h2>Request Event Information</h2><p>This form preserves the current production LeadConnector workflow and consent language.</p>
<form id="eventForm" class="form-stack">
<div class="form-grid"><div><label for="first_name">First Name <span aria-hidden="true">*</span></label><input id="first_name" name="first_name" autocomplete="given-name" required></div><div><label for="last_name">Last Name <span aria-hidden="true">*</span></label><input id="last_name" name="last_name" autocomplete="family-name" required></div></div>
<label for="email">Email <span aria-hidden="true">*</span></label><input id="email" type="email" name="email" autocomplete="email" required>
<label for="phone">Phone <span aria-hidden="true">*</span></label><input id="phone" type="tel" name="phone" autocomplete="tel" required>
<label for="event_type">Event Type</label><select id="event_type" name="event_type"><option>Wedding</option><option>Corporate Event</option><option>Banquet</option><option>Private Party</option><option>Other</option></select>
<label for="event_date">Event Date</label><input id="event_date" type="date" name="event_date">
<label for="guestSlider">Estimated Guest Count: <output id="guestCountValue" for="guestSlider">100</output></label><input id="guestSlider" type="range" min="10" max="500" step="5" value="100" name="guest_count">
<label for="message">Message</label><textarea id="message" name="message" rows="5"></textarea>
<label class="check"><input type="checkbox" name="marketing_sms_consent" value="yes"><span>I consent to receive <strong>marketing text messages</strong>, about special offers, discounts, and service updates, from <strong>Friends of Elkhorn, LLC DBA Elkhorn Grill</strong> at the phone number provided. Message frequency may vary. Message &amp; data rates may apply. Text HELP for assistance, reply STOP to opt out.</span></label>
<label class="check"><input type="checkbox" name="non_marketing_sms_consent" value="yes"><span>I consent to receive <strong>non-marketing text messages</strong> from <strong>Friends of Elkhorn, LLC DBA Elkhorn Grill</strong> about appointment reminders, order updates, or service notifications. Message frequency may vary. Message &amp; data rates may apply. Text HELP for assistance, reply STOP to opt out.</span></label>
<button class="button" type="submit">Check Event Availability</button><p id="formStatus" role="status" aria-live="polite"></p></form></div></section>`;
}

function bodyFor(type) {
  if (placeholderCards[type]) return cards(placeholderCards[type]);
  if (type === 'home') return `<section class="section"><div class="shell"><h2>One destination. Clear paths.</h2><div class="card-grid"><article class="card"><h3>Golf</h3><p>Course, membership, tournaments, and tee-time pathways.</p>${link('/golf/', 'Explore Golf')}</article><article class="card"><h3>Grill</h3><p>Menus, specials, and reservation pathways.</p>${link('/grill/', 'Explore the Grill')}</article><article class="card"><h3>Weddings &amp; Events</h3><p>Planning pathways for gatherings and celebrations.</p>${link('/events/', 'Plan an Event')}</article></div></div></section>`;
  if (type === 'tee-times') return `<section class="section"><div class="shell narrow"><h2>Existing booking experience</h2><p>Tee-time booking remains an external dependency for M1. No booking workflow has been replaced.</p><a class="button" href="https://www.elkhorngc.com/book-a-tee-time/" rel="external">Continue to Tee-Time Booking</a></div></section>`;
  if (type === 'event-form') return eventForm();
  if (type === 'privacy') return `<section class="section"><div class="shell narrow policy-content">${privacyContent}</div></section>`;
  if (type === 'terms') return `<section class="section"><div class="shell narrow policy-content">${termsContent}</div></section>`;
  const inquiryTypes = new Set(['membership', 'tournaments', 'newsletter', 'calendar', 'contact']);
  return `<section class="section"><div class="shell narrow"><h2>Foundation ready</h2><p>${inquiryTypes.has(type) ? 'The integration interface is defined as an inactive placeholder until its provider, routing, consent, and verified content are approved.' : 'This page intentionally contains no unverified pricing, hours, menus, capacities, staff, awards, testimonials, or policies.'}</p><div class="notice" role="note"><strong>Status:</strong> Awaiting verified content and Agent 07 visual direction.</div></div></section>`;
}

function page(route, title, description, type) {
  const canonical = `${siteUrl}${route}`;
  const structured = { '@context': 'https://schema.org', '@type': 'WebPage', name: title, url: canonical, isPartOf: { '@type': 'WebSite', name: 'Elkhorn', url: `${siteUrl}/` } };
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | Elkhorn</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:title" content="${esc(title)} | Elkhorn"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><meta name="twitter:card" content="summary"><link rel="stylesheet" href="/assets/site.css"><script type="application/ld+json">${JSON.stringify(structured).replaceAll('<', '\\u003c')}</script><script src="/assets/site.js" defer></script></head><body>${header()}<main id="main-content"><section class="page-hero"><div class="shell narrow"><p class="eyebrow">Elkhorn Golf, Grill &amp; Events</p><h1>${esc(title)}</h1><p>${esc(description)}</p><div class="cta-row"><a class="button" href="/tee-times/">Book a Tee Time</a><a class="button button-outline-dark" href="/events/request-information/">Plan an Event</a><a class="text-link" href="/grill/">View Hours &amp; Menus</a></div></div></section>${bodyFor(type)}</main>${footer()}</body></html>`;
}

const extractMain = html => html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? '<h2>Policy content unavailable</h2>';
const privacyContent = extractMain(await readFile(join(root, 'privacy.html'), 'utf8'));
const termsContent = extractMain(await readFile(join(root, 'terms.html'), 'utf8'));

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(join(root, 'assets'), join(out, 'assets'), { recursive: true });
await cp(join(root, 'src', 'site.css'), join(out, 'assets', 'site.css'));
await cp(join(root, 'src', 'site.js'), join(out, 'assets', 'site.js'));

for (const route of routes) {
  const file = route[0] === '/' ? join(out, 'index.html') : join(out, route[0], 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page(...route));
}

await cp(join(out, 'privacy', 'index.html'), join(out, 'privacy.html'));
await cp(join(out, 'terms', 'index.html'), join(out, 'terms.html'));
await writeFile(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
await writeFile(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(([route]) => `\n  <url><loc>${siteUrl}${route}</loc></url>`).join('')}\n</urlset>\n`);
console.log(`Built ${routes.length} routes in dist/`);
