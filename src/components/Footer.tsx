import React from 'react';
import { ShieldCheck, Lock, ArrowUp, Heart, BadgeCheck } from 'lucide-react';
import { BeehosterLogo } from './BeehosterLogo';
import { WHATSAPP_DISPLAY, whatsAppLink } from '../data/contact';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-line text-muted pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-line">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#hero" className="flex items-center gap-3">
              <BeehosterLogo className="w-10 h-10 shrink-0" />
              <span className="text-2xl font-black text-ink"><span className="text-accent">BEE</span>HOSTER</span>
            </a>

            <p className="text-xs text-muted leading-relaxed max-w-sm">
              BEEHOSTER is een IPTV-aanbieder met 80.000+ live tv-zenders in 4K UHD, sportuitzendingen en video-on-demand, draaiend op Anti-Freeze™ 9.0-servers wereldwijd.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-muted">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Gegarandeerd 99,9% uptime dankzij onze ULA-serverarchitectuur</span>
            </div>

            {/* Official-site notice: one site, one number, everything else is
                a reseller — worth stating plainly next to the real contact. */}
            <div className="flex items-start gap-2.5 p-3.5 rounded-2xl border border-accent/40 bg-accent-soft">
              <BadgeCheck className="w-5 h-5 shrink-0 text-accent mt-px" />
              <p className="text-[11px] text-muted leading-relaxed">
                <span className="font-bold text-ink">Officiële BEEHOSTER-website.</span> Dit is ons enige
                officiële kanaal — wij bestellen en ondersteunen uitsluitend via {WHATSAPP_DISPLAY}. Andere
                sites of nummers zijn niet van ons.
              </p>
            </div>

            {/* Orders and support both run through this one line */}
            <a
              href={whatsAppLink('Hoi BEEHOSTER! Ik wil graag meer weten over jullie IPTV-abonnementen.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 text-ink hover:bg-[#25D366]/20 transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
              <span className="flex flex-col leading-tight">
                <span className="text-[10px] uppercase tracking-wider text-muted">Bestellen & support</span>
                <span className="text-sm font-bold tracking-wide">{WHATSAPP_DISPLAY}</span>
              </span>
            </a>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-ink uppercase tracking-wider mb-4">Snelle links</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#hero" className="hover:text-accent-deep transition-colors">Start</a></li>
              <li><a href="#channels" className="hover:text-accent-deep transition-colors">Zenders & VOD</a></li>
              <li><a href="#features" className="hover:text-accent-deep transition-colors">Waarom BEEHOSTER</a></li>
              <li><a href="#pricing" className="hover:text-accent-deep transition-colors">Abonnementen</a></li>
              <li><a href="#channel-list" className="hover:text-accent-deep transition-colors">Volledige zenderlijst</a></li>
              <li><a href="#blog" className="hover:text-accent-deep transition-colors">Blog</a></li>
              <li><a href="#faq" className="hover:text-accent-deep transition-colors">FAQ & support</a></li>
            </ul>
          </div>

          {/* Supported Devices */}
          <div>
            <h4 className="text-sm font-bold text-ink uppercase tracking-wider mb-4">Geschikte apparaten</h4>
            <ul className="space-y-2.5 text-xs">
              <li><span className="text-muted">Amazon Firestick 4K</span></li>
              <li><span className="text-muted">Samsung & LG smart-tv</span></li>
              <li><span className="text-muted">Android TV & box</span></li>
              <li><span className="text-muted">Apple TV & iPhone</span></li>
              <li><span className="text-muted">MAG-box & Formuler</span></li>
              <li><span className="text-muted">Windows & macOS</span></li>
            </ul>
          </div>

          {/* How ordering actually works now that everything runs through chat */}
          <div>
            <h4 className="text-sm font-bold text-ink uppercase tracking-wider mb-4">Zo bestel je</h4>
            <ol className="space-y-3 text-xs">
              {[
                'Stuur ons een WhatsApp-bericht met het pakket dat je wilt',
                'Betaal zoals het jou uitkomt — iDEAL, PayPal, kaart, overboeking of crypto',
                'Je login staat binnen 5 minuten in de chat',
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-2.5">
                  <span className="mt-px w-5 h-5 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] text-[10px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-muted leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>

            <a
              href={whatsAppLink('Hoi BEEHOSTER! Ik wil graag een IPTV-abonnement bestellen.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#25D366] hover:text-ink transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Start de chat →
            </a>
          </div>

        </div>

        {/* Legal Disclaimer */}
        <div className="py-6 border-b border-line text-[11px] text-muted leading-relaxed">
          <p className="font-semibold text-muted mb-1">DISCLAIMER & JURIDISCHE INFORMATIE:</p>
          <p>
            BEEHOSTER biedt abonnementen op software voor het beheren van streamingservers en het ordenen van playlists. BEEHOSTER host, bewaart of verzendt zelf geen auteursrechtelijk beschermde videobestanden op eigen servers. Alle geïndexeerde streams zijn afkomstig van publiek toegankelijke mediaservers. Controleer vóór je abonnement of dit is toegestaan volgens de regels voor digitale media in jouw land.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div>
            © {new Date().getFullYear()} BEEHOSTER IPTV. Alle rechten voorbehouden.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-paper border border-line text-muted hover:text-ink hover:border-accent transition-colors flex items-center gap-1.5"
            >
              <span>Terug naar boven</span>
              <ArrowUp className="w-4 h-4 text-accent" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
