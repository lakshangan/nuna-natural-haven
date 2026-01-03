import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/hooks/useProducts";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const products = [
  {
    id: 1,
    slug: "nourishing-hair-oil",
    name: "Nourishing Hair Oil",
    price: 32,
    image: product1,
    category: "Hair Care",
    ingredients: "Rosemary, Lavender, Jojoba",
    description: "Deep conditioning treatment for all hair types",
  },
  {
    id: 2,
    slug: "soothing-face-cream",
    name: "Soothing Face Cream",
    price: 42,
    image: product2,
    category: "Skin Care",
    ingredients: "Chamomile, Calendula, Shea Butter",
    description: "Gentle hydration for sensitive skin",
  },
  {
    id: 3,
    slug: "healing-body-butter",
    name: "Healing Body Butter",
    price: 38,
    image: product3,
    category: "Body Care",
    ingredients: "Eucalyptus, Rosemary, Cocoa Butter",
    description: "Rich moisture for dry skin",
  },
];

const Shop = () => {
  const { addItem } = useCart();
  const { data: dbProducts, isLoading, error } = useProducts();

  // Combine DB products with static ones or use static as fallback
  const displayProducts = dbProducts && dbProducts.length > 0 ? dbProducts : products;

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();

    // Normalize data if it comes from DB
    const cartProduct = {
      id: typeof product.id === 'string' ? Math.random() : product.id, // Temporary numeric ID for cart logic
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image_url || product.image,
    };

    addItem(cartProduct);
    toast.success(`${product.name} added to cart!`);
  };

  if (error) {
    console.error("Backend Error:", error);
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-[1180px]">
          {/* Header */}
          <div className="text-center space-y-4 mb-16 animate-reveal">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-primary">
              Our Collection
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handcrafted herbal remedies for every part of your self-care routine
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading Skeleton
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square w-full rounded-2xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))
            ) : (
              displayProducts.map((product: any, index: number) => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 animate-reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={product.image_url || product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="backdrop-blur-sm">
                        {product.category}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-6 gap-3">
                      <Button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="bg-accent text-white hover:bg-accent/90 font-medium uppercase tracking-wider w-full shadow-lg"
                        size="lg"
                      >
                        Add to Cart
                      </Button>
                      <div className="w-full text-center">
                        <span className="text-white text-xs font-semibold tracking-widest uppercase opacity-80 decoration-none">Click for Details</span>
                      </div>
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
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
