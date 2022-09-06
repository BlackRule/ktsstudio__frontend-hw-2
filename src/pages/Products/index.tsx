import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Card} from "@components/Card/Card";
import styles from './index.module.scss'
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import PagePadding from "@components/PagePadding/PagePadding";
import {Option} from "@components/MultiDropdown/MultiDropdown";
import PageNumbers from "./components/PageNumbers/PageNumbers";
import {Loader} from "@components/Loader/Loader";
import {observer} from "mobx-react-lite";
import {useLocalStore} from "@utils/useLocalStore";
import ProductsStore from "@store/ProductsStore";
import {State} from "@utils/state";
import {navigate} from "@storybook/addon-links";
import rootStore from "@store/RootStore";
import {toJS} from "mobx";

const Products = ()=>{
    const navigate=useNavigate()
    const productsStore = useLocalStore(() => new ProductsStore());
    useEffect(() => {
        productsStore.getProductsList()
    }, [productsStore]);
    const optionsToStrings = (v:Option): string => v.value
    const stringsToOptions = (v:string): Option => ({key: v, value: v})
    const selectedCategories = toJS(productsStore.selectedCategories);
    return (
        <PagePadding>
            <div className={styles.Products}>
                <h1 className={styles.products}>Products</h1>
                <p className={styles.p1}>
                    We display products based on the latest products we have, if you want
                    to see our old products please enter the name of the item
                </p>
                <div className={styles['top-bar']}>
                    <SearchBar className={styles.SearchBar} handleSearch={
                        (v)=> navigate(rootStore.query.getNewURL("q",v))
                    }/>
                    <Filter className={styles.Filter} selectedOptions={selectedCategories.map(stringsToOptions)}
                            onChange={(opts)=>{
                                navigate(rootStore.query.getNewURL("sc",opts.map(optionsToStrings)))
                    }}/>
                </div>
                <div className={styles['total-product']}>
                    <span className={styles['total-product__txt']}>Total Products</span>
                    <span className={styles['total-product__count']}>{toJS(productsStore.searchFilteredList).length}</span>
                </div>
                {productsStore.state===State.loading?<Loader/>:
                <div className={styles['products-grid']}>
                    {toJS(productsStore.pagedList).map((product) => (
                        <Link key={product.id} to={`/product/${product.id}`}>
                            <Card {...product}/>
                        </Link>
                    ))}
                </div>}

                <PageNumbers paramName={'p'} totalPages={productsStore.totalPages}
                             currentPage={productsStore.pageNumber}/>
            </div>
        </PagePadding>
    )
};
export default observer(Products)