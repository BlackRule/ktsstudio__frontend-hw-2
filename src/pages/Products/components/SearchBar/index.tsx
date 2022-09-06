import styles from './index.module.scss'
import {Input} from "@components/Input/Input";
import {Button} from "@components/Button/Button";
import {ComponentProps, HTMLAttributes, useState} from "react";
import useWindowSize from "@hooks/useWindowSize";
import classNames from "classnames";
import {Option} from "@components/MultiDropdown/MultiDropdown";



const SearchBar = ({handleSearch,...props}: HTMLAttributes<HTMLDivElement>&{handleSearch:(v:string)=>void})=>{
    const {width,height:_}=useWindowSize()
    const [value,setValue]=useState("")
    return (
        <div {...props} className={classNames(styles['Search-bar'],props.className)}>
            <div className={styles.icon}/>
            <Input value={value} onChange={(v)=>setValue(v)} placeholder={'Search property'} style={{flexGrow:1}}/>
            <Button onClick={()=>handleSearch(value)}>{width>1023?'Find Now':'Search'}</Button>
        </div>
    )
}
export default SearchBar