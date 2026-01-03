import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { CartSheet } from "./CartSheet";
import { useAuth } from "@/contexts/AuthContext";
import { User, LogOut, Leaf } from "lucide-react";
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
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Ingredients", href: "/ingredients" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
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
            alt="Renu's Natural Logo"
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

          {user ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut()}
              className="hover:text-destructive transition-colors ml-2"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          ) : (
            <Link to="/auth">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-accent transition-colors ml-2"
                title="Login"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-t border-border/20 animate-reveal">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.label}
                to={link.href}
                className={`
                  text-sm font-medium uppercase tracking-wider py-3 px-4 rounded-lg
                  transition-all duration-200 animate-reveal
                  ${isActive(link.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:text-primary hover:bg-muted/50"
                  }
                `}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 border-t border-border/20 pt-4">
              <CartSheet />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
