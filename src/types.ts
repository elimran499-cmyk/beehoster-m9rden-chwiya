export interface PricingPlan {
  id: string;
  name: string;
  durationMonths: number;
  durationLabel: string;
  price: number;
  originalPrice: number;
  savePercent?: number;
  popular?: boolean;
  bestValue?: boolean;
  tagline: string;
  features: string[];
}

export interface DeviceCategory {
  id: string;
  name: string;
  icon: string;
  recommendedApps: string[];
  description: string;
  badge?: string;
}

export interface ChannelItem {
  id: string;
  name: string;
  /** Broadcaster artwork. `logoTone` is the ink colour, which decides whether
   *  the tile behind it needs to be light or dark. */
  logo?: string;
  logoTone?: 'dark' | 'light';
  category: 'Sport' | 'Films' | 'Nederland' | 'Documentaires' | 'Kids' | '4K HDR';
  quality: '4K Ultra HD' | 'FHD 60FPS' | 'FHD';
  flag: string;
  /** Short wordmark shown on the generated logo badge, e.g. "BBC", "ESPN". */
  logoText: string;
  epgAvailable: boolean;
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  flag: string;
  rating: number;
  date: string;
  comment: string;
  planPurchased: string;
  verified: boolean;
}

export interface SetupStep {
  stepNumber: number;
  title: string;
  description: string;
  codeSnippet?: string;
}

export interface DeviceSetupGuide {
  deviceId: string;
  deviceName: string;
  apps: string[];
  steps: SetupStep[];
}

export interface OrderFormData {
  planId: string;
  deviceType: string;
  includeAdult: boolean;
  paymentMethod: string;
  email: string;
  whatsapp: string;
}

export interface PackageTier {
  id: 'basic' | 'vip';
  name: string;
  headline: string;
  features: string[];
}

export interface DurationPack {
  id: string;
  /** Existing plan id the order modal opens with. */
  planId: string;
  label: string;
  /** Billed months — used for the per-month figure. */
  months: number;
  bestDeal?: boolean;
  savePercent?: number;
  /** Price by device count, index 0 = 1 device. */
  prices: Record<'basic' | 'vip', number[]>;
}
