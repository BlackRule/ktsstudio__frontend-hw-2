import { ProductModel } from 'models/products';
import styles from './Product.module.scss';
import { HTMLAttributes } from 'react';
import { Button, ButtonSkin } from 'components/Button/Button';

type ProductProps = React.PropsWithChildren<{
  product: ProductModel;
}> &
  HTMLAttributes<HTMLDivElement>;

const Product = ({ product }: ProductProps) => {
  return (
    <section className={styles.Product}>
      <img src={product.image} className={styles.img} />
      <div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.category}>{product.category}</div>
        <div className={styles['color-txt']}>Color</div>
        <div className={styles.colors}>
          <div
            className={styles.color}
            style={{ backgroundColor: '#151411' }}
          ></div>
          <div
            className={styles.color}
            style={{ backgroundColor: '#314443' }}
          ></div>
          <div
            className={styles.color}
            style={{ backgroundColor: '#C5A26E' }}
          ></div>
          <div
            className={styles.color}
            style={{ backgroundColor: '#D8DBE0' }}
          ></div>
        </div>
        <div className={styles.description}>
          {product.description}
          {/*TODO Read More*/}
        </div>
        <div className={styles.price}>${product.price}</div>
        <div className={styles.buttons}>
          <Button>Buy Now</Button>
          <Button skin={ButtonSkin.secondary}>Add to Chart</Button>
        </div>
      </div>
    </section>
  );
};

export default Product;
