import {HTMLAttributes} from "react";
import styles from './PagePadding.module.scss'
const PagePadding = (props:HTMLAttributes<HTMLDivElement>)=>{
    return (<div className={styles.PagePadding}>
        {props.children}
    </div>)
}
export default PagePadding