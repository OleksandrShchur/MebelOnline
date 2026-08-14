export type CatalogModel = {
  id: number;
  name: string;
  imageUrl?: string | null;
  subCategories?: CatalogModel[] | null;
};
