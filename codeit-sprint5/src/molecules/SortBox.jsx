import React from 'react';
import Select from "../atoms/Select";
import styles from "./SortBox.module.css";

const SortBox = ({onChange, data}) => {
    return (
        <Select id={"sort"} style={styles.selectBox} optionStyle={styles.options} onChange={onChange} array={data}>
        </Select>
    );
};

export default SortBox;