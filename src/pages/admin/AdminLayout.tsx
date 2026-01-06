import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

import { useAuth } from '@/contexts/AuthContext';

export const AdminLayout = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const adminToken = localStorage.getItem('adminToken');

        // If we are still loading AuthContext, wait unless we already have an adminToken
        if (!loading) {
            if ((user && user.role === 'admin') || adminToken) {
                setIsAuthorized(true);
            } else {
                navigate('/admin/login');
            }
        } else if (adminToken) {
            // Even if AuthContext is loading, if we have the specific adminToken, let them in
            setIsAuthorized(true);
        }
    }, [user, loading, navigate]);

    if (loading && !isAuthorized) return <div className="h-screen w-full flex items-center justify-center bg-slate-50">Loading Admin...</div>;

    if (!isAuthorized) return null;

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            <AdminSidebar />
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <AdminHeader />
                <main className="flex-1 relative overflow-y-auto focus:outline-none p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
