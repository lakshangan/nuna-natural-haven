import { Instagram, Facebook, Mail, ShieldCheck, Leaf, Truck } from "lucide-react";
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

/**
 * Detailed, sketchy style tree SVG.
 */
const SketchyTree = ({ className, color = "currentColor" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 200 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="tree-group">
      <path d="M100 400 C98 350 96 300 100 250 C104 200 102 150 100 100" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M98 380 Q96 340 98 300" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <path d="M102 360 Q104 320 102 280" stroke={color} strokeWidth="0.5" opacity="0.4" />
      {[...Array(15)].map((_, i) => {
        const y = 350 - i * 20;
        const width = 85 - i * 5;
        const tilt = i % 2 === 0 ? 1 : -1;
        return (
          <g key={i} transform={`translate(100, ${y})`}>
            <path d={`M0 0 C${width * 0.4 * tilt} ${width * 0.15} ${width * 0.8 * tilt} ${width * 0.3} ${width * tilt} ${width * 0.5}`} stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.6} />
            <path d={`M${width * 0.2 * tilt} 2 L${width * 0.25 * tilt} 8`} stroke={color} strokeWidth="0.5" opacity="0.3" />
            <path d={`M${width * 0.5 * tilt} 5 L${width * 0.55 * tilt} 12`} stroke={color} strokeWidth="0.5" opacity="0.3" />
            <path d={`M${width * 0.8 * tilt} 8 L${width * 0.85 * tilt} 15`} stroke={color} strokeWidth="0.5" opacity="0.3" />
          </g>
        );
      })}
    </g>
  </svg>
);

/**
 * Detailed, sketchy style cloud SVG.
 */
