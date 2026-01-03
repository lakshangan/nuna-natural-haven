import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product.routes.js';
import adminRoutes from './routes/admin.routes.js';
import orderRoutes from './routes/order.routes.js';
import { ENV } from './config/env.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);

// Base Route
app.get('/', (req, res) => {
    res.send('🌿 Renu Anni API is live and learning!');
});

// Start Server
const PORT = ENV.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Manual Backend running on http://localhost:${PORT}`);
    console.log(`📂 Learning Structure initialized correctly!`);
});
