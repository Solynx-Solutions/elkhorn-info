import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../dist', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
async function files(dir) { return (await readdir(dir, { withFileTypes: true })).flatMap(entry => entry.isDirectory() ? [] : [join(dir, entry.name)]); }
async function walk(dir) { const entries = await readdir(dir, { withFileTypes: true }); return (await Promise.all(entries.map(e => e.isDirectory() ? walk(join(dir,e.name)) : [join(dir,e.name)]))).flat(); }
const htmlFiles = (await walk(root)).filter(f => f.endsWith('.html'));
const required = ['<html lang="en">', '<title>', 'rel="canonical"', '<main id="main-content">', '<h1>', 'application/ld+json'];
const errors = [];
for (const file of htmlFiles) { const text = await readFile(file, 'utf8'); for (const token of required) if (!text.includes(token)) errors.push(`${file}: missing ${token}`); if (text.includes('target="_blank"') && !text.includes('noopener')) errors.push(`${file}: unsafe blank target`); }
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Validated ${htmlFiles.length} HTML files.`);
