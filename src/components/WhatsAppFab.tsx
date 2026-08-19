import React from 'react';
import {WhatsAppIcon} from './WhatsAppIcon';
import {WHATSAPP_DISPLAY, whatsAppLink} from '../data/contact';

/**
 * De zwevende WhatsApp-knop. Staat op elke pagina, dus hij woont hier in
 * plaats van in de opmaak van één pagina.
 */
export const WhatsAppFab: React.FC = () => (
  <div className="fixed bottom-5 right-5 sm:bottom-6 sm:left-6 sm:right-auto z-40">
    <a
      href={whatsAppLink('Hoi BEEHOSTER! Ik wil graag meer weten over jullie IPTV-abonnementen.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Neem contact op via WhatsApp: ${WHATSAPP_DISPLAY}`}
      className="p-3.5 rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/35 hover:scale-110 transition-transform duration-300 flex items-center justify-center border border-white/40"
      title={`WhatsApp-support 24/7 — ${WHATSAPP_DISPLAY}`}
    >
      <WhatsAppIcon className="w-6 h-6" />
    </a>
  </div>
);
