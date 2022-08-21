const classNames=require("classnames")

export type InputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange'
    > & {
    value: string;
    onChange: (value: string) => void;
};
export const Input = ({value,onChange,...props}:InputProps) => {
    return (<input {...props} value={value} onChange={(e)=>onChange(e.target.value)} className={classNames(props.className,props.disabled?'input_disabled':null)} type="text"/>);
};