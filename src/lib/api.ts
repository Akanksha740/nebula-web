import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

// API returns snake_case, so we match that
export interface Market {
  slug: string;
  coin: string;
  market_type: string;
  market_id: string;
  event_id: string;
  active: boolean;
  resolved: boolean;
  start_time: string;
  end_time: string;
  btc_price_start: number | null;
  winner: string | null;
  final_volume: number | null;
  resolved_at: string | null;
  condition_id?: string;
  clob_token_up?: string;
  clob_token_down?: string;
}

export interface Snapshot {
  time: string;
  btc_price: number;
  price_up: number;
  price_down: number;
  orderbook_up?: {
    bids: Array<{ price: string; size: string }>;
    asks: Array<{ price: string; size: string }>;
  };
  orderbook_down?: {
    bids: Array<{ price: string; size: string }>;
    asks: Array<{ price: string; size: string }>;
  };
}

export interface MarketsResponse {
  markets: Market[];
  total: number;
  limit: number;
  offset: number;
}

export interface MarketWithSnapshotsResponse {
  market: Market;
  snapshots: Snapshot[];
  total: number;
  limit: number;
  offset: number;
}

export interface AuthResponse {
  success: boolean;
  data: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    customer: {
      id: string;
      email: string;
      companyName: string | null;
      tier: string;
      isActive: boolean;
      emailVerified: boolean;
      createdAt: string;
    };
  };
  message: string;
  timestamp: string;
}

export const api = {
  register: async (params: {
    email: string;
    password: string;
    companyName?: string;
  }): Promise<AuthResponse> => {
    const { data } = await axios.post(`${API_BASE}/auth/register`, params);
    return data;
  },

  login: async (params: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const { data } = await axios.post(`${API_BASE}/auth/login`, params);
    return data;
  },

  googleAuth: async (credential: string): Promise<AuthResponse> => {
    const { data } = await axios.post(`${API_BASE}/auth/google`, { credential });
    return data;
  },

  getMarkets: async (params: {
    coin: string;
    limit?: number;
    offset?: number;
    market_type?: string;
    resolved?: boolean;
  }): Promise<MarketsResponse> => {
    const { data } = await axios.get(`${API_BASE}/markets`, { params });
    return data;
  },

  getMarket: async (slug: string, coin: string): Promise<Market> => {
    const { data } = await axios.get(`${API_BASE}/markets/${slug}`, {
      params: { coin }
    });
    return data;
  },

  getMarketSnapshots: async (
    slug: string,
    coin: string,
    params: {
      limit?: number;
      offset?: number;
      include_orderbook?: boolean;
    }
  ): Promise<MarketWithSnapshotsResponse> => {
    const { data } = await axios.get(`${API_BASE}/markets/${slug}/snapshots`, {
      params: { coin, ...params }
    });
    return data;
  }
};

export type { Market as MarketType, Snapshot as SnapshotType };
