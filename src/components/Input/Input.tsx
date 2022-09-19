import { InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'
import classNames from 'classnames'

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  onChange: (value: string) => void;
  value: string;
};
export const Input = ({ value, onChange, ...props }: InputProps) => {
  return (
    <input
      {...props}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={classNames(props.className, styles.Input)}
      type="text"
    />
  )
}
