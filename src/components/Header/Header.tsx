import logo from './img/logo.svg'
import styles from './Header.module.scss'
import {Link} from "react-router-dom";
import PagePadding from "components/PagePadding/PagePadding";

export const Header = () => {
    return (<header className={styles.Header}>
        <PagePadding className={styles.Header__inner}>
            <input type="checkbox" id={styles['menu__is-open']}/>
            <div className={styles['logo-and-burger']}>
                <Link to={"/"} className={styles.logo}>
                    <img src={logo} alt=""/>
                    <span>Lalasia</span>
                </Link>
                <label htmlFor={styles['menu__is-open']} className={styles.burger}><div/></label>
            </div>
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
        </PagePadding>
    </header>)
};