import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ingredientsHero from "@/assets/ingredients-hero.jpg";

const ingredients = [
  {
    name: "Rosemary",
    scientificName: "Rosmarinus officinalis",
    benefits: [
      "Stimulates hair growth and strengthens follicles",
      "Improves circulation to the scalp",
      "Natural antioxidant and anti-inflammatory",
      "Enhances memory and mental clarity",
    ],
    uses: "Hair care, skin toning, aromatherapy",
  },
  {
    name: "Lavender",
    scientificName: "Lavandula angustifolia",
    benefits: [
      "Calms and soothes irritated skin",
      "Promotes relaxation and better sleep",
      "Natural antiseptic and pain reliever",
      "Balances oil production in skin",
    ],
    uses: "Skin care, stress relief, sleep support",
  },
  {
    name: "Chamomile",
    scientificName: "Matricaria chamomilla",
    benefits: [
      "Reduces inflammation and redness",
      "Soothes sensitive and reactive skin",
      "Natural antihistamine properties",
      "Promotes healing of minor wounds",
    ],
    uses: "Sensitive skin care, calming treatments",
  },
  {
    name: "Eucalyptus",
    scientificName: "Eucalyptus globulus",
    benefits: [
      "Opens airways and supports respiratory health",
      "Natural antimicrobial and cleansing",
      "Relieves muscle tension and soreness",
      "Invigorating and refreshing scent",
    ],
    uses: "Body care, aromatherapy, muscle relief",
  },
  {
    name: "Calendula",
    scientificName: "Calendula officinalis",
    benefits: [
      "Accelerates wound healing and tissue repair",
      "Anti-inflammatory and anti-fungal",
      "Soothes dry, cracked, or damaged skin",
      "Gentle enough for sensitive skin",
    ],
    uses: "Healing balms, sensitive skin treatments",
  },
  {
    name: "Jojoba",
    scientificName: "Simmondsia chinensis",
    benefits: [
      "Mimics skin's natural sebum",
      "Deeply moisturizes without clogging pores",
      "Rich in vitamins E and B complex",
      "Non-comedogenic and hypoallergenic",
    ],
    uses: "All skin types, hair conditioning",
  },
];

const Ingredients = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="relative z-10 bg-background shadow-2xl">
        {/* Hero */}
        <section className="relative pt-24 pb-20 overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${ingredientsHero})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
          </div>

          <div className="container mx-auto px-6 max-w-[1180px] relative z-10">
            <div className="max-w-3xl animate-reveal">
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-primary">
                Our Ingredients
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Every botanical we use is carefully selected for its proven benefits and
                sustainable sourcing
              </p>
            </div>
          </div>
        </section>

        {/* Ingredients Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 max-w-[1180px]">
            <div className="text-center space-y-4 mb-16 animate-reveal">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary">
                Nature's Pharmacy
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hover or tap to discover the benefits of each ingredient
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ingredients.map((ingredient, index) => (
                <div
                  key={ingredient.name}
                  className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer animate-reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setSelectedIngredient(index)}
                  onMouseLeave={() => setSelectedIngredient(null)}
                  onClick={() =>
                    setSelectedIngredient(selectedIngredient === index ? null : index)
                  }
                >
                  <div className="p-8">
                    <div className="mb-4">
                      <h3 className="font-heading text-2xl font-bold mb-2 text-primary">
                        {ingredient.name}
                      </h3>
                      <p className="text-sm italic text-muted-foreground">
                        {ingredient.scientificName}
                      </p>
                    </div>

                    {/* Benefits - Show on hover or selection */}
                    <div
                      className={`transition-all duration-300 ${selectedIngredient === index
                          ? "opacity-100 max-h-96"
                          : "opacity-0 max-h-0 overflow-hidden"
                        }`}
                    >
                      <div className="space-y-4 pt-4 border-t border-border">
                        <div>
                          <h4 className="font-semibold text-sm uppercase tracking-wider mb-3">
                            Benefits
                          </h4>
                          <ul className="space-y-2">
                            {ingredient.benefits.map((benefit, i) => (
                              <li
                                key={i}
                                className="text-sm text-muted-foreground flex items-start gap-2"
                              >
                                <span className="text-accent mt-1">•</span>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm uppercase tracking-wider mb-2">
                            Used In
                          </h4>
                          <p className="text-sm text-muted-foreground">{ingredient.uses}</p>
                        </div>
                      </div>
                    </div>

                    {/* Hover Indicator */}
                    <div
                      className={`absolute bottom-4 right-4 text-xs text-muted-foreground transition-opacity ${selectedIngredient === index ? "opacity-0" : "opacity-100"
                        }`}
                    >
                      Tap to explore
                    </div>
                  </div>

                  {/* Accent gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sourcing Statement */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-6 max-w-[1180px]">
            <div className="max-w-3xl mx-auto text-center space-y-6 animate-reveal">
              <h2 className="font-heading text-4xl font-bold text-primary">
                Sustainably Sourced
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We partner with organic farms and ethical suppliers who share our
                commitment to environmental stewardship. Every ingredient is traceable,
                tested for purity, and harvested with respect for the earth and the
                communities that grow them.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Ingredients;
