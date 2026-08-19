/**
 * Bakes the markup of every page into its own HTML file in dist/.
 *
 * The app is a client-rendered SPA: without this, a crawler fetching a page
 * gets `<div id="root"></div>` and has to run the JS bundle before it sees any
 * text or images. Run after `vite build` (client) and `vite build --ssr`.
 *
 * Vite only emits dist/index.html. Every other page starts from that same
 * file — same bundle, same inlined stylesheet, same fonts — with its <head>
 * rewritten and its own markup injected. `cleanUrls` in vercel.json turns
 * dist/zenders.html into the path /zenders.
 */

import {readFile, rm, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = path.join(root, 'dist/index.html');
const ssrEntry = path.join(root, 'dist-ssr/entry-server.js');
const PLACEHOLDER = '<div id="root"></div>';
const SITE = 'https://beehoster.pro';

/**
 * De pagina's die uitgebakken worden. `head` is een lijst
 * [zoekpatroon, vervanging]; elk patroon moet precies één keer voorkomen,
 * anders klapt de build eruit in plaats van stilletjes de verkeerde titel
 * of canonical mee te sturen.
 */
const PAGES = [
  {route: '/', file: 'index.html', head: []},
  {
    route: '/zenders',
    file: 'zenders.html',
    head: [
      [
        /<title>[^<]*<\/title>/,
        '<title>Zenderlijst — alle 80.000+ zenders per land | BEEHOSTER</title>',
      ],
      [
        /<meta name="description" content="[^"]*" \/>/,
        '<meta name="description" content="De volledige BEEHOSTER-zenderlijst: 99 categorieën uit meer dan 70 landen, van NPO en RTL tot Ziggo Sport, Eurosport en beIN. Zoek direct op de naam van je zender." />',
      ],
      [/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${SITE}/zenders" />`],
      [
        /<meta property="og:title" content="[^"]*" \/>/,
        '<meta property="og:title" content="Zenderlijst — alle 80.000+ zenders per land | BEEHOSTER" />',
      ],
      [
        /<meta property="og:description" content="[^"]*" \/>/,
        '<meta property="og:description" content="99 categorieën uit meer dan 70 landen. Zoek direct op de naam van je zender." />',
      ],
      [/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${SITE}/zenders" />`],
      [
        /<meta name="twitter:title" content="[^"]*" \/>/,
        '<meta name="twitter:title" content="Zenderlijst — alle 80.000+ zenders per land | BEEHOSTER" />',
      ],
      [
        /<meta name="twitter:description" content="[^"]*" \/>/,
        '<meta name="twitter:description" content="99 categorieën uit meer dan 70 landen. Zoek direct op de naam van je zender." />',
      ],
      /* De FAQ-vragen staan op de homepage, niet hier — dezelfde FAQPage op
         twee URL's zetten is precies het soort dubbele markup waar Google
         over valt. Deze pagina krijgt zijn eigen beschrijving. */
      [
        /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
        `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": "${SITE}/zenders#page",
          "url": "${SITE}/zenders",
          "name": "Zenderlijst — alle zenders per land",
          "description": "De volledige BEEHOSTER-zenderlijst: 99 categorieën uit meer dan 70 landen.",
          "inLanguage": "nl-NL",
          "isPartOf": {"@id": "${SITE}/#website"}
        },
        {
          "@type": "BreadcrumbList",
          "@id": "${SITE}/zenders#breadcrumb",
          "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "${SITE}/"},
            {"@type": "ListItem", "position": 2, "name": "Zenderlijst", "item": "${SITE}/zenders"}
          ]
        }
      ]
    }
    </script>`,
      ],
    ],
  },
];

const {render} = await import(pathToFileURL(ssrEntry).href);
const template = await readFile(htmlPath, 'utf8');

if (!template.includes(PLACEHOLDER)) {
  throw new Error(
    `Could not find ${PLACEHOLDER} in dist/index.html — the mount point moved, ` +
      `so there is nowhere to inject the prerendered markup.`,
  );
}

for (const page of PAGES) {
  const appHtml = render(page.route);

  if (!appHtml || appHtml.length < 500) {
    throw new Error(
      `Prerender of ${page.route} produced only ${appHtml?.length ?? 0} chars of ` +
        `markup — refusing to write a near-empty page over dist/${page.file}.`,
    );
  }

  let html = template;

  for (const [pattern, replacement] of page.head) {
    const matches = html.match(new RegExp(pattern, pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`));
    if (matches?.length !== 1) {
      throw new Error(
        `Head rewrite for ${page.route} matched ${matches?.length ?? 0} times, expected ` +
          `exactly 1: ${pattern}. The template changed — fix scripts/prerender.mjs.`,
      );
    }
    // Function form: a literal `$&` in the replacement must stay literal.
    html = html.replace(pattern, () => replacement);
  }

  await writeFile(
    path.join(root, 'dist', page.file),
    html.replace(PLACEHOLDER, `<div id="root">${appHtml}</div>`),
    'utf8',
  );

  console.log(`prerendered ${page.route} → dist/${page.file}: ${appHtml.length.toLocaleString()} chars`);
}

// The SSR bundle is a build artefact only; nothing should deploy it.
await rm(path.join(root, 'dist-ssr'), {recursive: true, force: true});
