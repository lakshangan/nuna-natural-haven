import express from 'express';
import { sendOrderConfirmationEmail } from '../services/email.service.js';
import { supabase } from '../config/db.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
router.get('/my-orders', protect, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('customer_email', req.user.email) // Linking by email for now as per schema
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a Stripe Checkout Session
// @route   POST /api/orders/checkout
router.post('/checkout', async (req, res) => {
    try {
        const { items, total, email } = req.body;

        // 1. Persist Order to Supabase
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert([{
                items,
                total,
                total_amount: total,
                customer_email: email,
                status: 'pending'
            }])
            .select()
            .single();

        if (orderError) {
            console.error('❌ Database Error during checkout:', orderError);
            // If DB fails, we still want to return a response but maybe with a warning
        }

        console.log(`💳 Processing checkout for ${items.length} items. Total: ₹${total}`);

        // 📧 Triggering email
        try {
            if (email) {
                await sendOrderConfirmationEmail(email, {
                    items,
                    total,
                    orderNumber: order ? `RN-${order.id}` : `RN-${Math.floor(10000 + Math.random() * 90000)}`
                });
            }
        } catch (emailErr) {
            console.error('📧 Email failed but continuing checkout:', emailErr);
        }

        // Return the local success URL
        res.status(200).json({
            success: true,
            url: "http://localhost:8080/checkout-success",
            orderId: order?.id
        });
    } catch (error) {
        console.error('🔥 Checkout Controller Error:', error);
        res.status(500).json({
            success: false,
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// @desc    Test Email Delivery
// @route   POST /api/orders/test-email
router.post('/test-email', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const result = await sendOrderConfirmationEmail(email, {
        items: [{ name: "Sample Lavender Oil", quantity: 1, price: 20 }],
        total: 20,
        orderNumber: "TEST-12345"
    });

    if (result.success) {
        res.status(200).json({ message: "Test email sent successfully!" });
    } else {
        res.status(500).json({ message: "Failed to send email", error: result.error });
    }
});

export default router;
