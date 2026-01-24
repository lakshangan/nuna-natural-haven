import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ChevronLeft, Leaf, Award, Package, Loader2 } from "lucide-react";
import { useProduct } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import gallery1 from "@/assets/product-gallery-1.jpg";
import gallery2 from "@/assets/product-gallery-2.jpg";
import { resolveProductImage } from "@/lib/image-utils";

const productData: Record<string, any> = {
  "nourishing-hair-oil": {
    id: 1,
    name: "Nourishing Hair Oil",
    price: 32,
    images: [product1, gallery1, gallery2],
    shortDescription: "Deep conditioning treatment for all hair types",
    fullDescription:
      "Our Nourishing Hair Oil is a luxurious blend of premium botanical oils designed to restore vitality and shine to your hair. Handcrafted in small batches, this treatment penetrates deeply to nourish from root to tip.",
    ingredients: [
      { name: "Rosemary Essential Oil", benefit: "Stimulates hair growth and improves scalp health" },
      { name: "Lavender Oil", benefit: "Soothes scalp and promotes relaxation" },
      { name: "Jojoba Oil", benefit: "Mimics natural sebum, deeply moisturizes" },
      { name: "Argan Oil", benefit: "Rich in vitamin E, repairs damaged hair" },
      { name: "Vitamin E", benefit: "Antioxidant protection and nourishment" },
    ],
    sizes: ["30ml", "50ml", "100ml"],
    reviews: [
      {
        name: "Sarah Mitchell",
        rating: 5,
        date: "2 weeks ago",
        comment: "Absolutely transformed my dry, damaged hair. The scent is divine and it works wonders!",
      },
      {
        name: "Jessica Brown",
        rating: 5,
        date: "1 month ago",
        comment: "Best hair oil I've ever used. My hair feels softer and looks shinier after just one use.",
      },
      {
        name: "Amanda Lee",
        rating: 5,
        date: "2 months ago",
        comment: "Love the natural ingredients. No more frizz and my scalp feels healthier too.",
      },
    ],
    howToUse:
      "Apply a few drops to damp or dry hair, focusing on mid-lengths to ends. Massage gently into scalp for added benefits. Can be used daily or as a deep conditioning treatment overnight.",
  },
  "soothing-face-cream": {
    id: 2,
    name: "Soothing Face Cream",
    price: 42,
    images: [product2, gallery1, gallery2],
    shortDescription: "Gentle hydration for sensitive skin",
    fullDescription:
      "Our Soothing Face Cream is specially formulated for sensitive skin, combining calming botanical extracts with rich moisturizers to provide gentle, effective hydration without irritation.",
    ingredients: [
      { name: "Chamomile Extract", benefit: "Calms inflammation and reduces redness" },
      { name: "Calendula Oil", benefit: "Heals and soothes irritated skin" },
      { name: "Shea Butter", benefit: "Deep moisturization and skin barrier repair" },
      { name: "Aloe Vera", benefit: "Hydrates and cools sensitive skin" },
      { name: "Vitamin C", benefit: "Brightens and evens skin tone" },
    ],
    sizes: ["30ml", "50ml"],
    reviews: [
      {
        name: "James Chen",
        rating: 5,
        date: "1 week ago",
        comment: "Finally found a face cream that doesn't irritate my sensitive skin. The ingredients are truly pure.",
      },
      {
        name: "Maria Garcia",
        rating: 5,
        date: "3 weeks ago",
        comment: "My skin has never felt better. No more redness or dry patches!",
      },
    ],
    howToUse:
      "Apply to clean, dry skin morning and evening. Gently massage in upward circular motions until fully absorbed. Can be used alone or under makeup.",
  },
  "healing-body-butter": {
    id: 3,
    name: "Healing Body Butter",
    price: 38,
    images: [product3, gallery1, gallery2],
    shortDescription: "Rich moisture for dry skin",
    fullDescription:
      "Our Healing Body Butter is a decadent, whipped formula that melts into skin, providing long-lasting moisture and nourishment. Perfect for very dry skin or as an all-over treatment.",
    ingredients: [
      { name: "Eucalyptus Oil", benefit: "Refreshes and invigorates skin" },
      { name: "Rosemary Extract", benefit: "Improves circulation and skin tone" },
      { name: "Cocoa Butter", benefit: "Intense hydration and skin softening" },
      { name: "Coconut Oil", benefit: "Antibacterial and deeply moisturizing" },
      { name: "Beeswax", benefit: "Seals in moisture and protects skin" },
    ],
    sizes: ["100ml", "200ml"],
    reviews: [
      {
        name: "Emily Rodriguez",
        rating: 5,
        date: "2 weeks ago",
        comment: "I love knowing exactly what goes into these products. The body butter is luxurious and healing.",
      },
      {
        name: "Lisa Thompson",
        rating: 5,
        date: "1 month ago",
        comment: "Rich without being greasy. My skin stays soft all day long!",
      },
    ],
    howToUse:
      "Apply generously to clean skin after bathing while skin is still slightly damp. Massage until absorbed. Focus on dry areas like elbows, knees, and feet.",
  },
};

