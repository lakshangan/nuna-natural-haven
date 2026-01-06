import { supabase } from '../config/db.js';

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) throw error;

        // If user is created, ensure profile exists (Upsert)
        if (data.user) {
            await supabase.from('profiles').upsert({
                id: data.user.id,
                email: data.user.email,
                role: 'user' // Default role
            }, { onConflict: 'id' });
        }

        res.status(201).json({
            success: true,
            user: data.user,
            session: data.session
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('Supabase Login Error:', error.message);
            throw error;
        }

        console.log('Login successful for:', email);

        res.status(200).json({
            success: true,
            user: data.user,
            session: data.session
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Google Login/Signup for Users
// @route   POST /api/auth/google
// @access  Public
export const googleLogin = async (req, res) => {
    const { idToken } = req.body;

    try {
        // We use Supabase Auth for Google on the frontend, but if we want to do it via ID Token:
        // For simplicity and since we have the Supabase client, we can use signInWithIdToken
        const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: idToken,
        });

        if (error) throw error;

        // Ensure profile exists
        if (data.user) {
            await supabase.from('profiles').upsert({
                id: data.user.id,
                email: data.user.email,
                role: 'user' // Default to user
            }, { onConflict: 'id' });
        }

        res.status(200).json({
            success: true,
            user: data.user,
            session: data.session
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};


// @desc    Update current user profile
// @route   PUT /api/auth/me
// @access  Private
export const updateMe = async (req, res) => {
    const { full_name, address, phone } = req.body;

    try {
        const { data, error } = await supabase
            .from('profiles')
            .update({ full_name, address, phone })
            .eq('id', req.user.id)
            .select()
            .single();

        if (error) throw error;

        res.status(200).json({
            success: true,
            profile: data
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
