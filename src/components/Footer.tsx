import { Instagram, Facebook, Mail, Leaf, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import nunalogo from "@/assets/nunalogo.png";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navigation = {
  shop: [
    { name: "Hair Care", href: "/shop" },
    { name: "Skin Care", href: "/shop" },
    { name: "Body Care", href: "/shop" },
    { name: "All Collections", href: "/shop" },
  ],
  company: [
    { name: "Our Story", href: "/about" },
    { name: "Ingredients", href: "/ingredients" },
    { name: "Contact Us", href: "/contact" },
  ],
  social: [
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "Email", href: "mailto:hello@nuna.com", icon: Mail },
  ],
};

const LushTree = ({ className, color = "currentColor", opacity = 1 }: { className?: string, color?: string, opacity?: number }) => (
  <svg viewBox="0 0 200 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
    {/* Organic Trunk */}
    <path
      d="M100 300 C95 250 90 200 100 150 C110 200 105 250 100 300"
      fill="#3d2b1f"
    />
    {/* Main Branches */}
    <path d="M100 180 C120 160 160 160 180 140" stroke="#3d2b1f" strokeWidth="4" strokeLinecap="round" />
    <path d="M100 200 C80 180 40 180 20 160" stroke="#3d2b1f" strokeWidth="4" strokeLinecap="round" />
    <path d="M100 140 C110 120 140 100 150 80" stroke="#3d2b1f" strokeWidth="3" strokeLinecap="round" />
    <path d="M100 160 C90 140 60 120 50 100" stroke="#3d2b1f" strokeWidth="3" strokeLinecap="round" />

    {/* Leaf Clusters - Varying shades of green */}
    <circle cx="180" cy="140" r="22" fill="#2d5a27" opacity="0.8" />
    <circle cx="165" cy="130" r="18" fill="#4a7c44" opacity="0.9" />
    <circle cx="20" cy="160" r="22" fill="#2d5a27" opacity="0.8" />
    <circle cx="35" cy="150" r="18" fill="#4a7c44" opacity="0.9" />
    <circle cx="150" cy="80" r="20" fill="#2d5a27" opacity="0.8" />
    <circle cx="135" cy="70" r="15" fill="#4a7c44" opacity="0.9" />
    <circle cx="50" cy="100" r="20" fill="#2d5a27" opacity="0.8" />
    <circle cx="65" cy="90" r="15" fill="#4a7c44" opacity="0.9" />
    <circle cx="100" cy="60" r="25" fill="#2d5a27" opacity="0.8" />
    <circle cx="100" cy="40" r="20" fill="#4a7c44" opacity="0.9" />

    {/* Detail Leaves */}
    <g fill={color} opacity="0.4">
      <path d="M185 145 l5 -5 l-5 -5 l-5 5 z" />
      <path d="M175 135 l5 -5 l-5 -5 l-5 5 z" />
      <path d="M15 165 l5 -5 l-5 -5 l-5 5 z" />
      <path d="M55 105 l5 -5 l-5 -5 l-5 5 z" />
      <path d="M100 30 l5 -5 l-5 -5 l-5 5 z" />
    </g>
  </svg>
);

