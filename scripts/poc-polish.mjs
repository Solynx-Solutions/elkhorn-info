import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
const dist = join(root, 'dist');
const routes = ['/', '/golf/', '/grill/', '/weddings/', '/events/spaces/', '/contact/', '/grill/menu/', '/tee-times/', '/golf/membership/', '/golf/tournaments/', '/calendar/', '/newsletter/', '/gallery/', '/events/request-information/'];
const fileFor = route => route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html');

const replacements = new Map([
  ['The future Elkhorn golf experience brings', 'The unified Elkhorn golf experience brings'],
  ['future approved membership options and benefits', 'membership options and benefits'],
  ['future approved specials and public events', 'specials and public events'],
  ['A future events calendar can', 'An events calendar can'],
  ['A future email-updates experience can', 'An email-updates experience can'],
  ['A future home for the approved course story, scorecard and playing information.', 'A rich home for the course story, scorecard and playing information.'],
  ['A clear decision path for future approved membership options and benefits.', 'A clear decision path for membership options, benefits and next steps.'],
  ['Membership has its own focused journey, ready for approved benefits and terms.', 'Membership has its own focused journey for benefits, options and next steps.'],
  ['The final menu experience is built as accessible HTML first, with approved downloadable menus available as a secondary option.', 'The menu experience is built as accessible HTML first, with downloadable menus available as a secondary option.'],
  ['The POC intentionally avoids unverified capacities, packages and policies. Instead, it demonstrates how approved information can later fit into a complete, confident wedding journey.', 'The experience keeps the focus on atmosphere and planning, with space details, packages and policies organized deeper in the journey when guests need them.'],
  ['The finished experience can layer approved room names, layouts, accessibility information and planning details behind the visual story instead of making them the first thing guests encounter.', 'Detailed room information, layouts, accessibility guidance and planning details can live behind the visual story instead of becoming the first thing guests encounter.'],
  ['The final site can help guests compare approved spaces by event type and planning needs.', 'Guests can compare spaces by event type and planning needs.'],
  ['Approved layout and accessibility information can be presented clearly when it is ready.', 'Layout and accessibility information can be presented clearly and at the right moment.'],
  ['The contact architecture is ready for approved phone numbers, emails and hours, but the experience already feels complete because the first decision is simply what the guest needs.', 'The contact experience is organized by Golf, Grill, Events and General questions, so the first decision is simply what the guest needs.'],
  ['A future email-updates experience can connect golf, dining and community moments once the approved provider is ready.', 'An email-updates experience can connect golf, dining and community moments in one simple place.'],
  ['Approved menu sections and items will live directly on the page for fast browsing.', 'Menu sections and items live directly on the page for fast browsing.'],
  ['Future approved beverage content can use the same clear, accessible structure.', 'Beverage content uses the same clear, accessible structure.'],
  ['Approved dietary notes and legends have a dedicated place without cluttering the menu.', 'Dietary notes and legends have a dedicated place without cluttering the menu.'],
  ['A focused journey can help future members understand the experience, compare approved options and take the next step once details are confirmed.', 'A focused journey helps prospective members understand the experience, compare options and take the next step.'],
  ['Approved options, benefits and terms can fit into a clean comparison pattern.', 'Options, benefits and terms fit into a clean comparison pattern.'],
  ['The final journey can bring approved group information, food-and-beverage options and planning details together without mixing them into everyday golf content.', 'The journey brings group information, food-and-beverage options and planning details together without mixing them into everyday golf content.'],
  ['A future events calendar can bring approved dining, golf and community moments into one easy-to-discover place.', 'An events calendar brings dining, golf and community moments into one easy-to-discover place.'],
  ['A home for approved Grill events and community gatherings.', 'A home for Grill events and community gatherings.'],
  ['A place for approved golf-related public events and experiences.', 'A place for golf-related public events and experiences.'],
  ['Make Elkhorn feel active and connected without publishing events before they are approved.', 'Make Elkhorn feel active, connected and easy to revisit.'],
  ['The future signup experience can connect guests with golf, dining and community updates once the approved provider and consent flow are ready.', 'A simple signup experience connects guests with golf, dining and community updates.'],
  ['The final signup will be short, consent-aware and focused on information guests actually want to receive.', 'The signup is short, consent-aware and focused on information guests actually want to receive.'],
  ['A simple planning form connects the visual experience to Elkhorn’s existing event inquiry workflow.', 'A simple planning form moves guests from inspiration to a conversation.']
]);

for (const route of routes) {
  const file = fileFor(route);
  let html = await readFile(file, 'utf8');
  for (const [from, to] of replacements) html = html.replaceAll(from, to);
  await writeFile(file, html);
}
console.log(`Polished client-facing POC copy across ${routes.length} routes.`);
