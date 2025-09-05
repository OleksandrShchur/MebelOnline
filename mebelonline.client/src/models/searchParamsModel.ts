export type SearchParamsModel = {
    searchString: string;
    page: number;
    pageSize: number;
    sortBy: string;
    minPrice?: number;
    maxPrice?: number;
    selectedBrands?: string[];
    selectedMaterials?: string[];
};
