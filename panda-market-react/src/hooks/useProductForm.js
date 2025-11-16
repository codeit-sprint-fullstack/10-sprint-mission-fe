import { useState } from "react";

function validateField(field, value) {
  switch (field) {
    case "name": {
      if (!value) return "상품명을 입력해주세요";
      if (value.length > 10) return "10자 이내로 입력해주세요";
      return "";
    }

    case "description": {
      if (!value) return "상품 소개를 입력해주세요";
      if (value.length < 10) return "10자 이상 입력해주세요";
      if (value.length > 100) return "100자 이내로 입력해주세요";
      return "";
    }

    case "price": {
      if (!value) return "판매 가격을 입력해주세요";
      if (isNaN(Number(value))) return "숫자로 입력해주세요";
      return "";
    }

    case "tagInput": {
      if (!value) return "";
      if (value.length > 5) return "5글자 이내로 입력해주세요";
      return "";
    }

    default:
      return "";
  }
}

function useProductForm() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    tagInput: "",
    tags: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    tagInput: "",
  });

  const [mouseOn, setMouseOn] = useState({
    name: false,
    description: false,
    price: false,
    tagInput: false,
  });

  const handleChange = (field, value) => {
    setValues((prev) => {
      const next = { ...prev, [field]: value };
      const valToValidate = field === "price" ? value : value.trim();
      const errorMessage = validateField(field, valToValidate);
      setErrors((prevError) => ({ ...prevError, [field]: errorMessage }));
      return next;
    });
  };

  const handleMouseOut = (field) => {
    setMouseOn((prev) => ({ ...prev, [field]: true }));
    // 유효성 검사를 위해 현재 값의 공백을 제거한 후 사용해야한다고 함 (price 제외)
    const valToValidate =
      field === "price" ? values[field] : values[field].trim();
    setErrors((prevError) => ({
      ...prevError,
      [field]: validateField(field, valToValidate),
    }));
  };

  const handleTagKeyDown = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const trimmed = values.tagInput.trim();
    const errorMessage = validateField("tagInput", trimmed);

    if (errorMessage) {
      setErrors((prev) => ({ ...prev, tagInput: errorMessage }));
      setMouseOn((prev) => ({ ...prev, tagInput: true }));
      return;
    }

    if (!trimmed) return;

    setValues((prev) => ({
      ...prev,
      tags: [...prev.tags, trimmed],
      tagInput: "",
    }));
    setErrors((prev) => ({ ...prev, tagInput: "" }));
    setMouseOn((prev) => ({ ...prev, tagInput: false }));
  };

  const eraseTag = (target) => {
    setValues((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== target),
    }));
  };

  const isValid =
    values.name.trim() !== "" &&
    values.description.trim() !== "" &&
    values.price.trim() !== "" &&
    !errors.name &&
    !errors.description &&
    !errors.price &&
    !errors.tagInput;

  return {
    values,
    errors,
    mouseOn,
    isValid,
    handleChange,
    handleMouseOut,
    handleTagKeyDown,
    eraseTag,
  };
}

export default useProductForm;
