import "./Footer.css";
import facebook from "../../../assets/img/Snslogos/facebook.svg";
import instagram from "../../../assets/img/Snslogos/instagram.svg";
import twitter from "../../../assets/img/Snslogos/twitter.svg";
import youtube from "../../../assets/img/Snslogos/youtube.svg";

function Footer() {
    return (
        <footer>
            <div className="ft-shoutout">
                <div className="shoutout one">
                    <span>©codeit - 2024</span>
                </div>
                <div className="shoutout two">
                    <a href="">Privacy Policy</a>
                    <a href="">FAQ</a>
                </div>

                <div className="shoutout third">
                    <a href="https://facebook.com/" target="_blank">
                        <img src={facebook} alt="facebook" />
                    </a>
                    <a href="https://twitter.com/" target="_blank">
                        <img src={twitter} alt="twitter" />
                    </a>
                    <a href="https://youtube.com/" target="_blank">
                        <img src={youtube} alt="youtube" />
                    </a>
                    <a href="https://instagram.com/" target="_blank">
                        <img src={instagram} alt="instagram" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
