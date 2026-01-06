import { supabase } from '../config/db.js';
import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        // 1. Try verifying with Supabase first
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (!error && user) {
            console.log('User verified via Supabase:', user.email);

            // Get profile
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            req.user = {
                ...user,
                role: profile?.role || 'user',
                profile: profile
            };
            return next();
        }

        // 2. Fallback: Try verifying as a manual Admin JWT
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // If it's a valid manual JWT, construct a user object
            req.user = {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role,
                isManual: true
            };
            console.log('User verified via Manual JWT:', decoded.email);
            return next();
        } catch (jwtErr) {
            console.error('Auth verification failed (Supabase & Manual):', jwtErr.message);
            return res.status(401).json({ message: 'Not authorized, token invalid' });
        }
    } catch (error) {
        console.error('Auth Middleware Exception:', error);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};
