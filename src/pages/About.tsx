import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Leaf, Heart, Globe, Award } from "lucide-react";
import aboutHero from "@/assets/about-hero.jpg";

const values = [
  {
    icon: Leaf,
    title: "Natural & Pure",
    description: "We use only the finest organic herbs and botanicals, sourced sustainably from trusted farms.",
  },
  {
    icon: Heart,
    title: "Handcrafted with Care",
    description: "Every product is made by hand in small batches, ensuring quality and attention to detail.",
  },
  {
    icon: Globe,
    title: "Earth-Conscious",
    description: "We prioritize eco-friendly practices, from sourcing to packaging, to minimize our footprint.",
  },
  {
    icon: Award,
    title: "Trusted Quality",
    description: "No synthetic preservatives, no harmful chemicals. Just pure, effective herbal remedies.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-24 pb-20 overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${aboutHero})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
          </div>

          <div className="container mx-auto px-6 max-w-[1180px] relative z-10">
            <div className="max-w-3xl animate-reveal">
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-primary">
                Our Story
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Born from a deep respect for nature's wisdom and a commitment to authentic,
                handcrafted self-care
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-6 max-w-[1180px]">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6 animate-reveal">
                <h2 className="font-heading text-4xl font-bold text-primary">
                  Rooted in Tradition, Crafted for Today
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nuna Origin began in a small garden, where founder of Nuna Origin discovered
                  the transformative power of herbs passed down through generations. What
                  started as creating remedies for family and friends grew into a mission to
                  share nature's gifts with everyone seeking authentic, effective self-care.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Every product we create honors this heritage. We carefully select organic
                  botanicals, blend them using time-tested methods, and package them
                  mindfully. Our goal is simple: to help you reconnect with the healing power
                  of nature, one handcrafted remedy at a time.
                </p>
              </div>
              <div
                className="aspect-square rounded-2xl overflow-hidden shadow-2xl animate-reveal"
                style={{ animationDelay: "0.2s" }}
              >
                <img
                  src={aboutHero}
                  alt="Artisan crafting herbal products"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 max-w-[1180px]">
            <div className="text-center space-y-4 mb-16 animate-reveal">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary">
                What We Stand For
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our values guide every decision we make, from sourcing to delivery
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-2xl font-semibold mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6 max-w-[1180px] text-center">
            <div className="max-w-2xl mx-auto space-y-8 animate-reveal">
              <h2 className="font-heading text-4xl md:text-5xl font-bold">
                Join Our Journey
              </h2>
              <p className="text-lg text-primary-foreground/90 leading-relaxed">
                Experience the difference that handcrafted, herbal self-care can make in
                your daily routine. Your skin, hair, and wellbeing will thank you.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
