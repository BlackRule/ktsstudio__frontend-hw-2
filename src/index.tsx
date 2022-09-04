import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import styles from './index.module.scss'
import Products from "@pages/Products";
import Product from "@pages/Product";
import {Header} from "@components/Header/Header";
import '@config/configureMobX'
import {useQueryParamsStoreInit} from "@store/RootStore/hooks/useQueryParamsStoreInit";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App=()=>{
    useQueryParamsStoreInit()
    return (
        <div className={styles.App}>
            <Header/>
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/product">
                    <Route path=':id' element={<Product/>}/>
                    <Route path="" element={<Navigate to="/404" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    )
}

root.render(
    <BrowserRouter>

    <React.StrictMode>
      <App/>
  </React.StrictMode>
    </BrowserRouter>

);
