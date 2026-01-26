import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/db.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const adminGoogleLogin = async (req, res) => {
    const { idToken } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        // Check if the email is an admin email
        const adminEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',') : [];

        if (!adminEmails.includes(email)) {
            return res.status(403).json({ message: 'Access denied. You are not authorized as an admin.' });
        }

        // Generate Admin JWT
        const token = jwt.sign(
            { id: email, email, name, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            success: true,
            token,
            admin: { name, email, picture }
        });
    } catch (error) {
        console.error('Google Auth Error:', error);
        res.status(401).json({ message: 'Invalid Google Token' });
    }
};

export const getAdminStats = async (req, res) => {
    try {
        const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
        const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
        const { data: orders } = await supabase.from('orders').select('total_amount');

        const totalRevenue = orders?.reduce((acc, order) => acc + (Number(order.total_amount) || 0), 0) || 0;
        const totalOrders = orders?.length || 0;

        const { data: recentOrders } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);

        res.status(200).json({
            totalProducts: productCount || 0,
            totalUsers: userCount || 0,
            totalRevenue: totalRevenue,
            totalOrders: totalOrders,
            recentOrders: recentOrders || []
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllCustomers = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('updated_at', { ascending: false });

        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
