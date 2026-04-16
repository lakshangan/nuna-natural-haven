import express from 'express';
import { createCheckoutSession, handleWebhook } from '../controllers/stripe.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create-checkout-session', protect, createCheckoutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router;
