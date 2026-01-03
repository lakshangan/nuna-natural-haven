import { useQuery } from '@tanstack/react-query';

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

const BACKEND_URL = 'http://localhost:5050';

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
    });
};

export const useProduct = (slug: string) => {
    return useQuery({
        queryKey: ['product', slug],
        queryFn: async () => {
            if (!slug) return null;
            const response = await fetch(`${BACKEND_URL}/api/products/${slug}`);
            if (!response.ok) {
                if (response.status === 404) return null;
                throw new Error('Network response was not ok');
            }
            return response.json() as Promise<Product>;
        },
        enabled: !!slug,
    });
};
