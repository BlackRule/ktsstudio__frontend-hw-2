import { ProductModel } from 'models/products'

export type GetItemsParams = {
  category: ProductModel['category'];
  exceptId: ProductModel['id'];
};

export interface IRelatedItemsStore {
  getItems(params: GetItemsParams): Promise<void>;
}
