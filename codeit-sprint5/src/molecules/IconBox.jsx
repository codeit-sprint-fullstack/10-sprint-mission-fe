import React from 'react';
import styles from "./IconBox.module.css";

const IconBox = ({ iconData = [] }) => {

    const listStyle = {};

    return (
        <ul className={styles.ulList}>
            { iconData.map((item) => {return <li className={styles.liList}><Image src={item.src} alt={item.alt} style={item.style}></Image></li>})}
        </ul>
    );
};

export default IconBox;