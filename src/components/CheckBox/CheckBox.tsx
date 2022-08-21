type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>,
    'onChange'> & {
    onChange: (value: boolean) => void;
};
export const CheckBox = ({onChange,...props}:CheckBoxProps) => {
    return (<input type="checkbox" {...props} onChange={(e)=>onChange(e.target.checked)}/>);
};