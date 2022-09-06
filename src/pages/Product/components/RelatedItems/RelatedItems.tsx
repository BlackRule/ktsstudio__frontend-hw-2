import {ProductModel} from "@models/products";
import styles from './RelatedItems.module.scss'
import {HTMLAttributes, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Card} from "@components/Card/Card";
import {useLocalStore} from "@utils/useLocalStore";
import RelatedItemsStore from "@store/RelatedItemsStore/RelatedItemsStore";
import {observer} from "mobx-react-lite";
import {Loader} from "@components/Loader/Loader";
import {State} from "@utils/state";

type RelatedItemsProps = React.PropsWithChildren<{
    category:ProductModel["category"],
    exceptId:ProductModel["id"],
}> & HTMLAttributes<HTMLDivElement>;

const RelatedItems=({category,exceptId}:RelatedItemsProps)=>{
    const relatedItemsStore = useLocalStore(() => new RelatedItemsStore());
    useEffect(() => {
        relatedItemsStore.getItems({category:category,exceptId:exceptId})
    }, [relatedItemsStore]);
    const relatedItems = relatedItemsStore.list;
    return (
        <section className={styles.RelatedItems}>
            <div className={styles.txt}>Related Items</div>
            <div className={styles.grid}>
                {relatedItemsStore.state===State.loading?<Loader/>:
                    relatedItems.map((product) =>
                    (<Link key={product.id} to={`/product/${product.id}`}>
                        <Card {...product}/>
                    </Link>)
                    )
                }
            </div>
        </section>
    )
}

export default observer(RelatedItems)