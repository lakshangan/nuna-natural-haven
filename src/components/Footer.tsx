import { Instagram, Facebook, Mail } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "Hair Care", href: "#" },
    { label: "Skin Care", href: "#" },
    { label: "Body Care", href: "#" },
    { label: "Gift Sets", href: "#" },
  ],
  about: [
    { label: "Our Story", href: "#" },
    { label: "Ingredients", href: "#" },
    { label: "Sustainability", href: "#" },
    { label: "Blog", href: "#" },
  ],
  support: [
    { label: "Contact Us", href: "#" },
    { label: "Shipping Info", href: "#" },
    { label: "Returns", href: "#" },
    { label: "FAQ", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Mail, href: "#", label: "Email" },
];

export const Footer = () => {
  return (
    <footer className="bg-neutral-charcoal text-warm-cream py-16">
      <div className="container mx-auto px-6 max-w-[1180px]">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold">
              RENU's Nature World
            </h3>
            <p className="text-sm text-warm-cream/80 leading-relaxed">
              Handcrafted herbal remedies for those who seek the best that
              nature has to offer.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-warm-cream/10 hover:bg-warm-cream/20 flex items-center justify-center transition-colors duration-200"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold uppercase tracking-wider text-sm mb-4">
              Shop
            </h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-warm-cream/70 hover:text-warm-cream transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold uppercase tracking-wider text-sm mb-4">
              About
            </h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-warm-cream/70 hover:text-warm-cream transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold uppercase tracking-wider text-sm mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-warm-cream/70 hover:text-warm-cream transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-warm-cream/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-warm-cream/60">
            © {new Date().getFullYear()} RENU's Nature World. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-warm-cream/60 hover:text-warm-cream transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-warm-cream/60 hover:text-warm-cream transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
