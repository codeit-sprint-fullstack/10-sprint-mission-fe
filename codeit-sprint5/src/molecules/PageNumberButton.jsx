import React from 'react';
import styles from "./PageNumberButton.module.css";
import Button from "../atoms/Button";

const PageNumberButton = ({onClick, children}) => {
    return (
        <Button onClick={onClick} style={styles.numberButton}>
            {children}
        </Button>
    );
};

export default PageNumberButton;