import {HTMLAttributes} from "react";
import styles from './PagePadding.module.scss'
import classNames from "classnames";
const PagePadding = (props:HTMLAttributes<HTMLDivElement>)=>{
    return (<div {...props} className={classNames(styles.PagePadding,props.className)}>
        {props.children}
    </div>)
}
export default PagePadding