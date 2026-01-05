import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    MoreVertical,
    Edit2,
    Trash2,
    Filter,
    Package,
    ArrowUpDown,
    Check,
    X
} from 'lucide-react';
import { toast } from 'sonner';
import { BACKEND_URL } from '../../lib/api-config';

export const AdminProductManager = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        category: 'Skin Care',
        stock: '100',
        slug: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/products`);
            const data = await response.json();
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            // Auto-generate slug from name if not manually edited
            ...(name === 'name' && !editingProduct ? { slug: value.toLowerCase().replace(/\s+/g, '-') } : {})
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');

        try {
            const url = editingProduct
                ? `${BACKEND_URL}/api/products/${editingProduct.id}`
                : `${BACKEND_URL}/api/products`;

            const method = editingProduct ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock)
                })
            });

            if (response.ok) {
                toast.success(editingProduct ? 'Product Updated' : 'Product Added');
                setIsModalOpen(false);
                setEditingProduct(null);
                setFormData({ name: '', price: '', description: '', image: '', category: 'Skin Care', stock: '100', slug: '' });
                fetchProducts();
            } else {
                const error = await response.json();
                toast.error(error.message || 'Operation failed');
            }
        } catch (error) {
            toast.error('Network error');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        const token = localStorage.getItem('adminToken');
        try {
            const response = await fetch(`${BACKEND_URL}/api/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('Product Deleted');
                fetchProducts();
            }
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const openEditModal = (product: any) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price.toString(),
            description: product.description,
            image: product.image,
            category: product.category,
            stock: product.stock.toString(),
            slug: product.slug
        });
        setIsModalOpen(true);
    };

    const filteredProducts = Array.isArray(products) ? products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div className="space-y-6 animate-reveal">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading">Product Inventory</h1>
                    <p className="text-slate-500 text-sm">Manage your botanical catalog and stock levels.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingProduct(null);
                        setFormData({ name: '', price: '', description: '', image: '', category: 'Skin Care', stock: '100', slug: '' });
                        setIsModalOpen(true);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Plus className="w-5 h-5" />
                    New Product
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-emerald-50 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-50 flex flex-col sm:row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 w-full sm:w-96">
                        <Search className="w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Filter products..."
                            className="bg-transparent border-none focus:outline-none text-sm w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-50">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Category</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Price</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Stock</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">Loading products...</td></tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">No products found.</td></tr>
                            ) : filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-emerald-50 overflow-hidden flex-shrink-0 border border-emerald-100/50">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{product.name}</p>
                                                <p className="text-xs text-slate-500">slug: {product.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold text-slate-900">
                                        ₹{product.price}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`font-bold ${product.stock < 10 ? 'text-red-500' : 'text-slate-600'}`}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => openEditModal(product)}
                                                className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-reveal">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-900">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product Name</label>
                                    <input
                                        type="text" name="name" required value={formData.name} onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                                        placeholder="Ex: Lavender Face Mist"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
                                    <select
                                        name="category" value={formData.category} onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                                    >
                                        <option value="Skin Care">Skin Care</option>
                                        <option value="Hair Care">Hair Care</option>
                                        <option value="Body Care">Body Care</option>
                                        <option value="Essential Oils">Essential Oils</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Price (₹)</label>
                                    <input
                                        type="number" step="0.01" name="price" required value={formData.price} onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Stock Level</label>
                                    <input
                                        type="number" name="stock" required value={formData.stock} onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                                        placeholder="100"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Image URL</label>
                                    <input
                                        type="text" name="image" required value={formData.image} onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                                        placeholder="https://images.unsplash.com/..."
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Summary Description</label>
                                    <textarea
                                        name="description" required rows={3} value={formData.description} onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm resize-none"
                                        placeholder="Enter product details..."
                                    ></textarea>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button
                                    type="button" onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-4 rounded-xl font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-[2] bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-xl font-bold shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.01]"
                                >
                                    {editingProduct ? 'Save Changes' : 'Create Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
