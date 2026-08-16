/* Single source of truth for the WhatsApp line every CTA on the site points at. */

/** Digits only — wa.me rejects spaces, plus signs and dashes. */
export const WHATSAPP_NUMBER = '447414662070';

/** Human-readable form, used wherever the number is shown rather than linked. */
export const WHATSAPP_DISPLAY = '+44 7414 662070';

/** What an order CTA writes into the chat when it doesn't know the chosen pack. */
export const ORDER_MESSAGE =
  'Hoi BEEHOSTER! Ik wil graag een IPTV-abonnement bestellen. ' +
  'Kunnen jullie mij de pakketten en betaalgegevens sturen?';

/** Builds a wa.me deep link, optionally with the chat pre-filled. */
export const whatsAppLink = (message?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
