import { Leaf, Droplets, Recycle } from "lucide-react";

const benefits = [
  {
    icon: Leaf,
    title: "Handmade",
    description: "Crafted in small batches with care",
  },
  {
    icon: Droplets,
    title: "Plant Based",
    description: "Pure herbal ingredients from nature",
  },
  {
    icon: Recycle,
    title: "Sustainably Packaged",
    description: "Eco-friendly materials and practices",
  },
];

export const BenefitStrip = () => {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-6 max-w-[1180px]">
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="flex flex-col items-center text-center space-y-4 animate-reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center">
                <benefit.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading text-xl font-semibold">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
