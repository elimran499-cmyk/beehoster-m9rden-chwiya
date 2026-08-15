import React, { useState } from 'react';
import { Play, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { whatsAppLink } from '../data/contact';

interface FilmCard {
  id: string;
  title: string;
  year: string;
  genre: string;
  /** Optional real artwork. Drop a poster URL here and it replaces the generated art. */
  poster?: string;
  gradient: string;
  glow: string;
  badge?: string;
}

/* VOD wall. `poster` holds the artwork URL; the gradient/glow pair stays as the
   fallback that renders if an image fails to load. */
const films: FilmCard[] = [
  { id: 'f1', title: 'Dune: Part Two', year: '2024', genre: 'Sci-Fi Epic', poster: '/posters/f1.jpg', gradient: 'from-orange-600/60 via-[#2A0B08] to-black', glow: 'rgba(255,122,60,0.62)', badge: 'DOLBY VISION' },
  { id: 'f2', title: 'Oppenheimer', year: '2023', genre: 'Drama', poster: '/posters/f2.jpg', gradient: 'from-amber-600/55 via-[#251005] to-black', glow: 'rgba(255,154,46,0.5)' },
  { id: 'f3', title: 'The Batman', year: '2022', genre: 'Crime Thriller', poster: '/posters/f3.jpg', gradient: 'from-rose-700/55 via-[#22060F] to-black', glow: 'rgba(255,61,139,0.48)', badge: '4K HDR' },
  { id: 'f4', title: 'Interstellar', year: '2014', genre: 'Space Odyssey', poster: '/posters/f4.jpg', gradient: 'from-red-700/50 via-[#210708] to-black', glow: 'rgba(239,68,68,0.45)' },
  { id: 'f5', title: 'Blade Runner 2049', year: '2017', genre: 'Neo Noir', poster: '/posters/f5.jpg', gradient: 'from-yellow-600/50 via-[#231604] to-black', glow: 'rgba(255,209,102,0.5)', badge: 'ATMOS' },
  { id: 'f6', title: 'Top Gun: Maverick', year: '2022', genre: 'Action', poster: '/posters/f6.jpg', gradient: 'from-fuchsia-700/50 via-[#1E0620] to-black', glow: 'rgba(217,70,239,0.42)' },
  { id: 'f7', title: 'John Wick 4', year: '2023', genre: 'Action', poster: '/posters/f7.jpg', gradient: 'from-orange-700/55 via-[#240C05] to-black', glow: 'rgba(234,88,12,0.5)', badge: '60 FPS' },
  { id: 'f8', title: 'Joker', year: '2019', genre: 'Psych. Thriller', poster: '/posters/f8.jpg', gradient: 'from-pink-700/50 via-[#20070F] to-black', glow: 'rgba(255,61,139,0.44)' },
  { id: 'f9', title: 'Avatar: The Way of Water', year: '2022', genre: 'Sci-Fi Epic', poster: '/posters/f9.jpg', gradient: 'from-amber-700/55 via-[#221104] to-black', glow: 'rgba(245,158,11,0.5)', badge: '4K HDR' },
  { id: 'f10', title: 'Gladiator II', year: '2024', genre: 'Historical', poster: '/posters/f10.jpg', gradient: 'from-stone-600/50 via-[#1A1210] to-black', glow: 'rgba(214,211,209,0.3)' },
  { id: 'f11', title: 'Tenet', year: '2020', genre: 'Thriller', poster: '/posters/f11.jpg', gradient: 'from-rose-800/55 via-[#1E060C] to-black', glow: 'rgba(225,29,72,0.46)' },
  { id: 'f12', title: 'Sicario', year: '2015', genre: 'Crime', poster: '/posters/f12.jpg', gradient: 'from-orange-800/50 via-[#200A04] to-black', glow: 'rgba(194,65,12,0.45)', badge: 'ATMOS' },
  { id: 'f13', title: 'Deadpool & Wolverine', year: '2024', genre: 'Action Comedy', poster: '/posters/f13.jpg', gradient: 'from-red-600/50 via-[#280708] to-black', glow: 'rgba(255,74,43,0.52)', badge: '4K HDR' },
  { id: 'f14', title: 'Inception', year: '2010', genre: 'Sci-Fi', poster: '/posters/f14.jpg', gradient: 'from-yellow-700/45 via-[#1F1503] to-black', glow: 'rgba(202,138,4,0.4)' },
  { id: 'f15', title: 'Furiosa', year: '2024', genre: 'Post-Apocalyptic', poster: '/posters/f15.jpg', gradient: 'from-orange-500/55 via-[#2B1206] to-black', glow: 'rgba(255,154,46,0.55)', badge: '60 FPS' },
  { id: 'f16', title: 'The Dark Knight', year: '2008', genre: 'Crime Thriller', poster: '/posters/f16.jpg', gradient: 'from-fuchsia-800/50 via-[#1C0619] to-black', glow: 'rgba(192,38,211,0.45)' },
];

/* One generated poster tile — layered gradient art, grain, and editorial credits block. */
const FilmPoster: React.FC<{ film: FilmCard; compact?: boolean; bare?: boolean; eager?: boolean }> = ({
  film,
  compact = false,
  bare = false,
  eager = false,
}) => {
  const [artworkFailed, setArtworkFailed] = useState(false);
  const showArtwork = film.poster && !artworkFailed;

  return (
  <div className="group relative w-full aspect-[2/3] rounded-2xl overflow-hidden border border-ink/10 bg-zinc-900 shadow-[0_18px_38px_-22px_rgba(22,21,15,0.55)] transition-all duration-500 hover:border-accent/60 hover:shadow-[0_22px_46px_-20px_rgba(159,18,57,0.5)]">
    {/* Poster Artwork */}
    {showArtwork ? (
      <img
        src={film.poster}
        alt={`${film.title} poster`}
        loading={eager ? 'eager' : 'lazy'}
        onError={() => setArtworkFailed(true)}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    ) : (
      <>
        <div className={`absolute inset-0 bg-gradient-to-b ${film.gradient} transition-transform duration-700 group-hover:scale-105`} />
        <div
          className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[150%] aspect-square rounded-full blur-3xl opacity-60"
          style={{ background: `radial-gradient(circle, ${film.glow} 0%, transparent 65%)` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px)] bg-[size:1.5rem_100%]" />
      </>
    )}

    {/* Grain + Vignette */}
    <div className="absolute inset-0 film-grain opacity-[0.12] mix-blend-overlay pointer-events-none" />
    {!bare && (!showArtwork || compact) && (
      <div
        className={`absolute inset-0 bg-gradient-to-t ${
          showArtwork ? 'from-black/85 via-black/15' : 'from-black via-black/25'
        } to-transparent`}
      />
    )}

    {/* Quality Badge */}
    {film.badge && !compact && !bare && (
      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-accent/50 text-[9px] font-bold tracking-widest text-accent-lite">
        {film.badge}
      </span>
    )}

    {/* Hover Play Affordance */}
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-xl shadow-black/50">
        <Play className="w-5 h-5 fill-black ml-0.5" />
      </span>
    </div>

    {/* Credits Block — only where the artwork doesn't already say it */}
    {!bare && (!showArtwork || compact) && (
    <div className={compact ? 'absolute inset-x-0 bottom-0 p-2.5' : 'absolute inset-x-0 bottom-0 p-3.5'}>
      <div className={`h-px bg-accent-lite ${compact ? 'w-5 mb-1.5' : 'w-8 mb-2'}`} />
      <h3
        className={`uppercase leading-tight font-semibold text-white tracking-wide ${
          compact ? 'text-[11px] line-clamp-2' : 'text-[15px]'
        }`}
      >
        {film.title}
      </h3>
      <p className={`mt-0.5 uppercase tracking-[0.18em] text-zinc-400 ${compact ? 'text-[9px]' : 'text-[10px]'}`}>
        {compact ? film.year : `${film.year} · ${film.genre}`}
      </p>
    </div>
    )}
  </div>
  );
};

/* Full-bleed catalogue rail — posters at full strength drifting sideways so
   the artwork stays readable instead of orbiting past. The two tiers
   ('front' captioned and large, 'back' small and dimmed) give the strip depth
   rather than two identical bands. */
const PosterRail: React.FC<{
  items: FilmCard[];
  direction?: 'left' | 'right';
  duration: string;
  tier?: 'front' | 'back';
}> = ({ items, direction = 'left', duration, tier = 'front' }) => {
  const front = tier === 'front';

  return (
    <div className={`mask-fade-x overflow-hidden ${front ? '' : 'opacity-60'}`}>
      <div
        className={direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'}
        style={{ '--marquee-duration': duration } as React.CSSProperties}
      >
        {[...items, ...items].map((film, i) => (
          <div
            key={`${film.id}-${i}`}
            className={`shrink-0 ${front ? 'w-[9.5rem] sm:w-[11rem] pr-3.5 sm:pr-4' : 'w-[5.5rem] sm:w-[6.5rem] pr-2.5 sm:pr-3'}`}
          >
            {/* The duplicate half only exists for the seamless loop, so it can load lazily. */}
            <FilmPoster film={film} bare eager={front && i < items.length} />
            {front && (
              <>
                <p className="mt-2.5 uppercase text-[11px] font-semibold leading-tight tracking-wide text-ink truncate">
                  {film.title}
                </p>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-muted truncate">
                  {film.year} · {film.genre}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* Centred editorial masthead. The old build ran a four-column scrolling film
   wall down the right half and a blurred poster collage behind the type on
   phones; both fought the copy for attention and neither survived the move to
   a light page, where dark artwork behind text reads as dirt. The catalogue
   now lives in one honest band below the fold line instead, and the column
   above it is a single centred measure on every screen. */
export const Hero: React.FC = () => (
  <section
    id="hero"
    className="relative overflow-hidden bg-page pt-28 sm:pt-32 lg:pt-36 pb-14 lg:pb-16"
  >
    {/* ── Backdrop: warm paper with a accent wash and faint light trails ─── */}
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(115%_85%_at_50%_18%,#FFFFFF_0%,#FDF8EE_44%,#F7F1E4_74%,#F1E9DA_100%)]" />

      <div className="absolute top-[18%] left-[8%] w-[34rem] h-px light-trail blur-[2px] opacity-60 -rotate-[14deg]" />
      <div className="absolute top-[58%] right-[6%] w-[28rem] h-px light-trail blur-[3px] opacity-45 rotate-[11deg]" />

      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[46rem] h-[34rem] bloom bloom-warm opacity-70" />
      <div className="absolute top-[38%] -left-32 w-[32rem] h-[28rem] bloom bloom-ember opacity-50" />
      <div className="absolute top-[30%] -right-28 w-[30rem] h-[26rem] bloom bloom-ember opacity-45" />
    </div>

    {/* ── Centred copy column ──────────────────────────────────────────── */}
    <div className="relative z-30 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

      {/* Masthead. Instrument Serif runs tighter than the condensed poster
          face it replaced, so the leading opens up and the tracking goes back
          to normal — a serif this size doesn't want negative letter-spacing.
          clamp() keeps it growing with the screen without blowing past 5.75rem
          on a wide phone or collapsing on a 320px one. Both lines stay short
          enough to hold on one line at 320px, and the figures live in the spec
          strip below where they can be read rather than shouted. */}
      <h1 className="font-display text-ink leading-[0.94] tracking-[-0.01em] text-[clamp(3.5rem,15vw,5.75rem)] lg:text-[6.5rem]">
        <span className="block">Alle zenders.</span>
        <span className="block italic accent-gradient-text">Nul gehaper.</span>
      </h1>

      {/* The one rule in the column, so the standfirst reads as a standfirst
          rather than a stray line — centred now that the copy is. */}
      <span aria-hidden="true" className="block mx-auto mt-7 w-16 h-px bg-accent/60" />

      <p className="mt-6 text-[15px] sm:text-lg leading-relaxed text-muted max-w-xl mx-auto">
        Live sport, films en series in 4K UHD — op je smart-tv, Firestick, telefoon of laptop.
        Binnen vijf minuten actief, maandelijks opzegbaar.
      </p>

      {/* Action CTAs */}
      <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-center gap-3">
        <a
          href="#pricing"
          className="px-5 sm:px-7 py-[1.1rem] sm:py-4 text-[15px] sm:text-sm font-bold accent-button-gradient rounded-full shadow-[0_16px_34px_-16px_rgba(190,18,60,0.95)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 group"
        >
          <Sparkles className="w-4.5 h-4.5 shrink-0 fill-current group-hover:rotate-12 transition-transform" />
          <span className="whitespace-nowrap">Abonnement nemen</span>
          <span className="shrink-0 bg-ink/15 px-1.5 sm:px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] tracking-wider uppercase font-extrabold">
            Bespaar 55%
          </span>
        </a>

        <a
          href={whatsAppLink('Hoi BEEHOSTER! Ik wil graag een IPTV-abonnement bestellen.')}
          target="_blank"
          rel="noopener noreferrer"
          className="relative px-7 py-[1.1rem] sm:py-4 text-[15px] sm:text-sm font-semibold text-ink glass-panel rounded-full hover:border-[#25D366]/60 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5"
        >
          <WhatsAppIcon className="w-4.5 h-4.5 text-[#25D366]" />
          <span>Bestel via WhatsApp</span>
        </a>
      </div>

      {/* Spec strip */}
      <div className="mt-10 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-surface/70 backdrop-blur-sm py-4 max-w-lg mx-auto">
        {[
          { value: '80.000+', label: 'Zenders' },
          { value: '200.000+', label: 'Films & series' },
          { value: '99,99%', label: 'Uptime' },
        ].map((stat) => (
          <div key={stat.label} className="px-2">
            <p className="font-display text-[1.5rem] lg:text-[1.75rem] leading-none accent-gradient-text">
              {stat.value}
            </p>
            <p className="mt-1.5 uppercase text-[9px] font-semibold tracking-[0.2em] text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* ── Full-bleed catalogue band ────────────────────────────────────── */}
    <div className="relative z-20 mt-12 sm:mt-16 pt-8 border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between gap-4 mb-5">
          <span className="flex items-center gap-2 uppercase text-[11px] font-semibold tracking-[0.3em] text-accent-deep">
            <span className="flex h-1.5 w-1.5 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
            </span>
            Nu te zien
          </span>
          <span className="uppercase text-[10px] font-semibold tracking-[0.18em] text-muted">
            4K · HDR · Atmos
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <PosterRail items={films.slice(0, 8)} direction="left" duration="58s" tier="front" />
        <PosterRail items={films.slice(8, 16)} direction="right" duration="74s" tier="back" />
      </div>
    </div>
  </section>
);
