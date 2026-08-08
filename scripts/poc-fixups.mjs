import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
const dist = join(root, 'dist');
const fileFor = route => route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html');

for (const route of ['/', '/golf/', '/tee-times/']) {
  const file = fileFor(route);
  let html = await readFile(file, 'utf8');
  html = html.replaceAll('href="https://www.elkhorngc.com/book-a-tee-time/"', 'href="https://www.elkhorngc.com/book-a-tee-time/" rel="external"');
  await writeFile(file, html);
}

{
  const file = fileFor('/contact/');
  let html = await readFile(file, 'utf8');
  html = html.replace('<a class="poc-contact-path" href="/contact/#golf-contact">', '<a id="golf-contact" class="poc-contact-path" href="/golf/">');
  html = html.replace('<a class="poc-contact-path" href="/contact/#grill-contact">', '<a id="grill-contact" class="poc-contact-path" href="/grill/">');
  html = html.replace('<a class="poc-contact-path" href="/events/request-information/">', '<a id="events-contact" class="poc-contact-path" href="/events/request-information/">');
  html = html.replace('<a class="poc-contact-path" href="/contact/#general-contact">', '<a id="general-contact" class="poc-contact-path" href="/about/">');
  await writeFile(file, html);
}

{
  const file = fileFor('/events/request-information/');
  let html = await readFile(file, 'utf8');
  html = html.replace('<nav class="poc-mobile-dock" aria-label="Quick actions"><a href="/events/request-information/">Plan an Event</a>', '<nav class="poc-mobile-dock" aria-label="Quick actions"><a href="#eventForm">Event Form</a>');
  await writeFile(file, html);
}

console.log('Applied POC routing and external-link presentation fixups.');
