import {GetProductsListParams, IProductsStore} from "./types";
import {ILocalStore} from "@utils/useLocalStore";
import {Loading} from "@utils/loading";
import {action, computed, makeObservable, observable, reaction, runInAction} from "mobx";
import {normalizeProduct, ProductModel} from "@models/products";
import {log} from "@utils/console";
import {
    CollectionModel,
    getInitialCollectionModel,
    linearizeCollection,
    normalizeCollection
} from "@models/shared/collection";
import rootStore from "@store/RootStore";
import ProductService from "@api/ProductService";


const BASE_URL = 'https://fakestoreapi.com';

type PrivateFields = '_list' | '_loading'

export default class ProductsStore implements IProductsStore, ILocalStore {
    get loading(): Loading {
        return this._loading
    }

    get list(): ProductModel[] {
        return linearizeCollection(this._list)
    }

    private readonly _apiStore = new ProductService(BASE_URL);
    private _list: CollectionModel<number, ProductModel> = getInitialCollectionModel()
    private _loading: Loading = Loading.initial
    private readonly _qReaction = reaction(
        () => rootStore.query.getParam("q"),
        (q) => {
            //TODO
            log("q change", q);
        }
    )
    private readonly _pReaction = reaction(
        () => rootStore.query.getParam("p"),
        (p) => {
            //TODO
            log("p change", p);
        }
    )
    private readonly _fReaction = reaction(
        () => rootStore.query.getParam("f"),
        (f) => {
            //TODO
            log("f change", f);
        }
    )

    constructor() {
        makeObservable<ProductsStore, PrivateFields>(this, {
            //observable делает deep-compare старого _list'а с новым а это долго Мы ведь меняем весь list нам не надо deep-compare
            // _list:observable,
            _list: observable.ref,
            _loading: observable,
            list: computed,  //computed делает мемоизацию автоматом
            //Тоесть get list() вызывается лишь когда _list меняется
            loading: computed,
            //action это те где мы меняем состояние observable полей
            getProductsList: action
        })
    }

    async getProductsList(params: GetProductsListParams): Promise<void> {
        this._loading = Loading.loading
        this._list = getInitialCollectionModel()
        const response = await this._apiStore.getProductsResponse()
        //Нужно чтобы результат #1 не был [] а был именно равен response.data
        //из-за await оборачивать в runInAction
        //Если не обернуть то будет
        //ререндер#2 при кот-м this._loading = Loading.success,this._list=[]
        //ререндер#3 при кот-м this._loading = Loading.success,this._list=response.data
        //А если обернуть то ререндера #2 не будет
        runInAction(() => {
            if (response.status === 200) {
                this._loading = Loading.success
                //#1
                try {
                    this._list = normalizeCollection(response.data, (li) => li.id, normalizeProduct)
                } catch (e) {
                    log(e)
                    this._loading = Loading.error
                    this._list = getInitialCollectionModel()
                }
            } else {
                this._loading = Loading.error
            }
        })
    }

    destroy(): void {
        this._qReaction()
        this._pReaction()
        this._fReaction()
    }

}