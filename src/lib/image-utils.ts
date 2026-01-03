import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import gallery1 from "@/assets/product-gallery-1.jpg";
import gallery2 from "@/assets/product-gallery-2.jpg";

const imageMap: Record<string, string> = {
    "/product-1.jpg": product1,
    "/product-2.jpg": product2,
    "/product-3.jpg": product3,
    "product-1.jpg": product1,
    "product-2.jpg": product2,
    "product-3.jpg": product3,
    "gallery-1.jpg": gallery1,
    "gallery-2.jpg": gallery2,
};

export const resolveProductImage = (path: string | undefined): string => {
    if (!path) return product1; // Fallback
    if (path.startsWith('http')) return path; // Remote URL
    if (imageMap[path]) return imageMap[path];

    // Try to match filename without path
    const filename = path.split('/').pop() || '';
    if (imageMap[filename]) return imageMap[filename];

    return path; // Return original if no match
};
