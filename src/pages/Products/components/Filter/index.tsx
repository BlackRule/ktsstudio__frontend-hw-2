import styles from './index.module.scss'
import {MultiDropdown, Option} from "@components/MultiDropdown/MultiDropdown";
import {ComponentProps, useEffect, useState} from "react";
import PostService from "@api/ProductService";
import {Button} from "@components/Button/Button";

type FilterProps= Omit<ComponentProps<typeof Button>,'onChange'>&{
    onChange:(value: Option[]) => void,
    selectedOptions: Option[]
}

const Filter = ({selectedOptions,onChange,...props}:FilterProps) => {
    /*TODO useEffect(() => {
        //TODO should fetch only when is opened first time, not when mounted...
        //TODO handle Error
        PostService.getCategoriesResponse().then((response) => {
                return setOptions(response.data ? response.data.map((v): Option => ({key: v, value: v})) : [])
            }
        )

    },[])*/
    const [options, setOptions] = useState<Option[]>()

    return (
        <MultiDropdown {...props} generateValueElement={() => {
            return (props) => <div {...props}>
                <div className={styles.icon}/>
                <span>Filter</span></div>
        }} onChange={(v) => {
            onChange(v)
        }} options={options?options:[]} loading={!options} value={selectedOptions}
        optionsProps={{className:styles.options}} valueProps={{className:styles.value}}/>
    )
}
export default Filter