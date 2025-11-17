import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "Portland, OR",
    rating: 5,
    quote:
      "The hair oil completely transformed my dry, damaged hair. It smells divine and works wonders.",
  },
  {
    id: 2,
    name: "James Chen",
    location: "Austin, TX",
    rating: 5,
    quote:
      "Finally found a face cream that doesn't irritate my sensitive skin. The ingredients are truly pure.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Seattle, WA",
    rating: 5,
    quote:
      "I love knowing exactly what goes into these products. The body butter is luxurious and healing.",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-6 max-w-[1180px]">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from people who've experienced the difference
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-card p-8 rounded-2xl shadow-lg animate-reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-accent text-accent"
                  />
                ))}
              </div>
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="border-t border-border pt-4">
                <div className="font-semibold text-sm">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
