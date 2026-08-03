import React, { useState, useEffect } from 'react';
import { Home, Tag, Sparkles, HelpCircle, ChevronLeft, ChevronRight, MonitorSmartphone, Tv, BookOpen } from 'lucide-react';
import { BeehosterLogo, BeeGlyph } from './BeehosterLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { whatsAppLink } from '../data/contact';

interface NavbarProps {
  onOpenOrderModal: (planId?: string) => void;
}

const navLinks = [
  { name: 'Start', href: '#hero', id: 'hero', icon: Home },
  { name: 'Zenders', href: '#channels', id: 'channels', icon: Tv },
  { name: 'Prijzen', href: '#pricing', id: 'pricing', icon: Tag },
  { name: 'Apparaten', href: '#devices', id: 'devices', icon: MonitorSmartphone },
  { name: 'Voordelen', href: '#features', id: 'features', icon: Sparkles },
  { name: 'Blog', href: '#blog', id: 'blog', icon: BookOpen },
  { name: 'FAQ', href: '#faq', id: 'faq', icon: HelpCircle },
];

/* Floating vertical rail. Collapsed it's a column of icons; expanded it grows
   labels out to the right. The active section rides a white pill, so the rail
   doubles as a position indicator while you scroll. */
export const Navbar: React.FC<NavbarProps> = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState<string>('hero');
  const [scrolled, setScrolled] = useState(false);

  /* The top bar swaps menu → wordmark on scroll. Desktop lets go of the menu
     the moment you move, since the rail carries navigation from there; phones
     hold on until the hero is genuinely behind you, because the dock sits at
     the other end of the screen. */
  useEffect(() => {
    const handleScroll = () => {
      const isDesktop = window.matchMedia('(min-width: 640px)').matches;
      const hero = document.getElementById('hero');
      const threshold = isDesktop ? 24 : hero ? hero.offsetHeight * 0.55 : 200;
      setScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
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

  return (
    <>
    {/* ── TOP BAR: the menu while you're still in the hero, swapping to the
           wordmark once you scroll past it. Same behaviour on phone and
           desktop — only the sizing differs. ──────────────────────────── */}
    <header className="fixed top-0 inset-x-0 z-40 pointer-events-none sm:pr-[5.5rem] lg:pr-24">
      {/* Both states stay mounted and cross-fade, so the swap is one continuous
          movement rather than a hard cut. */}
      <div className="relative flex justify-center px-3 pt-3 sm:pt-4">
        {/* Hero state — brand parked top-left on desktop */}
        <a
          href="#hero"
          aria-hidden={scrolled}
          className={`flex absolute left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 lg:left-8 top-3 sm:top-4 items-center gap-2.5 px-4 py-2 rounded-full brand-plate transition-all duration-500 ease-out ${
            scrolled ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'
          }`}
        >
          {/* Bees circling the wordmark */}
          <BeeGlyph
            aria-hidden="true"
            className="absolute -top-2.5 -right-1.5 w-4 h-4 text-[#FFE600] drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] animate-bee-fly pointer-events-none"
          />
          <BeeGlyph
            aria-hidden="true"
            style={{ animationDelay: '1.8s' }}
            className="absolute -bottom-2 right-9 w-3 h-3 text-[#FFD166]/85 drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)] animate-bee-fly pointer-events-none"
          />
          <BeeGlyph
            aria-hidden="true"
            style={{ animationDelay: '3.4s' }}
            className="absolute -top-3 left-10 w-2.5 h-2.5 text-[#FFE600]/70 animate-bee-fly pointer-events-none"
          />
          <BeeGlyph
            aria-hidden="true"
            style={{ animationDelay: '2.6s' }}
            className="absolute -bottom-2.5 left-6 w-3 h-3 text-[#FFE600]/60 animate-bee-fly pointer-events-none"
          />
          <BeeGlyph
            aria-hidden="true"
            style={{ animationDelay: '4.6s' }}
            className="absolute -top-2 right-16 w-2.5 h-2.5 text-[#FFD166]/55 animate-bee-fly pointer-events-none"
          />
          <BeehosterLogo className="w-10 h-10 shrink-0" />
          <span className="text-base font-black tracking-wide text-white leading-none">
            <span className="text-[#FFE600]">BEE</span>HOSTER
          </span>
        </a>

        {/* Hero state — menu. Centred in the flow on phones, parked top-right
            on desktop opposite the brand. */}
        <nav
          aria-label="Sectiemenu"
          aria-hidden={scrolled}
          className={`hidden sm:flex max-w-full items-center gap-1 p-1 rounded-full menu-glass overflow-x-auto no-scrollbar transition-all duration-500 ease-out sm:absolute sm:right-4 lg:right-8 sm:top-4 ${
            scrolled ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-2.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-sm font-semibold text-zinc-200 whitespace-nowrap hover:text-[#FFD166] hover:bg-white/5 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Scrolled state — the wordmark, centred */}
        <a
          href="#hero"
          aria-hidden={!scrolled}
          className={`absolute left-1/2 -translate-x-1/2 top-3 sm:top-4 flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full brand-plate transition-all duration-500 ease-out ${
            scrolled ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          {/* Bees circling the wordmark */}
          <BeeGlyph
            aria-hidden="true"
            className="absolute -top-2.5 -right-1.5 w-4 h-4 text-[#FFE600] drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] animate-bee-fly pointer-events-none"
          />
          <BeeGlyph
            aria-hidden="true"
            style={{ animationDelay: '1.8s' }}
            className="absolute -bottom-2 right-9 w-3 h-3 text-[#FFD166]/85 drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)] animate-bee-fly pointer-events-none"
          />
          <BeeGlyph
            aria-hidden="true"
            style={{ animationDelay: '3.4s' }}
            className="absolute -top-3 left-10 w-2.5 h-2.5 text-[#FFE600]/70 animate-bee-fly pointer-events-none"
          />
          <BeeGlyph
            aria-hidden="true"
            style={{ animationDelay: '2.6s' }}
            className="absolute -bottom-2.5 left-6 w-3 h-3 text-[#FFE600]/60 animate-bee-fly pointer-events-none"
          />
          <BeeGlyph
            aria-hidden="true"
            style={{ animationDelay: '4.6s' }}
            className="absolute -top-2 right-16 w-2.5 h-2.5 text-[#FFD166]/55 animate-bee-fly pointer-events-none"
          />
          <BeehosterLogo className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" />
          <span className="text-sm sm:text-base font-black tracking-wide text-white leading-none">
            <span className="text-[#FFE600]">BEE</span>HOSTER
          </span>
        </a>
      </div>
    </header>

    {/* ── PHONES: horizontal dock. A left rail ate ~14% of a phone's width for
           navigation nobody uses while reading, so the same glass-and-white-pill
           language moves to the bottom, where the thumb already is. Only the
           active item carries its label. ─────────────────────────────────── */}
    <nav
      className="sm:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-1.5rem)]"
      aria-label="Hoofdnavigatie"
    >
      <div className="flex items-center gap-1 p-1.5 rounded-full menu-glass overflow-x-auto no-scrollbar">
        {navLinks
          .map((link) => {
            const Icon = link.icon;
            const active = activeId === link.id;

            return (
              <a
                key={link.name}
                href={link.href}
                aria-label={link.name}
                aria-current={active ? 'true' : undefined}
                className={`flex items-center gap-1.5 h-9 rounded-full transition-all duration-300 ${
                  active ? 'bg-white text-black px-2.5 shadow-lg shadow-black/30' : 'text-zinc-300 w-8 justify-center'
                }`}
              >
                <Icon className="w-[17px] h-[17px] shrink-0" />
                {active && <span className="text-[11px] font-bold whitespace-nowrap">{link.name}</span>}
              </a>
            );
          })}

        <span className="w-px h-5 bg-white/15 mx-0.5 shrink-0" />

        <a
          href={whatsAppLink('Hoi BEEHOSTER! Ik wil graag meer weten over jullie IPTV-abonnementen.')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat via WhatsApp"
          className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#25D366]/30"
        >
          <WhatsAppIcon className="w-[17px] h-[17px]" />
        </a>
      </div>
    </nav>

    {/* ── TABLET & DESKTOP: floating vertical rail ─────────────────────── */}
    <nav
      id="navbar"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="hidden sm:block fixed right-4 top-1/2 -translate-y-1/2 z-50"
      aria-label="Hoofdnavigatie"
    >
      <div
        className={`flex flex-col gap-1 p-2 rounded-[2rem] menu-glass transition-[width] duration-300 ease-out ${
          expanded ? 'w-[15rem]' : 'w-[3.75rem]'
        }`}
      >
        {/* Brand + collapse control */}
        <div className="flex items-center gap-2 mb-0.5">
          <a
            href="#hero"
            className="shrink-0 hover:scale-105 transition-transform"
            aria-label="BEEHOSTER startpagina"
          >
            <BeehosterLogo className="w-9 h-9 sm:w-10 sm:h-10" />
          </a>

          {expanded && (
            <>
              <span className="text-sm font-black tracking-wide text-white truncate">
                <span className="text-[#FFE600]">BEE</span>HOSTER
              </span>
              <button
                onClick={() => setExpanded(false)}
                className="ml-auto w-7 h-7 rounded-full bg-white/10 border border-white/15 text-zinc-300 hover:text-white flex items-center justify-center shrink-0"
                aria-label="Menu inklappen"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Section links */}
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = activeId === link.id;

          return (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setExpanded(false)}
              aria-current={active ? 'true' : undefined}
              className={`flex items-center gap-2.5 rounded-full p-1 transition-colors duration-200 ${
                active ? 'bg-white text-black shadow-lg shadow-black/30' : 'text-zinc-300 hover:bg-white/10'
              }`}
            >
              <span
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 ${
                  active ? 'bg-black/10' : 'bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
              </span>
              {expanded && <span className="text-sm font-semibold truncate pr-2">{link.name}</span>}
            </a>
          );
        })}

        <div className="h-px bg-white/10 my-1 mx-1" />

        {/* Contact + order */}
        <a
          href={whatsAppLink('Hoi BEEHOSTER! Ik wil graag meer weten over jullie IPTV-abonnementen.')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 rounded-full p-1 text-zinc-300 hover:bg-white/10 transition-colors"
        >
          <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] flex items-center justify-center shrink-0">
            <WhatsAppIcon className="w-4 h-4" />
          </span>
          {expanded && <span className="text-sm font-semibold truncate pr-2">WhatsApp</span>}
        </a>

        <a
          href="#pricing"
          onClick={() => setExpanded(false)}
          className="flex items-center gap-2.5 rounded-full p-1 text-black accent-button-gradient shadow-lg shadow-[#FF5C3A]/25 hover:scale-[1.02] transition-transform"
        >
          <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 fill-black" />
          </span>
          {expanded && <span className="text-sm font-bold truncate pr-2">Abonnement nemen</span>}
        </a>

        {/* Expand affordance — only shown while collapsed */}
        {!expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="mt-0.5 mx-auto w-7 h-7 rounded-full bg-white/10 border border-white/15 text-zinc-300 hover:text-white flex items-center justify-center"
            aria-label="Menu uitklappen"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>
    </nav>
    </>
  );
};
