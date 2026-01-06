import { supabase } from '../config/db.js';

export const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        // Verify token with Supabase
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            console.error('Supabase Auth Error:', error?.message || 'User not found');
            return res.status(401).json({ message: 'Not authorized, token invalid' });
        }

        console.log('User verified:', user.email);

        // Get profile to check role
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (profileError || !profile) {
            console.error('Profile Fetch Error:', profileError?.message || 'Profile missing');
            return res.status(404).json({ message: 'User profile not found' });
        }

        // Attach user and profile to request
        req.user = {
            ...user,
            role: profile.role,
            profile: profile
        };

        next();
    } catch (error) {
        console.error('Auth Middleware Exception:', error);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};
