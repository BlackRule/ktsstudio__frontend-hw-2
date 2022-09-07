import styles from './index.module.scss'
import {MultiDropdown, Option} from "@components/MultiDropdown/MultiDropdown";
import {ComponentProps, useState} from "react";
import {Button} from "@components/Button/Button";
import {State} from "@utils/state";
import {useLocalStore} from "@utils/useLocalStore";
import CategoriesStore from "@store/CategoriesStore";
import {observer} from "mobx-react-lite";

type FilterProps= Omit<ComponentProps<typeof Button>,'onChange'>&{
    onChange:(value: Option[]) => void,
    selectedOptions: Option[]
}

const Filter = ({selectedOptions,onChange,...props}:FilterProps) => {
    const categoriesStore = useLocalStore(() => new CategoriesStore());
    const [clickedAtLeastOnce,setClickedAtLeastOnce]=useState(false)
    return (
        <MultiDropdown {...props} generateValueElement={() => {
            return (props) => <div {...props}>
                <div className={styles.icon}/>
                <span>Filter</span></div>
        }} onChange={(v) => {
            onChange(v)
        }} options={categoriesStore.list} loading={categoriesStore.loading===State.loading} value={selectedOptions}
        optionsProps={{className:styles.options}} valueProps={{className:styles.value,onClick:()=>{
            if(!clickedAtLeastOnce){ //fixme
                categoriesStore.getCategoriesList()
                setClickedAtLeastOnce(true)
            }
            }}}
        />
    )
}
export default observer(Filter)