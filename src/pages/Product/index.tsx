import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './Product.module.scss';
import Product from './components/Product/Product';
import PagePadding from 'components/PagePadding/PagePadding';
import RelatedItems from './components/RelatedItems/RelatedItems';
import { useLocalStore } from 'utils/useLocalStore';
import ProductStore from 'store/ProductStore';
import { Loader } from 'components/Loader/Loader';
import { observer } from 'mobx-react-lite';

const ProductPage = () => {
  const URLparams = useParams() as unknown as { id: string | undefined };
  const navigate = useNavigate();
  const productStore = useLocalStore(() => new ProductStore());
  const location = useLocation();
  useEffect(() => {
    if (typeof URLparams.id !== 'string') {
      navigate('/');
    } else {
      productStore.getProduct({ id: Number(URLparams.id) });
    }
  }, [productStore, location]);

  const { product } = productStore;
  return (
    <PagePadding>
      {product === null ? (
        <Loader />
      ) : (
        <>
          <Product product={product} />
          <RelatedItems category={product.category} exceptId={product.id} />
        </>
      )}
    </PagePadding>
  );
};
export default observer(ProductPage);
