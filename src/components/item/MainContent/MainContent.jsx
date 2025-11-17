import { useState } from "react";
import "./MainContent.css";
import useProductField from "../../../hooks/useProductField";
import { createProduct } from "../../../api/api";
import { useNavigate } from "react-router-dom";

function MainContent() {
    const navigate = useNavigate();

    const nameField = useProductField("", (value) => {
        const trimmed = value.trim();
        if (!trimmed) return "10자 이내로 입력해주세요";
        if (trimmed.length < 1) return "상품명은 최소 1자 이상이어야 합니다.";
        if (trimmed.length > 10) return "10자 이내로 입력해주세요";
        return "";
    });
    const introField = useProductField("", (value) => {
        const trimmed = value.trim();
        if (!trimmed) return "10자 이상 입력해주세요";
        if (trimmed.length < 10) return "10자 이상 입력해주세요";
        if (trimmed.length > 100) return "상품 소개는 100자 이내여야 합니다.";
        return "";
    });

    const priceField = useProductField("", (value) => {
        const trimmed = value.trim();
        if (!trimmed) return "판매 가격을 입력해주세요.";
        if (!/^\d+$/.test(trimmed)) return "숫자로 입력해주세요";
        return "";
    });

    const tagField = useProductField("", (value) => {
        const trimmed = value.trim();
        if (!trimmed) return "";
        if (trimmed.length > 5) return "5글자 이내로 입력해주세요";
        return "";
    });

    const [tags, setTags] = useState([]);

    const handleTagKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const trimmed = tagField.value.trim();

            if (!trimmed) return;

            const error = tagField.error;
            if (error) {
                tagField.setTouched(true);
                return;
            }

            if (tags.includes(trimmed)) {
                tagField.setValue("");
                return;
            }

            setTags((prev) => [...prev, trimmed]);
            tagField.setValue("");
            tagField.setTouched(false);
        }
    };

    const handleRemoveTag = (tag) => {
        setTags((prev) => prev.filter((t) => t !== tag));
    };

    const isFormValid =
        nameField.isValid &&
        introField.isValid &&
        priceField.isValid &&
        tags.length > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        nameField.setTouched(true);
        introField.setTouched(true);
        priceField.setTouched(true);
        tagField.setTouched(true);

        if (!isFormValid) {
            console.log("폼 유효성 실패");
            return;
        }

        const productData = {
            name: nameField.value.trim(),
            description: introField.value.trim(),
            price: Number(priceField.value.trim()),
            tags,
        };

        try {
            const created = await createProduct(productData);

            console.log("등록 성공:", created);

            navigate(`/items/${created._id}`);
        } catch (err) {
            console.error("상품 등록 에러:", err);
            alert("상품 등록 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="MainContainer">
            <div className="ContentBox">
                <form className="ItemRegister-form" onSubmit={handleSubmit}>
                    <div className="RegisterIntro">
                        <h1>상품 등록하기</h1>
                        <button
                            className="Register-btn"
                            type="submit"
                            disabled={!isFormValid}
                        >
                            등록
                        </button>
                    </div>

                    <h2>상품명</h2>
                    <input
                        className={`input-name ${
                            nameField.showError ? "input-error" : ""
                        }`}
                        type="text"
                        placeholder="상품명을 입력해주세요"
                        value={nameField.value}
                        onChange={nameField.onChange}
                        onBlur={nameField.onBlur}
                    />
                    {nameField.showError && (
                        <p className="error-text">{nameField.error}</p>
                    )}

                    <h2>상품 소개</h2>
                    <textarea
                        className={`input-Intro ${
                            introField.showError ? "input-error" : ""
                        }`}
                        placeholder="상품 소개를 입력해주세요"
                        value={introField.value}
                        onChange={introField.onChange}
                        onBlur={introField.onBlur}
                    />
                    {introField.showError && (
                        <p className="error-text">{introField.error}</p>
                    )}

                    <h2>판매 가격</h2>
                    <input
                        className={`input-price ${
                            priceField.showError ? "input-error" : ""
                        }`}
                        type="text"
                        placeholder="판매 가격을 입력해주세요"
                        value={priceField.value}
                        onChange={priceField.onChange}
                        onBlur={priceField.onBlur}
                    />
                    {priceField.showError && (
                        <p className="error-text">{priceField.error}</p>
                    )}

                    <h2>태그</h2>
                    <input
                        className={`input-tag ${
                            tagField.showError ||
                            (!tags.length && tagField.touched)
                                ? "input-error"
                                : ""
                        }`}
                        type="text"
                        placeholder="태그를 입력 후 엔터를 눌러주세요 (5글자 이내)"
                        value={tagField.value}
                        onChange={tagField.onChange}
                        onBlur={tagField.onBlur}
                        onKeyDown={handleTagKeyDown}
                    />
                    <div className="tag-chip-container">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="tag-chip"
                                onClick={() => handleRemoveTag(tag)}
                            >
                                #{tag}
                                <button
                                    type="button"
                                    className="tag-chip-remove"
                                    onClick={() => handleRemoveTag(tag)}
                                ></button>
                            </span>
                        ))}
                    </div>
                    {tagField.showError && (
                        <p className="error-text">{tagField.error}</p>
                    )}
                    {!tags.length && tagField.touched && !tagField.error && (
                        <p className="footer-error-text">
                            태그를 최소 1개 이상 등록해주세요.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default MainContent;
