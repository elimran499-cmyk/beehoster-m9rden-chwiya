import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import {pageFor} from './routes';

/**
 * Build-time entry. `scripts/prerender.mjs` calls this once per pad en bakt
 * de markup in de bijbehorende HTML, zodat een crawler de tekst, de koppen
 * en de posterwand krijgt zonder eerst de bundel te draaien. De client
 * hydrateert die markup in plaats van hem weg te gooien.
 */
export function render(pathname = '/'): string {
  return renderToString(
    <StrictMode>
      {pageFor(pathname)}
    </StrictMode>,
  );
}
