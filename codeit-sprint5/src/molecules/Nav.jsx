import React from 'react';
import styles from "./Nav.module.css";
import {Link} from "react-router";

const cssStyle = {
    footer: {
        list: styles.footerListStyle,
        item: styles.footerItemStyle,
        link: styles.footerLinkStyle
    },
    header: {
        list: styles.headerListStyle,
        item: styles.headerItemStyle,
        link: styles.headerLinkStyle
    }
}

const Nav = ({ type, navMenu = [] }) => {

    return (
        <ul className={cssStyle[type].list}>
            { navMenu.map((item) => {return <li className={cssStyle[type].item}><Link to={item.src} className={cssStyle[type].link}>{item.value}</Link></li>})}
        </ul>
    );
};

export default Nav;