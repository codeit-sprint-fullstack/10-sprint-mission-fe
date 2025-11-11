import imglogoSrc from "../img/imgLogo.svg";
import stringlogoSrc from "../img/stringLogo.svg";
import "./MainHeader.css";

function MainHeader() {
    return (
        <header>
            <div className="container">
                <div className="top-bar">
                    <div className="logoplus">
                        <a href="/">
                            <img
                                id="smallLogo"
                                src={imglogoSrc}
                                alt="로고 아이콘"
                            />
                        </a>
                        <a href="/">
                            <img
                                id="wordlogo"
                                src={stringlogoSrc}
                                alt="로고 텍스트"
                            />
                        </a>
                        <nav aria-label="주요 메뉴">
                            <ul className="Header-nav">
                                <li>
                                    <a href="">자유게시판</a>
                                </li>
                                <li>
                                    <a href="">중고마켓</a>
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
