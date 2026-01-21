// Use VITE_BACKEND_URL for the base backend address (e.g., http://localhost:5050 or https://api.myapp.com)
// If not set, we try to guess based on the current environment
const getBackendUrl = () => {
    if (import.meta.env.VITE_BACKEND_URL) return import.meta.env.VITE_BACKEND_URL;
    return 'http://localhost:5050';
};

export const BACKEND_URL = getBackendUrl();

// API_URL is the base for all JSON/REST endpoints
export const API_URL = `${BACKEND_URL}/api`;
