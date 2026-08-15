import { PricingPlan, DeviceCategory, ChannelItem, FaqItem, Testimonial, PackageTier, DurationPack } from '../types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-3m',
    name: '3 maanden',
    durationMonths: 3,
    durationLabel: '3 maanden toegang',
    price: 24.99,
    originalPrice: 44.99,
    savePercent: 40,
    popular: true,
    tagline: 'Populairste keuze voor het sportseizoen',
    features: [
      '80.000+ live zenders',
      '95.000+ films & series',
      '4K & 60FPS Ultra HD-kwaliteit',
      '99,9% Anti-Freeze 9.0 uptime',
      'Binnen 5 minuten actief',
      'Werkt op alle apparaten & apps',
      'Elektronische programmagids (EPG)',
      'Gratis 7 dagen terugkijken',
      'Adult-zenders (optioneel)',
      '24/7 VIP-support met voorrang',
      '1 verbinding'
    ]
  },
  {
    id: 'plan-6m',
    name: '6 maanden',
    durationMonths: 6,
    durationLabel: '6 maanden toegang',
    price: 34.99,
    originalPrice: 69.99,
    savePercent: 45,
    tagline: 'Flink voordeel voor langer kijkplezier',
    features: [
      '80.000+ live zenders',
      '95.000+ films & series',
      '4K & 60FPS Ultra HD-kwaliteit',
      '99,9% Anti-Freeze 9.0 uptime',
      'Binnen 5 minuten actief',
      'Werkt op alle apparaten & apps',
      'Elektronische programmagids (EPG)',
      'Gratis 7 dagen terugkijken',
      'Adult-zenders (optioneel)',
      'Automatische playlist-updates',
      '24/7 VIP-support met voorrang',
      '1 verbinding'
    ]
  },
  {
    id: 'plan-12m',
    name: '12 maanden',
    durationMonths: 12,
    durationLabel: '1 jaar volledige toegang',
    price: 49.00,
    originalPrice: 119.00,
    savePercent: 55,
    bestValue: true,
    tagline: 'Beste prijs! Maximaal voordeel, gegarandeerd zonder buffering',
    features: [
      '80.000+ live zenders',
      '95.000+ films & series',
      '4K & 60FPS Ultra HD-kwaliteit',
      '99,9% Anti-Freeze 9.0 uptime',
      'Binnen 5 minuten actief',
      'Werkt op alle apparaten & apps',
      'Elektronische programmagids (EPG)',
      'Gratis 7 dagen terugkijken',
      'Adult-zenders (optioneel, met pincode)',
      'Zenderverzoeken & serverupdates inbegrepen',
      '24/7 directe VIP-support via WhatsApp',
      '1 verbinding (geschikt voor meerdere kamers)'
    ]
  }
];

export const DEVICE_CATEGORIES: DeviceCategory[] = [
  {
    id: 'firestick',
    name: 'Amazon Firestick / TV',
    icon: 'Tv',
    recommendedApps: ['Downloader', 'TiviMate', 'IPTV Smarters Pro', 'XCIPTV'],
    description: 'Plug-and-play geïnstalleerd in minder dan 3 minuten via de Downloader-app.',
    badge: 'Populairst'
  },
  {
    id: 'smart-tv',
    name: 'Samsung & LG smart-tv',
    icon: 'Tv2',
    recommendedApps: ['IBO Player', 'Smart IPTV (SIPTV)', 'Nanomid', 'SS IPTV'],
    description: 'Direct uit de App Store. Geen extra hardware nodig.',
    badge: '4K HDR'
  },
  {
    id: 'android',
    name: 'Android TV / box / telefoon',
    icon: 'Smartphone',
    recommendedApps: ['TiviMate Premium', 'IPTV Smarters Pro', 'Sparkle Player'],
    description: 'Werkt met alle Android TV-boxen (Nvidia Shield, Xiaomi Mi Box, Chromecast).',
  },
  {
    id: 'apple',
    name: 'Apple TV / iPhone / iPad',
    icon: 'Laptop',
    recommendedApps: ['GSE Smart IPTV', 'IPTV Smarters', 'Smarters Player Lite', 'Ibo Pro'],
    description: 'Vlekkeloos AirPlay & 4K HDR op alle iOS- en tvOS-apparaten.',
  },
  {
    id: 'mag',
    name: 'MAG- & Formuler-boxen',
    icon: 'Box',
    recommendedApps: ['Stalker Portal', 'MYTVOnline 2 / 3'],
    description: 'Portal-ondersteuning via MAC-adres voor direct streamen.',
    badge: 'Portal API'
  },
  {
    id: 'pc',
    name: 'Windows & macOS',
    icon: 'Monitor',
    recommendedApps: ['VLC Media Player', 'IPTV Smarters Desktop', 'SFVIP Player'],
    description: 'Kijk direct in je browser of via M3U/Xtream Codes API.',
  }
];

