// src/components/Footer.jsx
import React from 'react';
import '../CSS/Footer.css';
import facebookIcon from '../assets/icons/facebook.png';
import twitterIcon from '../assets/icons/twitter.png';
import youtubeIcon from '../assets/icons/youtube.png';
import instagramIcon from '../assets/icons/instagram.png';

export default function Footer() {
  return (
    <footer className="Footer">
      <div className="Footer__content">
        <span
          className="Footer__left"
          onClick={() => (window.location.href = './terms.html')}
        >
          ©codeit - 2024
        </span>

        <div className="Footer__center">
          <span onClick={() => (window.location.href = './privacy.html')}>
            Privacy Policy
          </span>
          <span onClick={() => (window.location.href = './faq.html')}>
            &emsp;FAQ
          </span>
        </div>

        <div className="Footer__right">
          <img
            src={facebookIcon}
            alt="Facebook"
            onClick={() => window.open('https://www.facebook.com/', '_blank')}
          />
          <img
            src={twitterIcon}
            alt="Twitter"
            onClick={() => window.open('https://www.twitter.com/', '_blank')}
          />
          <img
            src={youtubeIcon}
            alt="YouTube"
            onClick={() => window.open('https://www.youtube.com/', '_blank')}
          />
          <img
            src={instagramIcon}
            alt="Instagram"
            onClick={() => window.open('https://www.instagram.com/', '_blank')}
          />
        </div>
      </div>
    </footer>
  );
}
