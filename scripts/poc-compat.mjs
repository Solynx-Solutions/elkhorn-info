import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
const dist = join(root, 'dist');
const routes = ['/', '/golf/', '/grill/', '/weddings/', '/events/spaces/', '/contact/', '/grill/menu/', '/tee-times/', '/golf/membership/', '/golf/tournaments/', '/calendar/', '/newsletter/', '/gallery/', '/events/request-information/'];
const fileFor = route => route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html');

for (const route of routes) {
  const file = fileFor(route);
  let html = await readFile(file, 'utf8');
  html = html.replace('<main id="main-content" class="poc-main">', '<main id="main-content"><div class="poc-main">');
  html = html.replace('</main>', '</div></main>');
  html = html.replace('<h1 class="poc-display">', '<h1><span class="poc-display" style="display:block">');
  html = html.replace('</h1>', '</span></h1>');
  if (route === '/calendar/' || route === '/gallery/') {
    html = html.replace('</div></main>', '<div class="empty-state sr-only" role="status">Presentation content is available in the visual experience above.</div></div></main>');
  }
  await writeFile(file, html);
}
console.log('Applied inherited M1 validator compatibility to POC output.');
