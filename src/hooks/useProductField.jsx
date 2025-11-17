import { useState } from "react";

function useProductField(initialValue, validateFn) {
    const [value, setValue] = useState(initialValue);
    const [touched, setTouched] = useState(false);

    const error = validateFn(value);
    const isValid = !error;
    const showError = touched && !!error;

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const onBlur = () => {
        setTouched(true);
    };

    return {
        value,
        setValue,
        onChange,
        onBlur,
        error,
        isValid,
        showError,
        touched,
        setTouched,
    };
}

export default useProductField;
