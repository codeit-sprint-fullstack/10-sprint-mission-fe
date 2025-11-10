import React, { memo } from 'react';

const Button = ({onClick = null, style, children}) => {

    return (
        <button {...(onClick ? { onClick } : {})} className={style}>{children}</button>
    );
};

export default memo(Button);