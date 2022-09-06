import axios from "axios";
import {ProductApi} from "@models/products";

export default class ProductService{
    private readonly _baseUrl:string;
    constructor(baseUrl:string) {
        this._baseUrl = baseUrl;
    }
    async getProductsResponse(category?:ProductApi["category"],limit=-1){
       if(category)
       return  axios.get<ProductApi[]>(`${this._baseUrl}/products/category/${category}`,
           {
               ...(limit>0 && {params: {limit: limit}})
           })
       return  axios.get<ProductApi[]>(`${this._baseUrl}/products`)
    }
    async getProductResponse(id: ProductApi["id"]){
        return  axios.get<ProductApi>(`${this._baseUrl}/products/${id}`)
    }
    async getCategoriesResponse(){
        return  axios.get<string[]>(`${this._baseUrl}/products/categories`)
    }
}
