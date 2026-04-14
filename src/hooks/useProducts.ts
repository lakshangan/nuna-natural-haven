import { useQuery } from '@tanstack/react-query';
import { BACKEND_URL } from '../lib/api-config';

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    category: string;
    ingredients: string;
    image_url: string;
}




export const fetchProductBySlug = async (slug: string) => {
    if (!slug) return null;
    const response = await fetch(`${BACKEND_URL}/api/products/${slug}`);
    if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Network response was not ok');
    }
    return response.json() as Promise<Product>;
};

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await fetch(`${BACKEND_URL}/api/products`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json() as Promise<Product[]>;
        },
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
        gcTime: 1000 * 60 * 30, // Keep in garbage collection for 30 minutes
    });
};

export const useProduct = (slug: string) => {
    return useQuery({
        queryKey: ['product', slug],
        queryFn: () => fetchProductBySlug(slug),
        enabled: !!slug,
        staleTime: 1000 * 60 * 10, // Product details cache for 10 minutes
    });
};
