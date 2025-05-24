const categoryService = () => {
    const baseUrl = '/api/categories';

    const fetchAll = async () => {
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

    return { fetchAll };
};

export default categoryService();
