import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import apiRouter from './routes/index.js';

const app = express();

// Middleware
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(compression());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Health Check Routes
app.get('/', (req, res) => {
    res.json({ status: 'Backend is running 🚀' });
});

app.get('/api', (req, res) => {
    res.json({ status: 'API is live 🚀' });
});

// Mount API Router
app.use('/api', apiRouter);


// Global Error Handler (Optional but recommended)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

export default app;


