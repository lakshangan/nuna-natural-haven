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

      {/* Mobile Menu Overlay - OUTSIDE the restricted height nav */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-white md:hidden overflow-y-auto animate-in slide-in-from-top-4 duration-500 flex flex-col pt-[72px]"
        >
          <div className="flex-1 container mx-auto px-8 py-10 flex flex-col gap-10">
            <div className="space-y-6">
              <p className="text-[11px] font-bold text-primary/40 uppercase tracking-[0.3em] px-2">Navigation</p>
              <div className="grid gap-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`
                      group flex items-center justify-between py-4 px-6 rounded-[2rem]
                      transition-all duration-500 ease-out
                      ${isActive(link.href)
                        ? "bg-primary text-white shadow-[0_20px_40px_-10px_rgba(var(--olive-green),0.2)]"
                        : "bg-muted/30 text-foreground/80 hover:bg-muted/50"
                      }
                    `}
                    style={{
                      animation: 'reveal 0.6s cubic-bezier(0.2, 0.9, 0.2, 1) forwards',
                      animationDelay: `${index * 0.08}s`,
                      opacity: 0
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`p-3 rounded-2xl transition-colors ${isActive(link.href) ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                        {link.icon}
                      </div>
                      <span className="text-lg font-semibold tracking-tight">{link.label}</span>
                    </div>
                    <div className={`h-2 w-2 rounded-full transition-all duration-500 ${isActive(link.href) ? 'bg-white scale-125' : 'bg-primary/20 group-hover:bg-primary/40'}`} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6 mt-auto pb-8">
              <p className="text-[11px] font-bold text-primary/40 uppercase tracking-[0.3em] px-2">Account Experience</p>
              <div className="grid gap-4">
                {user ? (
                  <Link
                    to={user.role === 'admin' ? "/admin/dashboard" : "/dashboard"}
                    className="flex items-center gap-5 p-6 bg-primary/5 border border-primary/10 rounded-[2rem] transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="p-4 rounded-full bg-primary text-white shadow-lg">
                      {user.role === 'admin' ? <Leaf className="h-6 w-6" /> : <User className="h-6 w-6" />}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold opacity-60 uppercase tracking-tighter">Welcome back</span>
                      <span className="text-lg font-bold text-primary">
                        {user.role === 'admin' ? "Administrator" : "User Profile"}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <Link
                    to="/auth"
                    className="flex items-center justify-center gap-4 text-base font-bold uppercase tracking-widest py-6 px-8 bg-accent text-white rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(var(--accent-gold),0.4)] active:scale-95 transition-all duration-500 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-6 w-6 transition-transform group-hover:rotate-12" />
                    Join The Family
                  </Link>
                )}

                <div className="bg-muted/30 border border-border/50 rounded-[2rem] p-6 flex items-center justify-between group">
                  <div className="flex items-center gap-5">
                    <div className="p-4 rounded-[1.25rem] bg-white shadow-sm text-primary group-hover:scale-110 transition-transform duration-500">
                      <ShoppingCart className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold">Your Basket</span>
                      <span className="text-xs text-muted-foreground font-medium">Items waiting for you</span>
                    </div>
                  </div>
                  <CartSheet />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
