import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    user: any | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    loginWithGoogle: (idToken: string) => Promise<void>;
    updateProfile: (data: { full_name?: string, address?: string, phone?: string }) => Promise<void>;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050/api';

    const fetchMe = async (token: string, isAdminToken = false) => {
        try {
            const endpoint = isAdminToken ? `${API_URL}/admin/me` : `${API_URL}/auth/me`;
            const response = await fetch(endpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                localStorage.removeItem(isAdminToken ? 'adminToken' : 'token');
                setUser(null);
            }
        } catch (error) {
            console.error('Fetch me error:', error);
            localStorage.removeItem(isAdminToken ? 'adminToken' : 'token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const adminToken = localStorage.getItem('adminToken');

        if (token) {
            fetchMe(token, false);
        } else if (adminToken) {
            fetchMe(adminToken, true);
        } else {
            setLoading(false);
        }
    }, []);

    const updateProfile = async (profileData: { full_name?: string, address?: string, phone?: string }) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch(`${API_URL}/auth/me`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profileData)
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Update failed');

        // Refresh user data
        await fetchMe(token);
    };

    const login = async (email: string, password: string) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Login failed');

        if (!data.session) {
            throw new Error('Please check your email to confirm your account before logging in.');
        }

        localStorage.setItem('token', data.session.access_token);
        await fetchMe(data.session.access_token);
    };

    const signup = async (email: string, password: string) => {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Signup failed');

        if (!data.session) {
            // If email confirmation is on, session will be null
            setUser(null);
            setLoading(false);
            return;
        }

        localStorage.setItem('token', data.session.access_token);
        await fetchMe(data.session.access_token);
    };

    const loginWithGoogle = async (idToken: string) => {
        const response = await fetch(`${API_URL}/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Google Login failed');

        if (data.session) {
            localStorage.setItem('token', data.session.access_token);
            await fetchMe(data.session.access_token);
        }
    };

    const signOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('adminToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, updateProfile, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
