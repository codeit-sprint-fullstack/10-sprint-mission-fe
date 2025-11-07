import React from 'react';

const Label = ({style, children, onClick = () => {}, htmlFor = null}) => {
    return (
        <label style={style} onClick={() => onClick()} htmlFor={htmlFor}>{children}</label>
    );
};

export default Label;