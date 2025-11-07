import React, { memo } from 'react';

const Image = ({src, alt, style, onClick = null}) => {
    return (
        <img src={src} alt={alt} className={style} {...(onClick ? { onClick } : {})}>

        </img>
    );
};

export default memo(Image);