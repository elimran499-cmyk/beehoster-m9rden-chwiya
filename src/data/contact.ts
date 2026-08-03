/* Single source of truth for the WhatsApp line every CTA on the site points at. */

/** Digits only — wa.me rejects spaces, plus signs and dashes. */
export const WHATSAPP_NUMBER = '447832486269';

/** Human-readable form, used wherever the number is shown rather than linked. */
export const WHATSAPP_DISPLAY = '+44 7832 486269';

/** Builds a wa.me deep link, optionally with the chat pre-filled. */
export const whatsAppLink = (message?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
