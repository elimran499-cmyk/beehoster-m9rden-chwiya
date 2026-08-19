import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {pageFor} from './routes.tsx';
import './index.css';
import {trackConversions} from './conversions';

// Counts WhatsApp and order CTA clicks as Google Ads conversions.
trackConversions();

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    {pageFor(window.location.pathname)}
  </StrictMode>
);

// A production build ships prerendered markup inside #root (see
// scripts/prerender.mjs), so adopt it rather than throwing it away. The dev
// server serves an empty root and takes the createRoot path.
if (container.firstChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
