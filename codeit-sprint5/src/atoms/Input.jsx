import React, { memo } from 'react';

const Input = ({type, style, placeholder, onChange = null, ref = null}) => {
    return (
        <input type={type} className={style} placeholder={placeholder} {...(onChange ? { onChange } : {})} ref={ref}>

        </input>
    );
};

export default memo(Input);