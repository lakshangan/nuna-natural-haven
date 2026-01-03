import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    ShoppingBag,
    Users,
    Package,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const data = [
    { name: 'Mon', revenue: 42000, orders: 12 },
    { name: 'Tue', revenue: 38000, orders: 15 },
    { name: 'Wed', revenue: 51000, orders: 18 },
    { name: 'Thu', revenue: 46000, orders: 14 },
    { name: 'Fri', revenue: 62000, orders: 22 },
    { name: 'Sat', revenue: 78000, orders: 30 },
    { name: 'Sun', revenue: 68000, orders: 25 },
];

export const AdminDashboard = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [realStats, setRealStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalProducts: 0,
        recentOrders: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        fetchStats();
        return () => clearInterval(timer);
    }, []);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:5050/api/admin/stats', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setRealStats(data);
        } catch (error) {
            console.error('Failed to fetch stats');
        } finally {
            setLoading(false);
        }
    };

    const stats = [
        { label: 'Total Revenue', value: `₹${realStats.totalRevenue?.toLocaleString('en-IN')}`, change: '+12.5%', icon: DollarSign, color: 'emerald' },
        { label: 'Total Orders', value: realStats.totalOrders.toString(), change: '+8.2%', icon: ShoppingBag, color: 'blue' },
        { label: 'Customers', value: realStats.totalUsers.toString(), change: '+14.1%', icon: Users, color: 'purple' },
        { label: 'Products', value: realStats.totalProducts.toString(), change: '+2', icon: Package, color: 'orange' },
    ];

    return (
        <div className="space-y-8 animate-reveal">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500 text-sm mt-1">Welcome back, here's what's happening with Renu's Natural Haven today.</p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-emerald-600 font-mono">
                        {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </p>
                    <p className="text-xs text-slate-400 font-medium">
                        {currentTime.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                                {stat.change}
                                <ArrowUpRight className="w-3 h-3 ml-1" />
                            </span>
                        </div>
                        <div className="mt-4">
                            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-emerald-50 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Revenue Analytics</h3>
                            <p className="text-sm text-slate-500">Revenue stats for the last 7 days</p>
                        </div>
                        <select className="bg-slate-50 border-none rounded-xl text-sm font-medium text-slate-600 px-4 py-2 focus:ring-2 focus:ring-emerald-500/20">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-emerald-50 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Orders</h3>
                    <div className="space-y-6">
                        {loading ? (
                            <p className="text-center text-slate-400 py-4">Loading...</p>
                        ) : realStats.recentOrders?.length === 0 ? (
                            <p className="text-center text-slate-400 py-4">No recent orders.</p>
                        ) : realStats.recentOrders?.map((order: any) => (
                            <div key={order.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center">
                                        <Package className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">Order #ORD-{order.id.toString().slice(-4).toUpperCase()}</p>
                                        <p className="text-xs text-slate-500">{order.items?.length || 0} products • ₹{order.total?.toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md ${order.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                    {order.status || 'Pending'}
                                </span>
                            </div>
                        ))}
                    </div>
                    <Link to="/admin/orders" className="block w-full mt-8 py-3 text-center text-sm font-bold text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
                        View All Orders
                    </Link>
                </div>
            </div>
        </div>
    );
};
