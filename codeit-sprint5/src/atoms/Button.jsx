import React from 'react';

const Button = ({onClick = null, style, children}) => {

    return (
        <button onClick={() => onClick()} style={style}>{children}</button>
    );
};

export default Button;