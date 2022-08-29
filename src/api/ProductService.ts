import axios, {Axios, AxiosResponse} from "axios";
import Product from "@models/Product";

export default class PostService{
    static async getProductsResponse(category?:Product["category"],limit=-1){
       if(category)
       return  axios.get<Product[]>(`https://fakestoreapi.com/products/category/${category}`,
           {
               ...(limit>0 && {params: {limit: limit}})
           })
       return  axios.get<Product[]>('https://fakestoreapi.com/products')
    }
    static async getProductResponse(id: string){
        return  axios.get<Product>(`https://fakestoreapi.com/products/${id}`)
    }
    static async getCategoriesResponse(){
        return  axios.get<string[]>(`https://fakestoreapi.com/products/categories`)
    }
}
