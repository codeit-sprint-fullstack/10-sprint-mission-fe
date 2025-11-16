import "./RandingBanner.css";
import { Link } from "react-router-dom";
import banner from "../../../assets/img/banner.svg";

function RandingBanner() {
    return (
        <section className="banner-section">
            <div className="banner-bg">
                <div className="banner-img">
                    <div className="banner-text">
                        <span>일상의 모든 물건을</span>
                        <span>거래해 보세요</span>
                        <Link to="/items">
                            <button>구경하러 가기</button>
                        </Link>
                    </div>
                    <div className="banner-container">
                        <img id="bannerImg" src={banner} alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RandingBanner;
