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
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <BenefitStrip />
        <FeaturedProducts />
        <HowItWorks />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
