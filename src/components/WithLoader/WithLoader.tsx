import { Loader } from '../Loader/Loader'
import styles from './WithLoader.module.scss'

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;
export const WithLoader = ({ children, loading = true }: WithLoaderProps) => {
  return (
    <div className={styles.WithLoader}>
      {children}
      <div className={styles.backdrop} />
      <Loader loading={loading} className={styles.WithLoader__Loader} />
    </div>
  )
}
