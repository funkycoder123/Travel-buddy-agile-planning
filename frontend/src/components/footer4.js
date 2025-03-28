import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './footer4.css';

const Footer4 = (props) => {
  return (
    <footer className="footer4-footer7 thq-section-padding">
      <div className="footer4-max-width thq-section-max-width">
        <div className="footer4-content">
          <div className="footer4-logo1">
            <img
              alt={props.logoAlt}
              src={props.logoSrc}
              className="footer4-logo2"
            />
          </div>
          <div className="footer4-links">
            <a href="#" className="thq-body-small">
              {props.link1 ?? <span className="footer4-text16">About Us</span>}
            </a>
            <a href="#" className="thq-body-small">
              {props.link2 ?? <span className="footer4-text18">Contact Us</span>}
            </a>
            <a href="#" className="thq-body-small">
              {props.link3 ?? <span className="footer4-text15">FAQs</span>}
            </a>
            <a href="#" className="thq-body-small">
              {props.link4 ?? <span className="footer4-text19">Terms and Conditions</span>}
            </a>
            <a href="#" className="thq-body-small">
              {props.link5 ?? <span className="footer4-text14">Privacy Policy</span>}
            </a>
          </div>
        </div>

        <div className="footer4-credits">
          <div className="thq-divider-horizontal"></div>
          <div className="footer4-row">
            <div className="footer4-container">
              <span className="thq-body-small">© 2025 Travel Buddy</span>
            </div>
            <div className="footer4-footer-links">
              <span className="footer4-text11 thq-body-small">
                {props.privacyLink ?? <span className="footer4-text21">Privacy Policy</span>}
              </span>
              <span className="thq-body-small">
                {props.termsLink ?? <span className="footer4-text17">Terms and Conditions</span>}
              </span>
              <span className="thq-body-small">
                {props.cookiesLink ?? <span className="footer4-text20">Cookies Policy</span>}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer4.defaultProps = {
  logoAlt: 'Travel Buddy Logo',
  logoSrc: '/images/travelbuddyimg.png',
  link1: undefined,
  link2: undefined,
  link3: undefined,
  link4: undefined,
  link5: undefined,
  privacyLink: undefined,
  termsLink: undefined,
  cookiesLink: undefined,
};

Footer4.propTypes = {
  logoAlt: PropTypes.string,
  logoSrc: PropTypes.string,
  link1: PropTypes.element,
  link2: PropTypes.element,
  link3: PropTypes.element,
  link4: PropTypes.element,
  link5: PropTypes.element,
  privacyLink: PropTypes.element,
  termsLink: PropTypes.element,
  cookiesLink: PropTypes.element,
};

export default Footer4;
