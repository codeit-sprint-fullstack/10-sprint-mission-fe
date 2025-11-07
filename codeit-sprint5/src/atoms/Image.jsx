import React from 'react';

const Image = ({src, alt, style, onClick= () => {}}) => {
    return (
        <img src={src} alt={alt} style={style} onClick={() => onClick()}>

        </img>
    );
};

export default Image;