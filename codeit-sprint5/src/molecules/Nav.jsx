import React from 'react';
import styles from "./Nav.module.css";
import {NavLink} from "react-router";

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
            { navMenu.map((item) => {
                return (
                    <li className={cssStyle[type].item}>
                        <NavLink
                            to={item.src}
                            className={({ isActive }) =>
                                `${cssStyle[type].link} ${isActive ? styles.activeLink : ''}`
                            }
                        >
                            {item.value}
                        </NavLink>
                    </li>
                )
            })}
        </ul>
    );
};

export default Nav;