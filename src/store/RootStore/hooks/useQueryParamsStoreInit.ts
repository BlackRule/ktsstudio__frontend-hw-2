import * as Router from 'react-router-dom'
import rootStore from '../instance'
import { useEffect } from 'react'
export const useQueryParamsStoreInit = (): void => {
  const { search } = Router.useLocation()
  useEffect(() => rootStore.query.setSearch(search), [search])
}
