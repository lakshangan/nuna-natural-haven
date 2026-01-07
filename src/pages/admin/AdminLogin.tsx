import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Leaf, ShieldCheck, Lock } from 'lucide-react';
import { toast } from 'sonner';
import nunalogo from '@/assets/nunalogo.png';
import { BACKEND_URL } from '../../lib/api-config';

export const AdminLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleGoogleSuccess = async (credentialResponse: any) => {
        setLoading(true);
        try {
            const response = await fetch(`${BACKEND_URL}/api/admin/auth/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken: credentialResponse.credential }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('adminToken', data.token);
                localStorage.setItem('adminUser', JSON.stringify(data.admin));
                toast.success('Welcome back, Admin!');
                navigate('/admin/dashboard');
            } else {
                toast.error(data.message || 'Unauthorized access');
            }
        } catch (error) {
            console.error('Login Error:', error);
            toast.error('Connection failed. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-emerald-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Decorative Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -ml-48 -mb-48"></div>

            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] shadow-2xl relative z-10 animate-reveal">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-8 p-4 bg-white/10 rounded-[32px] backdrop-blur-md border border-white/10 shadow-2xl">
                        <img
                            src={nunalogo}
                            alt="Admin Logo"
                            className="h-20 w-auto object-contain brightness-0 invert"
                        />
                    </div>

                    <h1 className="text-3xl font-heading font-bold text-white mb-2">Admin Portal</h1>
                    <p className="text-emerald-200/60 text-sm mb-12">Authorized Personnel Only • Secure Access</p>

                    <div className="w-full space-y-6">
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 text-left">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Safety First</p>
                                <p className="text-sm text-emerald-100/70 leading-tight">Multi-layer authentication active</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={() => toast.error('Google Sign-In Failed')}
                                useOneTap
                                theme="filled_black"
                                shape="pill"
                                text="continue_with"
                                width="100%"
                            />
                        </div>

                        <p className="text-[10px] text-emerald-500/40 uppercase font-bold tracking-[0.2em] mt-8">
                            © 2026 NUNA ORIGIN
                        </p>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 flex items-center gap-2 text-emerald-500/30 text-xs font-medium uppercase tracking-[0.1em]">
                <Lock className="w-3 h-3" />
                <span>Protected by Advanced Encryption Standard</span>
            </div>
        </div>
    );
};
