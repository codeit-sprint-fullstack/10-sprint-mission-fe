import React from 'react';
import Select from "../atoms/Select";
import styles from "./SortBox.module.css";

const SortBox = ({onChange, data, value}) => {
    return (
        <Select 
            id="sort" 
            style={styles.selectBox} 
            optionStyle={styles.options} 
            onChange={onChange} 
            array={data}
            value={value}
        />
    );
};

export default SortBox;