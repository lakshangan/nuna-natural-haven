import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Users,
    Settings,
    LogOut,
    ChevronRight,
    Leaf
} from 'lucide-react';

export const AdminSidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/admin/dashboard' },
        { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
        { icon: Package, label: 'Products', path: '/admin/products' },
        { icon: Users, label: 'Customers', path: '/admin/customers' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
    };

    return (
        <aside className="hidden lg:flex flex-col w-72 bg-emerald-950 text-emerald-50 h-full shadow-2xl z-10 transition-all duration-300">
            <div className="p-8 flex items-center gap-3">
                <div className="p-2 bg-emerald-500 rounded-xl shadow-lg shadow-emerald-500/20">
                    <Leaf className="w-6 h-6 text-white" />
                </div>
                <h1 className="font-heading text-xl font-bold tracking-tight">Renu Admin</h1>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group
                            ${isActive
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                                : 'hover:bg-emerald-900/50 text-emerald-300/80 hover:text-emerald-50'}
                        `}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity`} />
                    </NavLink>
                ))}
            </nav>

            <div className="p-6 mt-auto">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-emerald-300 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-200"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout Admin</span>
                </button>
            </div>
        </aside>
    );
};
