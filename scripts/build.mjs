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
  ['/grill/menu/', 'Menu', 'Menu shell awaiting a verified accessible menu.', 'menu'],
  ['/grill/specials/', 'Specials', 'Specials shell awaiting verified current offers.', 'specials'],
  ['/grill/reservations/', 'Reservations', 'Reservation information shell awaiting verified workflow details.', 'reservations'],
  ['/weddings/', 'Weddings', 'Wedding planning information and inquiry foundation.', 'weddings'],
  ['/events/', 'Events', 'Event planning information foundation.', 'events'],
  ['/events/banquets/', 'Banquets', 'Banquet planning information foundation.', 'events'],
  ['/events/corporate-events/', 'Corporate Events', 'Corporate event planning information foundation.', 'events'],
  ['/events/celebrations/', 'Celebrations', 'Celebration planning information foundation.', 'events'],
  ['/events/spaces/', 'Event Spaces', 'Venue spaces shell awaiting verified capacities and details.', 'venue-spaces'],
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

function journey(type) {
  if (['golf', 'membership', 'tournaments', 'tee-times'].includes(type)) return 'golf';
  if (['grill', 'menu', 'specials', 'reservations'].includes(type)) return 'grill';
  if (['weddings', 'events', 'venue-spaces', 'event-form'].includes(type)) return 'events';
  if (type === 'contact') return 'contact';
  return 'global';
}

const ctaSets = {
  global: [
    ['/tee-times/', 'Book a Tee Time'],
    ['/events/request-information/', 'Plan an Event'],
    ['/grill/menu/', 'View Hours & Menus']
  ],
  golf: [
    ['/tee-times/', 'Book a Tee Time'],
    ['/golf/membership/', 'Explore Membership'],
    ['/golf/tournaments/', 'Plan a Golf Outing']
  ],
  grill: [
    ['/grill/menu/', 'View Hours & Menus'],
    ['/grill/specials/', 'View Specials'],
    ['/grill/reservations/', 'Reservations']
  ],
  events: [
    ['/events/request-information/', 'Plan an Event'],
    ['/events/spaces/', 'Explore Event Spaces'],
    ['/gallery/weddings/', 'View Wedding Gallery']
  ],
  contact: [
    ['/contact/#golf-contact', 'Golf Contact'],
    ['/contact/#grill-contact', 'Grill Contact'],
    ['/contact/#events-contact', 'Events Contact']
  ]
};

function headerActions(type) {
  return ctaSets[journey(type)].slice(0, 2).map(([href, label], index) => `<a class="button button-small${index ? ' button-outline' : ''}" href="${href}">${label}</a>`).join('');
}

function heroActions(type) {
  return ctaSets[journey(type)].map(([href, label], index) => {
    const className = index === 0 ? 'button' : index === 1 ? 'button button-outline-dark' : 'text-link';
    return `<a class="${className}" href="${href}">${label}</a>`;
  }).join('');
}

