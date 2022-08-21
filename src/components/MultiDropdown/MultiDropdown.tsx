import {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import './MultiDropdown.css'

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (options: Option[]) => string;
}


export const MultiDropdown = ({options, value, onChange, pluralizeOptions,disabled=false}: MultiDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  function includes(opts:Option[],opt:Option){
    return opts.some((o)=>opt.key===o.key)
  }
  return (<div className="MultiDropdown">
    <div className={"value"} onClick={(e) => {
      if(disabled) return
      setIsOpen((v)=>!v)
    }}>{pluralizeOptions(value)}</div>
    {isOpen && !disabled ? <div className="optionsParent">
      {options.map((option) =>
          <div key={option.key} className={classNames("option", {"selected": includes(value,option)})} onClick={(e) => {
            if(!includes(value,option)){
              onChange([...value,option])
            }
            else {
              onChange(value.filter((o)=>o.key!==option.key))
            }
          }}>{option.value}</div>
      )}
    </div> : null}
  </div>);
};