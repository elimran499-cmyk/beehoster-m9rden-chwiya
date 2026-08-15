import React, { useState } from 'react';
import { SAMPLE_CHANNELS } from '../data/iptvData';
import { ChannelItem } from '../types';
import { Sparkles, Radio } from 'lucide-react';
import { whatsAppLink } from '../data/contact';

/* Generated monogram logo — a small colour-coded wordmark tile so every channel
   has a "logo" without pulling in real broadcaster artwork. The ramp stays
   inside the accent family with two cooler outliers for variety; every stop is
   light enough to carry the ink monogram set on top of it. */
const LOGO_GRADIENTS = [
  'from-[#E11D48] to-[#D98324]',
  'from-[#F9A8C0] to-[#E11D48]',
  'from-[#E9A178] to-[#D97757]',
  'from-[#C3B5E3] to-[#9C8AD1]',
  'from-[#9FD3D8] to-[#6FB3BC]',
  'from-[#E8C86A] to-[#BE123C]',
];

const ChannelLogo: React.FC<{ channel: ChannelItem; className?: string; textClassName?: string }> = ({
  channel,
  className = 'w-9 h-9 rounded-xl',
  textClassName = 'text-[10px]',
}) => {
  const [artworkFailed, setArtworkFailed] = useState(false);
  const showArtwork = channel.logo && !artworkFailed;

  /* Most broadcaster marks are dark ink drawn for light backgrounds, so the
     plate is white by default and flips dark for the few light-ink marks. */
  if (showArtwork) {
    return (
      <span
        className={`relative flex items-center justify-center overflow-hidden shrink-0 border ${
          channel.logoTone === 'light' ? 'bg-ink/85 border-ink/20' : 'bg-white border-line'
        } ${className}`}
      >
        <img
          src={channel.logo}
          alt={`Logo van ${channel.name}`}
          loading="lazy"
          onError={() => setArtworkFailed(true)}
          className="w-full h-full object-contain p-1"
        />
        <span className="absolute -bottom-1 -right-1 text-[10px] leading-none drop-shadow">{channel.flag}</span>
      </span>
    );
  }

  const gradient = LOGO_GRADIENTS[Number(channel.id) % LOGO_GRADIENTS.length];
  return (
    <span
      className={`relative bg-gradient-to-br ${gradient} border border-line flex items-center justify-center overflow-hidden shrink-0 ${className}`}
    >
      <span className={`font-display uppercase tracking-tight text-ink ${textClassName}`}>
        {channel.logoText}
      </span>
      <span className="absolute -bottom-1 -right-1 text-[10px] leading-none drop-shadow">{channel.flag}</span>
    </span>
  );
};

/* One tile on the drifting rails — the broadcaster mark on its own. */
const ChannelChip: React.FC<{ channel: ChannelItem }> = ({ channel }) => (
  <ChannelLogo
    channel={channel}
    className="w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-2xl"
    textClassName="text-sm"
  />
);

export const ChannelExplorer: React.FC = () => {
  const half = Math.ceil(SAMPLE_CHANNELS.length / 2);
  /* Each half of a marquee track must be wider than the viewport or the loop
     leaves gaps — the logo chips are narrow, so repeat the list three times. */
  const repeat = <T,>(items: T[]) => [...items, ...items, ...items];
  const railTop = repeat(SAMPLE_CHANNELS.slice(0, half));
  const railBottom = repeat(SAMPLE_CHANNELS.slice(half));

  return (
    <section id="channels" className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-accent-deep uppercase tracking-widest bg-accent-soft px-3.5 py-1 rounded-full border border-accent/35">
            80.000+ LIVE ZENDERS & 95.000+ VOD
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.06]">
            Ontdek ons <span className="accent-gradient-text">complete Nederlandse zender</span>aanbod
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted">
            Alle Nederlandse zenders in origineel 4K Ultra HD en 60FPS, zonder compressie.
          </p>
        </div>

      </div>

      {/* ── Live Channel Rails: one drifting left, one drifting right ─────── */}
      <div className="relative mb-14 space-y-4">
        <div className="mask-fade-x overflow-hidden">
          <div className="animate-marquee gap-3 items-stretch" style={{ '--marquee-duration': '52s' } as React.CSSProperties}>
            {[...railTop, ...railTop].map((channel, i) => (
              <ChannelChip key={`t-${channel.id}-${i}`} channel={channel} />
            ))}
          </div>
        </div>

        <div className="mask-fade-x overflow-hidden">
          <div className="animate-marquee-reverse gap-3 items-stretch" style={{ '--marquee-duration': '60s' } as React.CSSProperties}>
            {[...railBottom, ...railBottom].map((channel, i) => (
              <ChannelChip key={`b-${channel.id}-${i}`} channel={channel} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-accent-soft via-surface to-accent-soft border border-accent/35 shadow-[0_20px_46px_-28px_rgba(159,18,57,0.4)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-accent/15 text-accent-deep border border-accent/45 shrink-0">
              <Radio className="w-6 h-6 animate-pulse text-accent" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-ink">Zoek je de volledige zenderlijst of het PPV-programma?</h4>
              <p className="text-xs sm:text-sm text-muted mt-0.5">
                Wij stellen M3U-playlists op maat samen met alle Nederlandse zenders: NPO, RTL, SBS, Talpa, Ziggo Sport, ESPN en Viaplay.
              </p>
            </div>
          </div>

          <a
            href={whatsAppLink(
              'Hoi BEEHOSTER! Kunnen jullie mij de volledige zenderlijst sturen? ' +
                'Ik ben ook benieuwd naar de M3U-playlist per land en het PPV-programma.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 text-xs font-bold accent-button-gradient rounded-xl shadow-lg shadow-accent/30 hover:scale-105 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Vraag de volledige zenderlijst aan</span>
          </a>
        </div>

      </div>
    </section>
  );
};
