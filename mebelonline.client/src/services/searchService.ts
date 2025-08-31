import type { ProductCardModel } from "../models/productCardModel";
import type { SearchParamsModel } from "../models/searchParamsModel";
import type { SearchSidebarModel } from "../models/searchSidebarModel";

const searchService = () => {
    const baseUrl = 'api/search';

    const fetchByQuery = async (params: SearchParamsModel): Promise<ProductCardModel[]> => {
        try {
            const response = await fetch(`${baseUrl}/`);

            return [];
        } catch (error) {
            console.error('Network error while fetching search result:', error);
            return [];
        }
    };

    const fetchSidebar = async (params: URLSearchParams): Promise<SearchSidebarModel | null> => {
        try {
            const response = await fetch(`${baseUrl}/sidebar?${params.toString()}`);

            if (!response.ok) {
                console.error(`Error fetching search sidebar data: ${response.statusText}`);
                return null;
            }

            return await response.json();
        } catch (error) {
            console.error('Network error while fetching search sidebar data:', error);
            return null;
        }
    };

    return { fetchByQuery, fetchSidebar };
};

export default searchService();
