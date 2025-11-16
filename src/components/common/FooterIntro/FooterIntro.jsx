import footer from "../../../assets/img/footer.svg";

function FooterIntro() {
    return (
        <div className="footer-bg">
            <div className="banner-text">
                <span>믿을 수 있는</span>
                <span>판다마켓 중고 거래</span>
            </div>
            <div className="footer-img">
                <img src={footer} alt="" />
            </div>
        </div>
    );
}

export default FooterIntro;
