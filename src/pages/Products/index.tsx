import {Link, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductService from "@api/ProductService";
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
import {Loading} from "@utils/loading";

const Products = ()=>{
    const productsStore = useLocalStore(() => new ProductsStore());
    useEffect(() => {
        productsStore.getProductsList({/*TODO*/})
    }, [productsStore]);
    /*const [allProducts,setAllProducts]=useState<Product[]>()
    const [currentProducts,setCurrentProducts]=useState<Product[]>()
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const totalElements=allProducts?allProducts.length:0*/
    const elementsPerPage=6
    /*TODO const totalPages=Math.ceil(totalElements/elementsPerPage)*/
    const [currentPage,setCurrentPage]=useState<number>(0)
    /* useEffect(()=>{
        //TODO handle Error
       if(selectedCategories.length===0)
        PostService.getProductsResponse().then((response)=>setAllProducts(response.data))
        else{
            Promise.all(
                selectedCategories.map((v)=>PostService.getProductsResponse(v))
            ).then((rs)=>setAllProducts(
                rs.map((r)=>r.data).reduce(
                (allProducts,products)=>[...allProducts,...products],[])
            ))
        }
    },[selectedCategories])*/
    /*useEffect(()=>setCurrentProducts(allProducts?.
    slice(currentPage*elementsPerPage,currentPage*elementsPerPage+elementsPerPage-1)
    ),[currentPage,allProducts])*/
    const stringsToOptions = (v:string): Option => ({key: v, value: v})
    const optionsToStrings = (v:Option): string => v.value
    return (
        <PagePadding>
            <div className={styles.Products}>
                <h1 className={styles.products}>Products</h1>
                <p className={styles.p1}>
                    <Link to={'/?q=abc&p=2&f=red'}>/?q=abc&p=2&f=red</Link><br/>
                    <Link to={'/?q=abc&p=3&f=red'}>/?q=abc&p=3&f=red</Link><br/>
                    <Link to={'/?q=abc&p=3&f=red'}>/?q=abc&p=3&f=red</Link><br/>
                    <Link to={'/?q=bc&p=2&f=red'}>/?q=bc&p=2&f=red</Link><br/>
                    We display products based on the latest products we have, if you want
                    to see our old products please enter the name of the item</p>
                <div className={styles['top-bar']}>
                    <SearchBar className={styles.SearchBar}/>
                    {/*TODO<Filter className={styles.Filter} selectedOptions={selectedCategories.map(stringsToOptions)} onChange={(opts)=>{
                        setSelectedCategories(opts.map(optionsToStrings))
                    }}/>*/}
                </div>
                <div className={styles['total-product']}>
                    <span className={styles['total-product__txt']}>Total Products</span>
                    <span className={styles['total-product__count']}>{/*TODO totalElements*/}</span>
                </div>
                {productsStore.loading===Loading.loading && <Loader/>}
                <div className={styles['products-grid']}>
                    {productsStore.list.map((product) => (
                        <Link key={product.id} to={`/product/${product.id}`}>
                            <Card {...product}/>
                        </Link>
                    ))}
                </div>
                {/*TODO<PageNumbers totalPages={totalPages} onChange={(cp)=>{
                    setCurrentPage(cp)
                }} currentPage={currentPage}/>*/}
            </div>
        </PagePadding>
    )
};
export default observer(Products)