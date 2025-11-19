import { Link, NavLink } from "react-router-dom";
import imglogoSrc from "../../../assets/img/imgLogo.svg";
import stringlogoSrc from "../../../assets/img/stringLogo.svg";
import "./MainHeader.css";

function MainHeader() {
    return (
        <header>
            <div className="container">
                <div className="top-bar">
                    <div className="logoplus">
                        <Link to="/">
                            <img
                                id="smallLogo"
                                src={imglogoSrc}
                                alt="로고 아이콘"
                            />
                        </Link>
                        <Link to="/">
                            <img
                                id="wordlogo"
                                src={stringlogoSrc}
                                alt="로고 텍스트"
                            />
                        </Link>

                        <nav aria-label="주요 메뉴">
                            <ul className="Header-nav">
                                <li>
                                    <NavLink
                                        to="/board"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "nav-link active"
                                                : "nav-link"
                                        }
                                    >
                                        자유게시판
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/items"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "nav-link active"
                                                : "nav-link"
                                        }
                                    >
                                        중고마켓
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <form className="login-form" action="">
                        <button type="submit" className="login-btn">
                            로그인
                        </button>
                    </form>
                </div>
            </div>
        </header>
    );
}

export default MainHeader;
