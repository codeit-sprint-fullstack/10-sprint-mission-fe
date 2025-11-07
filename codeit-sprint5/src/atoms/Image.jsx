import React, { memo } from 'react';

const Image = ({src, alt, style}) => {
    return (
        <img src={src} alt={alt} style={style}>

        </img>
    );
};

export default memo(Image);