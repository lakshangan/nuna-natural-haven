import express from 'express';
import { adminGoogleLogin, getAdminStats, getAllOrders, getAllCustomers } from '../controllers/admin.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { adminProtect } from '../middleware/admin.middleware.js';

const router = express.Router();

// Public Admin Auth (Keeping existing Google login for compatibility)
router.post('/auth/google', adminGoogleLogin);

// Protected Admin Routes
router.get('/stats', protect, adminProtect, getAdminStats);
router.get('/orders', protect, adminProtect, getAllOrders);
router.get('/customers', protect, adminProtect, getAllCustomers);
router.get('/users', protect, adminProtect, getAllCustomers); // Also alias it to /users as per requirements

export default router;

