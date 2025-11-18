import React from "react";
import logo from "../../assets/img/logo.svg";
import "../../styles/common.css";
import "../../styles/style.css";
import styles from "./Nav.module.css";
import "../../styles/queries/queries.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <header>
      <section className={styles.sectionNav}>
        <nav className={styles.containerNav}>
          <Link to="/" className={styles.logoWrap}>
            <img className={styles.logo} src={logo} alt="panda market logo" />
            <div>판다마켓</div>
          </Link>
          <Link className={`${styles.navBtn} ${styles.loginBtn}`} to="/login">
            로그인
          </Link>
        </nav>
      </section>
    </header>
  );
};

export default Nav;
