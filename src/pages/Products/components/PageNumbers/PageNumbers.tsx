import styles from './PageNumbers.module.scss'
import classNames from 'classnames'
import qs from 'qs'
import { Link } from 'react-router-dom'
import { getNewURL } from '@utils/getNewUrl'
import { visiblePageNumbers } from '@config/config'

type PageNumbersProps = {
  curParams: qs.ParsedQs;
  currentPage: number;
  onChange?: (pageToGo: number) => void;
  paramName: string;
  totalPages: number;
};

function jsxForPageLink(onClick:()=>void, paramName:PageNumbersProps['paramName'],
  i:number, curParams:PageNumbersProps['curParams'],
  currentPage:PageNumbersProps['currentPage']) {
  return (
    <Link
      onClick={onClick}
      to={getNewURL(paramName, `${i + 1}`, curParams)}
      className={classNames(styles['page-number'], {
        [styles.selected]: i === currentPage,
      })}
      key={i}
    >
      {i + 1}
    </Link>
  )
}


function jsxForForwardBackLink(onChange:PageNumbersProps['onChange'], paramName:PageNumbersProps['paramName'], curParams:PageNumbersProps['curParams'],
  currentPage:PageNumbersProps['currentPage'],totalPages:PageNumbersProps['totalPages'],isForward=false) {
  const isDisabled=isForward?currentPage == totalPages - 1:currentPage == 0
  return (
    <Link
      onClick={() => onChange?.(currentPage + 1)}
      to={getNewURL(
        paramName,
        `${currentPage + (isDisabled ? 0 : (isForward?+1:-1)) + 1}`,
        curParams
      )}
      className={classNames(styles['page-number'], {
        [styles.disabled]: isDisabled,
      }, styles[`${isForward?'right':'left'}-arrow`])}
      key={isForward?'Next':'Prev'}
    >
    </Link>
  )
}

const PageNumbers = ({
  paramName,
  currentPage,
  totalPages,
  onChange,
  curParams,
}: PageNumbersProps) => {
  const additionalPages=[...Array(totalPages).keys()].slice(visiblePageNumbers-1,totalPages-1)
  return (
    <div className={styles.PageNumbers}>
      {jsxForForwardBackLink(onChange, paramName, curParams, currentPage,totalPages)}
      {[...Array(totalPages).keys()].slice(0,visiblePageNumbers-1).map((i) =>
        jsxForPageLink(() => onChange?.(i),paramName,i,curParams,currentPage)
      )}
      {additionalPages.length>0?<div className={styles.additionalNumbers}>
        <input type='checkbox' id={styles.additionalNumbersToggle}/>
        <label htmlFor={styles.additionalNumbersToggle} className={styles['page-number']}>...</label>
        <div className={styles.options}>{
          additionalPages.map(
            (i)=>jsxForPageLink(() => onChange?.(i),paramName,i,curParams,currentPage)
          )
        }
        </div>
      </div>:null}
      {totalPages>3?jsxForPageLink(() => onChange?.(totalPages-1),paramName,totalPages-1,curParams,currentPage):null}
      {jsxForForwardBackLink(onChange, paramName, curParams, currentPage,totalPages,true)}
    </div>
  )
}
export default PageNumbers
