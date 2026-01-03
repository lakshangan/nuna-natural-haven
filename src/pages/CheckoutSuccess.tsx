import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { CheckCircle2, Package, ArrowRight, ShoppingBag } from "lucide-react";
import confetti from "canvas-confetti";

const CheckoutSuccess = () => {
    const { clearCart } = useCart();

    useEffect(() => {
        // Clear the cart immediately when this page loads
        clearCart();

        // Trigger a celebration!
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than average
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-1 flex items-center justify-center pt-24 pb-16 px-6">
                <div className="max-w-2xl w-full text-center space-y-8 animate-reveal">
                    <div className="flex justify-center">
                        <div className="bg-green-100 p-6 rounded-full shadow-inner animate-bounce-slow">
                            <CheckCircle2 className="w-20 h-20 text-green-600" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary">
                            Payment Successful!
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Thank you for your order. Your botanical remedies are being prepared for their journey to you.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-primary/5 space-y-6">
                        <div className="flex items-center gap-4 text-left p-4 bg-slate-50 rounded-xl">
                            <div className="bg-primary/10 p-3 rounded-lg">
                                <Package className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold">Next Steps</h3>
                                <p className="text-sm text-muted-foreground">Check your email for the order confirmation and tracking details.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link to="/shop">
                                <Button variant="outline" className="w-full h-14 text-lg gap-2 rounded-xl">
                                    <ShoppingBag className="w-5 h-5" />
                                    Continue Shopping
                                </Button>
                            </Link>
                            <Link to="/">
                                <Button className="w-full bg-primary hover:bg-primary/90 h-14 text-lg gap-2 text-white rounded-xl shadow-lg shadow-primary/20">
                                    Return to Home
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground italic">
                        Order #RN-{Math.floor(Math.random() * 90000) + 10000}
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CheckoutSuccess;
