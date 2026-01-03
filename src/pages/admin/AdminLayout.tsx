import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const AdminLayout = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const adminToken = localStorage.getItem('adminToken');
        if (!adminToken) {
            navigate('/admin/login');
        } else {
            setIsAdmin(true);
        }
        setLoading(false);
    }, [navigate]);

    if (loading) return <div className="h-screen w-full flex items-center justify-center bg-slate-50">Loading Admin...</div>;

    if (!isAdmin) return null;

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
