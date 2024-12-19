import React from 'react';
import PropTypes from 'prop-types';
import './modalView.css';

function ModalV2({ children, text, buttonText, handleOverlayClick, handleSubmit, className, wrapperClassName, classNames,onCloseBtn,containerClass }) {

  return (
    <div className={`tile-modal-overlay ${className}`} onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div className={`tile-modal ${classNames}`} onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onCloseBtn} >x</button>
        <h2>{text}</h2>
        <div className={`tile-btn ${containerClass}`}>
          {children}
        </div>
        <button className={`submit-button ${wrapperClassName}`} onClick={handleSubmit}>{buttonText}</button>
      </div>
    </div>
  );
}

ModalV2.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  handleOverlayClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  classNames: PropTypes.string,
};

ModalV2.defaultProps = {
  className: '',
  wrapperClassName: '',
  classNames: '',
};

export default ModalV2;