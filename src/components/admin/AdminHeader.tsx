import React from 'react';
import { Bell, Search, User, Menu, LayoutDashboard, ShoppingBag, Package, Users, Settings, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NavLink } from 'react-router-dom';
import nunalogo from '@/assets/nunalogo.png';

export const AdminHeader = () => {
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
        <header className="h-20 bg-white border-b border-emerald-100/50 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-20">
            {/* Mobile Navigation */}
            <div className="flex items-center gap-4 lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <button className="p-2 hover:bg-emerald-50 rounded-lg text-emerald-900 transition-colors">
                            <Menu className="w-6 h-6" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72 p-0 bg-emerald-950 border-emerald-900">
                        <div className="flex flex-col h-full text-emerald-50">
                            <div className="p-8 pb-4">
                                <NavLink to="/admin/dashboard" className="flex items-center">
                                    <img
                                        src={nunalogo}
                                        alt="Nuna Origin Logo"
                                        className="h-10 w-auto object-contain brightness-0 invert"
                                    />
                                </NavLink>
                            </div>

                            <nav className="flex-1 px-4 py-6 space-y-2">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.label}
                                        to={item.path}
                                        className={({ isActive }) => `
                                            flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200
                                            ${isActive
                                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                                                : 'text-emerald-300/80 hover:text-emerald-50 hover:bg-emerald-900/50'}
                                        `}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span className="font-medium">{item.label}</span>
                                    </NavLink>
                                ))}
                            </nav>

                            <div className="p-6 mt-auto">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-emerald-300 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-200 text-left"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span className="font-medium">Logout Admin</span>
                                </button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
                <h1 className="font-heading text-lg font-bold text-emerald-950 hidden sm:block">Nuna Origin</h1>
            </div>

            <div className="hidden md:flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100 w-96 group focus-within:border-emerald-500/50 transition-all">
                <Search className="w-5 h-5 text-slate-400 group-focus-within:text-emerald-500" />
                <input
                    type="text"
                    placeholder="Search for orders, products..."
                    className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-600"
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2.5 hover:bg-slate-50 rounded-xl transition-colors text-slate-600">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-[1px] bg-slate-100 hidden sm:block mx-1"></div>

                <div className="flex items-center gap-3 pl-2">
                    <div className="hidden sm:block text-right">
                        <p className="text-sm font-bold text-slate-800">Admin User</p>
                        <p className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider">Super Admin</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                            alt="Admin"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};
