import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Calculator.css';
import Modal from './Products/DetailedCostsModal';
import ProductSelectionModal from './ProductSelectionModal';
import Headers from './Headers';
import CEComponent from './Products/CEComponent';
import CloudStorageComponent from './Products/CloudStorageComponent';
// import DBComponent from './DBComponent';
import BQComponent from './Products/BQComponent';
// import DFlowComponent from './DFlowComponent';
// import GCLBComponent from './GCLBComponent'
// import LStorageComponent from './LStorageComponent';
import StickyButton from './StickyButton';
import ProductCostTable from './ProductCostTable/ProductCostTable';
import ModalView from './ModalV1/modalView';
import LandingPage from './LandingPage/LandingPage';
// import FilestoreComponent from './FilestoreComponent';

const defaultValues = {
  ceNumNodes: "1",
  ceNumClusters: "1",
  ceCrit: "1",
  ceSizeNodes: "0",
  ceBootDiskSize: "0",
  // storageType: 0,
  // storageVolume: 0,
  // storageClassA: 0,
  // storageClassB: 0,
  // storageRegionEgress: 0,
  // storageInetEgress: 0,
  // storageFileBackup: 0,
  // storageBlockSnapshot: 0,
  storageAmount: "0",
  storageClassA: "0",
  storageClassB: "0",
  storageTransfer: "0",
  // basicStorage: 0,
  // premiumStorage: 0,
  // highCapStorage: 0,
  // lowCapStorage: 0,
  // enterpriseStorage: 0,
  // backupStorage: 0,
  // dbType: 0,
  // dbSize: 0,
  // dbMysqlNetEgress: 0,
  // dbMysqlInetEgress: 0,
  // dbNosqlReads: 0,
  // dbNosqlWrites: 0,
  // dbNosqlDocs: 0,
  // dbNosqlNetEgress: 0,
  // dbNosqlInetEgress: 0,
  // dbBDRegionEgress: 0,
  // dbBDInetEgress: 0,
  bqComputeSize: "0",
  bqActiveStorage: "0",
  bqLongStorage: "0",
  bqActivePhysStorage: "0",
  bqLongPhysStorage: "0",
  bqStreamInserts: "0",
  bqStreamWrites: "0",
  bqStreamReads: "0",
  // dFlowType: 0,
  // dFlowSize: 0,
  // gclbSize: 0,
  // lStorageSize: 0
};


