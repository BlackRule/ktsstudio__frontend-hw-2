import {
    DetailedHTMLProps,
    HTMLAttributes,
    JSXElementConstructor,
    useState
} from "react";
import classNames from "classnames";
import styles from './MultiDropdown.module.scss'

export type Option = {
    key: string;
    value: string;
};

export type MultiDropdownProps = Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,'onChange'>&{
    options: Option[];
    value: Option[];
    onChange: (value: Option[]) => void;
    disabled?: boolean;
    /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
    generateValueElement: (options: Option[]) => JSXElementConstructor<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
    valueProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    optionsProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}


export const MultiDropdown = ({
                                  options,
                                  value,
                                  onChange,
                                  generateValueElement,
                                  disabled = false,
                                  valueProps,
                                  optionsProps,...props
                              }: MultiDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false)

    function includes(opts: Option[], opt: Option) {
        return opts.some((o) => opt.key === o.key)
    }

    const Value = generateValueElement(value)
    return (<div {...props} className={styles.MultiDropdown}>
        <Value {...valueProps} className={classNames(valueProps?.className, styles.value)} onClick={(e) => {
            if (disabled) return
            setIsOpen((v) => !v)
            if (valueProps?.onClick) valueProps.onClick(e)
        }}/>
        {isOpen && !disabled ? <div {...optionsProps} className={classNames(styles.optionsParent,optionsProps?.className)}>
            {options.map((option) =>
                <div key={option.key}
                     className={classNames(styles.option, {[styles.selected]: includes(value, option)})}
                     onClick={(e) => {
                         if (!includes(value, option)) {
                             onChange([...value, option])
                         } else {
                             onChange(value.filter((o) => o.key !== option.key))
                         }
                     }}>{option.value}</div>
            )}
        </div> : null}
    </div>);
};