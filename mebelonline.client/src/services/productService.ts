const productService = () => {
    const baseUrl = '/api/products';

    const fetchLatest = async () => {
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

    return { fetchLatest };
};

export default productService();