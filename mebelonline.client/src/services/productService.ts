import type { ProductCardModel } from "../models/productCardModel";
import type { ProductDetailsModel } from "../models/productDetailsModel";

const productService = () => {
    const baseUrl = '/api/products';

    const fetchLatest = async (): Promise<ProductCardModel[]> => {
        try {
            const response = await fetch(`${baseUrl}/latest`);

            if (!response.ok) {
                console.error(`Error fetching categories: ${response.statusText}`);
                return [];
            }

            return await response.json();
        } catch (error) {
            console.error('Network error while fetching categories:', error);
            return [];
        }
    };

    const fetchProductDetails = async (productId: string): Promise<ProductDetailsModel | null> => {
        try {
            const response = await fetch(`${baseUrl}/${productId}`);

            if (!response.ok) {
                console.error(`Error fetching categories: ${response.statusText}`);
                return null;
            }

            return await response.json();
        } catch (error) {
            console.error('Network error while fetching categories:', error);
            return null;
        }
    };

    return { fetchLatest, fetchProductDetails };
};

export default productService();
