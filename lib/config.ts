// Feature flags and configuration
// Note: For client-side usage, use NEXT_PUBLIC_ prefix
export const USE_MOCK = process.env.USE_MOCK === '1' || process.env.USE_MOCK === 'true';
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// API Configuration
export const API_INGEST_KEY = process.env.API_INGEST_KEY || 'demo-api-key';
// For client-side, use NEXT_PUBLIC_ or hardcode default
export const DEFAULT_SITE_ID = (typeof window !== 'undefined' 
  ? (process.env.NEXT_PUBLIC_DEFAULT_SITE_ID || 'demo-gateway')
  : (process.env.DEFAULT_SITE_ID || 'demo-gateway'));

