"use client";

import Image from "next/image";
import styles from "@/styles/Search.module.css";
import searchIcon from "@/public/images/search.svg";

export default function Search({ value, onChange, placeholder = "검색" }) {
    return (
        <div className={styles.search}>
            <Image
                className={styles.icon}
                src={searchIcon}
                alt="검색"
                width={15}
                height={15}
            />
            <input
                className={styles.input}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                aria-label="검색"
            />
        </div>
    );
}


