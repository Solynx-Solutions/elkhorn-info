import { cp, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
const dist = join(root, 'dist');
const poc = JSON.parse(await readFile(join(root, 'config', 'poc.json'), 'utf8'));
const brand = poc.brand;
const media = poc.media;

const a = (href, label, variant = '') => `<a class="poc-button${variant ? ` ${variant}` : ''}" href="${href}">${label}</a>`;
const textLink = (href, label) => `<a class="text-link" href="${href}">${label} →</a>`;
const reveal = content => `<div class="poc-reveal">${content}</div>`;
const picture = (src, alt) => `<picture><img src="${src}" alt="${alt}" width="1600" height="1100" loading="lazy"></picture>`;

function hero({ image, kicker, title, lede, actions = '', short = false, soft = false }) {
  return `<section class="poc-hero${short ? ' poc-hero-short' : ''}" aria-label="${kicker}">
    <div class="poc-hero-media"><img src="${image}" alt="" width="1800" height="1200"></div>
    <div class="poc-hero-overlay${soft ? ' poc-hero-overlay-soft' : ''}"></div>
    <div class="poc-shell poc-hero-content"><p class="poc-kicker poc-kicker-light">${kicker}</p><h1 class="poc-display">${title}</h1><p class="poc-lede">${lede}</p>${actions ? `<div class="poc-actions">${actions}</div>` : ''}</div>
  </section>`;
}

function rail() {
  return `<nav class="poc-rail" aria-label="Explore Elkhorn"><div class="poc-shell poc-rail-grid">
    <a href="/golf/"><span>Play</span><strong>Golf, tee times & outings</strong></a>
    <a href="/grill/"><span>Gather</span><strong>Grill, community & events</strong></a>
    <a href="/weddings/"><span>Celebrate</span><strong>Weddings & private events</strong></a>
  </div></nav>`;
}

function gallery() {
  return `<div class="poc-gallery poc-reveal" aria-label="Elkhorn image gallery">
    <figure>${picture(media.golf, 'Golf course view at Elkhorn')}</figure>
    <figure>${picture(media.grill, 'Dining atmosphere at Elkhorn Grill')}</figure>
    <figure>${picture(media.events, 'Event setting at Elkhorn')}</figure>
    <figure>${picture(media.sunset, 'Elkhorn grounds at sunset')}</figure>
  </div>`;
}

function mobileDock(primaryHref, primaryLabel, secondaryHref, secondaryLabel) {
  return `<nav class="poc-mobile-dock" aria-label="Quick actions"><a href="${primaryHref}">${primaryLabel}</a><a href="${secondaryHref}">${secondaryLabel}</a></nav>`;
}

function homepage() {
  return `<main id="main-content" class="poc-main">
    ${hero({image:media.hero,kicker:brand.name,title:brand.positioning,lede:'One destination for golf, dining, weddings, celebrations and the moments in between.',actions:a('/tee-times/','Book a Tee Time')+a('/events/request-information/','Plan an Event','poc-button-light')})}
    ${rail()}
    <section class="poc-section"><div class="poc-shell poc-grid-2">
      ${reveal(`<div class="poc-copy"><p class="poc-kicker poc-eyebrow-line">Play</p><h2>Make golf the easiest part of the day.</h2><p>The future Elkhorn golf experience brings course discovery, tee times, membership and group outings into one confident path—without making guests hunt across disconnected sites.</p><div class="poc-actions">${a('/golf/','Explore Golf','poc-button-ghost')}${textLink('/golf/tournaments/','Plan a Golf Outing')}</div></div>`)}
      <article class="poc-media-card poc-reveal">${picture(media.golf,'Golf course at Elkhorn')}<div class="poc-media-caption"><p class="poc-kicker">Golf</p><h3>Play your day.</h3><p>Clear choices, strong imagery and a direct path to booking.</p></div></article>
    </div></section>
    <section class="poc-section poc-section-stone"><div class="poc-shell poc-grid-2">
      <article class="poc-media-card poc-reveal">${picture(media.grill,'Dining atmosphere at Elkhorn Grill')}<div class="poc-media-caption"><p class="poc-kicker">Gather</p><h3>The clubhouse table.</h3><p>A warmer, more social Grill experience built around discovery and ease.</p></div></article>
      ${reveal(`<div class="poc-copy"><p class="poc-kicker poc-eyebrow-line">Elkhorn Grill</p><h2>Good food. Easy company. Clubhouse energy.</h2><p>The Grill becomes part of the Elkhorn experience instead of a hidden secondary site—giving guests a natural path to menus, dining information and what is happening around the club.</p><div class="poc-actions">${a('/grill/','Explore the Grill','poc-button-ghost')}${textLink('/grill/menu/','View Hours & Menus')}</div></div>`)}
    </div></section>
    <section class="poc-section poc-section-dark"><div class="poc-shell poc-grid-2">
      ${reveal(`<div class="poc-copy"><p class="poc-kicker poc-kicker-light poc-eyebrow-line">Celebrate</p><h2>Give every event a stronger first impression.</h2><p>Weddings, private celebrations and business gatherings get a visual story worthy of the occasion, with clear paths from inspiration to inquiry.</p><div class="poc-actions">${a('/weddings/','Explore Weddings')}${a('/events/spaces/','Explore Event Spaces','poc-button-light')}</div></div>`)}
      <article class="poc-media-card poc-reveal">${picture(media.events,'Event setting at Elkhorn')}<div class="poc-media-caption"><p class="poc-kicker">Weddings & Events</p><h3>See the possibility.</h3><p>Storytelling first. Planning path second. Friction nowhere.</p></div></article>
    </div></section>
    <section class="poc-section"><div class="poc-shell"><div class="poc-grid-2">
      ${reveal(`<div class="poc-copy"><p class="poc-kicker poc-eyebrow-line">Groups & Outings</p><h2>Two reasons to bring people together.</h2><p>Corporate gatherings and golf tournaments share one flexible destination while keeping their planning journeys distinct.</p></div>`)}
      <div class="poc-card-grid poc-reveal"><article class="poc-card"><span class="poc-number">01</span><h3>Corporate Events</h3><p>Move from idea to event inquiry with a clear view of the experience.</p>${textLink('/events/corporate-events/','Explore Corporate Events')}</article><article class="poc-card"><span class="poc-number">02</span><h3>Golf Tournaments</h3><p>Give organizers one focused path for group golf and outing planning.</p>${textLink('/golf/tournaments/','Explore Tournaments')}</article></div>
    </div></div></section>
    <section class="poc-section poc-section-pine"><div class="poc-shell poc-grid-2">
      ${reveal(`<div class="poc-copy"><p class="poc-kicker poc-kicker-light">Membership</p><h2>Turn interest into a clear next step.</h2><p>A premium membership journey can explain the experience and benefits once approved details are ready—without cluttering the presentation today.</p>${a('/golf/membership/','Explore Membership')}</div>`)}
      ${reveal(`<div class="poc-card poc-card-dark"><p class="poc-kicker poc-kicker-light">Community</p><h3>What’s happening at Elkhorn</h3><p>Public events deserve a discoverable home that can grow into a useful reason for guests to return to the site.</p>${textLink('/calendar/','Explore the Calendar')}</div>`)}
    </div></section>
    <section class="poc-section"><div class="poc-shell"><div class="section-heading poc-reveal"><div><p class="poc-kicker poc-eyebrow-line">Gallery</p><h2>See Elkhorn in a new light.</h2></div>${textLink('/gallery/','Explore the Gallery')}</div>${gallery()}</div></section>
    <section class="poc-section poc-section-stone"><div class="poc-shell poc-grid-2">
      ${reveal(`<div class="poc-copy"><p class="poc-kicker poc-eyebrow-line">Visit & Connect</p><h2>One destination. The right path every time.</h2><p>Golf, Grill, events and general questions are separated clearly so guests can find the experience they need without navigating organizational complexity.</p>${a('/contact/','Contact Elkhorn','poc-button-ghost')}</div>`)}
      ${reveal(`<div class="poc-banner"><p class="poc-kicker poc-kicker-light">Email Updates</p><h2>Stay connected to Elkhorn.</h2><p>Give guests a simple way to hear about future dining, golf and community moments once the approved signup provider is connected.</p>${a('/newsletter/','Email Updates','poc-button-light')}</div>`)}
    </div></section>
  </main>`;
}

function golf() {
  return `<main id="main-content" class="poc-main">
    ${hero({image:media.golf,kicker:'Play · Elkhorn Golf Club',title:'Golf that feels easy from the first click.',lede:'A cleaner journey for tee times, course discovery, membership and group golf—built to get guests where they want to go.',actions:a('/tee-times/','Book a Tee Time')+a('/golf/membership/','Explore Membership','poc-button-light'),short:true})}
    <section class="poc-section"><div class="poc-shell"><div class="poc-card-grid poc-reveal"><article class="poc-card"><span class="poc-number">01</span><h3>Tee Times</h3><p>Move directly into the existing booking experience.</p>${textLink('/tee-times/','Book a Tee Time')}</article><article class="poc-card"><span class="poc-number">02</span><h3>The Course</h3><p>A future home for the approved course story, scorecard and playing information.</p>${textLink('/golf/course/','Explore the Course')}</article><article class="poc-card"><span class="poc-number">03</span><h3>Membership</h3><p>A clear decision path for future approved membership options and benefits.</p>${textLink('/golf/membership/','Explore Membership')}</article><article class="poc-card"><span class="poc-number">04</span><h3>Tournaments</h3><p>A focused experience for organizers planning a golf outing.</p>${textLink('/golf/tournaments/','Plan an Outing')}</article></div></div></section>
    <section class="poc-section poc-section-stone"><div class="poc-shell poc-grid-2"><article class="poc-media-card poc-reveal">${picture(media.sunset,'Elkhorn course landscape')}<div class="poc-media-caption"><h3>A connected golf experience.</h3><p>Less searching. More playing.</p></div></article>${reveal(`<div class="poc-copy"><p class="poc-kicker poc-eyebrow-line">Built around intent</p><h2>Give every golfer a faster path.</h2><p>The concept keeps the strongest actions visible while deeper information stays organized for players, prospective members and outing organizers.</p><div class="poc-detail-list"><details><summary>Planning a round</summary><div class="poc-detail-body">Tee-time booking stays prominent and continues through the existing booking path.</div></details><details><summary>Learning about membership</summary><div class="poc-detail-body">Membership has its own focused journey, ready for approved benefits and terms.</div></details><details><summary>Organizing a group outing</summary><div class="poc-detail-body">Tournament planning is separated from everyday golf so organizers can move with confidence.</div></details></div></div>`)}</div></section>
    <section class="poc-section"><div class="poc-shell">${reveal(`<div class="poc-banner"><p class="poc-kicker poc-kicker-light">Your next round</p><h2>Ready when you are.</h2><p>Continue into Elkhorn’s existing tee-time booking experience.</p><div class="poc-actions">${a('/tee-times/','Book a Tee Time')}${a('/contact/#golf-contact','Golf Contact','poc-button-light')}</div></div>`)}</div></section>
  </main>`;
}

function grill() {
  return `<main id="main-content" class="poc-main">
    ${hero({image:media.grill,kicker:'Gather · Elkhorn Grill',title:'Good food. Easy company. Clubhouse energy.',lede:'A warmer digital experience that makes the Grill feel like an essential part of Elkhorn—not a separate afterthought.',actions:a('/grill/menu/','View Hours & Menus')+a('/calendar/','See What’s Happening','poc-button-light'),short:true,soft:true})}
    <section class="poc-section"><div class="poc-shell poc-grid-2">${reveal(`<div class="poc-copy"><p class="poc-kicker poc-eyebrow-line">The clubhouse table</p><h2>A place to gather before, after and beyond the round.</h2><p>The concept gives dining its own personality while still feeling unmistakably connected to golf, events and the wider Elkhorn community.</p>${a('/grill/menu/','Explore the Menu Experience','poc-button-ghost')}</div>`)}<article class="poc-media-card poc-reveal">${picture(media.grill,'Dining at Elkhorn Grill')}<div class="poc-media-caption"><h3>Warm. Social. Uncomplicated.</h3><p>A restaurant journey designed around appetite and ease.</p></div></article></div></section>
    <section class="poc-section poc-section-dark"><div class="poc-shell"><div class="poc-grid-3 poc-reveal"><article class="poc-card poc-card-dark"><span class="poc-number">01</span><h3>Discover</h3><p>Put menus and dining information where guests naturally expect them.</p></article><article class="poc-card poc-card-dark"><span class="poc-number">02</span><h3>Gather</h3><p>Connect the Grill to golf, events and community moments across Elkhorn.</p></article><article class="poc-card poc-card-dark"><span class="poc-number">03</span><h3>Return</h3><p>Create reasons to come back through future approved specials and public events.</p></article></div></div></section>
    <section class="poc-section"><div class="poc-shell">${reveal(`<div class="poc-banner"><p class="poc-kicker poc-kicker-light">Menus & dining</p><h2>Designed to make choosing easy.</h2><p>The final menu experience is built as accessible HTML first, with approved downloadable menus available as a secondary option.</p><div class="poc-actions">${a('/grill/menu/','View Hours & Menus')}${a('/contact/#grill-contact','Grill Contact','poc-button-light')}</div></div>`)}</div></section>
  </main>`;
}

function weddings() {
  return `<main id="main-content" class="poc-main">
    ${hero({image:media.events,kicker:'Celebrate · Weddings at Elkhorn',title:'A setting for the moments people remember.',lede:'A wedding experience built to inspire first, make planning feel simple second, and lead naturally into a conversation.',actions:a('/events/request-information/','Plan an Event')+a('/events/spaces/','Explore Event Spaces','poc-button-light'),short:true})}
    <section class="poc-section"><div class="poc-shell"><div class="poc-grid-3 poc-reveal"><article class="poc-card"><span class="poc-number">01</span><h3>See the setting</h3><p>Lead with atmosphere, photography and a clear sense of place.</p></article><article class="poc-card"><span class="poc-number">02</span><h3>Imagine the flow</h3><p>Help couples understand how different parts of their day can come together.</p></article><article class="poc-card"><span class="poc-number">03</span><h3>Start the conversation</h3><p>Make the planning path visible without burying guests in operational detail.</p></article></div></div></section>
    <section class="poc-section poc-section-stone"><div class="poc-shell poc-grid-2"><article class="poc-media-card poc-reveal">${picture(media.sunset,'Elkhorn grounds during golden hour')}<div class="poc-media-caption"><h3>Let the experience lead.</h3><p>Premium storytelling turns curiosity into a planning conversation.</p></div></article>${reveal(`<div class="poc-copy"><p class="poc-kicker poc-eyebrow-line">Your celebration</p><h2>Show possibility without inventing details.</h2><p>The POC intentionally avoids unverified capacities, packages and policies. Instead, it demonstrates how approved information can later fit into a complete, confident wedding journey.</p><div class="poc-actions">${a('/events/spaces/','Explore Event Spaces','poc-button-ghost')}${textLink('/gallery/weddings/','Wedding Gallery')}</div></div>`)}</div></section>
    <section class="poc-section"><div class="poc-shell">${reveal(`<div class="poc-banner"><p class="poc-kicker poc-kicker-light">Begin planning</p><h2>Tell us what you’re imagining.</h2><p>One clear inquiry path connects inspiration to the existing Elkhorn event workflow.</p>${a('/events/request-information/','Plan an Event')}</div>`)}</div></section>
  </main>`;
}

function spaces() {
  return `<main id="main-content" class="poc-main">
    ${hero({image:media.sunset,kicker:'Celebrate · Event Spaces',title:'Spaces that adapt to the occasion.',lede:'A visual-first way to explore how Elkhorn can support weddings, private celebrations and business gatherings—without overloading guests with details.',actions:a('/events/request-information/','Plan an Event')+a('/weddings/','Explore Weddings','poc-button-light'),short:true})}
    <section class="poc-section"><div class="poc-shell"><div class="poc-card-grid poc-reveal"><article class="poc-card"><h3>Weddings</h3><p>A setting-led path for couples imagining ceremony, reception and celebration moments.</p>${textLink('/weddings/','Explore Weddings')}</article><article class="poc-card"><h3>Celebrations</h3><p>A flexible path for private occasions that keeps planning simple and visual.</p>${textLink('/events/celebrations/','Explore Celebrations')}</article><article class="poc-card"><h3>Business & Groups</h3><p>A focused journey for organizations bringing people together.</p>${textLink('/events/corporate-events/','Explore Corporate Events')}</article></div></div></section>
    <section class="poc-section poc-section-dark"><div class="poc-shell"><div class="section-heading poc-reveal"><div><p class="poc-kicker poc-kicker-light poc-eyebrow-line">Look & Feel</p><h2>Let the spaces speak visually.</h2></div></div>${gallery()}</div></section>
    <section class="poc-section"><div class="poc-shell poc-grid-2">${reveal(`<div class="poc-copy"><p class="poc-kicker poc-eyebrow-line">Plan with confidence</p><h2>Details when they matter. Inspiration first.</h2><p>The finished experience can layer approved room names, layouts, accessibility information and planning details behind the visual story instead of making them the first thing guests encounter.</p></div>`)}${reveal(`<div class="poc-detail-list"><details><summary>Finding the right setting</summary><div class="poc-detail-body">The final site can help guests compare approved spaces by event type and planning needs.</div></details><details><summary>Understanding the flow</summary><div class="poc-detail-body">Approved layout and accessibility information can be presented clearly when it is ready.</div></details><details><summary>Starting a conversation</summary><div class="poc-detail-body">Every event-space path leads naturally to the existing inquiry workflow.</div></details></div>`)}</div></section>
  </main>`;
}

function contact() {
  return `<main id="main-content" class="poc-main">
    ${hero({image:media.sunset,kicker:'Visit · Connect',title:'Find the right Elkhorn path.',lede:'One unified destination means guests should never have to guess who to contact. Choose the experience and move forward from there.',actions:a('/tee-times/','Book a Tee Time')+a('/events/request-information/','Plan an Event','poc-button-light'),short:true})}
    <section class="poc-section"><div class="poc-shell"><div class="poc-contact-paths poc-reveal"><a class="poc-contact-path" href="/contact/#golf-contact"><span>Play</span><strong>Golf</strong><p>Tee times, course questions, membership and outings.</p><b>Golf path →</b></a><a class="poc-contact-path" href="/contact/#grill-contact"><span>Gather</span><strong>Grill</strong><p>Dining, menus and Grill-related questions.</p><b>Grill path →</b></a><a class="poc-contact-path" href="/events/request-information/"><span>Celebrate</span><strong>Events</strong><p>Weddings, celebrations and group-event planning.</p><b>Plan an event →</b></a><a class="poc-contact-path" href="/contact/#general-contact"><span>General</span><strong>Elkhorn</strong><p>Start here when your question spans more than one experience.</p><b>General path →</b></a></div></div></section>
    <section class="poc-section poc-section-stone"><div class="poc-shell poc-grid-2">${reveal(`<div class="poc-copy"><p class="poc-kicker poc-eyebrow-line">One destination</p><h2>Organized around guests, not departments.</h2><p>The contact architecture is ready for approved phone numbers, emails and hours, but the experience already feels complete because the first decision is simply what the guest needs.</p></div>`)}${reveal(`<div class="poc-banner"><p class="poc-kicker poc-kicker-light">Stay connected</p><h2>Keep Elkhorn close.</h2><p>A future email-updates experience can connect golf, dining and community moments once the approved provider is ready.</p>${a('/newsletter/','Email Updates','poc-button-light')}</div>`)}</div></section>
  </main>`;
}

function menu() {
  return `<main id="main-content" class="poc-main">${hero({image:media.grill,kicker:'Elkhorn Grill · Menu',title:'A menu experience made for the screen.',lede:'Accessible HTML-first menus make dining information easier to read, easier to update and easier to discover on mobile.',actions:a('/grill/','Explore the Grill')+a('/contact/#grill-contact','Grill Contact','poc-button-light'),short:true,soft:true})}<section class="poc-section"><div class="poc-shell"><div class="poc-grid-3 poc-reveal"><article class="poc-card"><h3>Food</h3><p>Approved menu sections and items will live directly on the page for fast browsing.</p></article><article class="poc-card"><h3>Drinks</h3><p>Future approved beverage content can use the same clear, accessible structure.</p></article><article class="poc-card"><h3>Dietary details</h3><p>Approved dietary notes and legends have a dedicated place without cluttering the menu.</p></article></div></div></section></main>`;
}

function teeTimes() {
  return `<main id="main-content" class="poc-main">${hero({image:media.golf,kicker:'Elkhorn Golf · Tee Times',title:'From Elkhorn to the tee sheet in one clear move.',lede:'The unified site keeps booking visible while preserving Elkhorn’s existing external tee-time experience.',actions:a('https://www.elkhorngc.com/book-a-tee-time/','Continue to Tee-Time Booking')+a('/golf/','Explore Golf','poc-button-light'),short:true})}<section class="poc-section"><div class="poc-shell">${reveal(`<div class="poc-banner"><p class="poc-kicker poc-kicker-light">Booking preserved</p><h2>The experience improves without replacing the system behind it.</h2><p>Guests get a clear handoff into the existing booking path, while Elkhorn keeps the current booking dependency intact.</p>${a('https://www.elkhorngc.com/book-a-tee-time/','Book a Tee Time')}</div>`)}</div></section></main>`;
}

function membership() {
  return `<main id="main-content" class="poc-main">${hero({image:media.golf,kicker:'Elkhorn Golf · Membership',title:'Membership deserves its own story.',lede:'A focused journey can help future members understand the experience, compare approved options and take the next step once details are confirmed.',actions:a('/contact/#golf-contact','Membership Interest')+a('/golf/','Explore Golf','poc-button-light'),short:true})}<section class="poc-section"><div class="poc-shell"><div class="poc-grid-3 poc-reveal"><article class="poc-card"><span class="poc-number">01</span><h3>Discover</h3><p>Lead with the member experience rather than a wall of terms.</p></article><article class="poc-card"><span class="poc-number">02</span><h3>Compare</h3><p>Approved options, benefits and terms can fit into a clean comparison pattern.</p></article><article class="poc-card"><span class="poc-number">03</span><h3>Connect</h3><p>Give interested golfers one clear contact path.</p></article></div></div></section></main>`;
}

function tournaments() {
  return `<main id="main-content" class="poc-main">${hero({image:media.golf,kicker:'Elkhorn Golf · Tournaments',title:'A better first step for every golf outing.',lede:'Give organizers a focused place to understand the experience, shape the outing and start the planning conversation.',actions:a('/contact/#golf-contact','Plan a Golf Outing')+a('/golf/','Explore Golf','poc-button-light'),short:true})}<section class="poc-section"><div class="poc-shell poc-grid-2">${reveal(`<div class="poc-copy"><p class="poc-kicker poc-eyebrow-line">Group golf</p><h2>Built around the organizer.</h2><p>The final journey can bring approved group information, food-and-beverage options and planning details together without mixing them into everyday golf content.</p></div>`)}<article class="poc-media-card poc-reveal">${picture(media.golf,'Golf outing setting at Elkhorn')}<div class="poc-media-caption"><h3>Bring the group together.</h3><p>A dedicated planning path for outings and tournaments.</p></div></article></div></section></main>`;
}

function calendar() {
  return `<main id="main-content" class="poc-main">${hero({image:media.sunset,kicker:'Gather · What’s Happening',title:'Give guests a reason to come back.',lede:'A future events calendar can bring approved dining, golf and community moments into one easy-to-discover place.',actions:a('/grill/','Explore the Grill')+a('/newsletter/','Email Updates','poc-button-light'),short:true})}<section class="poc-section"><div class="poc-shell"><div class="poc-card-grid poc-reveal"><article class="poc-card"><h3>Dining moments</h3><p>A home for approved Grill events and community gatherings.</p></article><article class="poc-card"><h3>Golf moments</h3><p>A place for approved golf-related public events and experiences.</p></article><article class="poc-card"><h3>Community moments</h3><p>Make Elkhorn feel active and connected without publishing events before they are approved.</p></article></div></div></section></main>`;
}

function newsletter() {
  return `<main id="main-content" class="poc-main">${hero({image:media.sunset,kicker:'Stay Connected',title:'Keep Elkhorn in the conversation.',lede:'The future signup experience can connect guests with golf, dining and community updates once the approved provider and consent flow are ready.',actions:a('/','Explore Elkhorn')+a('/contact/','Contact','poc-button-light'),short:true})}<section class="poc-section"><div class="poc-shell">${reveal(`<div class="poc-banner"><p class="poc-kicker poc-kicker-light">Email Updates</p><h2>Simple by design.</h2><p>The final signup will be short, consent-aware and focused on information guests actually want to receive.</p></div>`)}</div></section></main>`;
}

function galleryPage() {
  return `<main id="main-content" class="poc-main">${hero({image:media.hero,kicker:'See Elkhorn',title:'One destination. Many ways to experience it.',lede:'A visual gallery brings golf, dining, weddings and events together while preserving a distinct personality for each experience.',actions:a('/golf/','Explore Golf')+a('/weddings/','Explore Weddings','poc-button-light'),short:true})}<section class="poc-section"><div class="poc-shell">${gallery()}</div></section></main>`;
}

function eventInquiry(existingHtml) {
  const form = existingHtml.match(/<form id="eventForm"[\s\S]*?<\/form>/)?.[0] ?? '';
  return `<main id="main-content" class="poc-main">${hero({image:media.events,kicker:'Plan an Event',title:'Tell us what you’re imagining.',lede:'A simple planning form connects the visual experience to Elkhorn’s existing event inquiry workflow.',actions:a('/events/spaces/','Explore Event Spaces')+a('/weddings/','Explore Weddings','poc-button-light'),short:true})}<section class="poc-section"><div class="poc-shell poc-grid-2">${reveal(`<div class="poc-copy"><p class="poc-kicker poc-eyebrow-line">Start the conversation</p><h2>Share the shape of your event.</h2><p>Keep the first step easy. Elkhorn can follow up on the details after the initial inquiry.</p><div class="poc-card"><h3>Planning path</h3><p>Weddings, business gatherings, banquets and private celebrations all use one clear inquiry experience.</p></div></div>`)}<div class="poc-card poc-reveal">${form}</div></div></section></main>`;
}

const renderers = new Map([
  ['/', homepage], ['/golf/', golf], ['/grill/', grill], ['/weddings/', weddings], ['/events/spaces/', spaces], ['/contact/', contact],
  ['/grill/menu/', menu], ['/tee-times/', teeTimes], ['/golf/membership/', membership], ['/golf/tournaments/', tournaments], ['/calendar/', calendar], ['/newsletter/', newsletter], ['/gallery/', galleryPage]
]);

const dockFor = new Map([
  ['/', ['/tee-times/','Book a Tee Time','/events/request-information/','Plan an Event']],
  ['/golf/', ['/tee-times/','Book a Tee Time','/golf/membership/','Membership']],
  ['/grill/', ['/grill/menu/','View Menus','/contact/#grill-contact','Contact']],
  ['/weddings/', ['/events/request-information/','Plan an Event','/events/spaces/','Spaces']],
  ['/events/spaces/', ['/events/request-information/','Plan an Event','/weddings/','Weddings']],
  ['/contact/', ['/events/request-information/','Plan an Event','/tee-times/','Tee Times']],
  ['/grill/menu/', ['/grill/','The Grill','/contact/#grill-contact','Contact']],
  ['/tee-times/', ['https://www.elkhorngc.com/book-a-tee-time/','Book a Tee Time','/golf/','Golf']],
  ['/golf/membership/', ['/contact/#golf-contact','Membership Interest','/golf/','Golf']],
  ['/golf/tournaments/', ['/contact/#golf-contact','Plan an Outing','/golf/','Golf']],
  ['/calendar/', ['/grill/','Explore Grill','/newsletter/','Updates']],
  ['/newsletter/', ['/','Explore Elkhorn','/contact/','Contact']],
  ['/gallery/', ['/golf/','Explore Golf','/weddings/','Weddings']],
  ['/events/request-information/', ['/events/request-information/','Plan an Event','/events/spaces/','Spaces']]
]);

function fileFor(route) {
  return route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html');
}

await cp(join(root, 'src', 'poc.css'), join(dist, 'assets', 'poc.css'));
await cp(join(root, 'src', 'poc.js'), join(dist, 'assets', 'poc.js'));

for (const [route, renderer] of renderers) {
  const file = fileFor(route);
  let html = await readFile(file, 'utf8');
  html = html.replace(/<main id="main-content">[\s\S]*?<\/main>/, renderer());
  html = html.replace('</head>', '<link rel="stylesheet" href="/assets/poc.css"></head>');
  html = html.replace('<body ', '<body data-poc="client-concept" ');
  html = html.replace('<script src="/assets/site.js" defer></script>', '<script src="/assets/site.js" defer></script><script src="/assets/poc.js" defer></script>');
  html = html.replace('Development preview — operational details remain subject to verification.', 'Play. Gather. Celebrate.');
  const dock = dockFor.get(route);
  if (dock) html = html.replace('</body>', `${mobileDock(...dock)}</body>`);
  await writeFile(file, html);
}

{
  const route = '/events/request-information/';
  const file = fileFor(route);
  let html = await readFile(file, 'utf8');
  const main = eventInquiry(html);
  html = html.replace(/<main id="main-content">[\s\S]*?<\/main>/, main);
  html = html.replace('</head>', '<link rel="stylesheet" href="/assets/poc.css"></head>');
  html = html.replace('<body ', '<body data-poc="client-concept" ');
  html = html.replace('<script src="/assets/site.js" defer></script>', '<script src="/assets/site.js" defer></script><script src="/assets/poc.js" defer></script>');
  html = html.replace('Development preview — operational details remain subject to verification.', 'Play. Gather. Celebrate.');
  html = html.replace('</body>', `${mobileDock(...dockFor.get(route))}</body>`);
  await writeFile(file, html);
}

console.log(`Applied client-facing POC presentation layer to ${renderers.size + 1} routes.`);
