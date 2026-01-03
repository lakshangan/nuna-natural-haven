import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export const adminProtect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'learning_secret_key_123');

            if (decoded.role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized as an admin' });
            }

            req.admin = decoded;
            return next();
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }
    } catch (error) {
        console.error('Admin Auth Error:', error);
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};
