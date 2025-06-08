export type CategoryModel = {
    id: number;
    name: string;
    childrenCategories: CategoryModel[];
};
