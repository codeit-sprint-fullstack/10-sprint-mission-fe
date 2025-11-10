import React from 'react';

const Footer = () => {
  return (
    <footer>
        <div>@codeit -2024</div>
        <div id="footerMenu">
            <a href="./privacy.html">Privacy Policy</a>
            <a href="./faq.html">FAQ</a>
        </div>
        <div id="socialMedia">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <img src="/src/assets/logos/facebook-logo.svg" width="20" alt="Facebook" />
            </a>
            <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                <img src="/src/assets/logos/twitter-logo.svg" width="20" alt="Twitter" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <img src="/src/assets/logos/youtube-logo.svg" width="20" alt="YouTube" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/src/assets/logos/instagram-logo.svg" width="20" alt="Instagram" />
            </a>
        </div>
    </footer>
  );
}

export default Footer;