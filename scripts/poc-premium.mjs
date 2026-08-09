import { cp, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
const dist = join(root, 'dist');
const routes = ['/', '/golf/', '/grill/', '/weddings/', '/events/spaces/', '/contact/', '/grill/menu/', '/tee-times/', '/golf/membership/', '/golf/tournaments/', '/calendar/', '/newsletter/', '/gallery/', '/events/request-information/'];
const fileFor = route => route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html');

await cp(join(root, 'src', 'poc-premium.css'), join(dist, 'assets', 'poc-premium.css'));

const replacements = new Map([
  ['One destination for golf, dining, weddings, celebrations and the moments in between.', 'A Stockton destination built around the round, the table and the celebration.'],
  ['The future Elkhorn golf experience brings course discovery, tee times, membership and group outings into one confident path—without making guests hunt across disconnected sites.', 'Course discovery, tee times, membership and group outings come together in one confident path—so the day starts with golf, not searching.'],
  ['The Grill becomes part of the Elkhorn experience instead of a hidden secondary site—giving guests a natural path to menus, dining information and what is happening around the club.', 'The Grill sits at the heart of the Elkhorn experience, with a natural path to menus, dining information and what is happening around the club.'],
  ['A premium membership journey can explain the experience and benefits once approved details are ready—without cluttering the presentation today.', 'Membership deserves a focused journey built around belonging, play and the Elkhorn community.'],
  ['Public events deserve a discoverable home that can grow into a useful reason for guests to return to the site.', 'Golf, dining and community moments give guests another reason to return to Elkhorn.'],
  ['Give guests a simple way to hear about future dining, golf and community moments once the approved signup provider is connected.', 'Give guests a simple way to stay close to dining, golf and community moments at Elkhorn.'],
  ['A future home for the approved course story, scorecard and playing information.', 'A clear home for the course story, scorecard and playing information.'],
  ['A clear decision path for future approved membership options and benefits.', 'A clear decision path for membership options and benefits.'],
  ['The concept keeps the strongest actions visible while deeper information stays organized for players, prospective members and outing organizers.', 'The strongest actions stay visible while deeper information remains organized for players, prospective members and outing organizers.'],
  ['Membership has its own focused journey, ready for approved benefits and terms.', 'Membership has its own focused journey for benefits, options and the next conversation.'],
  ['The concept gives dining its own personality while still feeling unmistakably connected to golf, events and the wider Elkhorn community.', 'Dining has its own personality while still feeling unmistakably connected to golf, events and the wider Elkhorn community.'],
  ['Create reasons to come back through future approved specials and public events.', 'Create reasons to come back through specials, public events and community moments.'],
  ['The final menu experience is built as accessible HTML first, with approved downloadable menus available as a secondary option.', 'Menus are designed as accessible HTML first, with downloadable versions available as a convenient secondary option.'],
  ['Show possibility without inventing details.', 'Let the setting do the talking.'],
  ['The POC intentionally avoids unverified capacities, packages and policies. Instead, it demonstrates how approved information can later fit into a complete, confident wedding journey.', 'Lead with the feeling of the day, then make every planning step easy to find when guests are ready for details.'],
  ['The finished experience can layer approved room names, layouts, accessibility information and planning details behind the visual story instead of making them the first thing guests encounter.', 'Room details, layouts and planning information sit naturally behind the visual story, ready when guests want to go deeper.'],
  ['The final site can help guests compare approved spaces by event type and planning needs.', 'Guests can compare spaces by occasion and planning needs without losing the sense of place.'],
  ['Approved layout and accessibility information can be presented clearly when it is ready.', 'Layout and accessibility information can be presented clearly at the point it becomes useful.'],
  ['The contact architecture is ready for approved phone numbers, emails and hours, but the experience already feels complete because the first decision is simply what the guest needs.', 'The first decision is simply what the guest needs—Golf, Grill, Events or General—and the right contact path follows from there.'],
  ['A future email-updates experience can connect golf, dining and community moments once the approved provider is ready.', 'Email updates can keep golf, dining and community moments connected in one place.'],
  ['Approved menu sections and items will live directly on the page for fast browsing.', 'Menu sections and items live directly on the page for fast browsing on any device.'],
  ['Future approved beverage content can use the same clear, accessible structure.', 'Beverage selections use the same clear, accessible structure.'],
  ['Approved dietary notes and legends have a dedicated place without cluttering the menu.', 'Dietary notes and legends have a dedicated place without cluttering the menu.'],
  ['A focused journey can help future members understand the experience, compare approved options and take the next step once details are confirmed.', 'A focused journey helps prospective members understand the experience, compare options and take the next step.'],
  ['Approved options, benefits and terms can fit into a clean comparison pattern.', 'Options, benefits and terms fit into a clean comparison pattern.'],
  ['The final journey can bring approved group information, food-and-beverage options and planning details together without mixing them into everyday golf content.', 'Group information, food-and-beverage options and planning details belong together in a dedicated outing journey.'],
  ['A future events calendar can bring approved dining, golf and community moments into one easy-to-discover place.', 'Dining, golf and community moments belong in one easy-to-discover calendar.'],
  ['A home for approved Grill events and community gatherings.', 'A home for Grill events and community gatherings.'],
  ['A place for approved golf-related public events and experiences.', 'A place for golf-related public events and experiences.'],
  ['Make Elkhorn feel active and connected without publishing events before they are approved.', 'Make Elkhorn feel active, current and connected.'],
  ['The future signup experience can connect guests with golf, dining and community updates once the approved provider and consent flow are ready.', 'A simple signup experience can connect guests with golf, dining and community updates.'],
  ['The final signup will be short, consent-aware and focused on information guests actually want to receive.', 'Keep signup short, clear and focused on information guests actually want to receive.']
]);

const proof = `<section class="poc-proof" aria-label="Elkhorn heritage"><div class="poc-shell poc-proof-grid"><div class="poc-proof-mark"><span>Serving Stockton since</span><strong>1995</strong></div><p class="poc-proof-copy">One property, three distinct experiences: a round worth playing, a clubhouse worth gathering around and a setting made for celebrations.</p><div class="poc-proof-links"><a href="/golf/">Play</a><a href="/grill/">Gather</a><a href="/weddings/">Celebrate</a></div></div></section>`;
const editorial = `<section class="poc-editorial-intro"><div class="poc-shell"><p class="poc-kicker poc-eyebrow-line">One Elkhorn</p><blockquote>Come for the round. Stay for the table. Return for the moments that matter.</blockquote></div></section>`;
const grillBand = `<div class="poc-destination-band" aria-label="Grill occasions"><div><span>Before the round</span><strong>Easy clubhouse gathering</strong></div><div><span>After the round</span><strong>Stay for the table</strong></div><div><span>Beyond golf</span><strong>A place for the community</strong></div></div>`;
const weddingBand = `<div class="poc-destination-band" aria-label="Wedding journey"><div><span>Arrive</span><strong>Set the tone</strong></div><div><span>Celebrate</span><strong>Make the space your own</strong></div><div><span>Gather</span><strong>Keep the day connected</strong></div></div>`;

for (const route of routes) {
  const file = fileFor(route);
  let html = await readFile(file, 'utf8');
  html = html.replace('</head>', '<link rel="stylesheet" href="/assets/poc-premium.css"></head>');
  for (const [from, to] of replacements) html = html.split(from).join(to);
  html = html
    .replace(/\bfuture members\b/gi, 'prospective members')
    .replace(/\bfuture\s+/gi, '')
    .replace(/\bapproved\s+/gi, '')
    .replace(/\bfinal\s+/gi, '')
    .replace(/\bthe concept\b/gi, 'the experience')
    .replace(/\bthe POC\b/gi, 'the experience')
    .replace(/\bfinished experience\b/gi, 'experience');
  if (route === '/') {
    html = html.replace(/(<section class="poc-hero[\s\S]*?<div class="poc-actions">)([\s\S]*?)(<\/div>)/, (_, start, actions, end) => `${start}${actions}<a class="poc-button poc-button-light" href="/grill/menu/">View Hours & Menus</a>${end}`);
    html = html.replace('</nav>', `</nav>${proof}${editorial}`);
  }
  if (route === '/golf/') html = html.replace('</section>', `</section>${proof}`);
  if (route === '/grill/') html = html.replace('</section>', `</section>${grillBand}`);
  if (route === '/weddings/') html = html.replace('</section>', `</section>${weddingBand}`);
  if (route === '/events/spaces/') html = html.replace('</section>', `</section>${weddingBand}`);
  await writeFile(file, html);
}
console.log('Applied premium competitive benchmark pass across the 14 client-facing POC routes.');
