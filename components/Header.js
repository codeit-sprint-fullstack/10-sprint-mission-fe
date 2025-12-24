"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/Header.module.css";
import Button from "./Button";

export default function Header() {
    const pathname = usePathname();

    return (
        <header>
            <nav className={styles.mainHeader}>
                <div className={styles.headerInner}>
                    <div className={styles.leftSection}>
                        <Link href="/">
                            <div className={styles.logoContainer}>
                                <Image
                                    src="/header.svg"
                                    alt="logo"
                                    width={40}
                                    height={41}
                                    className={styles.logoIcon}
                                />
                                <Image
                                    src="/logotext.svg"
                                    alt="logo"
                                    width={103}
                                    height={35}
                                />
                            </div>
                        </Link>
                        <div className={styles.navLinks}>
                            <Link
                                href="/board"
                                 className={`${styles.navLink} ${
                                    pathname.startsWith("/board")
                                        ? styles.active
                                        : ""
                                }`}
                            >
                                자유게시판
                            </Link>
                            <Link
                                href="/market"
                                className={`${styles.navLink} ${
                                    pathname === "/market" ? styles.active : ""
                                }`}
                            >
                                중고마켓
                            </Link>
                        </div>
                    </div>
                    <div className={styles.rightSection}>
                        <Button>로그인</Button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
