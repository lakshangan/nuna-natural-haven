import { supabase } from '../config/db.js';

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res) => {
    let { email, password, fullName } = req.body;
    email = email?.trim();
    password = password?.trim();

    console.log('Signup attempt for:', email);

    try {
        // Use admin API to create user if we want them to be auto-confirmed
        // This is much better for development and avoids the "Email not confirmed" trap
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { full_name: fullName }
        });

        if (error) {
            console.error('Signup Error:', error.message);
            // Fallback to standard signUp if admin creation fails for some reason (e.g. policy)
            const { data: retryData, error: retryError } = await supabase.auth.signUp({
                email,
                password,
            });
            if (retryError) throw retryError;

            if (retryData.user) {
                await supabase.from('profiles').upsert({
                    id: retryData.user.id,
                    email: retryData.user.email,
                    full_name: fullName,
                    role: 'user'
                }, { onConflict: 'id' });
            }

            return res.status(201).json({
                success: true,
                user: retryData.user,
                session: retryData.session,
                message: retryData.session ? 'Signup successful' : 'Please check your email to confirm your account.'
            });
        }

        // If admin creation succeeded, ensure profile exists
        if (data.user) {
            console.log('User created and auto-confirmed via Admin API:', data.user.email);
            await supabase.from('profiles').upsert({
                id: data.user.id,
                email: data.user.email,
                full_name: fullName,
                role: 'user'
            }, { onConflict: 'id' });
        }

        // Since admin.createUser doesn't return a session, we need to log them in 
        // to get a valid user session for the frontend
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        res.status(201).json({
            success: true,
            user: data.user,
            session: loginData.session || null,
            message: loginData.session ? 'Signup successful' : 'Account created, please log in.'
        });
    } catch (error) {
        console.error('Final Signup Exception:', error.message);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    let { email, password } = req.body;
    email = email?.trim();
    password = password?.trim();

    console.log('Login attempt for:', email);

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('Login Failed for', email, ':', error.message);
            // Check if user is not confirmed
            if (error.message.includes('Email not confirmed')) {
                return res.status(401).json({
                    message: 'Email not confirmed. Please check your inbox or contact support.',
                    notConfirmed: true
                });
            }
            if (error.message.includes('Invalid login credentials')) {
                return res.status(401).json({ message: 'Invalid email or password. Please try again.' });
            }
            throw error;
        }

        console.log('Login successful for:', email);

        res.status(200).json({
            success: true,
            user: data.user,
            session: data.session
        });
    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(401).json({ message: error.message || 'Invalid email or password' });
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
        const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: idToken,
        });

        if (error) throw error;

        if (data.user) {
            await supabase.from('profiles').upsert({
                id: data.user.id,
                email: data.user.email,
                role: 'user'
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

// @desc    Redirect to Google OAuth
// @route   GET /api/auth/google
// @access  Public
export const googleRedirect = async (req, res) => {
    try {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const redirectUrl = `${frontendUrl}/auth/callback`;

        console.log('Google Auth Redirecting to:', redirectUrl);

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: redirectUrl,
            },
        });

        if (error) throw error;
        if (data?.url) {
            res.redirect(data.url);
        } else {
            throw new Error('No redirect URL provided by Supabase');
        }
    } catch (error) {
        console.error('Google Redirect Error:', error);
        res.status(500).json({ message: error.message });
    }
};



// @desc    Update current user profile
// @route   PUT /api/auth/me
// @access  Private
export const updateMe = async (req, res) => {
    let { full_name, address, phone, birthday, gender } = req.body;

    // Handle empty strings for optional fields that might break the DB (like date)
    if (birthday === "") birthday = null;
    if (gender === "") gender = null;

    try {
        console.log('Updating profile for user:', req.user.id);
        const { data, error } = await supabase
            .from('profiles')
            .update({ full_name, address, phone, birthday, gender })
            .eq('id', req.user.id)
            .select()
            .single();

        if (error) {
            console.error('Profile Update Error:', error.message);
            throw error;
        }

        res.status(200).json({
            success: true,
            profile: data
        });
    } catch (error) {
        console.error('Update Profile Failure:', error.message);
        res.status(400).json({ message: error.message });
    }
};
