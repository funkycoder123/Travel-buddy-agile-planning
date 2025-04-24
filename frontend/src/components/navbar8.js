import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './navbar8.css';

const Navbar8 = (props) => {
  return (
    <header className="navbar8-container1">
      <header data-thq="thq-navbar" className="navbar8-navbar-interactive">
        <img
          alt={props.logoAlt}
          src={props.logoSrc}
          className="navbar8-image1"
        />

        <div data-thq="thq-navbar-nav" className="navbar8-desktop-menu">
          <nav className="navbar8-links1">
            <Link to="/register" className="navbar8-link11 thq-link thq-body-small">
              <span className="navbar8-text18">Sign In</span>
            </Link>
            <Link to="/login" className="thq-link thq-body-small">
              <span className="navbar8-text16">Login</span>
            </Link>
            <Link to="/" onClick={() => window.location.reload()} className="navbar8-link31 thq-link thq-body-small">
              <span className="navbar8-text24">Home</span>
            </Link>
          </nav>

          <div className="navbar8-buttons1">
            <button className="navbar8-action11 thq-button-animated thq-button-filled">
              <span><span className="navbar8-text15">Search Flights</span></span>
            </button>
            <button className="navbar8-action21 thq-button-outline thq-button-animated">
              <span><span className="navbar8-text27">Book Accommodation</span></span>
            </button>
          </div>
        </div>

        <div data-thq="thq-burger-menu" className="navbar8-burger-menu">
          <svg viewBox="0 0 1024 1024" className="navbar8-icon14">
            <path d="M128 554.667h768c23.552 0 42.667-19.115...z" />
          </svg>
        </div>

        <div data-thq="thq-mobile-menu" className="navbar8-mobile-menu">
          <div className="navbar8-nav">
            <div className="navbar8-top">
              <img
                alt={props.logoAlt}
                src={props.logoSrc}
                className="navbar8-logo"
              />
              <div data-thq="thq-close-menu" className="navbar8-close-menu">
                <svg viewBox="0 0 1024 1024" className="navbar8-icon16">
                  <path d="M810 274l-238 238 238 238...z" />
                </svg>
              </div>
            </div>
            <nav className="navbar8-links2">
              <Link to="/register" className="navbar8-link12 thq-link thq-body-small">
                <span className="navbar8-text18">Sign In</span>
              </Link>
              <Link to="/login" className="thq-link thq-body-small">
                <span className="navbar8-text16">Login</span>
              </Link>
              <Link to="/" className="navbar8-link32 thq-link thq-body-small">
                <span className="navbar8-text24">Home</span>
              </Link>
            </nav>

            <div className="navbar8-buttons2">
              <button className="thq-button-filled">
                <span><span className="navbar8-text15">Search Flights</span></span>
              </button>
              <button className="thq-button-outline">
                <span><span className="navbar8-text27">Book Accommodation</span></span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </header>
  );
};

Navbar8.defaultProps = {
  logoAlt: 'Travel Buddy Logo',
  logoSrc: '/images/travelbuddyimg.png',
};

Navbar8.propTypes = {
  logoAlt: PropTypes.string,
  logoSrc: PropTypes.string,
};

export default Navbar8;
