import {GetProductsListParams, IProductsStore} from "./types";
import {ILocalStore} from "@utils/useLocalStore";
import {State} from "@utils/state";
import {action, computed, makeObservable, observable, reaction, runInAction} from "mobx";
import {normalizeProduct, ProductModel} from "@models/products";
import {log} from "@utils/console";
import rootStore from "@store/RootStore";
import ProductService from "@api/ProductService";


const BASE_URL = 'https://fakestoreapi.com';

type PrivateFields = '_list' | '_state'|'_query'|'_pageNumber'|'_selectedCategories'|'_totalPages'

const elementsPerPage=6

export default class ProductsStore implements IProductsStore, ILocalStore {
    set selectedCategories(value: string[]) {
        this._selectedCategories = value;
    }
    get totalPages(): number {
        return this._totalPages;
    }
    get selectedCategories() {
        return this._selectedCategories;
    }
    get pageNumber() {
        return this._pageNumber;
    }
    get query() {
        return this._query;
    }
    get state(){
        return this._state
    }

    get list(){
        return this._list
    }

    private readonly productService = new ProductService(BASE_URL);
    private _state: State = State.initial
    private _list: ProductModel[]=[]
    private _query=""
    private _pageNumber=0
    private _totalPages=0
    private _selectedCategories:string[]=[]


    constructor() {
        makeObservable<ProductsStore, PrivateFields>(this, {
            _state: observable,
            state: computed,
            _list: observable.ref,
            list: computed,
            _query:observable,
            query:computed,
            _pageNumber:observable,
            pageNumber:computed,
            _totalPages:observable,
            totalPages:computed,
            _selectedCategories:observable,
            selectedCategories:computed,
            getProductsList: action,
            searchFilteredList:computed,
            categoryFilteredList:computed,
            pagedList:computed,
        })

    }



    get categoryFilteredList() {
        if(this._selectedCategories.length===0) return this._list
        return this._list.filter((v)=>this._selectedCategories.includes(v.category))
    }
    get searchFilteredList(){
        const list = this.categoryFilteredList
        if(this._query==="") return list
        return list.filter(
            (v)=>v.title.includes(this._query)||v.description.includes(this._query)||
                v.category.includes(this._query)
        )
    }

    get pagedList() {
        const list = this.searchFilteredList;
        const pn = this._pageNumber;
        if(!list) return list
        return list.slice(pn*elementsPerPage,pn*elementsPerPage+elementsPerPage)
    }

    private readonly _scReaction = reaction(
        () => rootStore.query.getParam("sc"),
        (sc) => {
            // @ts-ignore TODO
            this._selectedCategories=sc||[]
        }
    )

    private readonly _qReaction = reaction(
        () => rootStore.query.getParam("q"),
        (q) => {
            this._query=q as string || "" //fixme as string
        }
    )
    private readonly _pReaction = reaction(
        () => rootStore.query.getParam("p"),
        (pp) => {
            if(!pp) return
            if(typeof pp!=="string") return;
            this._pageNumber=parseInt(pp)-1
        }
    )

    private readonly _recalculateTotalPagesReaction = reaction(
        () =>  this.searchFilteredList,
        (list) => {
            if(!list){
                this._totalPages=0
                return
            }
            this._totalPages=Math.ceil(list.length/elementsPerPage)
        }
    )



    async getProductsList(): Promise<void> {
        this._state = State.loading
        this._list = []
        const response = await this.productService.getProductsResponse()

        runInAction(() => {
            if (response.status === 200) {
                this._state = State.success
                try {
                    this._list = response.data.map(normalizeProduct)
                } catch (e) {
                    log(e)
                    this._state = State.error
                    this._list = []
                }
            } else {
                this._state = State.error
            }
        })
    }

    destroy(): void {
        this._qReaction()
        this._pReaction()
        this._recalculateTotalPagesReaction()
        this._scReaction()
    }

}