export interface IDemoData extends Array<IDemoDatum> {}

export interface IDemoDatum {
  categories: ICategory[];
  createdDate: string;
  filename: string;
  id: string;
}

export interface ICategories extends Array<ICategory> {}

export interface ICategory {
  _id: string;
  name: string;
  rootNode?: boolean;
  children: string[];
}
