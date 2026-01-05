import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/product.routes.js';
import adminRoutes from './routes/admin.routes.js';
import orderRoutes from './routes/order.routes.js';
import { ENV } from './config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);

// Serve Static Files
const distPath = path.join(__dirname, '../../dist');
app.use(express.static(distPath));

// Fallback to index.html for React Router
app.get('*', (req, res) => {
    // Check if it's an API route that wasn't matched
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ message: 'API route not found' });
    }
    res.sendFile(path.join(distPath, 'index.html'));
});

// Start Server
const PORT = ENV.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📂 Serving frontend from: ${distPath}`);
});
