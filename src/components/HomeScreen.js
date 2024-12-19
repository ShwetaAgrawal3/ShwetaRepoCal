import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';


const HomeScreen = ({ isButtonDisabled, setIsButtonDisabled }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    setIsButtonDisabled(true);
    navigate('/calculator');
  };

  useEffect(() => {
    const handlePopState = () => {
      if(true){
      setIsButtonDisabled(false);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [setIsButtonDisabled]);

  return (
    <div className={'home-screen'}>
      <button 
        className="start-button" 
        onClick={handleClick} 
        disabled={isButtonDisabled}
      >
        Go to Calculator
      </button>
    </div>
  );
};

export default HomeScreen;