import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass border-b border-border/20 shadow-sm"
          : "bg-background/50 backdrop-blur-sm"
      }`}
      style={{
        height: "var(--nav-height, 72px)",
      }}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between max-w-[1180px]">
        {/* Logo */}
       <Link to="/" className="flex items-center">
  <img 
    src="/Nuna_Name Logo_RGB_Black.png" 
    alt="Nuna Logo"
    className="h-10 w-auto md:h-12 object-contain hover:opacity-80 transition-opacity"
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
                  ${
                    isActive(link.href)
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <Button
            variant="ghost"
            size="icon"
            className="relative ml-2 hover:scale-110 transition-transform duration-200"
            aria-label="Shopping cart"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-[10px] font-semibold flex items-center justify-center text-accent-foreground">
              0
            </span>
          </Button>
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
                  ${
                    isActive(link.href)
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
            <Button variant="outline" className="w-full justify-start gap-2 mt-4">
              <ShoppingBag className="h-4 w-4" />
              Cart (0)
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
