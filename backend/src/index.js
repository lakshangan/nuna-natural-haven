import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes.js';
import { ENV } from './config/env.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

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
