// ─── Single source of truth for all tier/plan data ───

export interface MarketAccess {
  label: string;
  limit: string;
}

export interface PricingFeature {
  text: string;
}

export interface RateLimit {
  reqPerMin: string;
  reqPerDay: string;
}

export interface TierConfig {
  /** Internal tier key matching backend enum */
  tier: string;
  /** Display name */
  name: string;
  badge?: string;
  price: string;
  period: string;
  desc: string;
  marketAccess: MarketAccess[];
  /** Features shown on pricing cards */
  features: PricingFeature[];
  /** Features NOT available on this plan, shown with X icon */
  excludedFeatures?: PricingFeature[];
  /** Features shown on dashboard "Plan Includes" */
  dashboardFeatures: string[];
  rateLimit: RateLimit;
  maxApiKeys: number;
  cta: string;
  ctaLink: string;
  highlight: boolean;
}

export const tierConfigs: TierConfig[] = [
  {
    tier: 'STARTER',
    name: 'Starter',
    badge: 'Free',
    price: '$0',
    period: 'No card required',
    desc: '',
    marketAccess: [
      { label: 'BTC 5m & 15m', limit: 'Last 50' },
      { label: 'BTC 1h & 4h', limit: 'Last 24' },
      { label: 'BTC 24h', limit: 'Last 5' },
    ],
    features: [
      { text: 'Snapshots included' },
      { text: 'Sub-second granularity' },
      { text: 'Order book depth' },
    ],
    excludedFeatures: [
      { text: 'ETH markets' },
      { text: 'SOL markets' },
      { text: 'Unlimited history' },
      { text: 'Priority support' },
    ],
    dashboardFeatures: [
      'BTC 5m & 15m — last 50',
      'BTC 1h & 4h — last 24',
      'BTC 24h — last 5',
      'Order book depth',
      'Sub-second granularity',
    ],
    rateLimit: { reqPerMin: '60', reqPerDay: '1,000' },
    maxApiKeys: 1,
    cta: 'Get Started',
    ctaLink: '/signup',
    highlight: false,
  },
  {
    tier: 'PRO_TRIAL',
    name: 'Pro Trial',
    price: '$0',
    period: 'Free trial',
    desc: 'Full access, no limits',
    marketAccess: [
      { label: 'BTC 5m & 15m', limit: 'All' },
      { label: 'BTC 1h & 4h', limit: 'All' },
      { label: 'BTC 24h', limit: 'All' },
      { label: 'ETH 5m, 15m & 1h', limit: 'All' },
      { label: 'SOL 5m, 15m & 1h', limit: 'All' },
    ],
    features: [
      { text: 'Everything in Starter' },
      { text: 'Unlimited market history' },
      { text: 'ETH & SOL market data' },
      { text: 'Priority support' },
    ],
    dashboardFeatures: [
      'BTC 5m & 15m — All',
      'BTC 1h & 4h — All',
      'BTC 24h — All',
      'ETH 5m, 15m & 1h — All',
      'SOL 5m, 15m & 1h — All',
      'Complete history',
      'Priority support',
    ],
    rateLimit: { reqPerMin: '300', reqPerDay: '50,000' },
    maxApiKeys: 3,
    cta: 'Go Pro',
    ctaLink: '/signup?plan=pro',
    highlight: false,
  },
  {
    tier: 'PRO',
    name: 'Pro',
    price: '$11',
    period: 'per month',
    desc: 'Full access, no limits',
    marketAccess: [
      { label: 'BTC 5m & 15m', limit: 'All' },
      { label: 'BTC 1h & 4h', limit: 'All' },
      { label: 'BTC 24h', limit: 'All' },
      { label: 'ETH 5m, 15m & 1h', limit: 'All' },
      { label: 'SOL 5m, 15m & 1h', limit: 'All' },
    ],
    features: [
      { text: 'Everything in Starter' },
      { text: 'Unlimited market history' },
      { text: 'ETH & SOL market data' },
      { text: 'Priority support' },
    ],
    dashboardFeatures: [
      'BTC 5m & 15m — All',
      'BTC 1h & 4h — All',
      'BTC 24h — All',
      'ETH 5m, 15m & 1h — All',
      'SOL 5m, 15m & 1h — All',
      'Complete history',
      'Priority support',
    ],
    rateLimit: { reqPerMin: '300', reqPerDay: '50,000' },
    maxApiKeys: 3,
    cta: 'Go Pro',
    ctaLink: '/signup?plan=pro',
    highlight: true,
  },
  {
    tier: 'ENTERPRISE',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Built for teams at scale',
    marketAccess: [
      { label: 'BTC 5m & 15m', limit: 'All' },
      { label: 'BTC 1h & 4h', limit: 'All' },
      { label: 'BTC 24h', limit: 'All' },
      { label: 'ETH 5m, 15m & 1h', limit: 'All' },
      { label: 'SOL 5m, 15m & 1h', limit: 'All' },
    ],
    features: [
      { text: 'Custom endpoints' },
      { text: 'Dedicated infra' },
      { text: 'Flexible rate limits' },
      { text: 'Hands-on onboarding' },
    ],
    dashboardFeatures: [
      'BTC 5m & 15m — All',
      'BTC 1h & 4h — All',
      'BTC 24h — All',
      'ETH 5m, 15m & 1h — All',
      'SOL 5m, 15m & 1h — All',
      'Custom endpoints',
      'Dedicated infra',
      'Flexible rate limits',
    ],
    rateLimit: { reqPerMin: 'Custom', reqPerDay: 'Unlimited' },
    maxApiKeys: 33,
    cta: 'Contact Us',
    ctaLink: 'mailto:support@polyhistorical.com',
    highlight: false,
  },
];

/** Look up a tier config by backend tier key (e.g. "PRO"). Falls back to STARTER. */
export function getTierConfig(tier?: string | null): TierConfig {
  return tierConfigs.find((t) => t.tier === tier) || tierConfigs[0];
}

/** Backward-compatible alias used by Pricing/Home pages — excludes internal-only tiers */
export const pricingPlans = tierConfigs.filter((t) => t.tier !== 'PRO_TRIAL');
