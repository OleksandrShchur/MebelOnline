import type { CatalogModel } from "../models/catalogModel";
import type { CategoryBreadcrumbModel } from "../models/categoryBreadcrumbModel";
import type { CategoryModel } from "../models/categoryModel";

const categoryService = () => {
    const baseUrl = '/api/categories';

    const fetchAll = async (): Promise<CategoryModel[]> => {
        try {
            const response = await fetch(`${baseUrl}/all`);

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

    const fetchBreadcrumbsForProduct = async (productId: string): Promise<CategoryBreadcrumbModel[]> => {
        try {
            const response = await fetch(`${baseUrl}/breadcrumbs/${productId}`);

            if (!response.ok) {
                console.error(`Error fetching categories: ${response.statusText}`);
                return [];
            }

            return await response.json();
        } catch (error) {
            console.error('Network error while fetching breadcrumbs for product:', error);
            return [];
        }
    };
    
    const fetchCatalog = async (): Promise<CatalogModel[]> => {
        try {
            const response = await fetch(`${baseUrl}/catalog`);

            if (!response.ok) {
                console.error(`Error fetching categories: ${response.statusText}`);
                return [];
            }

            return await response.json();
        } catch (error) {
            console.error('Network error while fetching breadcrumbs for product:', error);
            return [];
        }
    };

    return { fetchAll, fetchBreadcrumbsForProduct, fetchCatalog };
};

export default categoryService();
