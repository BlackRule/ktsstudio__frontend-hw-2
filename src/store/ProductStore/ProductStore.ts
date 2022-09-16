import { GetProductParams, IProductStore } from './types'
import { ILocalStore } from '@utils/useLocalStore'
import { State } from '@utils/state'
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx'
import { normalizeProduct, ProductModel } from '@models/products'
import { log } from '@utils/console'
import ProductService from '@api/ProductService'

const BASE_URL = 'https://fakestoreapi.com'

type PrivateFields = '_product' | '_state';

export default class ProductStore implements IProductStore, ILocalStore {
  get state() {
    return this._state
  }

  get product() {
    return this._product
  }

  private readonly _apiStore = new ProductService(BASE_URL)
  private _product: null | ProductModel = null
  private _state: State = State.initial
  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _product: observable.ref,
      _state: observable,
      getProduct: action,
      product: computed,
      state: computed,
    })
  }

  async getProduct(params: GetProductParams): Promise<void> {
    this._state = State.loading
    this._product = null
    const response = await this._apiStore.getProductResponse(params.id)
    runInAction(() => {
      if (response.status === 200) {
        this._state = State.success
        try {
          this._product = normalizeProduct(response.data)
        } catch (e) {
          log(e)
          this._state = State.error
          this._product = null
        }
      } else {
        this._state = State.error
      }
    })
  }

  destroy(): void {}
}
