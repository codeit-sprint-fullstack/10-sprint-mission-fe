import React from 'react';
import styles from "./Nav.module.css";

const Nav = ({ navMenu = [] }) => {

    return (
        <ul className={styles.listStyle}>
            { navMenu.map((item) => {return <li className={styles.itemStyle}>{item}</li>})}
        </ul>
    );
};

export default Nav;