import {InputHTMLAttributes} from "react";
import styles from './Input.module.scss'

const classNames=require("classnames")


export type InputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange'
    > & {
    value: string;
    onChange: (value: string) => void;
};
export const Input = ({value,onChange,...props}:InputProps) => {
    return (<input {...props} value={value} onChange={(e)=>onChange(e.target.value)}
                   className={classNames(props.className,styles.Input)} type="text"/>);
};