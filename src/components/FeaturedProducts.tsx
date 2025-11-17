import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const products = [
  {
    id: 1,
    name: "Nourishing Hair Oil",
    price: 32,
    image: product1,
    ingredients: "Rosemary, Lavender, Jojoba",
    description: "Deep conditioning treatment for all hair types",
  },
  {
    id: 2,
    name: "Soothing Face Cream",
    price: 42,
    image: product2,
    ingredients: "Chamomile, Calendula, Shea Butter",
    description: "Gentle hydration for sensitive skin",
  },
  {
    id: 3,
    name: "Healing Body Butter",
    price: 38,
    image: product3,
    ingredients: "Eucalyptus, Rosemary, Cocoa Butter",
    description: "Rich moisture for dry skin",
  },
];

export const FeaturedProducts = () => {
  return (
    <section id="shop" className="py-20 bg-background">
      <div className="container mx-auto px-6 max-w-[1180px]">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary">
            Featured Bestsellers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most loved herbal remedies, crafted with care and
            purpose
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 animate-reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                  <Button
                    className="bg-white text-primary hover:bg-white/90 font-medium uppercase tracking-wider w-full"
                    size="lg"
                  >
                    Quick Add
                  </Button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-xl font-semibold">
                      {product.name}
                    </h3>
                    <span className="text-xl font-semibold text-accent">
                      ${product.price}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {product.description}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {product.ingredients}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  className="w-full uppercase tracking-wider"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
