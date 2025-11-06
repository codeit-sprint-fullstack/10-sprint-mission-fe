import React from 'react';
import Option from "./Option";

const Select = ({id, style, array = [{
    value: '0',
    children: '제공된 데이터가 없습니다.'
}, {value: '1', children: '1'}], onChange = null}) => {
    return (
        <select id={id} style={style} onClick={(event) => onChange(event.target.value)}>
            {
                array.map((item) => {return <Option key={item.key} value={item.value}>{item.children}</Option>})
            }
        </select>
    );
};

export default Select;