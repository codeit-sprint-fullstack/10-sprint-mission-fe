import React, { memo } from 'react';

const Image = ({src, alt, style, onClick = null, onError = null}) => {
    return (
        <img
            src={src}
            alt={alt}
            className={style}
            {...(onClick ? { onClick } : {})}
            {...(onError ? { onError } : {})}
        />
    );
};

export default memo(Image);