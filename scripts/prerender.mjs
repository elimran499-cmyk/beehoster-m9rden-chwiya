/**
 * Bakes the homepage markup into dist/index.html.
 *
 * The app is a client-rendered SPA: without this, a crawler fetching the page
 * gets `<div id="root"></div>` and has to run the JS bundle before it sees any
 * text or images. Run after `vite build` (client) and `vite build --ssr`.
 */

import {readFile, rm, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = path.join(root, 'dist/index.html');
const ssrEntry = path.join(root, 'dist-ssr/entry-server.js');
const PLACEHOLDER = '<div id="root"></div>';

const {render} = await import(pathToFileURL(ssrEntry).href);
const appHtml = render();

if (!appHtml || appHtml.length < 500) {
  throw new Error(
    `Prerender produced only ${appHtml?.length ?? 0} chars of markup — refusing ` +
      `to write a near-empty page over dist/index.html.`,
  );
}

const template = await readFile(htmlPath, 'utf8');

if (!template.includes(PLACEHOLDER)) {
  throw new Error(
    `Could not find ${PLACEHOLDER} in dist/index.html — the mount point moved, ` +
      `so there is nowhere to inject the prerendered markup.`,
  );
}

await writeFile(
  htmlPath,
  template.replace(PLACEHOLDER, `<div id="root">${appHtml}</div>`),
  'utf8',
);

// The SSR bundle is a build artefact only; nothing should deploy it.
await rm(path.join(root, 'dist-ssr'), {recursive: true, force: true});

console.log(`prerendered homepage: ${appHtml.length.toLocaleString()} chars of markup`);
