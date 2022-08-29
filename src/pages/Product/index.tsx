import {useLocation, useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import PostService from "@api/ProductService"
import ProductModel from '@models/Product'
import styles from './Product.module.scss'
import Product from "./components/Product/Product"
import PagePadding from "@components/PagePadding/PagePadding";
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
            PostService.getProductResponse(URLparams.id).then((response)=>setProduct(response.data))

    },[location])
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