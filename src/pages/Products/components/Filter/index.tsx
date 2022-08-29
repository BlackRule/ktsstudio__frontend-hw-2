import styles from './index.module.scss'
import {MultiDropdown, Option} from "@components/MultiDropdown/MultiDropdown";
import {useEffect, useState} from "react";
import PostService from "@api/ProductService";

type FilterProps= {
    onChange:(value: Option[]) => void,
    selectedOptions: Option[]
}

const Filter = ({selectedOptions,onChange}:FilterProps) => {
    useEffect(() => {
        //TODO handle Error and Loading!!
        PostService.getCategoriesResponse().then((response) => {
                return setOptions(response.data ? response.data.map((v): Option => ({key: v, value: v})) : [])
            }
        )

    },[])
    const [options, setOptions] = useState<Option[]>([])

    return (
        <MultiDropdown className={styles.Filter} generateValueElement={() => {
            return (props) => <div {...props}>
                <div className={styles.icon}/>
                <span>Filter</span></div>
        }} onChange={(v) => {
            onChange(v)
        }} options={options} value={selectedOptions}
        optionsProps={{className:styles.options}} valueProps={{className:styles.value}}/>
    )
}
export default Filter