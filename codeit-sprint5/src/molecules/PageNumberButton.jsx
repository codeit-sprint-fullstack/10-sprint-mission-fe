import React from 'react';
import styles from "./PageNumberButton.module.css";
import Button from "../atoms/Button";

const PageNumberButton = ({onClick, children, className}) => {
    const combinedClassName = className ? `${styles.numberButton} ${className}` : styles.numberButton;
    return (
        <Button onClick={onClick} style={combinedClassName}>
            {children}
        </Button>
    );
};

export default PageNumberButton;