const FloatingLeaf = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2C12 2 4 8 4 14C4 18.4 7.6 22 12 22C16.4 22 20 18.4 20 14C20 8 12 2 12 2Z" fill="#4a7c44" opacity="0.3" />
    <path d="M12 2V22M12 8L18 12M12 12L6 16" stroke="#2d5a27" strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
  </svg>
);

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const revealContainerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // THE UNCOVER EFFECT
      // Setting initial state: Footer shifted UP by 50%
      gsap.set(revealContainerRef.current, { yPercent: -50 });

      const uncover = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom", // when the top of the footer hits the bottom of the viewport
          end: "bottom bottom", // when the bottom of the footer hits the bottom of the viewport
          scrub: true,
          // markers: true, // Uncomment to debug
        }
      });

      uncover.to(revealContainerRef.current, {
        yPercent: 0,
        ease: "none"
      });

      // Parallax for the line reveal
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "top 40%",
            scrub: true,
          }
        }
      );

      // Deep Parallax for Lush Trees
      gsap.to(".lush-tree-back", {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.5,
        }
      });

      gsap.to(".lush-tree-front", {
        y: -300,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1.5,
        }
      });

      // Floating particles/leaves
      gsap.to(".floating-leaf", {
        y: "random(-40, 40)",
        x: "random(-40, 40)",
        rotation: "random(-30, 30)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          from: "random"
        }
      });

      // Bigger text reveal
      gsap.from(".footer-big-content > *", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 70%",
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative h-[850px] md:h-[750px] overflow-hidden bg-[#0D1511]"
      style={{ clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      {/* Scrollable Container (Revealed by Uncover animation) */}
      <div
        ref={revealContainerRef}
        className="relative w-full h-full flex flex-col justify-end"
      >
        {/* Parallax Forest Environment */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Layer 1: Distant Detailed Trees */}
          <div className="lush-tree-back absolute bottom-20 left-0 w-full flex justify-around opacity-10">
            {[...Array(5)].map((_, i) => (
              <LushTree key={`tree-back-${i}`} className="w-64 h-64 md:w-96 md:h-96" opacity={0.4} />
            ))}
          </div>

          {/* Layer 2: Foreground Detailed Trees */}
          <div className="lush-tree-front absolute bottom-[-100px] left-0 w-full flex justify-between px-10 opacity-20">
            {[...Array(4)].map((_, i) => (
              <LushTree key={`tree-front-${i}`} className="w-80 h-80 md:w-[500px] md:h-[500px]" opacity={0.6} />
            ))}
          </div>

          {/* Floor Shadow */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0D1511] to-transparent" />
        </div>

        {/* Floating Organic Particles */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="floating-leaf absolute"
              style={{
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 100}%`,
                transform: `scale(${0.4 + Math.random() * 0.8})`
              }}
            >
              <FloatingLeaf className="w-10 h-10 md:w-16 md:h-16" />
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-8 max-w-7xl relative z-20 pb-16 text-warm-cream">
          {/* Progress Divider */}
          <div ref={lineRef} className="h-[2px] w-full bg-accent-gold/20 mb-20" />

          <div className="footer-big-content grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 mb-20">
            {/* Massive Brand Statement */}
            <div className="md:col-span-12 lg:col-span-6 space-y-12">
              <Link to="/" className="inline-block transition-transform duration-500 hover:scale-105">
                <img
                  src={nunalogo}
                  alt="Nuna Origin"
                  className="h-20 w-auto object-contain brightness-0 invert opacity-95"
                />
              </Link>

              <h2 className="text-4xl md:text-6xl font-heading leading-tight text-warm-cream/90 font-light italic tracking-tight">
                Crafting the purity of <span className="text-accent-gold font-normal">nature</span> for your daily ritual.
              </h2>

              <div className="flex gap-8">
                {navigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center gap-3 text-sm md:text-base font-bold uppercase tracking-[0.2em] text-warm-cream/40 hover:text-accent-gold transition-all duration-500"
                  >
                    <item.icon className="w-6 h-6 group-hover:scale-125 transition-transform" />
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline">{item.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Sections with Bigger Text */}
            <div className="md:col-span-4 lg:col-span-3 space-y-10">
              <h4 className="text-[12px] uppercase tracking-[0.4em] font-black text-accent-gold/60">
                Explore The Collections
              </h4>
              <ul className="space-y-6">
                {navigation.shop.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-xl md:text-2xl font-heading text-warm-cream/50 hover:text-warm-cream transition-all duration-300 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-8 overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100 text-accent-gold mr-0 group-hover:mr-4">—</span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4 lg:col-span-3 space-y-10">
              <h4 className="text-[12px] uppercase tracking-[0.4em] font-black text-accent-gold/60">
                Our Sanctuary
              </h4>
              <ul className="space-y-6">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-xl md:text-2xl font-heading text-warm-cream/50 hover:text-warm-cream transition-all duration-300 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-8 overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100 text-accent-gold mr-0 group-hover:mr-4">—</span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Utility Bar */}
          <div className="border-t border-warm-cream/5 pt-12 flex flex-col md:flex-row justify-between items-end md:items-center gap-10">
            <div className="space-y-4">
              <p className="text-warm-cream/20 text-[10px] tracking-[0.4em] font-bold uppercase">
                &copy; {new Date().getFullYear()} RENU'S NATURAL HAVEN Sanctuary
              </p>
              <div className="flex gap-10 text-warm-cream/30 text-[10px] font-black tracking-[0.4em] uppercase">
                <Link to="/privacy" className="hover:text-accent-gold transition-colors">Privacy</Link>
                <Link to="/terms" className="hover:text-accent-gold transition-colors">Terms</Link>
                <Link to="/shipping" className="hover:text-accent-gold transition-colors">Shipping</Link>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] tracking-[0.3em] font-bold text-warm-cream/20 uppercase">Sourced from</span>
                <span className="text-lg md:text-xl font-heading text-accent-gold/40 group-hover:text-accent-gold transition-colors animate-pulse">Eternal Forests</span>
              </div>
              <ShieldCheck className="w-10 h-10 text-accent-gold/20 group-hover:text-accent-gold transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Bottom vignette */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </footer>
  );
};


