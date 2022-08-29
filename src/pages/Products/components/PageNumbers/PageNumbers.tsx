import styles from './PageNumbers.module.scss'
import classNames from "classnames";

type PageNumbersProps= {
    onChange:(currentPage: number) => void,
    totalPages:number,
    currentPage:number
}

const PageNumbers = ({currentPage,totalPages,onChange}:PageNumbersProps) => {
    return (
       <div className={styles.PageNumbers}>{[...Array(totalPages+1).keys()].slice(1).map(
           (i)=><div onClick={()=>onChange(i-1)} className={
               classNames(styles['page-number'],{[styles.selected]:i-1===currentPage})
           }>{i}</div>
       )}</div>
    )
}
export default PageNumbers