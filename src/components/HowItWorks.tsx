import { Leaf, Beaker, Package } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Leaf,
    title: "Harvest & Select",
    description:
      "We carefully source the finest organic herbs and botanicals from sustainable farms",
  },
  {
    number: "02",
    icon: Beaker,
    title: "Craft & Infuse",
    description:
      "Each product is handmade in small batches using traditional methods and time-tested recipes",
  },
  {
    number: "03",
    icon: Package,
    title: "Package & Deliver",
    description:
      "Thoughtfully packaged in eco-friendly materials and delivered fresh to your door",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-6 max-w-[1180px]">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From garden to bottle, every step is guided by care and intention
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative animate-reveal"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-1/2 w-full h-0.5 bg-border z-0" />
              )}

              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                  <step.icon className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <div className="font-heading text-6xl font-bold text-muted/20">
                    {step.number}
                  </div>
                  <h3 className="font-heading text-2xl font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
