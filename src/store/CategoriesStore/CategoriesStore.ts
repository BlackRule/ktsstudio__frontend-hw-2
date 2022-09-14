import { ICategoriesStore } from './types'
import { ILocalStore } from 'utils/useLocalStore'
import { State } from 'utils/state'
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx'
import { log } from 'utils/console'
import ProductService from 'api/ProductService'
import { Option } from 'components/MultiDropdown/MultiDropdown'

const BASE_URL = 'https://fakestoreapi.com'

type PrivateFields = '_list' | '_loading';

const stringsToOptions = (v: string): Option => ({ key: v, value: v })

export default class CategoriesStore implements ICategoriesStore, ILocalStore {
  get loading() {
    return this._loading
  }

  get list() {
    return this._list.map(stringsToOptions)
  }

  private readonly productService = new ProductService(BASE_URL)
  private _loading: State = State.initial
  private _list: string[] = []

  constructor() {
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _list: observable.ref,
      _loading: observable,
      getCategoriesList: action,
      list: computed,
      loading: computed,
    })
  }

  async getCategoriesList(): Promise<void> {
    this._loading = State.loading
    this._list = []
    const response = await this.productService.getCategoriesResponse()

    runInAction(() => {
      if (response.status === 200) {
        this._loading = State.success
        try {
          this._list = response.data
        } catch (e) {
          log(e)
          this._loading = State.error
          this._list = []
        }
      } else {
        this._loading = State.error
      }
    })
  }

  destroy(): void {}
}
