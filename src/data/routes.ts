/* ── Paden ───────────────────────────────────────────────────────────────
   Losse module zonder imports, met opzet: de navigatie en de voettekst
   hebben deze constante nodig, en `src/routes.tsx` — dat de pagina's zelf
   binnenhaalt — ook. Zaten ze in één bestand, dan zou de SSR-bundel een
   kring vormen (routes → App → Navbar → routes) en de constante uitlezen
   voor hij bestaat.
   ────────────────────────────────────────────────────────────────────── */

/** De volledige zenderlijst op zijn eigen pagina. */
export const CHANNELS_PATH = '/zenders';
