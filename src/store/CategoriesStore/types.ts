export type GetCategoriesListParams = {};

export interface ICategoriesStore {
  getCategoriesList(params: GetCategoriesListParams): Promise<void>;
}
