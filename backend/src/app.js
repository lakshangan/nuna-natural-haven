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

// Mount API Router
// This mounts all routes in apiRouter under the /api prefix.
// The router itself handles the /api root and unknown /api/* routes.
app.use('/api', apiRouter);

// Global Error Handler (Optional but recommended)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

export default app;


