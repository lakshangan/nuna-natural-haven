import Stripe from 'stripe';
import { supabase } from '../config/db.js';

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export const createCheckoutSession = async (req, res) => {
    if (!stripe) {
        return res.status(500).json({ message: 'Stripe is not configured on the backend.' });
    }

    try {
        const { items, successUrl, cancelUrl, userId, email } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No items in cart' });
        }

        // 1. Calculate total and verify prices
        let totalAmount = 0;
        const lineItems = await Promise.all(items.map(async (item) => {
            const { data: product } = await supabase
                .from('products')
                .select('*')
                .eq('id', item.id)
                .single();

            if (!product) throw new Error(`Product not found: ${item.id}`);

            totalAmount += Number(product.price) * item.quantity;

            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: product.name,
                        images: product.image_url ? [product.image_url] : [],
                    },
                    unit_amount: Math.round(Number(product.price) * 100),
                },
                quantity: item.quantity,
            };
        }));

        // 2. Create Order in Supabase
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert([{
                user_id: userId,
                customer_email: email,
                total_amount: totalAmount,
                status: 'pending',
                items: items
            }])
            .select()
            .single();

        if (orderError) throw orderError;

        // 3. Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: {
                orderId: order.id,
                userId: userId || 'guest'
            }
        });

        res.status(200).json({ sessionId: session.id, url: session.url });
    } catch (error) {
        console.error('Stripe Session Error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const handleWebhook = async (req, res) => {
    res.status(200).json({ received: true });
};
