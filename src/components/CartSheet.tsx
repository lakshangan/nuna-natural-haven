import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export const CartSheet = () => {
    const { cart, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (cart.length === 0) return;

        try {
            toast.loading("Preparing your secure checkout...");

            // In a real app, we send this to our backend
            const response = await fetch("http://localhost:5050/api/orders/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cart,
                    total: totalPrice,
                    email: user?.email || "customer@example.com" // Sending email for confirmation
                }),
            });

            if (!response.ok) throw new Error("Backend offline or error");

            const data = await response.json();
            // Redirect to the Stripe URL provided by our backend
            window.location.href = data.url;

        } catch (error) {
            console.error("Checkout Error:", error);
            toast.dismiss();
            toast.error("The manual backend is not responding. Ensure 'npm run dev' is running in the /backend folder!");

            // Fallback for learning: mock successful order
            const confirmMock = window.confirm("Manual Backend Error: Would you like to simulate a successful checkout for training purposes?");
            if (confirmMock) {
                navigate("/checkout-success");
            }
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-primary hover:text-accent">
                    <ShoppingCart className="w-6 h-6" />
                    {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-sm">
                            {totalItems}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col p-6 bg-card border-l border-primary/10">
                <SheetHeader className="mb-6">
                    <SheetTitle className="font-heading text-2xl flex items-center gap-2 text-primary border-b border-primary/10 pb-4">
                        <ShoppingCart className="w-6 h-6 text-accent" />
                        Your Shopping Bag
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-hidden">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center space-y-4 text-muted-foreground animate-reveal">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                                <ShoppingCart className="w-8 h-8 opacity-20" />
                            </div>
                            <p className="text-lg font-medium">Your bag is empty</p>
                            <Button variant="outline" className="mt-2 border-accent text-accent hover:bg-accent hover:text-white transition-colors">
                                Start Shopping
                            </Button>
                        </div>
                    ) : (
                        <ScrollArea className="h-full pr-4 -mr-4">
                            <div className="space-y-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 group animate-reveal">
                                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0 shadow-sm border border-primary/5">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-0.5">
                                            <div className="flex justify-between items-start gap-2">
                                                <div>
                                                    <h4 className="font-heading font-semibold text-primary/90 leading-tight mb-1">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-accent font-bold">${item.price}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center border border-primary/10 rounded-lg bg-white overflow-hidden shadow-sm">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1.5 hover:bg-muted text-primary/60 hover:text-accent transition-colors"
                                                    >
                                                        <Minus className="w-3.5 h-3.5" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-semibold text-primary">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1.5 hover:bg-muted text-primary/60 hover:text-accent transition-colors"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="mt-8 space-y-4 pt-6 border-t border-primary/10">
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Subtotal</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Shipping</span>
                                <span className="text-green-600 font-medium italic">Calculated at checkout</span>
                            </div>
                            <Separator className="my-3 opacity-50" />
                            <div className="flex justify-between items-center py-2">
                                <span className="text-lg font-heading font-bold text-primary">Total Amount</span>
                                <span className="text-2xl font-bold text-accent">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <Button
                            onClick={handleCheckout}
                            className="w-full bg-accent hover:bg-accent/90 text-white h-14 text-lg font-bold shadow-xl shadow-accent/20 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Proceed to Checkout
                        </Button>
                        <p className="text-[10px] text-center text-muted-foreground italic px-4">
                            Secure payments powered by Stripe. Shipping available across India.
                        </p>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};
