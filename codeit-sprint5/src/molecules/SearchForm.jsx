import React from 'react';
import styles from "./SearchForm.module.css";
import Image from "../atoms/Image";
import searchIcon from "../assets/ic_search.svg";
import Input from "../atoms/Input";

const SearchForm = ({onClick, onChange, onKeyPress, placeholder = "검색할 상품을 입력해주세요"}) => {
    return (
        <div className={styles.layout}>
            <Image src={searchIcon} alt={"돋보기 아이콘"} style={styles.searchIcon} onClick = {onClick}></Image>
            <Input type={"text"} style={styles.searchBar} placeholder={placeholder} onChange={onChange} onKeyPress={onKeyPress}></Input>
        </div>
    );
};

export default SearchForm;