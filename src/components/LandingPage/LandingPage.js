import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import heroImage from '../../assets/landing_hero.png'; // Importing the image



const LandingPage = ({AddToEstimateBtn}) => {
  console.log(AddToEstimateBtn,'AddToEstimateBtn')
  return (
    <div className="landing-page">
      <div className="text-content">
        <h1>Welcome to Google Cloud's </h1>
        <h2>Get started with your estimate</h2>
        <p>Add and configure products to get a cost estimate to share with your team.</p>
        {AddToEstimateBtn.map((BtnInfo, index) => ( <button key={index} onClick={BtnInfo.onClick} className="add-button"> {BtnInfo.text} </button> ))}
      </div>
      <div className="image-content">
        <img
          src={heroImage}
          alt="Hero"
          className="logo"
          style={{ height: '300px', width: '268px', marginLeft: '-40px' }}
        /> 
      </div>
    </div>
  );
};

export default LandingPage;
