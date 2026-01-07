import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy Load Pages
const Index = lazy(() => import("./pages/Index"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const About = lazy(() => import("./pages/About"));
const Ingredients = lazy(() => import("./pages/Ingredients"));
const Contact = lazy(() => import("./pages/Contact"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CheckoutSuccess = lazy(() => import("./pages/CheckoutSuccess"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AdminLayout = lazy(() => import("@/pages/admin/AdminLayout").then(m => ({ default: m.AdminLayout })));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard").then(m => ({ default: m.AdminDashboard })));
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin").then(m => ({ default: m.AdminLogin })));
const AdminProductManager = lazy(() => import("@/pages/admin/AdminProductManager").then(m => ({ default: m.AdminProductManager })));
const AdminOrders = lazy(() => import("@/pages/admin/AdminOrders").then(m => ({ default: m.AdminOrders })));
const AdminCustomers = lazy(() => import("@/pages/admin/AdminCustomers").then(m => ({ default: m.AdminCustomers })));
const AdminSettings = lazy(() => import("@/pages/admin/AdminSettings").then(m => ({ default: m.AdminSettings })));

import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Shared Loading Component
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      <p className="text-muted-foreground font-medium animate-pulse">Growing nature's care...</p>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <GoogleOAuthProvider clientId="820931831320-cf8cc33e4ct6q2eqaftlg8mbd1j9ilth.apps.googleusercontent.com">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<PageLoading />}>
                <Routes>
                  {/* User Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:slug" element={<ProductDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/ingredients" element={<Ingredients />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/checkout-success" element={<CheckoutSuccess />} />

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProductManager />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="customers" element={<AdminCustomers />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>

                  {/* Catch-all */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);

export default App;