const Calculator = () => {
  // CE Vars
  const [ceNumNodes, setNumNodes] = useState(() => sessionStorage.getItem('ceNumNodes')) || defaultValues.ceNumNodes;
  const [ceNumClusters, setNumClusters] = useState(() => sessionStorage.getItem('ceNumClusters')) || defaultValues.ceNumClusters;
  const [ceCrit, setCrit] = useState(() => sessionStorage.getItem('ceCrit')) || defaultValues.ceCrit;
  const [ceSizeNodes, setSizeNodes] = useState(() => sessionStorage.getItem('ceSizeNodes')) || defaultValues.ceSizeNodes;
  const [ceBootDiskSize, setBootDiskSize] = useState(() => sessionStorage.getItem('ceBootDiskSize')) || defaultValues.ceBootDiskSize;

  
  // Cloud Storage Vars
  const [storageAmount, setStorageAmount] = useState(() => parseFloat(sessionStorage.getItem('storageAmount')) || defaultValues.storageAmount);
  const [storageClassA, setStorageClassA] = useState(() => parseFloat(sessionStorage.getItem('storageClassA')) || defaultValues.storageClassA);
  const [storageClassB, setStorageClassB] = useState(() => parseFloat(sessionStorage.getItem('storageClassB')) || defaultValues.storageClassB);
  const [storageTransfer, setStorageTransfer] = useState(() => parseFloat(sessionStorage.getItem('storageTransfer')) || defaultValues.storageTransfer);

  // // Filestore vars
 

  // BQ Vars
  const [bqComputeSize, setBqComputeSize] = useState(() => sessionStorage.getItem('bqComputeSize')) || defaultValues.bqComputeSize;
  const [bqActiveStorage, setBqActiveStorage] = useState(() => sessionStorage.getItem('bqActiveStorage')) || defaultValues.bqActiveStorage;
  const [bqLongStorage, setBqLongStorage] = useState(() => sessionStorage.getItem('bqLongStorage')) || defaultValues.bqLongStorage;
  const [bqActivePhysStorage, setBqActivePhysStorage] = useState(() => sessionStorage.getItem('bqActivePhysStorage')) || defaultValues.bqActivePhysStorage;
  const [bqLongPhysStorage, setBqLongPhysStorage] = useState(() => sessionStorage.getItem('bqLongPhysStorage')) || defaultValues.bqLongPhysStorage;
  const [bqStreamInserts, setBqStreamInserts] = useState(() => sessionStorage.getItem('bqStreamInserts')) || defaultValues.bqStreamInserts;
  const [bqStreamWrites, setBqStreamWrites] = useState(() => sessionStorage.getItem('bqStreamWrites')) || defaultValues.bqStreamWrites;
  const [bqStreamReads, setBqStreamReads] = useState(() => sessionStorage.getItem('bqStreamReads')) || defaultValues.bqStreamReads;

 

  // General Vars
  const [result, setResult] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTileModalOpen, setIsTileModalOpen] = useState(false);
  const [initialResult, setInitialResult] = useState(null);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState('');
  const[isTileModalOpend,setIsTileModalOpend]=useState(true)
  // const [isOpen,setIsOpen]=useState(false)
  const [selectedProducts, setSelectedProducts] = useState(() => {
    const savedProducts = sessionStorage.getItem('selectedProducts');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  // Helper function to save input in session storage, validate input to 0-9 in string format, and trigger updating of costs
  const handleInputChange = (setter, key) => (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setter(value);
    }
    sessionStorage.setItem(key, value);
    fetchUpdatedCosts();
  };

  // Change handler
  const handleCeNumNodesChange = handleInputChange(setNumNodes, 'ceNumNodes');
  const handleNumClustersChange = handleInputChange(setNumClusters, 'ceNumClusters');
  const handleCritChange = handleInputChange(setCrit, 'ceCrit');
  const handleSizeNodesChange = handleInputChange(setSizeNodes, 'ceSizeNodes');
  const handleBootDiskSizeChange = handleInputChange(setBootDiskSize, 'ceBootDiskSize');

  

  const handleStorageAmountChange = handleInputChange(setStorageAmount, 'storageAmount');
  const handleStorageClassAChange = handleInputChange(setStorageClassA, 'storageClassA');
  const handleStorageClassBChange = handleInputChange(setStorageClassB, 'storageClassB');
  const handleStorageTransferChange = handleInputChange(setStorageTransfer, 'storageTransfer');

 

  const handleBqComputeSizeChange = handleInputChange(setBqComputeSize, 'bqComputeSize');
  const handleBqActiveStorageChange = handleInputChange(setBqActiveStorage, 'bqActiveStorage');
  const handleBqLongStorageChange = handleInputChange(setBqLongStorage, 'bqLongStorage');
  const handleBqActivePhysStorageChange = handleInputChange(setBqActivePhysStorage, 'bqActivePhysStorage');
  const handleBqLongPhysStorageChange = handleInputChange(setBqLongPhysStorage, 'bqLongPhysStorage');
  const handleBqStreamInsertsChange = handleInputChange(setBqStreamInserts, 'bqStreamInserts');
  const handleBqStreamWritesChange = handleInputChange(setBqStreamWrites, 'bqStreamWrites');
  const handleBqStreamReadsChange = handleInputChange(setBqStreamReads, 'bqStreamReads');

 

  const saveConfiguration = () => {
    sessionStorage.setItem('savedConfiguration', JSON.stringify(result));
    setInitialResult(result); // Reset the comparison in the UI
  };

  const handleDetailsClick = () => {
    setIsModalOpen(true);
    setIsTileModalOpen(false); // Close the tile modal if it's open
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  
  }

  const handleTileModalOpen = () => {
    setIsTileModalOpen(true);
    setIsModalOpen(false); 
    // handleopenModel()
    
  };

  const handleTileModalClose = () =>{ 
    setIsTileModalOpen((pre)=>!pre)
  
  }
 
  const handleTileModalClosed = () =>{ 
    setIsTileModalOpend((pre)=>!pre)
  }
// const handleopenModel=()=>{
//   setIsOpen((prev)=>!prev)

// }

  const handleProductToggle = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
   
      const updatedProducts = prevSelectedProducts.includes(product)
        ? prevSelectedProducts.filter((p) => p !== product)
        : [...prevSelectedProducts, product];
      sessionStorage.setItem('selectedProducts', JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  // Fetch updated costs
  const fetchUpdatedCosts = () => {
    const components = {
      ce: ['ceNumNodes', 'ceNumClusters', 'ceCrit', 'ceSizeNodes', 'ceBootDiskSize'],
      cloudStorage: ['storageAmount', 'storageClassA', 'storageClassB', 'storageTransfer'],
      bq: ['bqComputeSize', 'bqActiveStorage', 'bqLongStorage', 'bqActivePhysStorage', 'bqLongPhysStorage', 'bqStreamInserts', 'bqStreamWrites', 'bqStreamReads'],
      // Add other components here as needed
    };

    const initializePayload = () => {
      const payload = {};
      Object.keys(components).forEach(component => {
        payload[component] = {};
        components[component].forEach(field => {
          payload[component][field] = parseFloat(defaultValues[field]);
        });
      });
     
      return payload;
    };

    const updatePayload = (payload) => {
      Object.keys(components).forEach(component => {
        if (selectedProducts.includes(`${component.charAt(0).toUpperCase()}${component.slice(1)}Component`)) {
          components[component].forEach(field => {
            const value = parseFloat(sessionStorage.getItem(field)) || parseFloat(defaultValues[field]);
           
            payload[component][field] = value;
          });
        }
      });
    
    };

    const payload = initializePayload();
    updatePayload(payload);

    fetch('http://localhost:8080/gcp-calc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      setResult(data);
      if (!initialResult) {
        setInitialResult(data);
      }
   
    })
    .catch(error => console.error('Error:', error));
  }    

  useEffect(() => {
    const debouncedFetch = debounce(fetchUpdatedCosts, 300); 
    debouncedFetch();
  }, [
    ceNumNodes, ceNumClusters, ceCrit, ceSizeNodes, ceBootDiskSize,
    storageAmount, storageClassA, storageClassB, storageTransfer,
    bqComputeSize, bqActiveStorage, bqLongStorage, bqActivePhysStorage, bqLongPhysStorage, bqStreamInserts, bqStreamReads, bqStreamWrites,
    selectedProducts
  ]);

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

  const buttons = [
    { text: '+Add to estimate', onClick: handleTileModalOpen },
  ];
  const buttonSave = [
    { text: 'Details', onClick: handleDetailsClick },,
    { text: 'Save Configuration', onClick: saveConfiguration }
  ];
  const componentMapping = {
    ce_products: {
      component: CEComponent,
      props: {
        ceNumNodes,
        ceNumClusters,
        ceCrit,
        ceSizeNodes,
        ceBootDiskSize,
        handleCeNumNodesChange,
        handleNumClustersChange,
        handleCritChange,
        handleSizeNodesChange,
        handleBootDiskSizeChange,
      },
    },
    
    cloud_storage_products: {
      component: CloudStorageComponent,
      props: {
        storageAmount,
        storageClassA,
        storageClassB,
        storageTransfer,
        handleStorageAmountChange,
        handleStorageClassAChange,
        handleStorageClassBChange,
        handleStorageTransferChange,
      },
    },
    bq_products: {
      component: BQComponent,
      props: {
        bqComputeSize,
        bqActiveStorage,
        bqLongStorage,
        bqActivePhysStorage,
        bqLongPhysStorage,
        bqStreamInserts,
        bqStreamWrites,
        bqStreamReads,
        handleBqComputeSizeChange,
        handleBqActiveStorageChange,
        handleBqLongStorageChange,
        handleBqActivePhysStorageChange,
        handleBqLongPhysStorageChange,
        handleBqStreamInsertsChange,
        handleBqStreamWritesChange,
        handleBqStreamReadsChange,
      },
    },
    // Add other components here as needed
  };

  const renderComponents = () => {
    return (
      <div>
        <div className="dropdown-container">
          <select onChange={(e) => setSelectedDropdownValue(e.target.value)} value={selectedDropdownValue}>
            <option>select the option</option>
            {selectedProducts.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>
       
       
        {selectedProducts
          .filter((product) =>{return  product === selectedDropdownValue
          })
          .map((product) => {
            const ComponentConfig = componentMapping[product];
            if (ComponentConfig) {
              const { component: Component, props } = ComponentConfig;
              return <Component key={product} {...props} />;
            }
            return null;
          })}
      </div>
    );
  };
  const filteredProducts = result.Product
  ? selectedProducts
      .filter(product => result.Product.hasOwnProperty(product))
      .map(product => ({ [product]: result.Product[product] }))
  : [];
const grandTotal = result.grand_total;
  return (
    <div className="calculator-container">
      <LandingPage AddToEstimateBtn={buttons} />
      <div>

      {/* <StickyButton buttons={buttons} /> */}
       
      </div>

   
    <div className="headers-input-container">
      <Headers level={1} text='GCP Calculator' className='header-primary'/>
      {isTileModalOpend&&selectedProducts.length>0 &&  <ModalView wrapperClassName={'submit-btn'} className={'wrapper'} containerClass={'containerBtn'} onCloseBtn={handleTileModalClosed} >
     <div className='item1'>
      {renderComponents()}
      </div> 


      <ProductCostTable result={result} initialResult={initialResult}/>
<StickyButton buttons={buttonSave}/>
      </ModalView>
      }
      </div>
      {isModalOpen && <Modal data={selectedProducts} onClose={handleCloseModal} total={grandTotal} />}
      {isTileModalOpen && <ProductSelectionModal onClose={handleTileModalClose} onProductToggle={handleProductToggle} selectedProducts={selectedProducts}setIsTileModalOpend={setIsTileModalOpend} handleClose={isTileModalOpen&&handleCloseModal} />}
    
    </div>
  );
};
export default Calculator;