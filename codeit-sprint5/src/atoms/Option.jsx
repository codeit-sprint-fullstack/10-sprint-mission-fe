import React from 'react';

const Option = ({key, value, children, style}) => {
    return (
        <option key={key} value={value} style={style}>
            {children}
        </option>
    );
};

export default Option;