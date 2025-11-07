import React, {Fragment} from 'react';
import pandaIcon from "../assets/panda_icon.svg";
import Image from "../atoms/Image";
import Label from "../atoms/Label";
import styles from "./Logo.module.css";

const Logo = () => {


    return (
        <div className={styles.layoutStyle}>
            <Image src={pandaIcon} alt={"판다 마켓 아이콘"} style={styles.logoStyle}></Image> <Label style={styles.labelStyle}>판다마켓</Label>
        </div>
    );
};

export default Logo;