const SketchyCloud = ({ className, color = "currentColor" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 300 150" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.6">
      <path d="M50 100 C20 100 20 70 50 70 C50 40 100 40 120 60 C140 30 200 30 220 60 C260 60 260 100 220 100 Z" stroke={color} strokeWidth="1" strokeDasharray="3 1" />
      <path d="M70 85 C60 85 55 75 75 75 C75 60 95 60 110 75" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <path d="M160 85 C150 85 145 70 175 70 C175 55 210 55 220 75" stroke={color} strokeWidth="0.5" opacity="0.3" />
    </g>
  </svg>
);

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const revealContainerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // THE UNCOVER EFFECT - Reduced shift for mobile to avoid gaps
      const isMobile = window.innerWidth < 768;
      gsap.set(revealContainerRef.current, { yPercent: isMobile ? -20 : -50 });

      const uncover = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        }
      });

      uncover.to(revealContainerRef.current, {
        yPercent: 0,
        ease: "none"
      });

      // Background Text Parallax - Scaled for better fit
      gsap.to(".bg-nuna-parallax", {
        y: isMobile ? -50 : -100,
        scale: isMobile ? 1.02 : 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1.5,
        }
      });

      // Cloud Parallax - Subtler on mobile
      gsap.to(".cloud-layer", {
        x: isMobile ? 40 : 100,
        y: isMobile ? -20 : -50,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 2.5,
        }
      });

      // Tree Parallax
      gsap.to(".tree-layer-fg", {
        y: isMobile ? -100 : -250,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.5,
        }
      });

      gsap.to(".tree-layer-mg", {
        y: isMobile ? -60 : -150,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      // Content Stagger Reveal
      gsap.from(".footer-grid > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        }
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative min-h-[900px] md:h-[750px] overflow-hidden bg-[#0D1511]"
      style={{ clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <div
        ref={revealContainerRef}
        className="relative w-full h-full flex flex-col justify-end"
      >
        {/* Cinematic Parallax Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="bg-nuna-parallax absolute top-[40%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center opacity-[0.03]">
            <h1 className="text-[40vw] md:text-[30vw] font-black tracking-tighter leading-none text-warm-cream select-none">
              NUNA
            </h1>
          </div>

          <div className="cloud-layer absolute inset-0 opacity-15">
            <SketchyCloud className="absolute top-[10%] left-[5%] w-32 md:w-64 h-auto" color="#fefae0" />
            <SketchyCloud className="absolute top-[25%] right-[10%] w-40 md:w-80 h-auto" color="#fefae0" />
          </div>

          <div className="tree-layer-mg absolute bottom-[-30px] left-0 w-full flex justify-around opacity-10">
            {[...Array(isMobile() ? 2 : 4)].map((_, i) => (
              <SketchyTree key={`mg-${i}`} className="w-40 md:w-56 h-auto" color="#2D4A3B" />
            ))}
          </div>

          <div className="tree-layer-fg absolute bottom-[-100px] left-0 w-full flex justify-between px-4 md:px-10 opacity-20 z-10">
            <SketchyTree className="w-56 md:w-80 h-auto" color="#0D1511" />
            <SketchyTree className="w-[250px] md:w-[400px] h-auto transform scale-x-[-1]" color="#0D1511" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1511] via-transparent to-transparent opacity-90" />
        </div>

        {/* Responsive Content Layout */}
        <div className="container mx-auto px-6 max-w-7xl relative z-20 pb-12 md:pb-16 text-warm-cream">
          {/* Progress Line */}
          <div ref={lineRef} className="h-[1px] w-full bg-accent-gold/20 mb-12 md:mb-20" />

          <div className="footer-grid grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-12 md:mb-16">
            {/* Brand Identity Section */}
            <div className="md:col-span-12 lg:col-span-5 space-y-8 md:space-y-10 text-center md:text-left">
              <Link to="/" className="inline-block group">
                <img
                  src={nunalogo}
                  alt="Nuna Origin"
                  className="h-12 md:h-16 w-auto mx-auto md:mx-0 object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-all duration-500"
                />
              </Link>

              <p className="max-w-md mx-auto md:mx-0 text-lg md:text-2xl font-heading leading-relaxed text-warm-cream/80 italic">
                "Redefining natural care with the wisdom of the forest and the purity of the heart."
              </p>

              <div className="flex justify-center md:justify-start gap-6">
                {navigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-warm-cream/10 flex items-center justify-center text-warm-cream/40 hover:text-accent-gold hover:border-accent-gold/40 hover:bg-accent-gold/5 transition-all duration-500"
                  >
                    <item.icon className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Columns */}
            <div className="grid grid-cols-2 gap-8 md:contents">
              <div className="md:col-span-4 lg:col-span-2">
                <h4 className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-accent-gold/80 mb-6 md:mb-8 text-center md:text-left">
                  Collections
                </h4>
                <ul className="space-y-3 md:space-y-4 text-center md:text-left">
                  {navigation.shop.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-warm-cream/50 hover:text-warm-cream transition-colors duration-300 text-sm md:text-base"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-4 lg:col-span-2">
                <h4 className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-accent-gold/80 mb-6 md:mb-8 text-center md:text-left">
                  Discovery
                </h4>
                <ul className="space-y-3 md:space-y-4 text-center md:text-left">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-warm-cream/50 hover:text-warm-cream transition-colors duration-300 text-sm md:text-base"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Core Values Section */}
            <div className="md:col-span-4 lg:col-span-3 space-y-6 md:space-y-8">
              <div className="p-6 md:p-8 rounded-2xl bg-warm-cream/[0.03] border border-warm-cream/5 backdrop-blur-sm space-y-6 md:space-y-8">
                <div className="flex items-center gap-4 text-warm-cream/60 group">
                  <Leaf className="w-5 h-5 md:w-6 md:h-6 text-accent-gold/50 group-hover:rotate-12 transition-transform" />
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">100% Organic</span>
                </div>
                <div className="flex items-center gap-4 text-warm-cream/60 group">
                  <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-accent-gold/50 group-hover:rotate-12 transition-transform" />
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">Ethically Sourced</span>
                </div>
                <div className="flex items-center gap-4 text-warm-cream/60 group">
                  <Truck className="w-5 h-5 md:w-6 md:h-6 text-accent-gold/50 group-hover:rotate-12 transition-transform" />
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">Secure Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-warm-cream/5 pt-10 md:pt-12 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-warm-cream/30 text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] font-medium uppercase">
                &copy; {new Date().getFullYear()} RENU'S NATURAL HAVEN Sanctuary
              </p>
              <p className="text-accent-gold/30 text-[8px] md:text-[9px] tracking-[0.2em] md:tracking-[0.3em] uppercase italic">Sustainable Beauty Essentials</p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-warm-cream/30 text-[9px] md:text-[10px] font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase">
              <Link to="/privacy" className="hover:text-accent-gold transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-accent-gold transition-colors">Terms</Link>
              <Link to="/shipping" className="hover:text-accent-gold transition-colors">Shipping</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-30" />
    </footer>
  );
};

const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;
