import express from 'express';
import { getProducts, getProductBySlug } from '../controllers/product.controller.js';

const router = express.Router();

// Define the endpoints
router.get('/', getProducts);
router.get('/:slug', getProductBySlug);

export default router;
