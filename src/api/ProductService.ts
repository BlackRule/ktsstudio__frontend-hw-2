import axios, {Axios, AxiosResponse} from "axios";
import Product from "~models/Product";

export default class PostService{
    static async getProductsResponse(){
       return  axios.get<Product[]>('https://fakestoreapi.com/products')
    }
    static async getProductResponse(id: string){
        return  axios.get<Product>(`https://fakestoreapi.com/products/${id}`)
    }
}
