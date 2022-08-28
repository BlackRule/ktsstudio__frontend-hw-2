import {useLocation, useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import PostService from "~api/ProductService"
import ProductModel from '~models/Product'
import styles from './Product.module.scss'
import Product from "./components/Product/Product"
import PagePadding from "~components/PagePadding/PagePadding";
import RelatedItems from "./components/RelatedItems/RelatedItems";

const ProductPage = () => {
    const URLparams = useParams() as unknown as { id: string | undefined };
    const [product, setProduct] = useState<ProductModel>()
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        console.log(URLparams.id)
        if (typeof (URLparams.id) !== "string") navigate("/")
        else
            // PostService.getProductResponse(URLparams.id).then((response)=>setProduct(response.data))
            setProduct({
                "id": 1,
                "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                "price": 109.95,
                "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                "category": "men's clothing",
                "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                "rating": {"rate": 3.9, "count": 120}
            })
    }, [])
    /*useEffect(()=>{

    },[location])*/
    return (
        <PagePadding>
            {product ?<>
                <Product product={product}/>
                <RelatedItems category={product.category}/>
            </>: null}
        </PagePadding>
    )
};
export default ProductPage