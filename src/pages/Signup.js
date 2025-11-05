import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/signup.css'
import '../styles/modal.css'

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

function Modal({ open, message, onClose }) {
  if (!open) return null;
  return (
    <div
      id="errorModal"
      className="modal"
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-backdrop" data-close="true" onClick={onClose}></div>
      <div className="modal-panel" role="document">
        <p id="errorModalMessage" className="modal-message">
        {message}
        </p>
        <button
          id="errorModalCloseBtn"
          className="modal-close"
          onClick={onClose}
          >
            확인
          </button>
      </div>
    </div>
  );
}

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordconfirm: "",
  });

  const [modlaOpen, setModalOPen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const clearError = (key) =>
    setErrors((prev) => ({ ...prev, [key]: "" }));
  const setError = (key, msg) =>
    setErrors((prev) => ({ ...prev, [key]: msg }));

  const validateEmail = () => {
    const v = email.trim();
    if (v === "") {
      setError("email", "이메일을 입력해주세요.");
      return false;
    }
    const simpleEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!simpleEmailPattern.test(v)) {
      setError("email", "잘못된 이메일 형식입니다.");
      return false;
    }
    clearError("email");
    return true;
  }
}