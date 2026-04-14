import express from 'express';
import { triggerPurchaseNotification } from '../controllers/notification.controller.js';

const router = express.Router();

router.post('/purchase', triggerPurchaseNotification);

export default router;
