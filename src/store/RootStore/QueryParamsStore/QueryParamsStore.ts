import {action, makeObservable, observable} from "mobx";
import * as qs from "qs";

type PrivateFields = "_params";
type ValueOf<T> = T[keyof T];


export default class QueryParamsStore {
    private _params: qs.ParsedQs = {}
    private _search = ""

    constructor() {
        makeObservable<QueryParamsStore, PrivateFields>(this, {
            _params: observable.ref,
            setSearch: action,
        })
    }

    getParam(key: string){
        return this._params[key]
    }

    getParams() {
        return this._params
    }

    setSearch(search: string) {
        search = search.startsWith("?") ? search.slice(1) : search
        if (this._search !== search) {
            this._search = search
            this._params = qs.parse(search)
        }
    }

    getNewURL=(paramName:string,value:ValueOf<qs.ParsedQs>):string=>{
        const n={...this.getParams(),[paramName]:value}
        return qs.stringify(n,{addQueryPrefix:true})
    }
}