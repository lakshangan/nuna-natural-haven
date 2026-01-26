import express from 'express';
import productRoutes from './product.routes.js';
import adminRoutes from './admin.routes.js';
import orderRoutes from './order.routes.js';
import authRoutes from './auth.routes.js';
import stripeRoutes from './stripe.routes.js';

const router = express.Router();

// Mounted routes

router.use('/products', productRoutes);
router.use('/admin', adminRoutes);
router.use('/orders', orderRoutes);
router.use('/auth', authRoutes);
router.use('/stripe', stripeRoutes);

// 404 handler for API routes
// Since this is the last middleware in the router, 
// anything that reaches here is an unknown route under /api
router.use((req, res) => {
    res.status(404).json({ message: 'API route not found' });
});


export default router;
