import styles from './PageNumbers.module.scss'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { getNewURL } from 'utils/getNewUrl'

type PageNumbersProps = {
  curParams: qs.ParsedQs;
  currentPage: number;
  onChange?: (currentPage: number) => void;
  paramName: string;
  totalPages: number;
};

const PageNumbers = ({
  paramName,
  currentPage,
  totalPages,
  onChange,
  curParams,
}: PageNumbersProps) => {
  return (
    <div className={styles.PageNumbers}>
      {[...Array(totalPages + 1).keys()].slice(1).map((i) => (
        <Link
          onClick={() => onChange?.(i - 1)}
          to={getNewURL(paramName, `${i}`, curParams)}
          className={classNames(styles['page-number'], {
            [styles.selected]: i - 1 === currentPage,
          })}
          key={i}
        >
          {i}
        </Link>
      ))}
    </div>
  )
}
export default PageNumbers
