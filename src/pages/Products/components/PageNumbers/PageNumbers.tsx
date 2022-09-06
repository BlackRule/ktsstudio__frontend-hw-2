import styles from './PageNumbers.module.scss'
import classNames from "classnames";
import { Link } from 'react-router-dom';
import rootStore from "@store/RootStore";
import {observer} from "mobx-react-lite";

type PageNumbersProps= {
    onChange?:(currentPage: number) => void,
    totalPages:number,
    currentPage:number,
    paramName:string
}

const PageNumbers = ({paramName,currentPage,totalPages,onChange}:PageNumbersProps) => {
    return (
       <div className={styles.PageNumbers} >
           {[...Array(totalPages+1).keys()].slice(1).map((i)=>
               <Link onClick={()=>onChange?.(i-1)} to={rootStore.query.getNewURL(paramName,`${i}`)}
                     className={classNames(styles['page-number'],{[styles.selected]:i-1===currentPage})}
                     key={i}>{i}</Link>
           )}
       </div>
    )
}
export default observer(PageNumbers)