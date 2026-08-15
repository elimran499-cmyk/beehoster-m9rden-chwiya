import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

/**
 * Build-time entry. `scripts/prerender.mjs` calls this to bake the homepage
 * markup into dist/index.html, so a crawler gets the copy, the headings and
 * the poster wall without having to run the bundle first. The client
 * rehydrates that markup instead of discarding it.
 */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