function header(type, route) {
  const tone = ['grill', 'menu', 'specials', 'reservations', 'contact'].includes(type) ? 'dark' : 'light';
  const navLinks = nav.map(([href, label]) => `<a href="${href}"${route === href ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<a class="skip-link" href="#main-content">Skip to main content</a>
<div class="notice-region" data-notice-region hidden role="status" aria-live="polite"></div>
<header class="site-header" data-site-header data-scroll-tone="${tone}">
  <div class="shell header-inner">
    <a class="brand" href="/" aria-label="Elkhorn home"><img src="/assets/Elkhorn.png" alt="" width="54" height="54"><span>Elkhorn</span></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation"><span class="sr-only">Open navigation</span><span aria-hidden="true">Menu</span></button>
    <div class="drawer-backdrop" data-drawer-backdrop hidden></div>
    <nav id="primary-navigation" class="primary-nav" aria-label="Primary navigation"><button class="drawer-close" type="button"><span aria-hidden="true">Close</span><span class="sr-only">Close navigation</span></button>${navLinks}</nav>
    <div class="header-actions">${headerActions(type)}</div>
  </div>
</header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="shell footer-grid">
  <div><a class="footer-brand" href="/">Elkhorn</a><p>A unified development foundation for golf, dining, weddings, and events.</p><div class="footer-ctas"><a href="/tee-times/">Book a Tee Time</a><a href="/events/request-information/">Plan an Event</a></div></div>
  <nav aria-label="Explore"><strong>Explore</strong>${link('/golf/', 'Golf')}${link('/grill/', 'Grill')}${link('/weddings/', 'Weddings')}${link('/events/', 'Events')}${link('/calendar/', 'Calendar')}</nav>
  <nav aria-label="Visit"><strong>Visit</strong>${link('/tee-times/', 'Tee Times')}${link('/grill/menu/', 'Hours & Menus')}${link('/events/spaces/', 'Event Spaces')}${link('/contact/', 'Contact & Directions')}</nav>
  <nav aria-label="Contact"><strong>Contact</strong><div class="footer-contact-list"><a href="/contact/#golf-contact"><span>Golf</span><strong>Contact</strong></a><a href="/contact/#grill-contact"><span>Grill</span><strong>Contact</strong></a><a href="/contact/#events-contact"><span>Events</span><strong>Contact</strong></a><a href="/contact/#general-contact"><span>General</span><strong>Contact</strong></a></div></nav>
  <nav aria-label="Stay Connected"><strong>Stay Connected</strong>${link('/newsletter/', 'Email Updates')}${link('/gallery/', 'Gallery')}${link('/calendar/', 'Public Events')}${link('/about/', 'About Elkhorn')}</nav>
  </div><div class="shell footer-bottom"><div><p>Development preview — operational details remain subject to verification.</p><div class="footer-utility">${link('/privacy/', 'Privacy')}${link('/terms/', 'Terms')}${link('/accessibility/', 'Accessibility')}${link('/downloads/', 'Downloads')}</div></div><p>Website designed, built &amp; managed by <a href="https://solynx.solutions/" rel="external">SOLYNX</a></p></div></footer>`;
}

const placeholderCards = {
  golf: [['Course', '/golf/course/'], ['Rates', '/golf/rates/'], ['Membership', '/golf/membership/'], ['Tournaments', '/golf/tournaments/'], ['Pro Shop', '/golf/pro-shop/'], ['FAQs', '/golf/faqs/']],
  grill: [['Menu', '/grill/menu/'], ['Specials', '/grill/specials/'], ['Reservations', '/grill/reservations/']],
  events: [['Banquets', '/events/banquets/'], ['Corporate Events', '/events/corporate-events/'], ['Celebrations', '/events/celebrations/'], ['Event Spaces', '/events/spaces/'], ['Request Information', '/events/request-information/']],
  gallery: [['Golf', '/gallery/golf/'], ['Grill', '/gallery/grill/'], ['Weddings', '/gallery/weddings/'], ['Events', '/gallery/events/']]
};

function cards(items, intro = 'Controlled page shell ready for verified content.') {
  return `<section class="section" aria-labelledby="explore-heading"><div class="shell"><h2 id="explore-heading">Explore</h2><div class="card-grid">${items.map(([label, href]) => `<article class="card"><h3>${label}</h3><p>${intro}</p>${link(href, `View ${label}`)}</article>`).join('')}</div></div></section>`;
}

function responsiveMedia({ desktop, mobile = desktop, desktopVideo = '', mobileVideo = '', poster = desktop, alt = '', eager = false }) {
  const fallback = `<picture><source media="(max-width: 40rem)" srcset="${mobile}"><img src="${desktop}" alt="${esc(alt)}" loading="${eager ? 'eager' : 'lazy'}" width="1200" height="800"></picture>`;
  if (!desktopVideo) return fallback;
  return `<div class="responsive-video"><video muted loop playsinline preload="metadata" poster="${poster}" aria-label="${esc(alt)}"><source media="(max-width: 40rem)" src="${mobileVideo || desktopVideo}"><source src="${desktopVideo}"></video><noscript>${fallback}</noscript></div>`;
}

function media({ desktop, mobile = desktop, desktopVideo = '', mobileVideo = '', poster = desktop, alt = '', eyebrow = '', title = '', body = '', href = '', cta = '' }) {
  return `<article class="feature">${responsiveMedia({desktop,mobile,desktopVideo,mobileVideo,poster,alt})}<div class="feature-copy">${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<h2>${title}</h2><p>${body}</p>${href ? `<a class="text-link" href="${href}">${cta}</a>` : ''}</div></article>`;
}

function emptyState(title, body, action = '') {
  return `<div class="empty-state" role="status"><span class="empty-icon" aria-hidden="true">◇</span><h3>${title}</h3><p>${body}</p>${action}</div>`;
}

function homepage() {
  return `<section class="home-hero media-hero" data-hero>
  <picture class="media-poster"><source media="(max-width:40rem)" srcset="/assets/hero.jpg"><img src="/assets/hero.jpg" alt="Golf course landscape at Elkhorn" width="1800" height="1100"></picture>
  <div class="hero-shade"></div><div class="shell hero-copy"><p class="eyebrow">Stockton, California</p><h1>Golf, dining, and gatherings in one destination.</h1><p>Explore the development preview for Elkhorn’s golf, Grill, wedding, and event journeys.</p><div class="cta-row"><a class="button" href="/tee-times/">Book a Tee Time</a><a class="button button-light" href="/events/request-information/">Plan an Event</a></div></div></section>
  <nav class="conversion-rail" aria-label="Quick actions"><div class="shell"><a href="/tee-times/"><span>Play</span><strong>Book a Tee Time</strong></a><a href="/grill/menu/"><span>Gather</span><strong>View Hours &amp; Menus</strong></a><a href="/events/request-information/"><span>Celebrate</span><strong>Plan an Event</strong></a></div></nav>
  <section class="section story-stack" aria-label="Elkhorn experiences"><div class="shell">${media({desktop:'/assets/golf.jpg',alt:'Golf course at Elkhorn',eyebrow:'Golf',title:'A place to play',body:'Elkhorn has operated since December 1995. Explore course, membership, tournament, and booking pathways while operational details are verified.',href:'/golf/',cta:'Explore Golf'})}${media({desktop:'/assets/dining.jpg',alt:'Dining at Elkhorn Grill',eyebrow:'Grill',title:'A place to gather',body:'The Grill journey is structured around accessible menu content, current specials, and reservation guidance without publishing unverified hours or offers.',href:'/grill/',cta:'Explore the Grill'})}${media({desktop:'/assets/events.jpg',alt:'Event setting at Elkhorn',eyebrow:'Weddings & Events',title:'A place to celebrate',body:'Wedding, banquet, celebration, and corporate-event journeys share a clear planning foundation without publishing unverified capacities or packages.',href:'/weddings/',cta:'Explore Weddings & Events'})}</div></section>
  <section class="section section-dark"><div class="shell split"><div><p class="eyebrow">Groups & Outings</p><h2>Corporate events and golf tournaments</h2><p>Dedicated pathways support future verified group experiences and development-only inquiry preparation.</p></div><div class="stacked-actions"><a class="button" href="/events/corporate-events/">Corporate Events</a><a class="button button-light" href="/golf/tournaments/">Golf Tournaments</a></div></div></section>
  <section class="section"><div class="shell two-up"><div><p class="eyebrow">Upcoming Public Events</p><h2>What’s happening</h2>${emptyState('Events are being prepared','Public-event availability has not yet been verified. This space will show approved events when the calendar source is connected.',link('/calendar/','Visit the calendar'))}</div><div><p class="eyebrow">Membership</p><h2>Membership pathway</h2><p>Membership plan models are ready for verified benefits, terms, pricing, and inquiry routing.</p><a class="text-link" href="/golf/membership/">Explore Membership</a></div></div></section>
  <section class="section section-limestone"><div class="shell"><p class="eyebrow">Guest Stories</p><h2>Testimonials</h2>${emptyState('Stories awaiting approval','No testimonial will appear until its wording, attribution, and publishing permission are verified.')}</div></section>
  <section class="section"><div class="shell"><div class="section-heading"><div><p class="eyebrow">Gallery</p><h2>See Elkhorn</h2></div><a class="text-link" href="/gallery/">View Gallery</a></div>${emptyState('Gallery curation in progress','Approved photography will be organized by golf, Grill, weddings, and events.')}</div></section>
  <section class="section contact-band"><div class="shell two-up"><div><p class="eyebrow">Visit</p><h2>Contact and directions</h2><p>Verified phone routing, department emails, and public hours are still being confirmed.</p><a class="button button-outline-dark" href="/contact/">Contact Elkhorn</a></div><div><p class="eyebrow">Email Updates</p><h2>Stay connected</h2><p>The newsletter interface is prepared but remains inactive until its provider and consent flow are approved.</p><a class="button" href="/newsletter/">Email Updates</a></div></div></section>`;
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

function contactGroups() {
  const groups = [
    ['golf-contact', 'Play', 'Golf', 'Direct golf phone, email, hours, and inquiry ownership remain pending verification.', '/golf/', 'Explore Golf'],
    ['grill-contact', 'Gather', 'Grill', 'Direct Grill phone, email, hours, and reservation routing remain pending verification.', '/grill/', 'Explore the Grill'],
    ['events-contact', 'Celebrate', 'Weddings & Events', 'Event-sales phone, email, office hours, and system ownership remain pending verification.', '/events/request-information/', 'Request Event Information'],
    ['general-contact', 'General', 'Elkhorn', 'The primary public number and general inbox remain intentionally unpublished until routing is approved.', '/about/', 'About Elkhorn']
  ];
  return `<div class="contact-groups">${groups.map(([id, eyebrow, title, body, href, cta]) => `<article id="${id}" class="contact-group"><p class="eyebrow">${eyebrow}</p><h3>${title}</h3><p class="pending">${body}</p><a class="text-link" href="${href}">${cta}</a></article>`).join('')}</div>`;
}

function bodyFor(type) {
  if (placeholderCards[type] && !['golf', 'grill', 'gallery'].includes(type)) return cards(placeholderCards[type]);
  if (type === 'home') return homepage();
  if (type === 'tee-times') return `<section class="section"><div class="shell narrow"><p class="eyebrow">Tee Times</p><h2>Existing booking experience preserved</h2><p>Tee-time booking remains an external dependency. No booking workflow has been replaced.</p><a class="button" href="https://www.elkhorngc.com/book-a-tee-time/" rel="external">Continue to Tee-Time Booking</a></div></section>`;
  if (type === 'event-form') return eventForm();
  if (type === 'golf') return `<section class="section"><div class="shell">${media({desktop:'/assets/golf.jpg',alt:'Golf course at Elkhorn',eyebrow:'Golf',title:'A modern home for the golf experience',body:'This exemplar combines photography, course pathways, membership, tournaments, and the preserved external tee-time dependency. Rates and policies remain intentionally empty.',href:'/tee-times/',cta:'Book a Tee Time'})}</div></section>${cards(placeholderCards.golf)}`;
  if (type === 'weddings') return `<section class="section"><div class="shell">${media({desktop:'/assets/events.jpg',alt:'Wedding event setting at Elkhorn',eyebrow:'Weddings',title:'A foundation for meaningful celebrations',body:'This exemplar demonstrates photography-led storytelling, contextual planning actions, and controlled content while packages and capacities await verification.',href:'/events/request-information/',cta:'Plan an Event'})}<div class="card-grid"><article class="card"><h3>Explore the setting</h3><p>Venue-space content is structured for verified room details, accessibility information, and approved imagery.</p>${link('/events/spaces/','Explore Event Spaces')}</article><article class="card"><h3>See the experience</h3><p>Wedding media remains permission-controlled and will appear only after approval.</p>${link('/gallery/weddings/','View Wedding Gallery')}</article><article class="card"><h3>Start planning</h3><p>The existing event inquiry path remains available without replacing downstream production systems.</p>${link('/events/request-information/','Request Information')}</article></div></div></section>`;
  if (type === 'contact') return `<section class="section"><div class="shell"><div class="section-heading"><div><p class="eyebrow">Contact</p><h2>Choose the right Elkhorn path</h2><p>Department routing is separated now so verified phone numbers, emails, and hours can be inserted later without redesigning the page.</p></div></div>${contactGroups()}</div></section>`;
  if (type === 'gallery') return `<section class="section"><div class="shell">${emptyState('Approved photography coming soon','This accessible gallery state contains no invented imagery claims. Media models support category, alt text, focal point, credit, and responsive sources.')}</div></section>`;
  if (type === 'calendar') return `<section class="section"><div class="shell narrow">${emptyState('No verified public events to display','The calendar adapter is development-only and will remain inactive until its provider and event feed are approved.')}</div></section>`;
  if (type === 'privacy') return `<section class="section"><div class="shell narrow policy-content">${privacyContent}</div></section>`;
  if (type === 'terms') return `<section class="section"><div class="shell narrow policy-content">${termsContent}</div></section>`;
  if (type === 'grill') return `<section class="section"><div class="shell">${media({desktop:'/assets/dining.jpg',alt:'Dining table at Elkhorn Grill',eyebrow:'Grill',title:'Warm clubhouse hospitality',body:'This exemplar prioritizes current, accessible HTML menu content and contextual dining actions. Hours, menus, specials, and reservation details remain intentionally unpopulated.',href:'/grill/menu/',cta:'View the Menu Framework'})}<div class="card status-card" data-status="information" role="note"><h3>Operational details stay controlled</h3><p>Hours, menu items, prices, specials, public-access wording, and reservation policies will remain unpublished until management verification is complete.</p></div></div></section>${cards(placeholderCards.grill,'Dining content is ready for verified operational information.')}`;
  if (type === 'menu') return `<section class="section"><div class="shell narrow">${emptyState('Menu details are being verified','The final menu will be published as accessible HTML, with approved downloadable assets offered secondarily.')}</div></section>`;
  if (type === 'specials') return `<section class="section"><div class="shell narrow">${emptyState('No verified specials to display','Offers and promotions will remain empty until their dates, terms, and approval status are confirmed.')}</div></section>`;
  if (type === 'reservations') return `<section class="section"><div class="shell narrow">${emptyState('Reservation details are being verified','No reservation system, phone number, policy, or hours will be published until approved.')}</div></section>`;
  if (type === 'venue-spaces') return `<section class="section"><div class="shell">${media({desktop:'/assets/events.jpg',alt:'Event room setting at Elkhorn',eyebrow:'Event Spaces',title:'A flexible framework for gatherings',body:'This exemplar supports future verified space names, layouts, capacities, accessibility details, and responsive media without inventing those values.',href:'/events/request-information/',cta:'Plan an Event'})}<div class="card-grid"><article class="card"><h3>Space details</h3><p>Names, descriptions, capacities, and sellable configurations require management verification.</p></article><article class="card"><h3>Layouts & accessibility</h3><p>Seating formats, parking, and accessibility details have dedicated fields but remain unpublished.</p></article><article class="card"><h3>Media & tours</h3><p>Photography, video, credits, focal points, and permissions are supported through the media model.</p></article></div></div></section>`;
  if (type === 'membership') return `<section class="section"><div class="shell narrow"><p class="eyebrow">Membership</p><h2>Ready for verified membership details</h2>${emptyState('Membership information is being verified','Plan names, benefits, pricing, terms, and inquiry routing will remain empty until approved.',link('/contact/#golf-contact','Golf contact pathway'))}</div></section>`;
  if (type === 'tournaments') return `<section class="section"><div class="shell narrow"><p class="eyebrow">Golf Tournaments</p><h2>Outing planning foundation</h2>${emptyState('Tournament details are being prepared','Package details, field sizes, policies, and inquiry routing require approval before publication.',link('/contact/#golf-contact','Golf contact pathway'))}</div></section>`;
  if (type === 'newsletter') return `<section class="section"><div class="shell narrow">${emptyState('Email signup is not yet active','The provider, consent language, audience, and data routing must be approved before signup is enabled.')}</div></section>`;
  if (type === 'downloads') return `<section class="section"><div class="shell narrow">${emptyState('No approved downloads yet','Accessible scorecards, menus, packages, and other assets will appear only after review.')}</div></section>`;
  if (type === 'about') return `<section class="section"><div class="shell narrow"><p class="eyebrow">Established destination</p><h2>A shared destination with distinct experiences</h2><p>Elkhorn has operated since December 1995. Final umbrella naming and operating-name presentation remain subject to management approval.</p></div></section>`;
  if (type === 'accessibility') return `<section class="section"><div class="shell narrow"><h2>Accessibility foundation</h2><p>This development site targets WCAG 2.2 AA through semantic structure, keyboard access, visible focus, reduced-motion support, touch-friendly controls, form feedback, and accessible empty states.</p><p>An approved accessibility contact method is still required.</p></div></section>`;
  return `<section class="section"><div class="shell narrow"><h2>Foundation ready</h2><p>This page intentionally contains no unverified pricing, hours, menus, capacities, staff, awards, testimonials, or policies.</p><div class="notice" role="note"><strong>Status:</strong> Awaiting verified content.</div></div></section>`;
}

function page(route, title, description, type) {
  const canonical = `${siteUrl}${route}`;
  const structured = { '@context': 'https://schema.org', '@type': 'WebPage', name: title, url: canonical, isPartOf: { '@type': 'WebSite', name: 'Elkhorn', url: `${siteUrl}/` } };
  const hero = type === 'home' ? '' : `<section class="page-hero"><div class="shell narrow"><p class="eyebrow">Elkhorn</p><h1>${esc(title)}</h1><p>${esc(description)}</p><div class="cta-row">${heroActions(type)}</div></div></section>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#17372E"><title>${esc(title)} | Elkhorn</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:title" content="${esc(title)} | Elkhorn"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><meta name="twitter:card" content="summary"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,500;6..72,600&display=swap" rel="stylesheet"><link rel="stylesheet" href="/assets/site.css"><script type="application/ld+json">${JSON.stringify(structured).replaceAll('<', '\\u003c')}</script><script src="/assets/site.js" defer></script></head><body data-page="${type}">${header(type, route)}<main id="main-content">${hero}${bodyFor(type)}</main>${footer()}</body></html>`;
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
