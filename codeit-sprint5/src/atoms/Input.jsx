import React from 'react';

const Input = ({type, style, placeholder, onChange = null, ref = null}) => {
    return (
        <input type={type} style={style} placeholder={placeholder} onClick={() => onChange()} ref={ref}>

        </input>
    );
};

export default Input;