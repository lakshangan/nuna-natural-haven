import express from 'express';
import { signup, login, getMe, updateMe, googleLogin, googleRedirect } from '../controllers/auth.controller.js';

import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/google', googleRedirect); // NEW: Browser redirect
router.post('/google', googleLogin);  // Keep for mobile/token support
router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);


export default router;
