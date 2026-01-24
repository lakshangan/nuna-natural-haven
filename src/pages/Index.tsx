import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BenefitStrip } from "@/components/BenefitStrip";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="relative z-10 bg-background shadow-2xl">
        <Hero />
        <BenefitStrip />
        <FeaturedProducts />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
