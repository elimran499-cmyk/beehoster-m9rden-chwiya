import React from 'react';
import App from './App';
import {ChannelsPage} from './pages/ChannelsPage';
import {CHANNELS_PATH} from './data/routes';

/* ── Routes ──────────────────────────────────────────────────────────────
   Twee pagina's, geen router. De site is verder één document; er valt niets
   te navigeren zonder een volledige paginalading, dus een routerbibliotheek
   zou alleen maar bundel kosten. `scripts/prerender.mjs` bakt beide paden
   vooraf uit, en Vercel serveert ze als losse HTML — `cleanUrls` in
   vercel.json maakt van dist/zenders.html het pad /zenders.

   Wie een pad toevoegt raakt drie plekken: hieronder, de PAGES-lijst in
   scripts/prerender.mjs, en public/sitemap.xml.
   ────────────────────────────────────────────────────────────────────── */

/** Welke pagina hoort bij dit pad? Onbekende paden vallen terug op de home. */
export function pageFor(pathname: string): React.ReactElement {
  /* Zowel /zenders als /zenders/ als /zenders.html komen hier binnen: Vercel
     stuurt de laatste twee door naar de eerste, maar de client hydrateert
     wat er in de adresbalk staat op dat moment. */
  const clean = pathname.replace(/\.html$/, '').replace(/\/+$/, '');
  return clean === CHANNELS_PATH ? <ChannelsPage /> : <App />;
}
