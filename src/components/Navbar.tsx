import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { BeehosterLogo } from './BeehosterLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ORDER_MESSAGE, whatsAppLink } from '../data/contact';

const navLinks = [
  { name: 'Start', href: '#hero', id: 'hero' },
  { name: 'Zenders', href: '#channels', id: 'channels' },
  { name: 'Prijzen', href: '#pricing', id: 'pricing' },
  { name: 'Zenderlijst', href: '#channel-list', id: 'channel-list' },
  { name: 'Voordelen', href: '#features', id: 'features' },
  { name: 'Blog', href: '#blog', id: 'blog' },
  { name: 'FAQ', href: '#faq', id: 'faq' },
];

const Wordmark: React.FC<{ className?: string }> = ({ className = 'text-lg' }) => (
  <span className={`font-black tracking-tight text-ink leading-none ${className}`}>
    <span className="text-accent">BEE</span>HOSTER
  </span>
);

/* One conventional sticky header: brand left, sections centre, order CTA
   right. It rides transparent over the top of the hero and picks up its
   frosted plate once you start scrolling, so the masthead isn't fighting a
   solid bar on first paint. Phones get the same links in a drawer. */
export const Navbar: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('hero');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Scroll spy — whichever section owns the most of the viewport wins. */
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* An open drawer covers the page, so the page behind it shouldn't scroll —
     and Escape should close it the same way tapping a link does. */
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'menu-glass border-b border-line/80 shadow-[0_10px_30px_-24px_rgba(22,21,15,0.4)]'
          : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 lg:h-[4.5rem] flex items-center justify-between gap-4">

          {/* Brand */}
          <a href="#hero" className="flex items-center gap-2.5 shrink-0" aria-label="BEEHOSTER startpagina">
            <BeehosterLogo className="w-9 h-9 lg:w-10 lg:h-10 shrink-0" />
            <Wordmark className="text-base lg:text-lg" />
          </a>

          {/* Sections — the active one is underlined rather than pilled, which
              keeps the bar quiet while you scroll past it. */}
          <nav aria-label="Sectiemenu" className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = activeId === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  aria-current={active ? 'true' : undefined}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    active ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-accent transition-opacity duration-200 ${
                      active ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={whatsAppLink('Hoi BEEHOSTER! Ik wil graag meer weten over jullie IPTV-abonnementen.')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat via WhatsApp"
              className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center border border-line bg-surface text-[#1FA855] hover:border-[#25D366]/60 hover:text-[#178c44] transition-colors"
            >
              <WhatsAppIcon className="w-[18px] h-[18px]" />
            </a>

            <a
              data-cta="order"
              href={whatsAppLink(ORDER_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 lg:px-5 py-2.5 rounded-full text-sm font-bold accent-button-gradient shadow-[0_10px_24px_-14px_rgba(190,18,60,0.9)] hover:scale-[1.03] active:scale-[0.98] transition-transform"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              Bestel nu
            </a>

            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
              className="lg:hidden w-10 h-10 rounded-full border border-line bg-surface text-ink flex items-center justify-center"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* ── Phone & tablet drawer ─────────────────────────────────────── */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden border-t transition-[max-height,opacity] duration-300 ease-out ${
          menuOpen ? 'max-h-[32rem] opacity-100 border-line' : 'max-h-0 opacity-0 border-transparent'
        }`}
      >
        <nav aria-label="Hoofdnavigatie" className="px-4 sm:px-6 py-4 space-y-1">
          {navLinks.map((link) => {
            const active = activeId === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? 'true' : undefined}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[15px] font-semibold transition-colors ${
                  active ? 'bg-accent-soft text-ink' : 'text-muted hover:bg-paper hover:text-ink'
                }`}
              >
                {link.name}
                {active && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
              </a>
            );
          })}

          <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a
              data-cta="order"
              href={whatsAppLink(ORDER_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="w-full py-3.5 rounded-full text-sm font-bold accent-button-gradient flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              Bestel nu
            </a>

            <a
              href={whatsAppLink('Hoi BEEHOSTER! Ik wil graag meer weten over jullie IPTV-abonnementen.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-[#25D366] flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};
