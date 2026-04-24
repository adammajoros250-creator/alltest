/**
 * API Configuration and Axios Instance
 * Handles all HTTP requests to the backend
 */

import axios, { AxiosInstance } from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const api: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const apiEndpoints = {
  home: {
    getSummary: () => api.get("/home/summary"),
  },

  ecosystem: {
    getOverview: () => api.get("/ecosystem/overview"),
  },

  gaming: {
    getGames: () => api.get("/gaming/games"),
    getGame: (id: string) => api.get(`/gaming/games/${id}`),
    getLeaderboard: () => api.get("/gaming/leaderboard"),
    getUserStats: (userId: string) => api.get(`/gaming/user/${userId}/stats`),
    startGame: (gameId: string) => api.post(`/gaming/games/${gameId}/start`),
    endGame: (gameId: string) => api.post(`/gaming/games/${gameId}/end`),
    getTournaments: () => api.get("/gaming/tournaments"),
    joinTournament: (tournamentId: string) =>
      api.post(`/gaming/tournaments/${tournamentId}/join`),
  },

  defi: {
    getPools: () => api.get("/defi/pools"),
    getPool: (id: string) => api.get(`/defi/pools/${id}`),
    getOverview: () => api.get("/defi/overview"),
    getLeaderboard: () => api.get("/defi/leaderboard"),
    addLiquidity: (poolId: string, data: unknown) =>
      api.post(`/defi/pools/${poolId}/add-liquidity`, data),
    removeLiquidity: (poolId: string, data: unknown) =>
      api.post(`/defi/pools/${poolId}/remove-liquidity`, data),
    swap: (data: unknown) => api.post("/defi/swap", data),
    getYieldFarming: () => api.get("/defi/yield-farming"),
    stakeYieldFarming: (id: string, data: unknown) =>
      api.post(`/defi/yield-farming/${id}/stake`, data),
    getUserPortfolio: (userId: string) =>
      api.get(`/defi/user/${userId}/portfolio`),
  },

  nft: {
    getCollections: () => api.get("/nft/collections"),
    getCollection: (id: string) => api.get(`/nft/collections/${id}`),
    getCollectionNFTs: (id: string) => api.get(`/nft/collections/${id}/nfts`),
    getNFTs: (params?: unknown) => api.get("/nft/nfts", { params }),
    getNFT: (id: string) => api.get(`/nft/nfts/${id}`),
    listNFT: (id: string, data: unknown) => api.post(`/nft/nfts/${id}/list`, data),
    buyNFT: (id: string, data: unknown) => api.post(`/nft/nfts/${id}/buy`, data),
    getStats: () => api.get("/nft/stats"),
    getLeaderboard: () => api.get("/nft/leaderboard"),
    createCollection: (data: unknown) => api.post("/nft/collections", data),
    mintNFT: (data: unknown) => api.post("/nft/mint", data),
  },

  marketplace: {
    getListings: () => api.get("/marketplace/listings"),
    getListing: (id: string) => api.get(`/marketplace/listings/${id}`),
    getActivity: () => api.get("/marketplace/activity"),
  },

  trading: {
    getPairs: () => api.get("/trading/pairs"),
    getOrderbook: (pairId: string) => api.get(`/trading/orderbook/${pairId}`),
    getRecent: () => api.get("/trading/recent"),
  },

  dashboard: {
    getSummary: () => api.get("/dashboard/summary"),
  },

  content: {
    getAbout: () => api.get("/content/about"),
    submitContact: (data: unknown) => api.post("/content/contact", data),
    getTerms: () => api.get("/content/terms"),
    getPrivacy: () => api.get("/content/privacy"),
    getWhitepaper: () => api.get("/content/whitepaper"),
  },

  user: {
    getUsers: () => api.get("/user"),
    getUser: (id: string) => api.get(`/user/${id}`),
    getUserProfile: (id: string) => api.get(`/user/${id}/profile`),
    updateUserProfile: (id: string, data: unknown) =>
      api.put(`/user/${id}/profile`, data),
    getUserTransactions: (id: string) => api.get(`/user/${id}/transactions`),
    getUserPortfolio: (id: string) => api.get(`/user/${id}/portfolio`),
    getUserAchievements: (id: string) => api.get(`/user/${id}/achievements`),
    getUserConnections: (id: string) => api.get(`/user/${id}/connections`),
    followUser: (id: string) => api.post(`/user/${id}/follow`),
    unfollowUser: (id: string) => api.delete(`/user/${id}/follow`),
  },

  analytics: {
    getOverview: () => api.get("/analytics/overview"),
    getGamingAnalytics: () => api.get("/analytics/gaming"),
    getDefiAnalytics: () => api.get("/analytics/defi"),
    getNFTAnalytics: () => api.get("/analytics/nft"),
    getMarketData: () => api.get("/analytics/market-data"),
  },

  health: () => axios.get(`${API_BASE_URL}/health`),
};

export default api;
