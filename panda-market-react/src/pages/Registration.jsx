import "./Registration.css";
import useProductForm from "../hooks/useProductForm";
import { createProduct } from "../api/products";
import { useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate();

  const {
    values,
    errors,
    mouseOn,
    isValid,
    handleChange,
    handleMouseOut,
    handleTagKeyDown,
    eraseTag,
  } = useProductForm();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) return;

    try {
      const sendData = {
        name: values.name.trim(),
        description: values.description.trim(),
        price: Number(values.price),
        tags: values.tags,
      };

      const created = await createProduct(sendData);

      const id = created.id;

      navigate(`/items/${id}`); // 해당 주소로 이동하기
    } catch (error) {
      console.error(error.message);
    }
  };

  const nameError = mouseOn.name && errors.name;
  const descError = mouseOn.description && errors.description;
  const priceError = mouseOn.price && errors.price;
  const tagError = mouseOn.tagInput && errors.tagInput;

  return (
    <main className="registration-page">
      <div className="registration-container">
        <div className="registration-header">
          <h2 className="registration-title">상품 등록하기</h2>

          <button
            type="submit"
            form="registration-form"
            className={"registration-submit-btn" + (isValid ? " active" : "")}
            disabled={!isValid}
          >
            등록
          </button>
        </div>

        <form
          id="registration-form"
          className="registration-form"
          onSubmit={handleSubmit}
        >
          <div className={`form-group ${nameError ? "has-error" : ""}`}>
            <label>상품명</label>
            <input
              type="text"
              placeholder="상품명을 입력해주세요"
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleMouseOut("name")}
            />
            {nameError && <p className="error-message">{errors.name}</p>}
          </div>

          <div className={`form-group ${descError ? "has-error" : ""}`}>
            <label>상품 소개</label>
            <textarea
              placeholder="상품 소개를 입력해주세요"
              value={values.description}
              onChange={(e) => handleChange("description", e.target.value)}
              onBlur={() => handleMouseOut("description")}
            />
            {descError && <p className="error-message">{errors.description}</p>}
          </div>

          <div className={`form-group ${priceError ? "has-error" : ""}`}>
            <label>판매가격</label>
            <input
              type="number"
              placeholder="판매 가격을 입력해주세요"
              value={values.price}
              onChange={(e) => handleChange("price", e.target.value)}
              onBlur={() => handleMouseOut("price")}
            />
            {priceError && <p className="error-message">{errors.price}</p>}
          </div>

          <div className={`form-group ${tagError ? "has-error" : ""}`}>
            <label>태그</label>
            <input
              type="text"
              placeholder="태그를 입력해주세요"
              value={values.tagInput}
              onChange={(e) => handleChange("tagInput", e.target.value)}
              onBlur={() => handleMouseOut("tagInput")}
              onKeyDown={handleTagKeyDown}
            />
            {tagError && <p className="error-message">{errors.tagInput}</p>}

            <div className="tag-list">
              {values.tags.map((tag) => (
                <span key={tag} className="tag">
                  #{tag}
                  <button
                    className="tag-remove"
                    type="button"
                    onClick={() => eraseTag(tag)}
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Registration;
