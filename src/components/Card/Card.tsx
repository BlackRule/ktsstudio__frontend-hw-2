import styles from './Card.module.scss'
export type CardProps = {
  category?: React.ReactNode;
  description: React.ReactNode;
  image: string;
  //TODO consider renaming it to url
  onClick?: React.MouseEventHandler;
  price?: React.ReactNode; 
  title: React.ReactNode;
};
export const Card = ({
  image,
  title,
  description,
  price = null,
  category = null,
  onClick,
}: CardProps) => {
  return (
    <div className={styles.Card} onClick={onClick}>
      <img src={image} className={styles.img} />
      <div className={styles.category}>{category}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.price}>${price}</div>
    </div>
  )
}
