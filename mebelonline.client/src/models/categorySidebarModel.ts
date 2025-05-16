export type CategorySidebarModel = {
    id: number;
    name: string;
    childrenCategories: CategorySidebarModel[];
};
