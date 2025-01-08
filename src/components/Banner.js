import React, { useState, useEffect } from 'react';
import './Banner.css';
import logo from '../components/Banner/logo.svg';
import { Link } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import LandingPage from './LandingPage/LandingPage'

const Banner = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const windowLocation = () => {
    return window.location.href === 'http://localhost:3001/calculator';
  };

  useEffect(() => {
    const handlePopState = () => {
      if (!windowLocation()) {
        setIsButtonDisabled(false);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <>
    <header className="site-header">
      <div className="header-container">
        <div className="logo-item">
          <Link to="/" className="logo-left">
            <img className="logo-svg" src={logo} alt="logo" />
          </Link>
        </div>
        {!windowLocation() && <HomeScreen isButtonDisabled={isButtonDisabled} setIsButtonDisabled={setIsButtonDisabled} />}
      </div>
    </header>
    {/* <LandingPage/> */}
    </>
    
  );
};

export default Banner;