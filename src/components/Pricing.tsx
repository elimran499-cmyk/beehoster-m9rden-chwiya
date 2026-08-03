import React, { useState } from 'react';
import { PACKAGE_TIERS, DURATION_PACKS } from '../data/iptvData';
import { Check, ShieldCheck, Flame, Award, Monitor } from 'lucide-react';
import { BeeGlyph } from './BeehosterLogo';
import { whatsAppLink } from '../data/contact';
import { WhatsAppIcon } from './WhatsAppIcon';

interface PricingProps {
  onOpenOrderModal: (planId?: string) => void;
}

/* One feature line. `highlight` bolds the headline benefits. */
const FeatureRow: React.FC<{ feature: string; accent: boolean; highlight?: boolean; vip?: boolean }> = ({
  feature,
  accent,
  highlight = false,
  vip = false,
}) => (
  <div className="flex items-start gap-3 text-xs text-zinc-300">
    <span
      className={`mt-px w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
        vip
          ? 'bg-[#FFD166]/25 border-[#FFD166]/55 text-[#FFEBC4]'
          : accent
            ? 'bg-white/15 border-white/25 text-white'
            : 'bg-white/10 border-white/15 text-zinc-200'
      }`}
    >
      <Check className="w-3 h-3 stroke-[3]" />
    </span>
    <span className={highlight ? 'font-semibold text-white' : ''}>{feature}</span>
  </div>
);