const ProductDetail = () => {
  const { slug } = useParams();
  const { addItem } = useCart();
  const { data: dbProduct, isLoading } = useProduct(slug || "");

  // Get static metadata
  const staticData = slug ? productData[slug] : null;

  // Merge backend data with static metadata
  const product = dbProduct ? {
    ...staticData,
    ...dbProduct,
    // Ensure images array exists, fallback to db image_url if needed
    images: staticData?.images || [resolveProductImage(dbProduct.image_url)],
    name: dbProduct.name,
    price: dbProduct.price,
    description: dbProduct.description,
    // Safely handle ingredients whether they are an array or comma-separated string
    ingredients: Array.isArray(dbProduct.ingredients)
      ? dbProduct.ingredients
      : (typeof dbProduct.ingredients === 'string'
        ? dbProduct.ingredients.split(',').map((i: string) => ({ name: i.trim(), benefit: "Natural Botanical" }))
        : staticData?.ingredients || [])
  } : staticData;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Set initial size when product loads
  useState(() => {
    if (product?.sizes?.[0]) {
      setSelectedSize(product.sizes[0]);
    }
  });

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: resolveProductImage(product.image_url || (product.images && product.images[0])),
      // size: selectedSize // CartItem doesn't have size yet, I'll ignore for now or add to CartItem
    }, quantity);

    toast.success(`${product.name} added to cart!`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="relative z-10 bg-background shadow-2xl pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-[1180px]">
          {/* Back Button */}
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 animate-reveal"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Shop
          </Link>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery */}
            <div className="space-y-4 animate-reveal">
              <div className="aspect-square rounded-2xl overflow-hidden bg-card shadow-xl">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImage === index
                      ? "border-primary shadow-md scale-105"
                      : "border-transparent hover:border-border"
                      }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6 animate-reveal" style={{ animationDelay: "0.1s" }}>
              <div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-primary">
                  {product.name}
                </h1>
                <p className="text-xl text-muted-foreground mb-4">
                  {product.shortDescription}
                </p>
                <div className="text-3xl font-bold text-accent mb-6">₹{product.price}</div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="flex items-center gap-2 py-2 px-4">
                  <Leaf className="h-4 w-4" />
                  Handmade
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-2 py-2 px-4">
                  <Award className="h-4 w-4" />
                  Pure Ingredients
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-2 py-2 px-4">
                  <Package className="h-4 w-4" />
                  Eco-Packaged
                </Badge>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase tracking-wider">
                  Select Size
                </label>
                <div className="flex gap-3">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-lg border-2 font-medium transition-all duration-200 ${selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground shadow-md"
                        : "border-border hover:border-primary"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase tracking-wider">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                size="lg"
                className="w-full uppercase tracking-wider text-lg py-6"
                onClick={handleAddToCart}
              >
                Add to Cart - ₹{product.price * quantity}
              </Button>

              {/* Description */}
              <div className="pt-6 border-t border-border">
                <p className="text-muted-foreground leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Tabs */}
          <Tabs defaultValue="ingredients" className="animate-reveal">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="how-to-use">How to Use</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="ingredients" className="space-y-4">
              <h3 className="font-heading text-2xl font-semibold mb-6">
                Full Ingredient List
              </h3>
              <div className="grid gap-4">
                {product.ingredients.map((ingredient: any, index: number) => (
                  <div
                    key={index}
                    className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-semibold text-lg mb-2">{ingredient.name}</h4>
                    <p className="text-sm text-muted-foreground">{ingredient.benefit}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="how-to-use">
              <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
                <h3 className="font-heading text-2xl font-semibold mb-4">How to Use</h3>
                <p className="text-muted-foreground leading-relaxed">{product.howToUse}</p>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-heading text-2xl font-semibold mb-2">
                    Customer Reviews
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.reviews.length} reviews
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {product.reviews.map((review: any, index: number) => (
                  <div
                    key={index}
                    className="bg-card p-6 rounded-xl shadow-sm border border-border"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold mb-1">{review.name}</div>
                        <div className="text-sm text-muted-foreground">{review.date}</div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
