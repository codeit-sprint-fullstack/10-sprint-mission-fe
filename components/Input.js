 "use client";

import { useEffect, useRef } from "react";
import styles from "@/styles/Input.module.css";

export default function Input({
    id,
    label,
    required = false,
    placeholder,
    height,
    multiline = false,
    value,
    onChange,
    className = "",
    inputClassName = "",
    ...rest
}) {
    const editableRef = useRef(null);

    useEffect(() => {
        if (!multiline) return;
        if (!editableRef.current) return;
        const next = value ?? "";
        if (editableRef.current.textContent !== next) {
            editableRef.current.textContent = next;
        }
    }, [multiline, value]);

    return (
        <div className={`${styles.field} ${className}`}>
            {label && (
                <label className={styles.label} htmlFor={id}>
                    {required && <span className={styles.required}>*</span>}
                    {label}
                </label>
            )}
            {multiline ? (
                <div
                    id={id}
                    role="textbox"
                    aria-multiline="true"
                    className={`${styles.editable} ${inputClassName}`}
                    data-placeholder={placeholder}
                    style={height ? { minHeight: height } : undefined}
                    contentEditable
                    suppressContentEditableWarning
                    ref={editableRef}
                    onInput={(e) => onChange?.(e.currentTarget.textContent ?? "")}
                    {...rest}
                />
            ) : (
                <input
                    id={id}
                    className={`${styles.input} ${inputClassName}`}
                    placeholder={placeholder}
                    style={height ? { height } : undefined}
                    value={value ?? ""}
                    onChange={(e) => onChange?.(e.target.value)}
                    {...rest}
                />
            )}
        </div>
    );
}


