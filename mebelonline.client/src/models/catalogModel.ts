export type CatalogModel = {
    id: number;
    name: string;
    imageUrl: string;
    subCategories: CatalogModel[];
};
