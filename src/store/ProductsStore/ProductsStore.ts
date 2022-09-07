import {IProductsStore} from "./types";
import {ILocalStore} from "@utils/useLocalStore";
import {State} from "@utils/state";
import {action, computed, makeObservable, observable, reaction, runInAction} from "mobx";
import {normalizeProduct, ProductModel} from "@models/products";
import {log} from "@utils/console";
import rootStore from "@store/RootStore";
import ProductService from "@api/ProductService";


const BASE_URL = 'https://fakestoreapi.com';


const elementsPerPage = 6

export default class ProductsStore implements IProductsStore, ILocalStore {

    //fullList->categoriesFilteredList->searchFilteredList->pagedList

    private readonly productService = new ProductService(BASE_URL);
    state: State = State.initial
    list: ProductModel[] = []
    query = ""
    pageNumber = 0
    totalPages = 0
    selectedCategories: string[] = []

    constructor() {
        makeObservable<ProductsStore>(this, {
            state: observable,
            list: observable.ref,
            query: observable,
            pageNumber: observable,
            totalPages: observable,
            selectedCategories: observable,
            getProductsList: action,
            searchFilteredList: computed,
            categoryFilteredList: computed,
            pagedList: computed,
        })

    }

    get categoryFilteredList() {
        if (this.selectedCategories.length === 0) return this.list
        return this.list.filter((v) => this.selectedCategories.includes(v.category))
    }

    get searchFilteredList() {
        const list = this.categoryFilteredList
        if (this.query === "") return list
        function includesLC(what:string, inclWhat:string){
            return what.toLowerCase().includes(inclWhat.toLowerCase())
        }
        return list.filter(
            (v) => [v.title,v.description,v.category].some((v)=>includesLC(v,this.query) )
        )
    }

    private readonly _recalculateTotalPagesReaction = reaction(
        () => this.searchFilteredList,
        (list) => {
            if (!list) {
                this.totalPages = 0
                return
            }
            this.totalPages = Math.ceil(list.length / elementsPerPage)
            if (this.totalPages > 0 && this.pageNumber >= this.totalPages) this.pageNumber = this.totalPages - 1
        }
    )

    get pagedList() {
        const list = this.searchFilteredList;
        const pn = this.pageNumber;
        if (!list) return list
        return list.slice(pn * elementsPerPage, pn * elementsPerPage + elementsPerPage)
    }

    private readonly _scReaction = reaction(
        () => rootStore.query.getParam("sc"),
        (sc) => {
            this.selectedCategories = (sc as string[]) || [] //TODO as string
        }
    )

    private readonly _qReaction = reaction(
        () => rootStore.query.getParam("q"),
        (q) => {
            this.query = q as string || "" //fixme as string
        }
    )
    private readonly _pReaction = reaction(
        () => rootStore.query.getParam("p"),
        (pp) => {
            const p = parseInt(pp as string) - 1
            this.pageNumber = p >= 0 ? p : 0 //fixme as string
        }
    )

    async getProductsList(): Promise<void> {
        this.state = State.loading
        this.list = []
        const response = await this.productService.getProductsResponse()

        runInAction(() => {
            if (response.status === 200) {
                this.state = State.success
                try {
                    this.list = response.data.map(normalizeProduct)
                } catch (e) {
                    log(e)
                    this.state = State.error
                    this.list = []
                }
            } else {
                this.state = State.error
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