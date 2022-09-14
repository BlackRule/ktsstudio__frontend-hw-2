import { useQueryParamsStoreInit } from '@store/RootStore/hooks/useQueryParamsStoreInit'
import styles from './App.module.scss'
import { Header } from '@components/Header/Header'
import { Navigate, Route, Routes } from 'react-router-dom'
import Products from '@pages/Products'
import Product from '@pages/Product'

const App = () => {
  useQueryParamsStoreInit()
  return (
    <div className={styles.App}>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product">
          <Route path=":id" element={<Product />} />
          <Route path="" element={<Navigate to="/404" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
