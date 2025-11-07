import React, { memo } from 'react';

const Label = ({style, children, onClick = null, htmlFor = null}) => {
    return (
        <label className={style} {...(onClick ? { onClick } : {})} htmlFor={htmlFor}>{children}</label>
    );
};

export default memo(Label);