export const Pricing: React.FC<PricingProps> = ({ onOpenOrderModal }) => {
  const [tier, setTier] = useState<'basic' | 'vip'>('basic');
  const [devices, setDevices] = useState<number>(1);

  const activeTier = PACKAGE_TIERS.find((t) => t.id === tier) ?? PACKAGE_TIERS[0];
  const isVip = tier === 'vip';
  /* 0 at one screen, 1 at four — drives how golden the packs glow. */
  const goldLift = (devices - 1) / 3;

  const formatPrice = (val: number) => `€${val.toFixed(2)}`;

  return (
    <section id="pricing" className="relative z-10 py-28 overflow-hidden">

      {/* Local light behind the highlighted plan — it deepens to honey gold on
          the VIP tier, so the whole section changes, not just the card */}
      <div
        className={`bloom w-[40rem] h-[38rem] top-16 right-[2%] opacity-70 transition-opacity duration-700 ${
          isVip ? 'bloom-vip' : 'bloom-warm'
        }`}
      />
      <div
        className={`bloom w-[36rem] h-[34rem] -bottom-40 left-[8%] opacity-70 transition-opacity duration-700 ${
          isVip ? 'bloom-vip' : 'bloom-ember'
        }`}
      />

      {/* Oversized Background Wordmark — the cards crop into it */}
      <div
        aria-hidden="true"
        className="absolute top-40 sm:top-44 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none"
      >
        <span className="block font-display uppercase text-[22vw] sm:text-[17vw] leading-none tracking-tighter text-white/[0.07] sm:text-white/[0.09]">
          Prijzen
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block whitespace-nowrap text-[9px] sm:text-[11px] font-bold text-[#FFD166] uppercase tracking-[0.16em] sm:tracking-[0.25em] bg-white/5 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-white/15">
            Transparante prijzen • Geen verborgen kosten
          </span>
          <h2 className="mt-4 sm:mt-5 text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
            Kies je <span className="accent-gradient-text">pakket</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-[13px] sm:text-base text-zinc-400 px-2">
            Kies een pakket, stuur ons een WhatsApp-bericht en je login staat binnen 5 minuten klaar. Altijd opzegbaar, geen contract.
          </p>

        </div>

        {/* ── Tier Switch: Basic / Premium VIP ─────────────────────── */}
        <div className="flex justify-center mb-4">
          <div className="relative inline-flex items-center gap-1 p-1 glass-panel glass-edge rounded-full">
            {PACKAGE_TIERS.map((t) => {
              const active = tier === t.id;
              const vipPill = t.id === 'vip' && active;
              return (
                <button
                  key={t.id}
                  onClick={() => setTier(t.id)}
                  className={`px-5 sm:px-7 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                    vipPill
                      ? 'pill-vip shadow-lg shadow-[#FFB03A]/40'
                      : active
                        ? 'pill-light shadow-lg'
                        : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {t.id === 'vip' && <BeeGlyph className={`w-4 h-4 ${active ? '' : 'opacity-70'}`} />}
                  {t.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* VIP announces itself with a swarm line rather than just a colour */}
        {isVip && (
          <div className="flex items-center justify-center gap-2.5 mb-8 animate-in fade-in slide-in-from-top-1 duration-500">
            <span className="flex items-center gap-1 text-[#FFD166]">
              {[0, 0.9, 1.8].map((delay) => (
                <BeeGlyph
                  key={delay}
                  className="w-4 h-4 animate-bee"
                  style={{ animationDelay: `${delay}s` }}
                  aria-hidden="true"
                />
              ))}
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFE9A8]">
              Volledige korf — alles inbegrepen
            </span>
          </div>
        )}

        {/* ── Device Count. Phones get a 2×2 grid of full-width targets — the
               single scrolling pill row hid options 3 and 4 off-screen. ─── */}
        <div className="mb-10 sm:mb-12">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500 mb-3">
            Hoeveel apparaten tegelijk?
          </p>

          <div className="grid grid-cols-2 gap-2 sm:hidden">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => setDevices(n)}
                className={`py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  devices === n
                    ? isVip
                      ? 'pill-vip shadow-lg shadow-[#FFB03A]/30'
                      : 'pill-light shadow-lg'
                    : 'glass-panel glass-edge text-zinc-400'
                }`}
              >
                <Monitor className="w-4 h-4" />
                {n} {n === 1 ? 'apparaat' : 'apparaten'}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex justify-center">
            <div className="relative inline-flex items-center gap-1 p-1 glass-panel glass-edge rounded-full">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setDevices(n)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    devices === n
                      ? isVip
                        ? 'pill-vip shadow-lg shadow-[#FFB03A]/30'
                        : 'pill-light shadow-lg'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  {n} {n === 1 ? 'apparaat' : 'apparaten'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Duration Packs ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {DURATION_PACKS.map((pack) => {
            const price = pack.prices[tier][devices - 1];
            const perMonth = price / pack.months;
            const best = pack.bestDeal;

            return (
              <div
                key={pack.id}
                className={`relative rounded-[2rem] p-6 sm:p-8 flex flex-col transition-all duration-500 hover:-translate-y-1 ${
                  best
                    ? `${isVip ? 'glass-panel-vip' : 'glass-panel-accent'} specular z-20`
                    : 'glass-panel glass-edge'
                }`}
              >
                {/* More screens, more honey: every extra device warms the card
                    further toward gold. Painted as an overlay so it doesn't
                    fight the panel's own rim light. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[2rem] pointer-events-none transition-opacity duration-700"
                  style={{
                    opacity: goldLift,
                    background:
                      'linear-gradient(150deg, rgba(255,230,0,0.20) 0%, rgba(255,154,46,0.09) 45%, transparent 78%)',
                    boxShadow: 'inset 0 0 70px -18px rgba(255,214,80,0.75)',
                  }}
                />

                {/* VIP turns the whole grid into a hive: honeycomb on every
                    pack and a bee resting on each one, not just the best deal. */}
                {isVip && !best && (
                  <>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-[2rem] honeycomb-tint opacity-[0.05] pointer-events-none"
                    />
                    <BeeGlyph
                      aria-hidden="true"
                      className="absolute top-3 right-4 w-12 h-12 -rotate-12 text-[#FFD166]/20 pointer-events-none animate-bee"
                    />
                  </>
                )}

                {/* The hive dressing that marks out the best deal: honeycomb
                    tile, a bee resting in the corner, and a bee on the badge. */}
                {best && (
                  <>
                    <div
                      aria-hidden="true"
                      className={`absolute inset-0 rounded-[2rem] honeycomb-tint pointer-events-none ${
                        isVip ? 'opacity-[0.12]' : 'opacity-[0.07]'
                      }`}
                    />
                    <BeeGlyph
                      aria-hidden="true"
                      className={`absolute -top-1 right-3 w-24 h-24 rotate-12 pointer-events-none animate-bee ${
                        isVip ? 'text-[#FFD166]/[0.22]' : 'text-white/[0.09]'
                      }`}
                    />
                    {isVip && (
                      <BeeGlyph
                        aria-hidden="true"
                        className="absolute bottom-6 left-5 w-10 h-10 -rotate-[18deg] text-[#FFE600]/[0.14] pointer-events-none animate-bee"
                        style={{ animationDelay: '1.4s' }}
                      />
                    )}
                    <div
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase shadow-lg flex items-center gap-1.5 whitespace-nowrap ${
                        isVip ? 'pill-vip shadow-[#FFB03A]/50' : 'pill-light shadow-[#FF5C3A]/40'
                      }`}
                    >
                      <BeeGlyph className="w-3.5 h-3.5" />
                      Beste deal · -{pack.savePercent}%
                    </div>
                  </>
                )}

                {/* Duration + price */}
                <div className="text-center">
                  <p
                    className={`font-condensed uppercase text-xs sm:text-sm font-bold tracking-[0.28em] ${
                      isVip ? 'text-[#FFE3A3]' : 'text-[#FFD166]'
                    }`}
                  >
                    {pack.label}
                  </p>
                  <p
                    className={`mt-3 text-5xl sm:text-[3.4rem] leading-none font-bold tracking-tight ${
                      isVip ? 'vip-gradient-text' : 'text-white'
                    }`}
                  >
                    {formatPrice(price)}
                  </p>
                  <p className="mt-2.5 text-xs text-zinc-400">≈ {formatPrice(perMonth)} per maand</p>

                  <p className="mt-4 inline-flex items-center gap-2 text-xs text-zinc-300">
                    <Monitor className={`w-3.5 h-3.5 ${isVip ? 'text-[#FFD166]' : 'text-[#FF9A2E]'}`} />
                    {devices} {devices === 1 ? 'apparaat inbegrepen' : 'apparaten inbegrepen'}
                  </p>
                </div>

                {/* CTA */}
                <button
                  onClick={() => onOpenOrderModal(pack.planId)}
                  className={`mt-6 w-full py-4 text-sm font-bold rounded-full flex items-center justify-center gap-2 ${
                    isVip ? 'pill-vip shadow-lg shadow-[#FFB03A]/35' : 'pill-light'
                  }`}
                >
                  <WhatsAppIcon className={`w-4 h-4 ${isVip ? 'text-[#0E5B2A]' : 'text-[#25D366]'}`} />
                  {isVip ? 'Word nu VIP' : 'Nu bestellen'}
                </button>

                <div className="my-6 h-px bg-white/10" />

                {/* What's in the pack */}
                <div className="flex items-center gap-2.5 mb-5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.16em] ${
                      isVip
                        ? 'bg-[#FFD166]/20 text-[#FFE9C0] border border-[#FFD166]/55'
                        : 'bg-[#FF5C3A]/20 text-[#FFD166] border border-[#FF5C3A]/40'
                    }`}
                  >
                    {activeTier.name}
                  </span>
                  <h3 className="text-sm font-bold text-white">{activeTier.headline}</h3>
                </div>

                {/* Every feature, every screen — phones get the full pack, not
                    a four-line preview behind a toggle. */}
                <div className="space-y-3.5">
                  {activeTier.features.map((feature, idx) => (
                    <FeatureRow key={feature} feature={feature} accent={!!best} highlight={idx < 2} vip={isVip} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Talk-to-us banner */}
        <div className="relative mt-12 max-w-4xl mx-auto p-5 rounded-[2rem] glass-panel glass-edge specular overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-11 h-11 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#25D366]/40">
              <WhatsAppIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                Weet je niet welk pakket bij je past?
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Stuur ons een WhatsApp-bericht — we zoeken samen de juiste looptijd en het aantal apparaten uit.
              </p>
            </div>
          </div>
          <a
            href={whatsAppLink('Hoi BEEHOSTER! Welk abonnement past het beste bij mij?')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 text-xs font-bold rounded-full pill-light flex items-center gap-2"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            Chat via WhatsApp
          </a>
        </div>

        {/* Security & Payment Footer info */}
        <div className="mt-10 text-center">
          <div className="relative inline-flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-zinc-400 glass-panel glass-edge px-6 sm:px-7 py-4 sm:py-3.5 rounded-3xl sm:rounded-full">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-300" /> Creditcard, PayPal, overboeking of crypto
            </span>
            <span className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#FF5C3A]" /> M3U- &amp; Xtream-login via de chat
            </span>
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#FFD166]" /> 7 dagen niet-goed-geld-terug
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
