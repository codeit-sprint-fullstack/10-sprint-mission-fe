import React, { memo } from 'react';

const Option = ({key, value, children, style}) => {
    return (
        <option key={key} value={value} className={style}>
            {children}
        </option>
    );
};

export default memo(Option);