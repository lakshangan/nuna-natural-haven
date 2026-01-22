import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Home, ShoppingCart, Info, Flower2, MessageSquare, User, LogOut, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { CartSheet } from "./CartSheet";
import { useAuth } from "@/contexts/AuthContext";
import nunalogo from "@/assets/nunalogo.png";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    { label: "Shop", href: "/shop", icon: <ShoppingCart className="h-5 w-5" /> },
    { label: "About", href: "/about", icon: <Info className="h-5 w-5" /> },
    { label: "Ingredients", href: "/ingredients", icon: <Flower2 className="h-5 w-5" /> },
    { label: "Contact", href: "/contact", icon: <MessageSquare className="h-5 w-5" /> },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
          ? "glass border-b border-border/20 shadow-sm"
          : "bg-background/50 backdrop-blur-sm"
          }`}
        style={{
          height: "var(--nav-height, 72px)",
        }}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between max-w-[1180px]">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={nunalogo}
              alt="Nuna Origin Logo"
              className="h-10 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation - Modern Pill Style */}
          <div className="hidden md:flex items-center gap-3">
            <nav className="flex items-center gap-2 bg-card/80 backdrop-blur-md rounded-full px-2 py-2 shadow-lg border border-border/50">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`
                    relative px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wider
                    transition-all duration-300 ease-out
                    ${isActive(link.href)
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <CartSheet />

            {/* User/Admin Profile Link */}
            <Link to={user ? (user.role === 'admin' ? "/admin/dashboard" : "/dashboard") : "/auth"}>
              <Button
                variant="ghost"
                size="icon"
                className={`transition-colors ml-2 ${user ? 'text-accent' : 'hover:text-accent'}`}
                title={user ? (user.role === 'admin' ? "Admin Panel" : "Account Dashboard") : "Login / Register"}
              >
                {user?.role === 'admin' ? (
                  <Leaf className="h-5 w-5" />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-primary" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Lower z-index so Nav (with X button) stays on top */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-white md:hidden overflow-y-auto animate-in fade-in duration-300 flex flex-col pt-[80px] pb-10"
        >
          <div className="container mx-auto px-6 flex flex-col gap-8">
            {/* Navigation Section */}
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.3em] px-4">Menu</p>
              <div className="grid gap-3">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`
                      group flex items-center justify-between py-4 px-5 rounded-2xl
                      transition-all duration-300
                      ${isActive(link.href)
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "bg-muted/30 text-foreground/80 hover:bg-muted/50"
                      }
                    `}
                    style={{
                      animation: 'reveal 0.4s ease-out forwards',
                      animationDelay: `${index * 0.05}s`,
                      opacity: 0
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl transition-colors ${isActive(link.href) ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                        {link.icon}
                      </div>
                      <span className="text-base font-semibold">{link.label}</span>
                    </div>
                    <div className={`h-1.5 w-1.5 rounded-full transition-all ${isActive(link.href) ? 'bg-white' : 'bg-primary/20'}`} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Account Section - No longer pushed to the very bottom */}
            <div className="space-y-4 border-t border-border/10 pt-8">
              <p className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.3em] px-4">Account & Shop</p>
              <div className="grid gap-3">
                {user ? (
                  <Link
                    to={user.role === 'admin' ? "/admin/dashboard" : "/dashboard"}
                    className="flex items-center gap-4 p-5 bg-primary/5 border border-primary/10 rounded-2xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="p-3 rounded-full bg-primary text-white">
                      {user.role === 'admin' ? <Leaf className="h-5 w-5" /> : <User className="h-5 w-5" />}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-bold opacity-50 uppercase">Dashboard</span>
                      <span className="text-base font-bold text-primary">
                        {user.role === 'admin' ? "Admin Access" : "My Account"}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <Link
                    to="/auth"
                    className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest py-5 px-8 bg-accent text-white rounded-2xl shadow-lg shadow-accent/20 active:scale-95 transition-all group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    Login / Register
                  </Link>
                )}

                <div className="bg-muted/30 border border-border/50 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-3 rounded-xl bg-white shadow-sm text-primary">
                      <ShoppingCart className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-bold">Shopping Cart</span>
                  </div>
                  <CartSheet />
                </div>
              </div>
            </div>

            {/* Close / Back to Page button at the bottom for easy reach */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors flex items-center justify-center gap-2"
            >
              <X className="h-4 w-4" />
              Close Menu
            </button>
          </div>
        </div>
      )}
    </>
  );
};
