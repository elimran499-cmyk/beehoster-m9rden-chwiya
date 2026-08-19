import React, {useMemo, useState} from 'react';
import {ChevronDown, Search} from 'lucide-react';
import type {ChannelCategory} from '../data/channelCategories';
import {CATEGORY_GROUPS, CHANNEL_CATEGORIES, QUICK_FILTERS} from '../data/channelCategories';
import {whatsAppLink} from '../data/contact';
import {CHANNELS_PATH} from '../data/routes';

/* ── Alle zenders ────────────────────────────────────────────────────────
   Het volledige overzicht, één uitklapblok per categorie. Twee verschijnings-
   vormen, één component:

   • `preview` — het blok op de homepage onder de prijzen. De eerste twaalf
     categorieën, met een link door naar de eigen pagina.
   • zonder `preview` — de pagina /zenders zelf. Alle 99 categorieën.

   De marquee bovenaan de homepage (ChannelExplorer) is de etalage — een paar
   logo's die langsdrijven. Dit is de kaartenbak: doorzoekbaar, filterbaar en
   compleet. ───────────────────────────────────────────────────────────── */

/* Negenennegentig dichtgeklapte blokken zijn samen bijna twaalfduizend
   pixels — een muur waar iedereen die de homepage gewoon doorscrollt
   doorheen moet. Daar staan de eerste twaalf; de rest woont op /zenders. */
const PREVIEW_VISIBLE = 12;

/** De cijfers boven de lijst — dezelfde claims als de rest van de site. */
const STATS = [
  {value: '80.000+', label: 'Zenders'},
  {value: '70+', label: 'Landen'},
  {value: '4K', label: 'Ultra HD'},
  {value: '99,9%', label: 'Uptime'},
];

/* Zoeken op "hd" raakt zowat elke zender in de lijst. Meer dan een paar
   honderd resultaten leest niemand door; wie zijn zender daar niet tussen
   ziet typt beter een letter extra dan dat hij vijfduizend kaartjes scrolt. */
const MAX_RESULTS = 300;

/** Eén zender die aan de zoekopdracht voldoet, mét waar hij vandaan komt. */
type ChannelHit = {channel: string; category: ChannelCategory};

/** Eén zender in het opengeklapte raster van een categorie. */
const ChannelPill: React.FC<{name: string}> = ({name}) => (
  <div className="flex items-center gap-2 px-3 py-2 bg-paper/70 rounded-lg border border-line hover:bg-accent-soft hover:border-accent/25 transition-colors">
    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
    <span className="text-sm font-medium text-ink/80 truncate" title={name}>
      {name}
    </span>
  </div>
);

/* Een zoekresultaat draagt zijn categorie mee. Zonder dat label is "Sport 1"
   een naam zonder land, en juist dat land is waar de vraag meestal over
   gaat. */
const ChannelHitPill: React.FC<{hit: ChannelHit}> = ({hit}) => (
  <div className="flex items-center gap-2.5 px-3 py-2.5 bg-paper/70 rounded-lg border border-line hover:bg-accent-soft hover:border-accent/25 transition-colors">
    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
    <span className="min-w-0">
      <span className="block text-sm font-medium text-ink/85 truncate" title={hit.channel}>
        {hit.channel}
      </span>
      <span className="flex items-center gap-1.5 text-[11px] text-muted">
        <span aria-hidden="true">{hit.category.icon}</span>
        <span className="truncate">{hit.category.name}</span>
      </span>
    </span>
  </div>
);

