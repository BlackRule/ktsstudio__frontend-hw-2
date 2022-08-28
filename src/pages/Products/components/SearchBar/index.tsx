import styles from './index.module.scss'
import {Input} from "~components/Input/Input";
import {Button} from "~components/Button/Button";
import {HTMLAttributes} from "react";

const SearchBar = (props: HTMLAttributes<HTMLDivElement>)=>{
    return (
        <div {...props} className={styles['Search-bar']}>
            <div className={styles.icon}/>
            <Input value='' onChange={()=>{}} placeholder={'Search property'} style={{flexGrow:1}}/>
            <Button>Find Now</Button>
        </div>
    )
}
export default SearchBar