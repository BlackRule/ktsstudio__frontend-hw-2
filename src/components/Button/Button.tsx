import {Loader, LoaderSize} from "@components/Loader/Loader";
import styles from './Button.module.scss'

const classNames = require('classnames');

export enum ButtonSkin {
    primary = 'primary',
    secondary = 'secondary'
}

export type ButtonProps = React.PropsWithChildren<{
    /**
     * Если true, то внутри кнопки вместе с children отображается компонент Loader
     * Также кнопка должна переходить в состояние disabled
     */
    loading?: boolean;
    skin?: ButtonSkin;
}> & React.ButtonHTMLAttributes<HTMLButtonElement>;

//TODO исправить цвет и margin-right loader'а вместо gap
export const Button = ({children, loading=false, skin=ButtonSkin.primary, ...props}:ButtonProps) => {
    props.disabled ||= loading
    return (<button {...props}
     className={classNames(styles.Button,styles[`button-skin_${skin}`],props?.className)}
    disabled={props.disabled}
    ><Loader loading={loading} size={LoaderSize.s}/>{children}</button>);
};