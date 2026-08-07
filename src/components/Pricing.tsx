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
  <div className="flex items-start gap-3 text-xs text-muted">
    <span
      className={`mt-px w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
        vip
          ? 'bg-accent/25 border-accent/60 text-accent-deep'
          : accent
            ? 'bg-accent/15 border-accent/45 text-accent-deep'
            : 'bg-paper border-line text-ink'
      }`}
    >
      <Check className="w-3 h-3 stroke-[3]" />
    </span>
    <span className={highlight ? 'font-semibold text-ink' : ''}>{feature}</span>
  </div>
);

export const Pricing: React.FC<PricingProps> = ({ onOpenOrderModal }) => {
  const [tier, setTier] = useState<'basic' | 'vip'>('basic');
  const [devices, setDevices] = useState<number>(1);

  const activeTier = PACKAGE_TIERS.find((t) => t.id === tier) ?? PACKAGE_TIERS[0];
  const isVip = tier === 'vip';

  const formatPrice = (val: number) => `€${val.toFixed(2)}`;

  return (
    <section id="pricing" className="relative z-10 py-28 overflow-hidden">

      {/* Local light behind the highlighted plan — it deepens to accent gold on
          the VIP tier, so the whole section changes, not just the card */}
      <div className={`bloom w-[40rem] h-[38rem] top-16 right-[2%] opacity-70 ${isVip ? 'bloom-vip' : 'bloom-warm'}`} />
      <div className={`bloom w-[36rem] h-[34rem] -bottom-40 left-[8%] opacity-70 ${isVip ? 'bloom-vip' : 'bloom-ember'}`} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block whitespace-nowrap text-[9px] sm:text-[11px] font-bold text-accent-deep uppercase tracking-[0.16em] sm:tracking-[0.25em] bg-paper backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-line">
            Transparante prijzen • Geen verborgen kosten
          </span>
          <h2 className="mt-4 sm:mt-5 font-display text-4xl sm:text-6xl md:text-7xl text-ink leading-[1.04]">
            Kies je <span className="accent-gradient-text">pakket</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-[13px] sm:text-base text-muted px-2">
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
                      ? 'pill-vip shadow-lg shadow-accent/40'
                      : active
                        ? 'pill-light shadow-lg'
                        : 'text-muted hover:text-ink'
                  }`}
                >
                  {t.id === 'vip' && <BeeGlyph className={`w-4 h-4 ${active ? '' : 'opacity-70'}`} />}
                  {t.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* VIP announces itself with a hive line rather than just a colour */}
        {isVip && (
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <span className="flex items-center gap-1 text-accent-deep">
              {[0, 1, 2].map((i) => (
                <BeeGlyph key={i} className="w-4 h-4" aria-hidden="true" />
              ))}
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-accent-deep">
              Volledige korf — alles inbegrepen
            </span>
          </div>
        )}

        {/* ── Device Count. Phones get a 2×2 grid of full-width targets — the
               single scrolling pill row hid options 3 and 4 off-screen. ─── */}
        <div className="mb-10 sm:mb-12">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.22em] text-muted mb-3">
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
                      ? 'pill-vip shadow-lg shadow-accent/30'
                      : 'pill-light shadow-lg'
                    : 'glass-panel glass-edge text-muted'
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
                        ? 'pill-vip shadow-lg shadow-accent/30'
                        : 'pill-light shadow-lg'
                      : 'text-muted hover:text-ink'
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
                className={`relative rounded-[2rem] p-6 sm:p-8 flex flex-col ${
                  best
                    ? `${isVip ? 'glass-panel-vip' : 'glass-panel-accent'} z-20`
                    : 'glass-panel glass-edge'
                }`}
              >
                {/* VIP turns the whole grid into a hive: honeycomb on every
                    pack, not just the best deal. */}
                {isVip && !best && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[2rem] honeycomb-tint opacity-[0.05] pointer-events-none"
                  />
                )}

                {/* The hive dressing that marks out the best deal: a honeycomb
                    tile and a bee on the badge. */}
                {best && (
                  <>
                    <div
                      aria-hidden="true"
                      className={`absolute inset-0 rounded-[2rem] honeycomb-tint pointer-events-none ${
                        isVip ? 'opacity-[0.12]' : 'opacity-[0.07]'
                      }`}
                    />
                    <div
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase shadow-lg flex items-center gap-1.5 whitespace-nowrap ${
                        isVip ? 'pill-vip shadow-accent/50' : 'pill-light shadow-accent/45'
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
                      isVip ? 'text-accent-deep' : 'text-accent-deep'
                    }`}
                  >
                    {pack.label}
                  </p>
                  <p
                    className={`mt-3 text-5xl sm:text-[3.4rem] leading-none font-bold tracking-tight ${
                      isVip ? 'vip-gradient-text' : 'text-ink'
                    }`}
                  >
                    {formatPrice(price)}
                  </p>
                  <p className="mt-2.5 text-xs text-muted">≈ {formatPrice(perMonth)} per maand</p>

                  <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted">
                    <Monitor className={`w-3.5 h-3.5 ${isVip ? 'text-accent-deep' : 'text-accent'}`} />
                    {devices} {devices === 1 ? 'apparaat inbegrepen' : 'apparaten inbegrepen'}
                  </p>
                </div>

                {/* CTA */}
                <button
                  onClick={() => onOpenOrderModal(pack.planId)}
                  className={`mt-6 w-full py-4 text-sm font-bold rounded-full flex items-center justify-center gap-2 ${
                    isVip ? 'pill-vip shadow-lg shadow-accent/35' : 'pill-light'
                  }`}
                >
                  <WhatsAppIcon className={`w-4 h-4 ${isVip ? 'text-[#0E5B2A]' : 'text-[#25D366]'}`} />
                  {isVip ? 'Word VIP Nu' : 'Bestel Nu'}
                </button>

                <div className="my-6 h-px bg-paper" />

                {/* What's in the pack */}
                <div className="flex items-center gap-2.5 mb-5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.16em] ${
                      isVip
                        ? 'bg-accent/20 text-accent-deep border border-accent/55'
                        : 'bg-accent/15 text-accent-deep border border-accent/45'
                    }`}
                  >
                    {activeTier.name}
                  </span>
                  <h3 className="text-sm font-bold text-ink">{activeTier.headline}</h3>
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
              <h4 className="text-sm font-semibold text-ink">
                Weet je niet welk pakket bij je past?
              </h4>
              <p className="text-xs text-muted mt-0.5">
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
          <div className="relative inline-flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-muted glass-panel glass-edge px-6 sm:px-7 py-4 sm:py-3.5 rounded-3xl sm:rounded-full">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent" /> Creditcard, PayPal, overboeking of crypto
            </span>
            <span className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-accent" /> M3U- &amp; Xtream-login via de chat
            </span>
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-accent-deep" /> 7 dagen niet-goed-geld-terug
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
