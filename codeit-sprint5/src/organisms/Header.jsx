import React from 'react';
import styles from "./Header.module.css";
import Logo from "../molecules/Logo";
import Nav from "../molecules/Nav";
import Button from "../atoms/Button";

const navItems = [
    {
        src: "/",
        value: "자유게시판"
    },
    {
        src: "/",
        value: "중고마켓"
    }
];

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoBox}>
                <Logo/>
                <Nav type={"header"} navMenu={navItems}></Nav>
            </div>

            <Button style={styles.loginButton}>로그인</Button>

        </header>
    );
};

export default Header;