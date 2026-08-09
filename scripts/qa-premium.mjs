import { readFile } from 'node:fs/promises';

const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const home = await read('dist/index.html');
const golf = await read('dist/golf/index.html');
const grill = await read('dist/grill/index.html');
const weddings = await read('dist/weddings/index.html');
const spaces = await read('dist/events/spaces/index.html');
const contact = await read('dist/contact/index.html');
const menu = await read('dist/grill/menu/index.html');
const membership = await read('dist/golf/membership/index.html');
const tournaments = await read('dist/golf/tournaments/index.html');
const calendar = await read('dist/calendar/index.html');
const newsletter = await read('dist/newsletter/index.html');
const css = await read('dist/assets/poc-premium.css');
const clientPages = [home,golf,grill,weddings,spaces,contact,menu,membership,tournaments,calendar,newsletter];
const presentationCopy = clientPages.join('\n');
const internalPhrases = ['The future Elkhorn','A future home','future approved','The concept ','The final menu','The POC intentionally','once the approved','The final site','The finished experience','The final journey','The future signup','The final signup'];
const checks = [
  ['premium stylesheet loads on all core presentation pages', clientPages.every(html => html.includes('/assets/poc-premium.css'))],
  ['homepage hero presents all three conversion actions', ['Book a Tee Time','Plan an Event','View Hours & Menus'].every(label => home.includes(label))],
  ['verified heritage proof is visible', home.includes('Serving Stockton since') && home.includes('1995') && golf.includes('1995')],
  ['homepage adds editorial destination statement', home.includes('Come for the round. Stay for the table. Return for the moments that matter.')],
  ['grill receives occasion-based destination band', grill.includes('Before the round') && grill.includes('After the round') && grill.includes('Beyond golf')],
  ['weddings receives occasion-based editorial band', weddings.includes('Set the tone') && weddings.includes('Make the space your own') && weddings.includes('Keep the day connected')],
  ['event spaces receives occasion-based editorial band', spaces.includes('Set the tone') && spaces.includes('Make the space your own')],
  ['internal concept/future wording removed from presentation copy', internalPhrases.every(text => !presentationCopy.includes(text))],
  ['premium visual language reduces generic card styling', css.includes('border-top:2px solid') && css.includes('border-radius:.35rem') && css.includes('.poc-editorial-intro')],
  ['premium mobile behavior remains dedicated', css.includes('@media(max-width:48rem)') && css.includes('.poc-proof-grid{grid-template-columns:1fr')],
  ['premium pass introduces no external script dependency', !presentationCopy.match(/<script[^>]+src="https?:\/\//)],
  ['verified operational guardrail remains intact', !/\$\s?\d/.test([home,golf,grill,weddings,spaces,contact].join('\n')) && !/\b\d{1,2}:\d{2}\s?(AM|PM)\b/i.test([home,golf,grill,weddings,spaces,contact].join('\n'))]
];
const failures = checks.filter(([,pass]) => !pass);
for (const [name, pass] of checks) console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`);
if (failures.length) process.exit(1);
console.log('PASS premium competitive benchmark QA across Golf, Grill and Weddings/Events presentation journeys.');
