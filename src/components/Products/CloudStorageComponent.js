import React from 'react';
import InputSection from '../InputV2/InputSection';

const CloudStorageComponent = ({
  storageAmount,
  storageClassA,
  storageClassB,
  storageTransfer,
  handleStorageAmountChange,
  handleStorageClassAChange,
  handleStorageClassBChange,
  handleStorageTransferChange,
}) => {
  const fields = [
    { id: 'storageAmount', label: 'Total Amount of Storage (in GiB):', type: 'number', min: 0, step: 10 },
    { id: 'storageClassA', label: 'Class A operations per month (in 1000s):', type: 'number', min: 0, step: 100 },
    { id: 'storageClassB', label: 'Class B operations per month (in 1000s):', type: 'number', min: 0, step: 100 },
    { id: 'storageTransfer', label: 'Data Transfer within Google Cloud (in GiB):', type: 'number', min: 0, step: 10 },
  ];

  const values = { storageAmount, storageClassA, storageClassB, storageTransfer };
  const handleChange = (id, value) => {
    switch (id) {
      case 'storageAmount': handleStorageAmountChange({ target: { value } }); break;
      case 'storageClassA': handleStorageClassAChange({ target: { value } }); break;
      case 'storageClassB': handleStorageClassBChange({ target: { value } }); break;
      case 'storageTransfer': handleStorageTransferChange({ target: { value } }); break;
      default: break;
    }
  };

  return <InputSection title="Cloud Storage" fields={fields} values={values} handleChange={handleChange} />;
};

export default CloudStorageComponent;