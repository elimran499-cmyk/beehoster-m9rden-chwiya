/* Google Ads conversion tracking.
 *
 * The gtag stub and the AW-18345460239 config live in index.html; this module
 * only fires events against them. gtag is defined by an inline script that runs
 * before the async gtag.js arrives, and it queues calls into dataLayer, so
 * firing early is safe — but the optional call keeps us honest if the tag is
 * ever blocked outright. */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Conversion action: "WhatsApp click". */
const WHATSAPP_CONVERSION = 'AW-18345460239/ji0xCK_G3-AcEI-E5qtE';

/** Matches every CTA built by whatsAppLink() in data/contact.ts. */
const WHATSAPP_HREF = 'a[href*="wa.me/"]';

/**
 * Counts a click on any WhatsApp CTA as a conversion.
 *
 * Every one of these links is a wa.me deep link opened with target="_blank",
 * so the page is never unloaded and a plain event lands without the
 * event_callback dance Google prescribes for same-tab outbound links.
 *
 * This is delegated from the document rather than bolted onto each of the
 * twelve anchors: they are spread over seven components, and a new CTA should
 * be counted because it points at WhatsApp, not because someone remembered to
 * wire up an onClick. Returns its own teardown.
 */
export function trackWhatsAppClicks(): () => void {
  const onClick = (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!target.closest(WHATSAPP_HREF)) return;

    window.gtag?.('event', 'conversion', {send_to: WHATSAPP_CONVERSION});
  };

  // Capture phase, so a handler that stops propagation can't silently cost us
  // the conversion. 'auxclick' rides along because a middle-click opens the
  // chat just as well as a left-click but never fires 'click'.
  document.addEventListener('click', onClick, true);
  document.addEventListener('auxclick', onClick, true);
  return () => {
    document.removeEventListener('click', onClick, true);
    document.removeEventListener('auxclick', onClick, true);
  };
}
