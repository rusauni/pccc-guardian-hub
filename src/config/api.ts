// API Configuration

// Base URL for the API
export const BASE_URL = 'https://dashboard.pccc40.com';

// For development, we'll use a relative URL that will be handled by Vite's proxy
// In production, we'll use the full URL
export const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost';
export const API_BASE = isDevelopment ? '/api/pccc' : BASE_URL;

// Helper function to get asset URL
export const getAssetUrl = (assetPath: string | null | undefined): string => {
  if (!assetPath) return '';
  return `${API_BASE}/assets/${assetPath}`;
};

// API Endpoints
export const ENDPOINTS = {
  FEATURED_ARTICLES: `${API_BASE}/items/featured_articles`,
  POSTS: `${API_BASE}/items/articles`,
  CATEGORIES: `${API_BASE}/items/categories`,
};