export const ChannelList: React.FC<{
  /** Homepage-variant: eerste twaalf categorieën en een link naar /zenders. */
  preview?: boolean;
}> = ({preview = false}) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [open, setOpen] = useState<Set<string>>(() => new Set<string>());

  /* Elke wijziging aan het filter begint met een schone lei. Zonder die
     reset zou een blok dat je zelf had opengeklikt na het zoeken juist
     dichtklappen — zie de XOR bij `isOpen` verderop. */
  const changeQuery = (value: string) => {
    setQuery(value);
    setOpen(new Set<string>());
  };

  const changeCategory = (value: string | null) => {
    setCategory(value);
    setOpen(new Set<string>());
  };

  const toggle = (name: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  const needle = query.trim().toLowerCase();
  const searching = needle !== '';

  /* Zoeken levert zenders op, geen landen. Wie "eurosport" typt wil de
     zenders zien — niet zeventien landen waar hij er één voor één in moet
     klikken om te zien of die van hem ertussen staat. Elk resultaat draagt
     zijn land als label, dus de indeling gaat niet verloren; ze staat alleen
     niet meer in de weg.

     Matcht de categorienaam zelf ("kinderen", "sport"), dan telt het hele
     pakket mee — dat is precies waar je dan om vroeg. */
  const hits = useMemo<ChannelHit[]>(() => {
    if (!searching) return [];

    const found: ChannelHit[] = [];
    for (const cat of CHANNEL_CATEGORIES) {
      if (category && cat.name !== category) continue;
      const nameHit = cat.name.toLowerCase().includes(needle);
      for (const channel of cat.channels) {
        if (nameHit || channel.toLowerCase().includes(needle)) found.push({channel, category: cat});
      }
    }
    return found;
  }, [needle, category, searching]);

  /* Zonder zoekopdracht blijft het een bladerbare index: één blok per
     categorie, eventueel teruggebracht tot het aangetikte land. */
  const visible = useMemo(
    () => (category ? CHANNEL_CATEGORIES.filter((cat) => cat.name === category) : CHANNEL_CATEGORIES),
    [category],
  );

  const shownHits = hits.slice(0, MAX_RESULTS);
  const capped = preview && !category;
  const shown = capped ? visible.slice(0, PREVIEW_VISIBLE) : visible;
  const hidden = visible.length - shown.length;

  const Heading = preview ? 'h2' : 'h1';

  /* De ankers wijzen naar secties van de homepage. Vanaf /zenders moeten ze
     daar eerst naartoe. */
  const home = preview ? '' : '/';

  return (
    <section
      id="channel-list"
      className={`relative z-10 overflow-hidden ${preview ? 'py-24 border-t border-line' : 'pt-28 sm:pt-36 pb-24'}`}
    >

      {/* Zelfde warme velden als de rest van de pagina, zodat de lijst niet
          als een losse tabel op de achtergrond ligt */}
      <div className="bloom bloom-warm w-[38rem] h-[36rem] -top-24 left-[4%] opacity-60" />
      <div className="bloom bloom-ember w-[34rem] h-[32rem] bottom-0 right-[2%] opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Kop */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-block whitespace-nowrap text-[9px] sm:text-[11px] font-bold text-accent-deep uppercase tracking-[0.16em] sm:tracking-[0.25em] bg-paper backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-line">
            {CHANNEL_CATEGORIES.length} categorieën • Zoek je eigen zender
          </span>
          <Heading className="mt-4 sm:mt-5 font-display text-4xl sm:text-6xl md:text-7xl text-ink leading-[1.04]">
            De volledige <span className="accent-gradient-text">zenderlijst</span>
          </Heading>
          <p className="mt-3 sm:mt-4 text-[13px] sm:text-base text-muted px-2">
            Bekijk ons uitgebreide aanbod van <span className="font-semibold text-ink">80.000+</span> zenders uit meer
            dan 70 landen. Zoek op de naam van je zender, of tik een land aan — de zenders staan er meteen onder.
          </p>
        </div>

        {/* Zoeken, filteren */}
        <div className="glass-panel glass-edge relative rounded-2xl p-5 sm:p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">

            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => changeQuery(e.target.value)}
                placeholder="Zoek zenders…"
                aria-label="Zoek zenders"
                className="w-full pl-12 pr-4 py-3 bg-surface border border-line rounded-xl text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-all"
              />
            </div>

            <select
              value={category ?? ''}
              onChange={(e) => changeCategory(e.target.value || null)}
              aria-label="Filter op categorie"
              className="px-4 py-3 bg-surface border border-line rounded-xl text-ink cursor-pointer min-w-[200px] focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-all"
            >
              <option value="">Alle categorieën ({CHANNEL_CATEGORIES.length})</option>
              {CATEGORY_GROUPS.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.names.map((name) => {
                    const cat = CHANNEL_CATEGORIES.find((c) => c.name === name);
                    return cat ? (
                      <option key={cat.name} value={cat.name}>
                        {cat.icon} {cat.name}
                      </option>
                    ) : null;
                  })}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <p className="text-xs text-muted mb-2 font-medium">Snelle filters:</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_FILTERS.map((name) => {
                const cat = CHANNEL_CATEGORIES.find((c) => c.name === name);
                if (!cat) return null;
                const active = category === cat.name;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => changeCategory(active ? null : cat.name)}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      active
                        ? 'accent-button-gradient glow-accent'
                        : 'bg-accent-soft border border-accent/25 text-accent-deep hover:bg-accent/15'
                    }`}
                  >
                    <span aria-hidden="true">{cat.icon}</span>
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cijfers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
              <div className="text-3xl font-black accent-gradient-text">{stat.value}</div>
              <div className="text-sm text-muted font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Zoekresultaten — de zenders zelf, op één hoop, met hun land
            eronder. Geen uitklapblokken: je zocht een zender, dus je krijgt
            zenders. */}
        {searching && hits.length > 0 && (
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-4">
              <p className="font-display text-2xl sm:text-3xl text-ink">
                {hits.length} {hits.length === 1 ? 'zender' : 'zenders'} gevonden
              </p>
              {hits.length > shownHits.length && (
                <p className="text-xs text-muted">
                  Eerste {MAX_RESULTS} getoond — typ een letter extra om te verfijnen
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {shownHits.map((hit, i) => (
                <ChannelHitPill key={`${hit.category.name}-${hit.channel}-${i}`} hit={hit} />
              ))}
            </div>
          </div>
        )}

        {searching && hits.length === 0 && (
          <div className="glass-card rounded-2xl p-10 text-center">
            <p className="font-display text-2xl text-ink">Niets gevonden voor “{query}”</p>
            <p className="mt-2 text-sm text-muted">
              Staat je zender er niet tussen? Vraag het even via WhatsApp — de kans is groot dat we hem gewoon
              hebben.
            </p>
          </div>
        )}

        {/* De bladerbare index — alleen als er niet gezocht wordt */}
        <div className={`space-y-4 ${searching ? 'hidden' : ''}`}>
          {shown.map((cat) => {
            /* Een aangetikt land staat meteen open. Wie op 🇳🇱 Nederland
               tikt wil die 174 zenders zien, niet nog een balk om op te
               klikken. De XOR laat één klik dat alsnog dichtdoen — en
               `changeCategory` wist `open` weer, zodat het volgende land
               schoon begint. */
            const isOpen = open.has(cat.name) !== (category !== null);
            const panelId = `channels-${cat.name.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`;
            return (
              <div key={cat.name} className="list-card rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggle(cat.name)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full p-4 lg:p-6 flex items-center gap-2 sm:gap-3 text-left hover:bg-accent-soft/70 transition-colors"
                >
                  <span className="text-2xl sm:text-3xl shrink-0" aria-hidden="true">
                    {cat.icon}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-ink truncate">{cat.name}</h3>
                  <span className="ml-auto flex items-center gap-1 sm:gap-3 shrink-0">
                    <span className="bg-accent-soft border border-accent/25 text-accent-deep text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                      {cat.channels.length}
                      <span className="hidden sm:inline">
                        {cat.channels.length === 1 ? ' zender' : ' zenders'}
                      </span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-ink/35 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </button>

                {/* Het raster wordt pas gebouwd als het blok opengaat. Alle
                    5.500 zenders permanent in de DOM houden kost meer dan het
                    oplevert — zeker in de voorgerenderde HTML. */}
                {isOpen && (
                  <div id={panelId} className="px-5 lg:px-6 pb-5 lg:pb-6 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {cat.channels.map((channel, i) => (
                        <ChannelPill key={`${channel}-${i}`} name={channel} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Door naar de volledige pagina — alleen op de homepage, en alleen
            zolang er iets achter de hand blijft */}
        {hidden > 0 && !searching && (
          <div className="mt-8 text-center">
            <a
              href={CHANNELS_PATH}
              className="inline-flex items-center gap-2 bg-surface border border-line text-ink font-bold px-7 py-3.5 rounded-full hover:border-accent/45 transition-colors"
            >
              Bekijk alle {visible.length} categorieën
              <ChevronDown className="w-4 h-4 -rotate-90 text-ink/40" aria-hidden="true" />
            </a>
            <p className="mt-3 text-xs text-muted">
              Nog {hidden} categorieën — of zoek hierboven direct op de naam van je zender.
            </p>
          </div>
        )}

        {/* Afsluiter */}
        <div className="mt-16 glass-panel-accent rounded-2xl p-8 lg:p-12 text-center">
          <h3 className="font-display text-3xl lg:text-4xl text-ink mb-3">Klaar om te beginnen?</h3>
          <p className="text-muted mb-6 max-w-xl mx-auto text-sm sm:text-base">
            Krijg toegang tot al deze zenders en meer. Je login staat binnen 5 minuten klaar.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href={`${home}#pricing`}
              className="inline-flex items-center gap-2 accent-button-gradient font-bold px-8 py-4 rounded-full glow-accent hover:scale-[1.03] transition-transform"
            >
              Bekijk pakketten
              <ChevronDown className="w-4 h-4 -rotate-90" aria-hidden="true" />
            </a>
            <a
              href={whatsAppLink('Hoi BEEHOSTER! Ik zoek een specifieke zender — zit die in jullie pakket?')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-surface border border-line text-ink font-bold px-8 py-4 rounded-full hover:border-accent/45 transition-colors"
            >
              Zender niet gevonden?
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
