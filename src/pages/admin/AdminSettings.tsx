import React, { useState } from 'react';
import { Settings, Shield, Bell, Database, Globe, Save } from 'lucide-react';
import { toast } from 'sonner';

export const AdminSettings = () => {
    const [config, setConfig] = useState({
        storeName: "Renu's Natural Haven",
        supportEmail: "support@renunatural.com",
        orderPrefix: "ORD-",
        currency: "INR",
        enableEmails: true,
        maintenanceMode: false
    });

    const handleSave = () => {
        toast.promise(
            new Promise(resolve => setTimeout(resolve, 1000)),
            {
                loading: 'Saving configuration...',
                success: 'Settings updated successfully!',
                error: 'Failed to save settings'
            }
        );
    };

    return (
        <div className="space-y-6 animate-reveal">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading">Global Settings</h1>
                    <p className="text-slate-500 text-sm">Configure store-wide parameters and preferences.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Save className="w-5 h-5" />
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* General Section */}
                    <div className="bg-white p-8 rounded-2xl border border-emerald-50 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-emerald-50">
                            <Settings className="w-5 h-5 text-emerald-600" />
                            <h2 className="text-lg font-bold text-slate-900">General Configuration</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Store Name</label>
                                <input
                                    type="text"
                                    value={config.storeName}
                                    onChange={e => setConfig({ ...config, storeName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Support Email</label>
                                <input
                                    type="email"
                                    value={config.supportEmail}
                                    onChange={e => setConfig({ ...config, supportEmail: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Security Section */}
                    <div className="bg-white p-8 rounded-2xl border border-emerald-50 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-emerald-50">
                            <Shield className="w-5 h-5 text-emerald-600" />
                            <h2 className="text-lg font-bold text-slate-900">Security & Authentication</h2>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-100">
                            <div className="flex gap-3">
                                <div className="p-2 bg-white rounded-lg">
                                    <Globe className="w-5 h-5 text-amber-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-amber-900 text-sm">Whitelisted Domains</p>
                                    <p className="text-xs text-amber-700">Restricted access enabled via environment variables.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-2xl border border-emerald-50 shadow-sm space-y-6">
                        <h3 className="font-bold text-slate-900">Notifications</h3>
                        <div className="space-y-4">
                            <label className="flex items-center justify-between cursor-pointer group">
                                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Order Emails</span>
                                <input
                                    type="checkbox"
                                    checked={config.enableEmails}
                                    onChange={e => setConfig({ ...config, enableEmails: e.target.checked })}
                                    className="w-5 h-5 accent-emerald-600 rounded-lg cursor-pointer"
                                />
                            </label>
                            <label className="flex items-center justify-between cursor-pointer group">
                                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Admin SMS Alerts</span>
                                <input type="checkbox" className="w-5 h-5 accent-emerald-600 rounded-lg cursor-pointer" />
                            </label>
                        </div>
                    </div>

                    <div className="bg-emerald-900 p-8 rounded-3xl shadow-xl shadow-emerald-900/20 text-white space-y-4">
                        <div className="p-3 bg-emerald-800 rounded-2xl w-fit">
                            <Database className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">Production Mode</h3>
                        <p className="text-emerald-300 text-sm leading-relaxed">
                            Your store is currently live. Any changes made here will affect all users immediately.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
