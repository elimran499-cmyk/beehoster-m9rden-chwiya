import React, { useState } from 'react';
import { Play, Star, CheckCircle2, Sparkles, BadgeCheck } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { whatsAppLink } from '../data/contact';

interface HeroProps {
  onOpenOrderModal: (planId?: string) => void;
}

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
  { id: 'f1', title: 'Dune: Part Two', year: '2024', genre: 'Sci-Fi Epic', poster: 'https://upload.wikimedia.org/wikipedia/en/5/52/Dune_Part_Two_poster.jpeg', gradient: 'from-orange-600/60 via-[#2A0B08] to-black', glow: 'rgba(255,122,60,0.62)', badge: 'DOLBY VISION' },
  { id: 'f2', title: 'Oppenheimer', year: '2023', genre: 'Drama', poster: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg', gradient: 'from-amber-600/55 via-[#251005] to-black', glow: 'rgba(255,154,46,0.5)' },
  { id: 'f3', title: 'The Batman', year: '2022', genre: 'Crime Thriller', poster: 'https://upload.wikimedia.org/wikipedia/en/f/ff/The_Batman_%28film%29_poster.jpg', gradient: 'from-rose-700/55 via-[#22060F] to-black', glow: 'rgba(255,61,139,0.48)', badge: '4K HDR' },
  { id: 'f4', title: 'Interstellar', year: '2014', genre: 'Space Odyssey', poster: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg', gradient: 'from-red-700/50 via-[#210708] to-black', glow: 'rgba(239,68,68,0.45)' },
  { id: 'f5', title: 'Blade Runner 2049', year: '2017', genre: 'Neo Noir', poster: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Blade_Runner_2049_poster.png', gradient: 'from-yellow-600/50 via-[#231604] to-black', glow: 'rgba(255,209,102,0.5)', badge: 'ATMOS' },
  { id: 'f6', title: 'Top Gun: Maverick', year: '2022', genre: 'Action', poster: 'https://upload.wikimedia.org/wikipedia/en/1/13/Top_Gun_Maverick_Poster.jpg', gradient: 'from-fuchsia-700/50 via-[#1E0620] to-black', glow: 'rgba(217,70,239,0.42)' },
  { id: 'f7', title: 'John Wick 4', year: '2023', genre: 'Action', poster: 'https://upload.wikimedia.org/wikipedia/en/d/d0/John_Wick_-_Chapter_4_promotional_poster.jpg', gradient: 'from-orange-700/55 via-[#240C05] to-black', glow: 'rgba(234,88,12,0.5)', badge: '60 FPS' },
  { id: 'f8', title: 'Joker', year: '2019', genre: 'Psych. Thriller', poster: 'https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg', gradient: 'from-pink-700/50 via-[#20070F] to-black', glow: 'rgba(255,61,139,0.44)' },
  { id: 'f9', title: 'Avatar: The Way of Water', year: '2022', genre: 'Sci-Fi Epic', poster: 'https://upload.wikimedia.org/wikipedia/en/5/54/Avatar_The_Way_of_Water_poster.jpg', gradient: 'from-amber-700/55 via-[#221104] to-black', glow: 'rgba(245,158,11,0.5)', badge: '4K HDR' },
  { id: 'f10', title: 'Gladiator II', year: '2024', genre: 'Historical', poster: 'https://upload.wikimedia.org/wikipedia/en/0/04/Gladiator_II_%282024%29_poster.jpg', gradient: 'from-stone-600/50 via-[#1A1210] to-black', glow: 'rgba(214,211,209,0.3)' },
  { id: 'f11', title: 'Tenet', year: '2020', genre: 'Thriller', poster: 'https://upload.wikimedia.org/wikipedia/en/1/14/Tenet_movie_poster.jpg', gradient: 'from-rose-800/55 via-[#1E060C] to-black', glow: 'rgba(225,29,72,0.46)' },
  { id: 'f12', title: 'Sicario', year: '2015', genre: 'Crime', poster: 'https://upload.wikimedia.org/wikipedia/en/4/4b/Sicario_poster.jpg', gradient: 'from-orange-800/50 via-[#200A04] to-black', glow: 'rgba(194,65,12,0.45)', badge: 'ATMOS' },
  { id: 'f13', title: 'Deadpool & Wolverine', year: '2024', genre: 'Action Comedy', poster: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Deadpool_%26_Wolverine_poster.jpg', gradient: 'from-red-600/50 via-[#280708] to-black', glow: 'rgba(255,74,43,0.52)', badge: '4K HDR' },
  { id: 'f14', title: 'Inception', year: '2010', genre: 'Sci-Fi', poster: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg', gradient: 'from-yellow-700/45 via-[#1F1503] to-black', glow: 'rgba(202,138,4,0.4)' },
  { id: 'f15', title: 'Furiosa', year: '2024', genre: 'Post-Apocalyptic', poster: 'https://upload.wikimedia.org/wikipedia/en/3/34/Furiosa_A_Mad_Max_Saga.jpg', gradient: 'from-orange-500/55 via-[#2B1206] to-black', glow: 'rgba(255,154,46,0.55)', badge: '60 FPS' },
  { id: 'f16', title: 'The Dark Knight', year: '2008', genre: 'Crime Thriller', poster: 'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg', gradient: 'from-fuchsia-800/50 via-[#1C0619] to-black', glow: 'rgba(192,38,211,0.45)' },
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
  <div className="group relative w-full aspect-[2/3] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl shadow-black/80 transition-all duration-500 hover:border-[#FF5C3A]/60 hover:shadow-[#FF5C3A]/20">
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
      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-[#FF5C3A]/40 text-[9px] font-bold tracking-widest text-[#FFD166]">
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
      <div className={`h-px bg-[#FF5C3A] ${compact ? 'w-5 mb-1.5' : 'w-8 mb-2'}`} />
      <h3
        className={`font-condensed uppercase leading-tight font-semibold text-white tracking-wide ${
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

/* Phone showcase rail — posters at full strength drifting sideways so the
   artwork is actually readable instead of orbiting past. The two tiers
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
    <div className={`mask-fade-x overflow-hidden ${front ? '' : 'opacity-55'}`}>
      <div
        className={direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'}
        style={{ '--marquee-duration': duration } as React.CSSProperties}
      >
        {[...items, ...items].map((film, i) => (
          <div key={`${film.id}-${i}`} className={`shrink-0 ${front ? 'w-[9.5rem] pr-3.5' : 'w-[5.5rem] pr-2.5'}`}>
            {/* The duplicate half only exists for the seamless loop, so it can load lazily. */}
            <FilmPoster film={film} bare eager={front && i < items.length} />
            {front && (
              <>
                <p className="mt-2.5 font-condensed uppercase text-[11px] leading-tight tracking-wide text-zinc-200 truncate">
                  {film.title}
                </p>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-zinc-500 truncate">
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

/* Library counter that fades in under the films, holds, then leaves — the two
   figures alternate forever. */
const LibraryCounter: React.FC<{ className?: string }> = ({ className = '' }) => {
  const stats = [
    { value: '+200.000', label: 'Films' },
    { value: '+80.000', label: 'Zenders' },
  ];

  return (
    /* Backing plate: the figures sit over poster artwork, and white-on-busy
       was unreadable half the time. */
    <div
      className={`h-[5.5rem] w-56 rounded-3xl bg-black/45 backdrop-blur-md border border-white/10 ${className}`}
      aria-hidden="true"
    >
      {stats.map((stat, i) => (
        <div
          key={stat.value}
          className="absolute inset-0 flex flex-col items-center justify-center animate-stat-cycle"
          style={{ animationDelay: `${i * 5.5}s` }}
        >
          <span className="font-display text-[2.6rem] leading-none tracking-tight accent-gradient-text">
            {stat.value}
          </span>
          <span className="mt-1.5 font-condensed uppercase text-[10px] tracking-[0.34em] text-zinc-400">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
};

/* A seamlessly looping column of posters (list rendered twice for the -50% loop). */
const PosterColumn: React.FC<{ items: FilmCard[]; direction: 'up' | 'down'; duration: string; className?: string }> = ({
  items,
  direction,
  duration,
  className = '',
}) => (
  <div className={`flex-1 overflow-hidden ${className}`}>
    <div
      className={`flex flex-col gap-4 sm:gap-5 ${direction === 'up' ? 'animate-scroll-up' : 'animate-scroll-down'}`}
      style={{ '--scroll-duration': duration } as React.CSSProperties}
    >
      {[...items, ...items].map((film, i) => (
        <FilmPoster key={`${film.id}-${i}`} film={film} />
      ))}
    </div>
  </div>
);

export const Hero: React.FC<HeroProps> = ({ onOpenOrderModal }) => {
  const colA = films.slice(0, 4);
  const colB = films.slice(4, 8);
  const colC = films.slice(8, 12);
  const colD = films.slice(12, 16);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-pitch-black pt-20 sm:pt-24 lg:pt-28 pb-14 lg:pb-16 flex items-center"
    >
      {/* ── Dimensional Backdrop: sapphire depth, drifting panels, light trails ── */}
      <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Near-black to dark sapphire */}
        <div className="absolute inset-0 bg-[radial-gradient(125%_95%_at_62%_42%,#3B1024_0%,#23091A_45%,#180712_72%,#100509_100%)]" />

        {/* Abstract blurred UI panels, far back */}
        <div className="hidden lg:block absolute top-[14%] left-[26%] w-72 h-44 rounded-3xl glass-card opacity-25 blur-[7px] -rotate-6" />
        <div className="hidden lg:block absolute top-[54%] left-[19%] w-56 h-32 rounded-3xl glass-card opacity-20 blur-[9px] rotate-3" />
        <div className="hidden lg:block absolute top-[30%] left-[58%] w-64 h-40 rounded-3xl glass-card opacity-[0.14] blur-[11px] rotate-[7deg]" />
        <div className="hidden lg:flex absolute top-[70%] left-[34%] w-40 h-12 rounded-full glass-card opacity-25 blur-[5px] -rotate-3 items-center gap-2 px-4">
          <span className="w-3 h-3 rounded-full border-2 border-white/50" />
          <span className="h-1.5 flex-1 rounded-full bg-white/25" />
        </div>

        {/* Distant glowing light trails */}
        <div className="absolute top-[22%] left-[12%] w-[34rem] h-px light-trail blur-[2px] opacity-45 -rotate-[17deg]" />
        <div className="absolute top-[63%] left-[24%] w-[28rem] h-px light-trail blur-[3px] opacity-35 -rotate-[12deg]" />
        <div className="absolute top-[41%] left-[46%] w-[22rem] h-px light-trail blur-[2px] opacity-30 rotate-[9deg]" />

        {/* Ambient blooms */}
        <div className="lg:hidden absolute -top-20 -left-24 w-[26rem] h-[24rem] bloom bloom-warm opacity-40" />
        <div className="lg:hidden absolute top-[42%] -right-28 w-[24rem] h-[22rem] bloom bloom-ember opacity-45" />
        <div className="absolute top-1/4 -left-32 w-[620px] h-[560px] aurora-soft opacity-70" />
        <div className="absolute -bottom-32 left-1/4 w-[520px] h-[420px] aurora opacity-40" />
      </div>

      {/* ── MOBILE: out-of-focus poster corner behind the masthead. A still
             collage rather than three animated, blurred columns — at this
             opacity the motion never read, it only cost the phone 24 moving
             blurred images. The sharp artwork lives in the rail below. ─── */}
      <div aria-hidden="true" className="lg:hidden absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-24 -right-12 w-[68%] grid grid-cols-2 gap-3 rotate-[7deg] opacity-[0.11] blur-[10px]">
          {films.slice(0, 4).map((film) => (
            <div key={film.id} className={`aspect-[2/3] rounded-2xl overflow-hidden bg-gradient-to-b ${film.gradient}`}>
              {film.poster && (
                <img src={film.poster} alt="" loading="lazy" className="w-full h-full object-cover" />
              )}
            </div>
          ))}
        </div>

        {/* Scrim so the type always sits on a settled field */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#14070F]/75 via-[#14070F]/92 to-[#14070F]" />
        <div className="absolute inset-0 film-grain opacity-[0.07] mix-blend-overlay" />
      </div>

      {/* ── RIGHT: Full-Bleed Film Wall (in front of the 3D elements) ─ */}
      <div className="film-wall hidden lg:block absolute inset-y-0 right-0 w-[53%] xl:w-[52%] z-[3]">
        <div className="absolute inset-0 flex gap-4 px-4 -rotate-[3deg] scale-[1.12]">
          <PosterColumn items={colA} direction="up" duration="60s" />
          <PosterColumn items={colB} direction="down" duration="72s" className="mt-[-5rem]" />
          <PosterColumn items={colC} direction="up" duration="52s" className="mt-[-2rem]" />
          <PosterColumn items={colD} direction="down" duration="66s" className="hidden xl:block mt-[-7rem]" />
        </div>
        {/* Soft edge blend on both sides of the wall */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#14070F]/60 via-transparent to-[#14070F]/60 pointer-events-none" />
      </div>

      {/* ══ GIANT VERTICAL LETTERING ══════════════════════════════ */}
      {/* Sized off viewport *height*, not width — the string runs vertically, so
          a vw-based size sliced the number in half on anything but a very tall
          window. Centred on the first screenful so it's whole on arrival. */}
      <div
        aria-hidden="true"
        className="hidden lg:flex absolute top-0 h-[100svh] max-h-full left-[47%] xl:left-[48%] z-[24] flex-col justify-center pointer-events-none select-none outline-glow"
      >
        <span className="font-display text-outline-hero text-[clamp(2.25rem,7vh,4.25rem)] leading-none tracking-tight whitespace-nowrap [writing-mode:vertical-rl] rotate-180">
          200.000+ films
        </span>
      </div>

      {/* Library counter, under the films */}
      <LibraryCounter className="hidden lg:flex absolute bottom-[9%] right-[14%] xl:right-[16%] z-[10] pointer-events-none" />

      {/* ── LEFT: Rotated Masthead Rail ───────────────────────────── */}
      <div className="hidden lg:flex absolute left-7 inset-y-0 z-30 items-center pointer-events-none">
        <div className="flex items-start gap-3">
          <div className="w-px h-40 bg-white/40 mt-1" />
          <div className="flex items-center gap-5 [writing-mode:vertical-rl] rotate-180">
            <h2 className="font-condensed font-bold uppercase text-3xl tracking-tight text-white">
              Beehoster <span className="text-[#FF5C3A]">Cinema</span>
            </h2>
            <p className="font-editorial text-[13px] leading-snug text-zinc-400 max-h-64">
              Meer dan live televisie: een manier van kijken — 200.000+ films en series, geremasterd in 4K.
            </p>
          </div>
        </div>
      </div>

      {/* ── LEFT: Editorial Copy Block ────────────────────────────── */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Phones read this as an editorial page, not a centred template: one
            hard left edge that the kicker, masthead, rule and buttons all
            share. */}
        <div className="text-left lg:w-[46%] lg:pl-20">
          {/* Status Ribbon — one bar rather than two pills that wrap into a
              ragged second line on narrow phones. */}
          <div className="inline-flex items-center gap-2.5 sm:gap-3 px-3.5 py-2 rounded-full glass-card glass-edge mb-5">
            <span className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-zinc-200 whitespace-nowrap">
                <span className="hidden sm:inline">Anti-Freeze 9.0 · </span>99,99% online
              </span>
            </span>

            <span className="h-3.5 w-px bg-white/20 shrink-0" />

            <span className="flex items-center gap-1.5">
              <span className="flex items-center text-[#FFD166]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#FFD166]" />
                ))}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-white whitespace-nowrap">4.9</span>
              <span className="text-[10px] sm:text-[11px] text-zinc-400">Trustpilot</span>
            </span>
          </div>

          {/* Official-site marker. Clones and resellers are the norm in this
              market, so the badge names the one channel we actually answer on. */}
          <div className="inline-flex items-center gap-2.5 mb-4 px-3 py-1.5 rounded-full border border-[#FFE600]/45 bg-[#FFE600]/10">
            <BadgeCheck className="w-4 h-4 shrink-0 text-[#FFE600]" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#FFE9A8]">
              Officiële BEEHOSTER-website
            </span>
          </div>

          {/* Masthead Headline */}
          <p className="font-condensed uppercase text-[10px] sm:text-sm tracking-[0.3em] sm:tracking-[0.45em] text-[#FFD166] mb-3.5">
            Editie 09 — Premium IPTV
          </p>

          {/* Two stacked lines, same treatment on every screen. The line-height
              stays at 0.92 so the Anton ascenders can't ride up into the
              kicker above them. */}
          {/* clamp() instead of a raw vw size: the type keeps growing with the
              screen but can't blow past 5rem on a wide phone or shrink to
              nothing on a 320px one — and there's no size cliff at `sm`. */}
          <h1 className="relative z-10 font-display uppercase text-white leading-[0.88] tracking-tight text-[clamp(3.25rem,16.5vw,5rem)] lg:text-[4.4rem] xl:text-[5.2rem]">
            <span className="block drop-shadow-[0_6px_28px_rgba(0,0,0,0.9)]">20.000+</span>
            <span className="block accent-gradient-text drop-shadow-[0_6px_28px_rgba(0,0,0,0.55)]">Zenders</span>

            {/* The rule runs out from the strapline to the column edge — it ties
                the line to the masthead instead of leaving it floating. */}
            <span className="flex items-center gap-3.5 mt-3.5 lg:mt-2">
              <span className="font-condensed font-semibold text-lg sm:text-3xl lg:text-4xl tracking-[0.3em] lg:tracking-wide text-zinc-300 whitespace-nowrap">
                In 4K UHD
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#FF5C3A]/70 to-transparent lg:hidden" />
            </span>
          </h1>

          {/* Serif Standfirst */}
          {/* Same accent rule on every screen — it's the one indent in the
              column, so it reads as a standfirst rather than a stray line. */}
          <p className="mt-5 sm:mt-6 font-editorial text-[15px] sm:text-lg leading-relaxed text-zinc-300 max-w-md border-l border-[#FF5C3A]/40 pl-4 lg:pl-5">
            Geen buffering, Anti-Freeze™ 9.0-servertechnologie en activatie binnen 5 minuten op Firestick, smart-tv,
            Android en iOS. Alle sport, film &amp; PPV inbegrepen.
          </p>

          {/* Action CTAs */}
          <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href="#pricing"
              className="px-5 sm:px-7 py-[1.1rem] sm:py-4 text-[15px] sm:text-sm font-bold text-black accent-button-gradient rounded-full shadow-xl shadow-[#FF5C3A]/25 hover:shadow-[#FF5C3A]/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 group"
            >
              <Sparkles className="w-4.5 h-4.5 shrink-0 fill-black group-hover:rotate-12 transition-transform" />
              {/* Narrow phones drop "Now" so the discount chip never gets squeezed. */}
              <span className="whitespace-nowrap">Abonnement nemen</span>
              <span className="shrink-0 bg-black/20 px-1.5 sm:px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] tracking-wider uppercase font-extrabold">
                Bespaar 55%
              </span>
            </a>

            <a
              href={whatsAppLink('Hoi BEEHOSTER! Ik wil graag een IPTV-abonnement bestellen.')}
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-7 py-[1.1rem] sm:py-4 text-[15px] sm:text-sm font-semibold text-zinc-100 glass-panel glass-edge rounded-full hover:border-[#25D366]/70 hover:text-white active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5"
            >
              <WhatsAppIcon className="w-4.5 h-4.5 text-[#25D366]" />
              <span>Bestel via WhatsApp</span>
            </a>
          </div>

          {/* Trust Highlights — a contained panel on phones so the four points
              land as one reassurance block instead of four loose lines; back to
              a plain inline row from sm up. */}
          <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-[11px] text-zinc-300 sm:mt-7 sm:flex sm:flex-wrap sm:items-center sm:gap-x-6 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:text-xs sm:text-zinc-400">
            {['Binnen 5 min actief', '7 dagen geld terug', 'Geen contract', '24/7 WhatsApp-hulp'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#FF5C3A]" />
                <span className="leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── MOBILE: the numbers phones never got. Desktop carries them in the
               giant vertical lettering and the library counter; this is the
               small-screen stand-in, set as a spec strip. ──────────────── */}
        <div className="lg:hidden mt-8 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.035] py-4">
          {[
            { value: '20.000+', label: 'Zenders' },
            { value: '200.000+', label: 'Films & series' },
            { value: '99,99%', label: 'Uptime' },
          ].map((stat) => (
            <div key={stat.label} className="px-2 text-center">
              <p className="font-display text-[1.35rem] leading-none tracking-tight accent-gradient-text">
                {stat.value}
              </p>
              <p className="mt-1.5 font-condensed uppercase text-[9px] tracking-[0.2em] text-zinc-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── MOBILE: full-bleed catalogue rails ───────────────────── */}
        <div className="lg:hidden mt-10 pt-7 border-t border-white/10">
          <div className="flex items-baseline justify-between gap-4 mb-4">
            <span className="flex items-center gap-2 font-condensed uppercase text-[11px] tracking-[0.3em] text-[#FFD166]">
              <span className="flex h-1.5 w-1.5 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5C3A] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF5C3A]" />
              </span>
              Nu te zien
            </span>
            <span className="font-condensed uppercase text-[10px] tracking-[0.18em] text-zinc-500">
              4K · HDR · Atmos
            </span>
          </div>

          <div className="-mx-4 sm:-mx-6 space-y-4">
            <PosterRail items={films.slice(0, 8)} direction="left" duration="52s" tier="front" />
            <PosterRail items={films.slice(8, 16)} direction="right" duration="68s" tier="back" />
          </div>
        </div>
      </div>
    </section>
  );
};
