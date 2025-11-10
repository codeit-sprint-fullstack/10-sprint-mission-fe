import React from 'react';
import styles from "./IconBox.module.css";
import Image from "../atoms/Image";

const IconBox = ({ iconData = [] }) => {
    return (
        <ul className={styles.ulList}>
            { iconData.map((item, index) => (
                <li key={index} className={styles.liList}>
                    <Image src={item.src} alt={item.alt} style={styles.image} />
                </li>
            ))}
        </ul>
    );
};

export default IconBox;