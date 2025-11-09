import React from 'react';
import Option from "./Option";

const Select = ({id, style, optionStyle, array = [{
    value: '0',
    children: '제공된 데이터가 없습니다.'
}, {value: '1', children: '1'}], onChange = null, value}) => {
    return (
        <select 
            id={id} 
            className={style} 
            onChange={(event) => onChange && onChange(event.target.value)}
            value={value}
        >
            {
                array.map((item) => {
                    return (
                        <Option 
                            key={item.key} 
                            value={item.value} 
                            className={optionStyle}
                        >
                            {item.children}
                        </Option>
                    );
                })
            }
        </select>
    );
};

export default Select;