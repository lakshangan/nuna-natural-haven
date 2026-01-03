# 🌿 Renu's Natural Haven: File Architecture & Logic Guide

This document provides a crisp breakdown of the project structure, explaining the responsibility and logic behind every key directory and file.

---

## 🛠️ THE BACKEND (The Engine)
Located in `/backend`, this is the Node.js/Express server that handles data and security.

### 📁 `backend/src/`
- **`index.js`**: The Entry Point. Initializes the Express server, connects middleware (CORS, JSON), and registers all API routes.
- **`config/env.js`**: Centralized Environment Config. Manages secrets like Supabase URLs and API keys safely.

### 📁 `backend/src/routes/` (The Navigators)
*These files define the URL endpoints (e.g., `/api/products`).*
- **`product.routes.js`**: Routes for fetching product lists and individual details.
- **`admin.routes.js`**: Secure routes for administrative actions (adding/editing products).
- **`order.routes.js`**: Handles the logic for processing checkouts and recording sales.

### 📁 `backend/src/controllers/` (The Brains)
*These files contain the actual logic that runs when a route is hit.*
- **`product.controller.js`**: Queries Supabase to fetch product data and sends it back to the frontend.
- **`admin.controller.js`**: Logic for managing the database—handles creation, updates, and deletions.
- **`order.controller.js`**: Orchestrates Stripe payments and order finalization.

---

## 🎨 THE FRONTEND (The Face)
Located in `/src`, this is the React application built with TypeScript and Vite.

### 📁 `src/pages/` (The Views)
- **`Index.tsx`**: The Landing Page. Hero section, featured collections, and brand story.
- **`Shop.tsx`**: The Marketplace. Displays all products with filtering and search capabilities.
- **`ProductDetail.tsx`**: Individual product view. Displays ingredients, pricing, and "Add to Cart" logic.

### 📁 `src/pages/admin/` (The Control Room)
- **`AdminLayout.tsx`**: The persistent sidebar and navigation for the admin panel.
- **`AdminDashboard.tsx`**: Visual overview of sales, customer count, and inventory status.
- **`AdminProductManager.tsx`**: A sophisticated table/form system to manage the shop's inventory.

### 📁 `src/hooks/` (Reusable Logic)
- **`useProducts.ts`**: The bridge to the backend. Fetches products using `useQuery` for automatic caching and loading states.
- **`use-mobile.ts`**: Detection logic for responsive layouts (adjusts UI for phones vs. desktops).

### 📁 `src/contexts/` (Global State)
- **`CartContext.tsx`**: Manages the shopping cart. Handles adding items, calculating totals, and persisting data so the cart doesn't empty on refresh.
- **`AuthContext.tsx`**: Manages user sessions. Tracks if a user or admin is logged in and handles logout logic.

### 📁 `src/components/` (The Building Blocks)
- **`Navbar.tsx`**: Global navigation with the "Center-to-Expand" animation logic.
- **`Footer.tsx`**: Bottom navigation and social links featuring the Nuna branding.
- **`ProductCard.tsx`**: The reusable preview card used in the Shop and Index pages.

---

## ⚙️ CORE CONFIGURATION (The Foundation)
- **`App.tsx`**: The Master Router. Defines every URL path in the application and wraps them in necessary "Providers" (Auth, Cart, Query).
- **`tailwind.config.ts`**: The Design System. Defines the custom Earthy palette (Greens, Creams) and animations.
- **`report.text`**: The high-level executive summary of the project.

---

### 💡 Logic Flow Summary:
1. **User Action**: clicks "Add to Cart" on `ProductDetail.tsx`.
2. **Context Update**: `CartContext.tsx` updates the global state.
3. **Checkout**: User hits checkout; Frontend calls `backend/src/routes/order.routes.js`.
4. **Processing**: `order.controller.js` creates a Stripe session and returns a URL.
5. **Completion**: Stripe redirects user back to `CheckoutSuccess.tsx`.
