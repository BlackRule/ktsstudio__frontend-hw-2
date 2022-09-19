import styles from './index.module.scss'
import { MultiDropdown, MultiDropdownProps, Option } from '@components/MultiDropdown/MultiDropdown'
import {useState } from 'react'
import { Button } from '@components/Button/Button'
import { State } from '@utils/state'
import { useLocalStore } from '@utils/useLocalStore'
import CategoriesStore from '@store/CategoriesStore'
import { observer } from 'mobx-react-lite'

type FilterProps = Omit<MultiDropdownProps,'value'|'options'|'generateValueElement'>
  &{selectedOptions:Option[]}
const Filter = ({ selectedOptions, onChange, ...props }: FilterProps) => {
  const categoriesStore = useLocalStore(() => new CategoriesStore())
  const [clickedAtLeastOnce, setClickedAtLeastOnce] = useState(false)
  const isLoading=categoriesStore.loading === State.loading
  const gve=() => {
    //fixme any
    return (props:any) => (
      <Button loading={isLoading} {...props} skin={'secondary'} className={styles.value}>
        <div className={styles.icon} />
        <span className={styles.text}>Filter</span>
      </Button>
    )
  }
  return (
    <MultiDropdown
      generateValueElement={gve}
      onChange={(v) => {
        onChange(v)
      }}
      options={categoriesStore.list}
      value={selectedOptions}
      optionsProps={{ className: styles.options }}
      valueProps={{
        onClick: () => {
          if (!clickedAtLeastOnce) {
            //fixme
            categoriesStore.getCategoriesList()
            setClickedAtLeastOnce(true)
          }
        },
      }}
      {...props}/>
  )
}
export default observer(Filter)