export const FEATURE_GRID = [
  {
    id: 'quality',
    icon: 'Film',
    title: '4K Ultra HD & 60FPS',
    description: 'Kristalheldere 4K UHD, Full HD en 60FPS sportuitzendingen, met een bitrate die zich automatisch aanpast.'
  },
  {
    id: 'antifreeze',
    icon: 'Zap',
    title: 'Anti-Freeze™ 9.0-technologie',
    description: 'Onze load-balanced clusterservers met 10Gbps glasvezel garanderen 99,99% uptime, ook tijdens de topwedstrijden.'
  },
  {
    id: 'instant',
    icon: 'Clock',
    title: 'Binnen 5 minuten klaar',
    description: 'Je M3U-playlist en Xtream Codes-login komen binnen enkele minuten na betaling terug in je WhatsApp-chat.'
  },
  {
    id: 'epg',
    icon: 'Tv',
    title: 'Elektronische programmagids (EPG)',
    description: 'Tv-gids voor 180+ landen, elke 6 uur bijgewerkt, met 7 dagen terugkijken.'
  },
  {
    id: 'adult-sports',
    icon: 'ShieldAlert',
    title: 'Alle sport & VOD inbegrepen',
    description: 'Alle topcompetities voetbal, PPV-events, Formule 1, NBA en UFC, plus 95.000+ films en series die dagelijks worden aangevuld.'
  },
  {
    id: 'support',
    icon: 'Headphones',
    title: '24/7 VIP-support',
    description: 'Echte mensen op WhatsApp, 24 uur per dag — dezelfde chat waarin je bestelde regelt ook je installatie en support.'
  }
];

