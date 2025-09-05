import type { PagedResultModel } from "../models/pagedResultModel";
import type { SearchSidebarModel } from "../models/searchSidebarModel";

const searchService = () => {
    const baseUrl = 'api/search';

    const fetchByQuery = async (params: URLSearchParams): Promise<PagedResultModel | null> => {
        try {
            const response = await fetch(`${baseUrl}?${params.toString()}`);

            if (!response.ok) {
                console.error(`Error fetching search by query data: ${response.statusText}`);
                return null;
            }

            return await response.json();
        } catch (error) {
            console.error('Network error while fetching search result:', error);
            return null;
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
