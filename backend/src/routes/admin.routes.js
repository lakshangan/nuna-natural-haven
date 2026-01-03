import express from 'express';
import { adminGoogleLogin, getAdminStats, getAllOrders, getAllCustomers } from '../controllers/admin.controller.js';
import { adminProtect } from '../middleware/admin.middleware.js';

const router = express.Router();

// Public Admin Auth
router.post('/auth/google', adminGoogleLogin);

// Protected Admin Routes
router.get('/stats', adminProtect, getAdminStats);
router.get('/orders', adminProtect, getAllOrders);
router.get('/customers', adminProtect, getAllCustomers);

export default router;
