import logo from './img/logo.svg'
import styles from './Header.module.scss'
import {Link} from "react-router-dom";

export type HeaderProps = React.PropsWithChildren<{

}>;
export const Header = ({}:HeaderProps) => {
    return (<header className={styles.Header}>
        <Link to={"/"}>
            <div className={styles.logo}><img src={logo} alt=""/>
                <span>Lalasia</span></div>
        </Link>
        <nav className={styles.nav}>
            <Link to={'/'} className={styles.current}>Product</Link>
            <Link to={'#'}>Services</Link>
            <Link to={'#'}>Article</Link>
            <Link to={'#'}>About Us</Link>
        </nav>
        <div className={styles.right}>
            <Link to={'#'} className={styles.bag}/>
            <Link to={'#'} className={styles.user}/>
        </div>
    </header>)
};