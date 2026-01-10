// Use VITE_BACKEND_URL for the base backend address (e.g., http://localhost:5050 or https://api.myapp.com)
// If not set, we try to guess based on the current environment
const getBackendUrl = () => {
    if (import.meta.env.VITE_BACKEND_URL) return import.meta.env.VITE_BACKEND_URL;

    // High-reliability fallback: If we are on vercel.app, we should NOT use localhost
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        if (hostname.includes('vercel.app') || hostname.includes('nunaorganic')) {
            return 'https://renu-s-natural-haven-backend.onrender.com'; // Your production backend URL
        }
    }

    return 'http://localhost:5050';
};

export const BACKEND_URL = getBackendUrl();

// API_URL is the base for all JSON/REST endpoints
export const API_URL = `${BACKEND_URL}/api`;
