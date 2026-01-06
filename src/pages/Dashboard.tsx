import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    User, Mail, Calendar, Settings, Shield,
    MapPin, Phone, Edit2, LogOut, Package,
    ExternalLink, CheckCircle2, Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";

const Dashboard = () => {
    const { user, loading, signOut, updateProfile } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editData, setEditData] = useState({
        full_name: "",
        phone: "",
        address: ""
    });
    const [updating, setUpdating] = useState(false);
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050/api';

    useEffect(() => {
        if (user) {
            setEditData({
                full_name: user.profile?.full_name || "",
                phone: user.profile?.phone || "",
                address: user.profile?.address || ""
            });
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/orders/my-orders`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            }
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setOrdersLoading(false);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        try {
            await updateProfile(editData);
            toast.success("Profile updated successfully!");
            setIsEditDialogOpen(false);
        } catch (error: any) {
            toast.error(error.message || "Failed to update profile");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium animate-pulse">Loading your sanctuary...</p>
            </div>
        </div>
    );

    if (!user) {
        navigate('/auth');
        return null;
    }

    const handleSignOut = () => {
        signOut();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-slate-50/50">
            <Navbar />

            {/* Hero Section */}
            <div className="pt-32 pb-20 bg-emerald-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/50 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -ml-48 -mb-48"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
                        <div className="w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-5xl font-bold shadow-2xl">
                            {user.email?.[0].toUpperCase()}
                        </div>
                        <div className="text-center md:text-left transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
                            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">
                                {user.profile?.full_name ? `Welcome back, ${user.profile.full_name}` : 'Hello, Botanical Explorer'}
                            </h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-emerald-100/80">
                                <span className="flex items-center gap-1.5 bg-emerald-800/40 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-white/10 italic">
                                    <Mail className="w-3.5 h-3.5" />
                                    {user.email}
                                </span>
                                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-white/10">
                                    <Shield className="w-3.5 h-3.5" />
                                    {user.role === 'admin' ? 'Curator (Admin)' : 'Member'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-6 -mt-12 mb-20 relative z-20">
                <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">

                    {/* Main Stats/Info */}
                    <div className="md:col-span-2 space-y-8">
                        <Card className="border-none shadow-xl shadow-slate-200/50 overflow-hidden bg-white/80 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl">
                            <CardHeader className="border-b border-slate-50 bg-white/50">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="text-2xl font-heading text-primary">Personal Details</CardTitle>
                                        <CardDescription>Your botanical journey and contact info</CardDescription>
                                    </div>
                                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm" className="gap-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 border-slate-200">
                                                <Edit2 className="w-4 h-4" />
                                                Edit Profile
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] rounded-3xl">
                                            <DialogHeader>
                                                <DialogTitle>Edit Profile</DialogTitle>
                                                <DialogDescription>
                                                    Modify your botanical details here. Click save when you're done.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form onSubmit={handleUpdateProfile} className="space-y-4 py-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="full_name">Full Name</Label>
                                                    <Input
                                                        id="full_name"
                                                        value={editData.full_name}
                                                        onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}
                                                        placeholder="Your full name"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">Phone Number</Label>
                                                    <Input
                                                        id="phone"
                                                        value={editData.phone}
                                                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                                        placeholder="+1 (555) 000-0000"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="address">Delivery Address</Label>
                                                    <Textarea
                                                        id="address"
                                                        value={editData.address}
                                                        onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                                                        placeholder="Street, City, Zip Code"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit" disabled={updating} className="w-full bg-emerald-600 hover:bg-emerald-700">
                                                        {updating ? "Saving Changes..." : "Save Changes"}
                                                    </Button>
                                                </DialogFooter>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-slate-50">
                                    <div className="p-6 flex items-center gap-6 hover:bg-slate-50/10 transition-colors">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                            <User className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Full Name</p>
                                            <p className="font-bold text-slate-800">{user.profile?.full_name || 'Not set'}</p>
                                        </div>
                                    </div>

                                    <div className="p-6 flex items-center gap-6 hover:bg-slate-50/10 transition-colors">
                                        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Contact Number</p>
                                            <p className="font-bold text-slate-800">{user.profile?.phone || 'Not set'}</p>
                                        </div>
                                    </div>

                                    <div className="p-6 flex items-center gap-6 hover:bg-slate-50/10 transition-colors">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Delivery Address</p>
                                            <p className="font-bold text-slate-800 leading-relaxed">{user.profile?.address || 'No address on file'}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Order History */}
                        <Card className="border-none shadow-xl shadow-slate-200/50 overflow-hidden bg-white/80 backdrop-blur-xl">
                            <CardHeader className="border-b border-slate-50 bg-white/50">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="text-2xl font-heading text-primary flex items-center gap-2">
                                            <Package className="w-6 h-6 text-emerald-600" />
                                            Order History
                                        </CardTitle>
                                        <CardDescription>Track your botanical deliveries</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                {ordersLoading ? (
                                    <div className="p-12 text-center text-slate-400">Loading your history...</div>
                                ) : orders.length === 0 ? (
                                    <div className="p-12 text-center flex flex-col items-center gap-4">
                                        <Package className="w-12 h-12 text-slate-200" />
                                        <p className="text-slate-500 font-medium">No botanical orders yet.</p>
                                        <Button onClick={() => navigate('/shop')} variant="outline" className="rounded-xl border-emerald-100 text-emerald-600 hover:bg-emerald-50">Explore Shop</Button>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-slate-50">
                                        {orders.map((order) => (
                                            <div key={order.id} className="p-6 hover:bg-slate-50/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${order.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                                        {order.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-800">Order #RN-{order.id.slice(-6).toUpperCase()}</p>
                                                        <p className="text-xs text-slate-500">{new Date(order.created_at).toLocaleDateString()} • {order.items?.length || 0} items</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between sm:justify-end gap-6 text-right">
                                                    <div>
                                                        <p className="font-bold text-primary text-lg">₹{order.total || order.total_amount}</p>
                                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${order.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Actions */}
                    <div className="space-y-6">
                        <Card className="bg-emerald-900 border-none shadow-2xl text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Settings className="w-5 h-5 text-accent" />
                                    Quick Access
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {user.role === 'admin' && (
                                    <Button
                                        onClick={() => navigate('/admin/dashboard')}
                                        className="w-full justify-start gap-3 bg-accent hover:bg-accent/90 text-white h-12 rounded-xl shadow-lg shadow-accent/20 h-14 font-bold"
                                    >
                                        <Shield className="w-5 h-5" />
                                        Manager Dashboard
                                    </Button>
                                )}
                                <Button
                                    onClick={handleSignOut}
                                    className="w-full justify-start gap-3 bg-red-500/10 hover:bg-red-500/20 text-red-200 h-12 rounded-xl mt-4 border border-red-500/20"
                                    variant="ghost"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Sign Out
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;
