import { ProductModel } from '@models/products'

export type GetProductsListParams = {};
export type GetProductParams = { id: ProductModel['id'] };

export interface IProductStore {
  getProduct(params: GetProductsListParams): Promise<void>;
}
