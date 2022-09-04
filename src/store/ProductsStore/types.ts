export type GetProductsListParams = {  }

export interface IProductsStore {
    getProductsList(params: GetProductsListParams): Promise<void>
}