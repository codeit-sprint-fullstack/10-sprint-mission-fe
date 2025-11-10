import React from 'react';
import styles from "./Footer.module.css";
import Nav from "../molecules/Nav";
import IconBox from "../molecules/IconBox";
import facebookIcon from "../assets/ic_facebook.svg";
import instagramIcon from "../assets/ic_instagram.svg";
import twitterIcon from "../assets/ic_twitter.svg";
import youtubeIcon from "../assets/ic_youtube.svg";

const year = new Date().getFullYear();

const footerMenu = [{
    value: "Privacy Policy",
    src: "/"
}, {
    value: "FAQ",
    src: "/"
}];

const iconData = [
    {
        src: facebookIcon,
        alt: "페이스북"
    },
    {
        src: twitterIcon,
        alt: "트위터"
    },
    {
        src: youtubeIcon,
        alt: "유튜브"
    },
    {
        src: instagramIcon,
        alt: "인스타그램"
    }
]

const Footer = () => {
    return (
        <div className={styles.footer}>
            <p className={styles.year}>@codeit - {year}</p>

            <Nav type={"footer"} navMenu={footerMenu} className={styles.nav}></Nav>

            <IconBox iconData={iconData}></IconBox>
        </div>
    );
};

export default Footer;