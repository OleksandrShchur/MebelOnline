export type CategoryRefModel = {
  id: number;
  name: string;
};

export type CategoryParentModel = {
  id: number;
  name: string;
  parent?: CategoryParentModel | null;
};

export type CategoryDetailsModel = {
  id: number;
  name: string;
  imageUrl?: string | null;
  parent?: CategoryParentModel | null;
  children?: CategoryRefModel[] | null;
};
