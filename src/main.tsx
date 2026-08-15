import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
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
