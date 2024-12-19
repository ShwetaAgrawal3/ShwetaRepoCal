import React, { useState } from 'react';
import './ProductSelectionModal.css';
// import ModalView from './ModalV1/modalView'; 
import ModalV2 from './ModalV1/modalV2';

const ProductSelectionModal = ({ onClose, onProductToggle, selectedProducts ,setIsTileModalOpend,handleClose}) => {
  const [tempSelectedProducts, setTempSelectedProducts] = useState([...selectedProducts]);
 

  const handleOverlayClick = (e) => {
    if (e.target.className === 'tile-modal-overlay') {
      handleSubmit();
    }
  };

  const handleProductClick = (product) => {
    setTempSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.includes(product)
        ? prevSelectedProducts.filter((p) => p !== product)
        : [...prevSelectedProducts, product]
    );
  };

  const handleSubmit = () => {
    const newSelectedProducts = [...tempSelectedProducts];
    selectedProducts.forEach(product => {
      if (!newSelectedProducts.includes(product)) {
        onProductToggle(product);
      }
    });
    newSelectedProducts.forEach(product => {
      if (!selectedProducts.includes(product)) {
        onProductToggle(product);
      }
    });
    onClose();
    if(selectedProducts.length>0){
      setIsTileModalOpend((prev)=>!prev)
    }
  };

  const products = [
    { product: 'ce_products', displayText: 'CE Component' },
    { product: 'cloud_storage_products', displayText: 'Cloud Storage' },
    { product: 'db_products ', displayText: 'DB' },
    { product: 'bq_products', displayText: 'BQ' },
    { product: 'dFlow_products', displayText: 'Dataflow' },
    { product: 'gclb_products', displayText: 'Google Cloud Load Balancer' },
    { product: 'lStorage_products', displayText: 'Log Storage' },
    { product: 'filestore_products', displayText: 'Filestore' },
    { product: 'Product8', displayText: 'Product 8' },
  ];
  

  return (
    <ModalV2
      text="Select an Option"
      buttonText="Submit"
      handleOverlayClick={handleOverlayClick}
      handleSubmit={handleSubmit}
      classNames={'modalSize'}
      onClose={handleClose}
      containerClass={'container'}
    >

      {products.map(({ product, displayText }) => (
        <button
          key={product}
          className={`tile-button ${tempSelectedProducts.includes(product) ? 'selected' : ''}`}
          onClick={() => handleProductClick(product)}
        >
          {displayText}
        </button>
      ))}
    </ModalV2>
  );
};

export default ProductSelectionModal;