import React, { memo } from 'react';

const Button = ({onClick = null, style, children}) => {

    return (
        <button {...(onClick ? { onClick } : {})} style={style}>{children}</button>
    );
};

export default memo(Button);