import CategoriesStore from "@store/CategoriesStore/CategoriesStore";

export type GetCategoriesListParams = {  }

export interface ICategoriesStore {
    getCategoriesList(params: GetCategoriesListParams): Promise<void>
}