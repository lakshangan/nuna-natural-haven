import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 max-w-[1180px]">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="font-heading text-4xl md:text-5xl font-bold">
              Join Our Community
            </h2>
            <p className="text-lg text-primary-foreground/90">
              Get early access to new products, seasonal recipes, and wellness
              tips
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-primary-foreground text-foreground border-0 h-12"
            />
            <Button
              type="submit"
              className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 font-medium uppercase tracking-wider"
            >
              Subscribe
            </Button>
          </form>

          <p className="text-sm text-primary-foreground/70">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};
