import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

/**
 * Folds the built stylesheet into the HTML as a <style> block.
 *
 * A `<link rel="stylesheet">` blocks the first paint until it has been
 * fetched and parsed, which on the deployed site cost ~170 ms of pure
 * round-trip before anything could render. The bundle is small enough
 * (~13 KiB over the wire, gzipped by the host along with the rest of the
 * document) that carrying it inside the HTML is cheaper than a second
 * request: one fewer hop on the critical path, and the CSS arrives with the
 * markup it styles.
 *
 * The trade is that the CSS no longer has its own cache entry — a repeat
 * visitor re-downloads it with the document. For a site whose HTML is a
 * couple of KB and which lives or dies on first impressions, that is the
 * right way round.
 */
function inlineStylesheet(): Plugin {
  return {
    name: 'inline-stylesheet',
    apply: 'build',
    // Run after Vite's own HTML plugin has emitted index.html with its tags.
    enforce: 'post',
    generateBundle(_options, bundle) {
      const stylesheets = Object.values(bundle).filter(
        (chunk) => chunk.type === 'asset' && chunk.fileName.endsWith('.css'),
      );
      if (stylesheets.length === 0) return;

      const inlined = new Set<string>();

      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'asset' || !chunk.fileName.endsWith('.html')) continue;

        let html = chunk.source.toString();

        for (const sheet of stylesheets) {
          if (sheet.type !== 'asset') continue;
          const href = sheet.fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const tag = new RegExp(`<link\\b[^>]*href="/?${href}"[^>]*>`);
          if (!tag.test(html)) continue;

          const css = sheet.source.toString();
          // Function form: a literal `$&` in the CSS must not be read as a
          // replacement pattern.
          html = html.replace(tag, () => `<style>${css}</style>`);
          inlined.add(sheet.fileName);
        }

        chunk.source = html;
      }

      // Nothing links to them any more, so don't ship them.
      for (const fileName of inlined) delete bundle[fileName];
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), inlineStylesheet()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
