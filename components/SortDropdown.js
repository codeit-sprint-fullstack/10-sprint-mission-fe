"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "@/styles/Dropdown.module.css";

const options = [
    { value: "recent", label: "최신순" },
    { value: "oldest", label: "오래된순" },
];

export default function SortDropdown({ value = "recent", onChange }) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef(null);

    const selected = useMemo(() => {
        return options.find((opt) => opt.value === value) ?? options[0];
    }, [value]);

    useEffect(() => {
        function handlePointerDown(e) {
            if (!rootRef.current) return;
            if (!rootRef.current.contains(e.target)) setOpen(false);
        }

        document.addEventListener("mousedown", handlePointerDown);
        return () => document.removeEventListener("mousedown", handlePointerDown);
    }, []);

    return (
        <div className={styles.root} ref={rootRef}>
            <button
                type="button"
                className={styles.trigger}
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                {selected.label}
            </button>

            {open && (
                <div className={styles.menu} role="listbox" aria-label="정렬">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            role="option"
                            aria-selected={opt.value === value}
                            className={`${styles.option} ${
                                opt.value === value ? styles.optionActive : ""
                            }`}
                            onClick={() => {
                                onChange?.(opt.value);
                                setOpen(false);
                            }}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}


