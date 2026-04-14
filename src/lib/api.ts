import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

// Authenticated axios instance — auto-attaches JWT and handles 401
const authClient = axios.create();

authClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

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
  // --- Public (no auth) ---
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

  verifyEmail: async (token: string): Promise<{ success: boolean; message: string }> => {
    const { data } = await axios.get(`${API_BASE}/auth/verify-email`, { params: { token } });
    return data;
  },

  resendVerification: async (email: string): Promise<{ success: boolean; message: string }> => {
    const { data } = await axios.post(`${API_BASE}/auth/resend-verification`, { email });
    return data;
  },

  forgotPassword: async (email: string): Promise<{ success: boolean; message: string }> => {
    const { data } = await axios.post(`${API_BASE}/auth/forgot-password`, { email });
    return data;
  },

  resetPassword: async (token: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    const { data } = await axios.post(`${API_BASE}/auth/reset-password`, { token, newPassword });
    return data;
  },

  // --- Authenticated ---
  getProfile: async (): Promise<any> => {
    const { data } = await authClient.get(`${API_BASE}/auth/me`);
    return data;
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<any> => {
    const { data } = await authClient.post(`${API_BASE}/account/change-password`, { currentPassword, newPassword });
    return data;
  },

  getApiKeys: async (): Promise<any> => {
    const { data } = await authClient.get(`${API_BASE}/account/api-keys`);
    return data;
  },

  createApiKey: async (params: { name: string; expiresAt?: string }): Promise<any> => {
    const { data } = await authClient.post(`${API_BASE}/account/api-keys`, params);
    return data;
  },

  revokeApiKey: async (keyId: string): Promise<any> => {
    const { data } = await authClient.delete(`${API_BASE}/account/api-keys/${keyId}`);
    return data;
  },

  createCheckout: async (tier: string): Promise<any> => {
    const { data } = await authClient.post(`${API_BASE}/account/subscription/checkout?tier=${tier}`);
    return data;
  },

  createCryptoCheckout: async (tier: string): Promise<any> => {
    const { data } = await authClient.post(`${API_BASE}/account/subscription/crypto-checkout?tier=${tier}`);
    return data;
  },


  activateProTrial: async (): Promise<any> => {
    const { data } = await authClient.post(`${API_BASE}/account/activate-pro-trial`);
    return data;
  },

  getUsageStats: async (): Promise<any> => {
    const { data } = await authClient.get(`${API_BASE}/account/usage`);
    return data;
  },

  getMarkets: async (params: {
    coin: string;
    limit?: number;
    offset?: number;
    market_type?: string;
    resolved?: boolean;
  }): Promise<MarketsResponse> => {
    const { data } = await authClient.get(`${API_BASE}/markets`, { params });
    return data;
  },

  getMarket: async (slug: string, coin: string): Promise<Market> => {
    const { data } = await authClient.get(`${API_BASE}/markets/${slug}`, {
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
    const { data } = await authClient.get(`${API_BASE}/markets/${slug}/snapshots`, {
      params: { coin, ...params }
    });
    return data;
  }
};

// ── pSEO types ──

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  displayOrder: number;
  pageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryListResponse {
  categories: CategoryItem[];
  total: number;
}

export interface PseoPageSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  categorySlug: string;
  categoryName: string;
}

export interface PseoPageFull {
  id: string;
  categorySlug: string;
  categoryName: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PseoPageListResponse {
  pages: PseoPageSummary[];
  total: number;
  limit: number;
  offset: number;
}

// ── pSEO API (public, no auth) ──

export const pseoApi = {
  getCategories: async (): Promise<CategoryListResponse> => {
    const { data } = await axios.get(`${API_BASE}/pseo/categories`);
    return data;
  },

  getCategory: async (slug: string): Promise<CategoryItem> => {
    const { data } = await axios.get(`${API_BASE}/pseo/categories/${slug}`);
    return data;
  },

  getCategoryPages: async (
    slug: string,
    params?: { limit?: number; offset?: number }
  ): Promise<PseoPageListResponse> => {
    const { data } = await axios.get(`${API_BASE}/pseo/categories/${slug}/pages`, { params });
    return data;
  },

  getPage: async (slug: string): Promise<PseoPageFull> => {
    const { data } = await axios.get(`${API_BASE}/pseo/pages/${slug}`);
    return data;
  },
};

export type { Market as MarketType, Snapshot as SnapshotType };
