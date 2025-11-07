import React from 'react';

const Button = ({onClick = () => {}, style, children}) => {

    return (
        <button onClick={() => onClick()} style={style}>{children}</button>
    );
};

export default Button;