import express from 'express';
import { trackEvent, getCartInsights } from '../controllers/analytics.controller.js';

const router = express.Router();

router.post('/track', trackEvent);
router.get('/insights', getCartInsights);

export default router;
