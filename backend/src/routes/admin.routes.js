import express from 'express';
import { adminGoogleLogin, getAdminStats, getAllOrders, getAllCustomers } from '../controllers/admin.controller.js';
import { adminProtect } from '../middleware/admin.middleware.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public login
router.post('/auth/google', adminGoogleLogin);

// Protected routes
router.get('/me', protect, adminProtect, (req, res) => {
    res.status(200).json(req.user);
});
router.get('/stats', protect, adminProtect, getAdminStats);
router.get('/orders', protect, adminProtect, getAllOrders);
router.get('/customers', protect, adminProtect, getAllCustomers);
router.get('/users', protect, adminProtect, getAllCustomers); // Also alias it to /users as per requirements

export default router;
