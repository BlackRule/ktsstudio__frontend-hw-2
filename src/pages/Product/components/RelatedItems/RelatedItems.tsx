import ProductModel from "@models/Product";
import styles from './RelatedItems.module.scss'
import {HTMLAttributes, useEffect, useState} from "react";
import PostService from "@api/ProductService";
import {Link} from "react-router-dom";
import {Card} from "@components/Card/Card";

type RelatedItemsProps = React.PropsWithChildren<{
    category:ProductModel["category"]
}> & HTMLAttributes<HTMLDivElement>;

const RelatedItems=({category}:RelatedItemsProps)=>{
    const [products, setProducts] = useState<ProductModel[]>()

    useEffect(() => {
            PostService.getProductsResponse(category).then((response)=>setProducts(response.data))
    }, [])
    return (
        <section className={styles.RelatedItems}>
            <div className={styles.txt}>Related Items</div>
            <div className={styles.grid}>
                {products?
                    products.map((product) =>
                    (<Link to={`/product/${product.id}`}>
                        <Card {...product}/>
                    </Link>)
                    ):null
                }
            </div>
        </section>
    )
}

export default RelatedItems