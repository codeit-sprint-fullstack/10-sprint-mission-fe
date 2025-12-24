import styles from "@/styles/Button.module.css";

export default function Button({
    children,
    className = "",
    onClick,
    disabled = false,
    type = "button",
}) {
    const buttonClassName = className 
        ? `${styles.button} ${className}` 
        : styles.button;
    
    return (
        <button
            className={buttonClassName}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
}