export const SAMPLE_CHANNELS: ChannelItem[] = [
  { id: '1', name: 'Sky Sports Main Event 4K', category: 'Sport', quality: '4K Ultra HD', flag: '🇬🇧', logoText: 'SS', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Sky_Sports_2020.svg/250px-Sky_Sports_2020.svg.png', logoTone: 'dark', epgAvailable: true },
  { id: '2', name: 'TNT Sports 1 Ultra HD', category: 'Sport', quality: '4K Ultra HD', flag: '🇬🇧', logoText: 'TNT', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/TNT_Sports_2021_logo.svg/250px-TNT_Sports_2021_logo.svg.png', logoTone: 'dark', epgAvailable: true },
  { id: '3', name: 'ESPN+ USA HD', category: 'Sport', quality: 'FHD 60FPS', flag: '🇺🇸', logoText: 'ESPN', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ESPN_wordmark.svg/250px-ESPN_wordmark.svg.png', logoTone: 'dark', epgAvailable: true },
  { id: '4', name: 'DAZN 1 Germany 4K', category: 'Sport', quality: '4K Ultra HD', flag: '🇩🇪', logoText: 'DAZN', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/DAZN_1_logo.png/250px-DAZN_1_logo.png', logoTone: 'light', epgAvailable: true },
  { id: '5', name: 'Viaplay Sports 1', category: 'Sport', quality: 'FHD 60FPS', flag: '🇳🇱', logoText: 'VP', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Viaplay_TV_logo.svg/250px-Viaplay_TV_logo.svg.png', logoTone: 'dark', epgAvailable: true },
  { id: '6', name: 'HBO Cinema East HD', category: 'Films', quality: '4K Ultra HD', flag: '🇺🇸', logoText: 'HBO', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/HBO_logo.svg/250px-HBO_logo.svg.png', logoTone: 'dark', epgAvailable: true },
  { id: '7', name: 'Sky Cinema Premiere 4K', category: 'Films', quality: '4K Ultra HD', flag: '🇬🇧', logoText: 'SKY', logo: 'https://upload.wikimedia.org/wikipedia/en/d/d7/Sky_Cinema_2026_Stacked_Logo.png', logoTone: 'dark', epgAvailable: true },
  { id: '8', name: 'Canal+ Grand Écran 4K', category: 'Films', quality: '4K Ultra HD', flag: '🇫🇷', logoText: 'C+', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Logo_Canal%2B_1995.svg/250px-Logo_Canal%2B_1995.svg.png', logoTone: 'dark', epgAvailable: true },
  { id: '9', name: 'Movistar Estrenos 4K', category: 'Films', quality: '4K Ultra HD', flag: '🇪🇸', logoText: 'MOV', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Movistar_Plus%2B_2022_logo.svg/250px-Movistar_Plus%2B_2022_logo.svg.png', logoTone: 'dark', epgAvailable: true },
  { id: '10', name: 'BBC One London HD', category: 'VS/VK', quality: 'FHD 60FPS', flag: '🇬🇧', logoText: 'BBC', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/BBC_One_logo_2021.svg/250px-BBC_One_logo_2021.svg.png', logoTone: 'dark', epgAvailable: true },
  { id: '11', name: 'NBC New York HD', category: 'VS/VK', quality: 'FHD 60FPS', flag: '🇺🇸', logoText: 'NBC', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/NBC_logo_2022_%28vertical%29.svg/250px-NBC_logo_2022_%28vertical%29.svg.png', logoTone: 'dark', epgAvailable: true },
  { id: '12', name: 'Ziggo Sport Select 4K', category: 'Europa', quality: '4K Ultra HD', flag: '🇳🇱', logoText: 'ZIG', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Ziggo_Sport_logo_2026.svg/250px-Ziggo_Sport_logo_2026.svg.png', logoTone: 'dark', epgAvailable: true },
  { id: '13', name: 'National Geographic Wild 4K', category: 'Documentaires', quality: '4K Ultra HD', flag: '🇺🇸', logoText: 'NG', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/National_Geographic_Wild_logo.svg/250px-National_Geographic_Wild_logo.svg.png', logoTone: 'dark', epgAvailable: true },
  { id: '14', name: 'Disney Channel HD', category: 'Kids', quality: 'FHD', flag: '🇺🇸', logoText: 'DIS', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/2002_Disney_Channel_logo_%28Alt%29.svg/250px-2002_Disney_Channel_logo_%28Alt%29.svg.png', logoTone: 'dark', epgAvailable: true },
  { id: '15', name: 'Formula 1 Live 4K Feed', category: '4K HDR', quality: '4K Ultra HD', flag: '🏁', logoText: 'F1', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/F1_logo.svg/250px-F1_logo.svg.png', logoTone: 'dark', epgAvailable: true },
  { id: '16', name: 'UFC Pay-Per-View Live 4K', category: '4K HDR', quality: '4K Ultra HD', flag: '🥊', logoText: 'UFC', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UFC_Logo.svg/250px-UFC_Logo.svg.png', logoTone: 'dark', epgAvailable: true },
];


export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sander de Vries',
    location: 'Utrecht, Nederland',
    flag: '🇳🇱',
    rating: 5,
    date: 'Gisteren',
    comment: 'De 4K-kwaliteit tijdens de Eredivisie-avonden is waanzinnig. NUL vertraging of haperingen. Binnen 3 minuten na betaling actief.',
    planPurchased: '12 maanden toegang',
    verified: true
  },
  {
    id: '2',
    name: 'Wout Peeters',
    location: 'Antwerpen, België',
    flag: '🇧🇪',
    rating: 5,
    date: '2 dagen geleden',
    comment: 'Overgestapt van mijn vorige IPTV-aanbieder die bleef bufferen tijdens de Champions League. BEEHOSTER is een wereld van verschil! Echt een aanrader.',
    planPurchased: '12 maanden toegang',
    verified: true
  },
  {
    id: '3',
    name: 'Jan van der Berg',
    location: 'Amsterdam, Nederland',
    flag: '🇳🇱',
    rating: 5,
    date: '3 dagen geleden',
    comment: 'Supermakkelijk ingesteld op mijn Samsung smart-tv met IBO Player. De klantenservice op WhatsApp beantwoordde mijn vraag binnen 2 minuten.',
    planPurchased: '6 maanden toegang',
    verified: true
  },
  {
    id: '4',
    name: 'Elke Janssens',
    location: 'Gent, België',
    flag: '🇧🇪',
    rating: 5,
    date: '1 week geleden',
    comment: 'Uitstekende 4K-kwaliteit en een enorme filmcatalogus met alle recente titels. Activatie binnen 5 minuten na betaling, perfect geregeld.',
    planPurchased: '12 maanden toegang',
    verified: true
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-0',
    category: 'Bestellen',
    question: 'Hoe bestel ik een abonnement?',
    answer: 'Alles loopt via WhatsApp. Tik op een bestelknop op deze pagina en er opent een chat met ons op +44 7414 662070, met je gekozen pakket al in het bericht. Wij bevestigen de prijs, jij betaalt zoals het jou uitkomt en je login komt terug in dezelfde chat. Geen account aanmaken, geen bestelformulier invullen.'
  },
  {
    id: 'faq-1',
    category: 'Activatie & snelheid',
    question: 'Hoe snel is mijn abonnement actief na het bestellen?',
    answer: 'Meestal binnen 5 minuten nadat je betaling binnen is. Je M3U-playlist en Xtream Codes-login (gebruikersnaam, wachtwoord, server-URL) sturen we direct terug in de WhatsApp-chat, dus alles staat overzichtelijk op je telefoon — geen gezoek in je mailbox.'
  },
  {
    id: 'faq-2',
    category: 'Apparaten',
    question: 'Welke apparaten en apps worden ondersteund?',
    answer: 'BEEHOSTER werkt op Amazon Firestick, smart-tv\'s (Samsung, LG, Sony, Philips), Android-boxen, Apple TV, iPhone, iPad, Windows-pc, Mac, MAG-apparaten, Formuler, Enigma2 en Chromecast. Aanbevolen apps zijn TiviMate, IPTV Smarters Pro, IBO Player en GSE Smart IPTV. Geef je apparaat door in de chat en wij sturen de exacte installatiestappen.'
  },
  {
    id: 'faq-3',
    category: 'Internet & Anti-Freeze',
    question: 'Welke internetsnelheid heb ik nodig voor vloeiend 4K?',
    answer: 'Wij adviseren minimaal 15 Mbps voor Full HD en 30 Mbps voor 4K Ultra HD. Ons eigen Anti-Freeze™ 9.0 load balancing-systeem zorgt ook bij gewone snelheden voor bufferloos kijken.'
  },
  {
    id: 'faq-4',
    category: 'Zenders & VOD',
    question: 'Kan ik zenders aanvragen of adult-zenders beveiligen?',
    answer: 'Ja! Je krijgt toegang tot 80.000+ live zenders en 95.000+ films en series. Adult-zenders zijn optioneel — geef in de chat aan of je ze wilt, en ze zijn te vergrendelen met een pincode. Mis je een zender die je graag kijkt? Vraag het en we kijken of we hem kunnen toevoegen.'
  },
  {
    id: 'faq-5',
    category: 'Verbindingen',
    question: 'Kan ik mijn abonnement op meerdere apparaten gebruiken?',
    answer: 'De prijs van elk pakket hangt af van het aantal apparaten dat tegelijk streamt — kies 1 tot 4 bij je pakket. Je mag de playlist op zoveel apparaten installeren als je wilt; het aantal waarvoor je betaalt bepaalt hoeveel er tegelijk kunnen kijken. Meer dan 4 nodig, of later uitbreiden? Stuur ons een bericht en we passen het aan.'
  },
  {
    id: 'faq-6',
    category: 'Betalen',
    question: 'Welke betaalmethodes accepteren jullie?',
    answer: 'Betalen regelen we direct in de WhatsApp-chat, dus je zit niet vast aan één aanbieder. Wij accepteren iDEAL, PayPal, creditcard en debitcard (Visa, Mastercard, American Express), bankoverschrijving, Apple Pay en crypto (Bitcoin, USDT, Ethereum). Zodra je je pakket bevestigt, sturen we de betaallink of de gegevens.'
  },
  {
    id: 'faq-7',
    category: 'Garantie',
    question: 'Is er een niet-goed-geld-terug-garantie?',
    answer: 'Ja, je hebt 7 dagen volledige geld-terug-garantie. Loop je tegen technische problemen aan die ons supportteam niet kan oplossen? Stuur een bericht in dezelfde WhatsApp-chat waarin je bestelde en je krijgt het volledige bedrag terug, zonder gedoe.'
  }
];

/* ── Subscription packages ────────────────────────────────────────────────────
   Two tiers, four device counts, three durations. Prices below are placeholders
   — set your real figures here and the whole pricing section follows. */

export const PACKAGE_TIERS: PackageTier[] = [
  {
    id: 'basic',
    name: 'Basis',
    headline: 'Wat zit er in het Basis Pakket?',
    features: [
      'SD/HD/FULL HD Kwaliteit',
      '+25.000 Kanalen + Netflix',
      'RTL, NPO, ZIGGO, SBS, ESPN, Viaplay',
      '+140.000 Films & Series',
      'Wekelijkse Updates',
      '24/7 Support NL & BE',
      '100% Anoniem',
      'AntiFreeze Technologie',
      'Alle Apparaten',
      'Exclusieve NL & BE Content',
      'Netflix, Amazon, HBO, Apple TV, Hulu',
    ],
  },
  {
    id: 'vip',
    name: 'Premium VIP',
    headline: 'Wat zit er in het Premium VIP Pakket?',
    features: [
      'SD/HD/FULL HD/4K/8K/HDR-VR',
      '+80.000 Kanalen + Netflix',
      'RTL, NPO, ZIGGO, SBS, ESPN, Viaplay, VTM',
      '+200.000 Films & Series',
      'Dagelijkse Updates',
      'Alle Sport PPV Events',
      'VIP 24/7 Support',
      'Enterprise Anti-Freeze PRO',
      'Persoonlijke VIP Manager',
      'Alle Apparaten',
      'VPN Inbegrepen',
      'Exclusieve VIP Content',
      'Videoland, Netflix, Amazon, HBO, Apple TV, Hulu',
    ],
  },
];

export const DURATION_PACKS: DurationPack[] = [
  {
    id: 'pack-3m',
    planId: 'plan-3m',
    label: '3 maanden',
    months: 3,
    savePercent: 30,
    prices: {
      basic: [24.99, 39.99, 49.99, 57.99],
      vip: [34.99, 49.99, 69.99, 89.99],
    },
  },
  {
    id: 'pack-6m',
    planId: 'plan-6m',
    label: '6 maanden',
    months: 6,
    savePercent: 40,
    prices: {
      basic: [34.99, 49.99, 69.99, 89.99],
      vip: [49.99, 79.99, 99.99, 139.99],
    },
  },
  {
    id: 'pack-15m',
    planId: 'plan-12m',
    label: '12+3 maanden',
    months: 15,
    bestDeal: true,
    savePercent: 50,
    prices: {
      basic: [49.0, 79.0, 109.0, 129.0],
      vip: [79.99, 124.99, 179.99, 199.99],
    },
  },
];
