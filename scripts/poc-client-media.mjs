import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
const dist = join(root, 'dist');
const assetDir = join(dist, 'assets', 'client');
await mkdir(assetDir, { recursive: true });
await cp(join(root, 'src', 'poc-client-media.css'), join(dist, 'assets', 'poc-client-media.css'));
await cp(join(root, 'src', 'client-media', 'couple-arch.svg'), join(assetDir, 'couple-arch.svg'));
await cp(join(root, 'src', 'client-media', 'reception-long.svg'), join(assetDir, 'reception-long.svg'));

const imageCard = (src, alt, title, label, wide = false) => `<figure class="client-media-card${wide ? ' client-media-card-wide' : ''}"><img src="${src}" alt="${alt}" loading="lazy"><figcaption class="client-media-caption"><strong>${title}</strong><span>${label}</span></figcaption></figure>`;
const mediaBlock = ({ dark = false, kicker, title, copy }) => `<section class="client-media-section${dark ? ' client-media-section-dark' : ''}" data-client-media="true"><div class="poc-shell"><div class="client-media-heading"><div><p class="poc-kicker${dark ? ' poc-kicker-light' : ''}">${kicker}</p><h2>${title}</h2></div><p>${copy}</p></div><div class="client-media-grid">${imageCard('/assets/client/couple-arch.svg','Newlyweds beneath a ceremony arch at Elkhorn','A real Elkhorn moment','Ceremony & portraits')}${imageCard('/assets/client/reception-long.svg','Floral reception table prepared at Elkhorn','Set for the celebration','Reception details',true)}</div><div class="client-media-proof">Client-provided Elkhorn photography</div></div></section>`;

function insertAfterSectionContaining(html, needle, block) {
  const at = html.indexOf(needle);
  if (at < 0) return html;
  const end = html.indexOf('</section>', at);
  if (end < 0) return html;
  const pos = end + '</section>'.length;
  return html.slice(0, pos) + block + html.slice(pos);
}

const pages = [
  ['index.html', 'Weddings &amp; Events', mediaBlock({ kicker:'Real celebrations', title:'This is Elkhorn.', copy:'Actual Elkhorn wedding photography brings the celebration story back to the property itself—ceremony, portraits and reception details in one connected destination.' })],
  [join('weddings','index.html'), 'See the setting', mediaBlock({ dark:true, kicker:'Real weddings at Elkhorn', title:'Picture the day here.', copy:'Use real moments to build confidence before guests ever reach a package, capacity chart or planning form.' })],
  [join('events','spaces','index.html'), 'Business &amp; Groups', mediaBlock({ kicker:'The setting in use', title:'From ceremony to reception.', copy:'The strongest venue story is not an empty room—it is seeing the property become part of the occasion.' })]
];

for (const [relative, needle, block] of pages) {
  const file = join(dist, relative);
  let html = await readFile(file, 'utf8');
  html = html.replace('</head>', '<link rel="stylesheet" href="/assets/poc-client-media.css"></head>');
  html = insertAfterSectionContaining(html, needle, block);
  await writeFile(file, html);
}

const galleryFile = join(dist, 'gallery', 'index.html');
let gallery = await readFile(galleryFile, 'utf8');
gallery = gallery.replace('</head>', '<link rel="stylesheet" href="/assets/poc-client-media.css"></head>');
gallery = gallery.replace('</main>', `${mediaBlock({ kicker:'Celebrate', title:'Real moments, real Elkhorn.', copy:'The gallery can mix broad property imagery with real weddings and event details so each experience feels grounded in place.' })}</main>`);
await writeFile(galleryFile, gallery);

console.log('Integrated client-provided Elkhorn wedding media into homepage, Weddings, Event Spaces, and Gallery.');
