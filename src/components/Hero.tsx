import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Award, Package } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import product1 from "@/assets/product-1.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background with subtle parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      <div className="container mx-auto px-6 max-w-[1180px] relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-reveal">
            <div className="space-y-4">
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance text-primary">
                Nature made simple. Care that grows with you.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                Handmade herbal remedies for hair, skin, and wellbeing.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium uppercase tracking-wider"
              >
                Shop Bestsellers
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-medium uppercase tracking-wider"
              >
                Learn Our Story
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Badge
                variant="secondary"
                className="flex items-center gap-2 py-2 px-4 text-sm"
              >
                <Leaf className="h-4 w-4" />
                Handmade in small batches
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-2 py-2 px-4 text-sm"
              >
                <Award className="h-4 w-4" />
                No synthetic preservatives
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-2 py-2 px-4 text-sm"
              >
                <Package className="h-4 w-4" />
                Sustainably packaged
              </Badge>
            </div>
          </div>

          {/* Right Column - Featured Product Card */}
          <div
            className="relative animate-reveal"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="bg-card rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product1}
                  alt="Featured herbal hair oil"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-2xl font-semibold">
                    Nourishing Hair Oil
                  </h3>
                  <span className="text-xl font-semibold text-accent">
                    ₹32
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Infused with rosemary, lavender & jojoba
                </p>
                <Button className="w-full uppercase tracking-wider" size="lg">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
