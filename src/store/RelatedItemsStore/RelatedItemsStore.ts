import { GetItemsParams, IRelatedItemsStore } from './types';
import { ILocalStore } from '@utils/useLocalStore';
import { State } from '@utils/state';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { normalizeProduct, ProductModel } from '@models/products';
import { log } from '@utils/console';
import ProductService from '@api/ProductService';

const BASE_URL = 'https://fakestoreapi.com';

type PrivateFields = '_list' | '_state';

export default class RelatedItemsStore
  implements IRelatedItemsStore, ILocalStore
{
  get state() {
    return this._state;
  }

  get list() {
    return this._list;
  }

  private readonly productService = new ProductService(BASE_URL);
  private _list: ProductModel[] = [];
  private _state: State = State.initial;
  constructor() {
    makeObservable<RelatedItemsStore, PrivateFields>(this, {
      _list: observable.ref,
      list: computed,
      _state: observable,
      state: computed,
      getItems: action,
    });
  }

  async getItems(params: GetItemsParams): Promise<void> {
    this._state = State.loading;
    this._list = [];
    const response = await this.productService.getProductsResponse(
      params.category
    );

    runInAction(() => {
      if (response.status === 200) {
        this._state = State.success;
        try {
          this._list = response.data
            .map(normalizeProduct)
            .filter((v) => v.id !== params.exceptId);
        } catch (e) {
          log(e);
          this._state = State.error;
          this._list = [];
        }
      } else {
        this._state = State.error;
      }
    });
  }

  destroy(): void {}
}
