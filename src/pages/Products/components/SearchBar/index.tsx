import styles from './index.module.scss'
import {Input} from "@components/Input/Input";
import {Button} from "@components/Button/Button";
import {HTMLAttributes} from "react";
import useWindowSize from "@hooks/useWindowSize";

const SearchBar = (props: HTMLAttributes<HTMLDivElement>)=>{
    const {width,height:_}=useWindowSize()
    return (
        <div {...props} className={styles['Search-bar']}>
            <div className={styles.icon}/>
            <Input value='' onChange={()=>{}} placeholder={'Search property'} style={{flexGrow:1}}/>
            <Button>{width>1023?'Find Now':'Search'}</Button>
        </div>
    )
}
export default SearchBar