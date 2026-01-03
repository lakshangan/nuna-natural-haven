import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { sendOrderConfirmationEmail } from '../services/email.service.js';

const router = express.Router();

// @desc    Create a Stripe Checkout Session
// @route   POST /api/orders/checkout
router.post('/checkout', async (req, res) => {
    try {
        const { items, total } = req.body;

        // 🎓 Learning Note: 
        // In a real production app, we would use the Stripe SDK here:
        // const session = await stripe.checkout.sessions.create({...})

        console.log(`💳 Processing checkout for ${items.length} items. Total: $${total}`);

        // 📧 Triggering email (in production this happens after Stripe webhook confirmation)
        // For simulation, we trigger it right away if an email is provided
        const { email } = req.body;
        if (email) {
            await sendOrderConfirmationEmail(email, {
                items,
                total,
                orderNumber: `RN-${Math.floor(10000 + Math.random() * 90000)}`
            });
        }

        // For now, we simulate a Stripe URL
        res.status(200).json({
            url: "https://buy.stripe.com/test_sample_link",
            message: "Stripe Session Created & Confirmation Email Triggered"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
