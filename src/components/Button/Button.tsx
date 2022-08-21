import {Loader} from "../Loader/Loader";

const classNames = require('classnames');

export enum ButtonColor {
    primary = 'primary',
    secondary = 'secondary'
}

export type ButtonProps = React.PropsWithChildren<{
    /**
     * Если true, то внутри кнопки вместе с children отображается компонент Loader
     * Также кнопка должна переходить в состояние disabled
     */
    loading?: boolean;
    color?: ButtonColor;
}> & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({children, loading=false, color=ButtonColor.primary, ...props}:ButtonProps) => {
    return (<button {...props} className={classNames('button',props.disabled||loading?'button_disabled':null,`button_color-${color}`,props?.className)} disabled={props.disabled||loading}><Loader loading={loading}></Loader>{children}</button>);
};
