import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import apiRouter from './routes/index.js';

const app = express();

// 1. Trust proxy (essential for rate limiting on Vercel/Heroku/Render)
app.set('trust proxy', 1);

// 2. Security Headers
app.use(helmet({
    contentSecurityPolicy: false, // Set to true if not using external CDNs for images/styles
}));

// 3. Rate Limiting (Prevent Brute Force)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { message: 'Too many requests from this IP, please try again after 15 minutes.' },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiter to all api routes
app.use('/api', limiter);

// 4. CORS
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
].filter(Boolean).map(url => url.replace(/\/$/, ''));

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        const normalizedOrigin = origin.replace(/\/$/, '');
        if (allowedOrigins.includes(normalizedOrigin) || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 5. Body Parsing & Sanitization
app.use(express.json({ limit: '10kb' })); // Limit body size to prevent large payload attacks
app.use(hpp()); // Prevent HTTP Parameter Pollution

// 6. Practical Middlewares
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Health Check Routes
app.get('/', (req, res) => {
    res.json({ status: 'Backend is running 🚀', env: process.env.NODE_ENV });
});

app.get('/api', (req, res) => {
    res.json({ status: 'API is live 🚀' });
});

// Mount API Router
app.use('/api', apiRouter);

// 7. Global Error Handler (Security Focused)
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    // Log the actual error stack in server logs (not sent to client)
    console.error(`[Error] ${req.method} ${req.url}: ${err.stack}`);

    res.status(status).json({
        success: false,
        message: process.env.NODE_ENV === 'production' 
            ? 'Something went wrong. Please try again later.' // Generic message in prod
            : message, // Detailed message in dev
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Only show stack in dev
    });
});

export default app;


