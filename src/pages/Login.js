import React from "react";
import "/src/styles/login.css"
import ErrorModal from '../components/ErrorModal'

import panda from "../assets/img/loginpanda.svg";
import googleIcon from "../assets/img/logingoogle.svg";
import kakaoIcon from "../assets/img/loginkakao.svg";

const USER_DATA = [
  { email: "codeit1@codeit.com", password: "codeit101!" },
  { email: "codeit2@codeit.com", password: "codeit202!" },
  { email: "codeit3@codeit.com", password: "codeit303!" },
  { email: "codeit4@codeit.com", password: "codeit404!" },
  { email: "codeit5@codeit.com", password: "codeit505!" },
  { email: "codeit6@codeit.com", password: "codeit606!" },
];

function isValidEamil(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
} 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({ email: "", password: ""});

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const openModal = (msg) => {
    setModalMsg(msg);
    setModalOpen(true);
  };

  const closeModal = () => setModalOepn(false);

  const validateEmail = () => {
    const value = email.trim();
    if (value === "") {
      setErrors((e) => ({...e, email: "이메일을 입력해주세요." }));
      return false;
    }
    if (!isValidEamil(value)) {
      setErrors((e) => ({...e, email: "잘못된 이메일 형식입니다. "}));
      return false;
    }
    setErrors((e) => ({ ...e, email: "" }));
    return true;
  };

  
}