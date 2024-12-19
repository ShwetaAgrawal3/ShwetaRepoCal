import React from 'react';
import InputSection from '../InputV2/InputSection';

const BQComponent = ({
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
}) => {
  const fields = [
    { id: 'bqComputeSize', label: 'Amount of data queried (in GB):', type: 'number', min: 1, step: 10 },
    { id: 'bqActiveStorage', label: 'Active logical storage (in GiB):', type: 'number', min: 1, step: 10 },
    { id: 'bqLongStorage', label: 'Long-term logical storage (in GiB):', type: 'number', min: 1, step: 10 },
    { id: 'bqActivePhysStorage', label: 'Active physical storage (in GiB):', type: 'number', min: 1, step: 10 },
    { id: 'bqLongPhysStorage', label: 'Long-term physical storage (in GiB):', type: 'number', min: 1, step: 10 },
    { id: 'bqStreamInserts', label: 'Streaming inserts (in GiB):', type: 'number', min: 1, step: 10 },
    { id: 'bqStreamReads', label: 'Streaming reads (in GiB):', type: 'number', min: 1, step: 10 },
    { id: 'bqStreamWrites', label: 'Storage Write API (in GiB):', type: 'number', min: 1, step: 10 },
  ];

  const values = {
    bqComputeSize, bqActiveStorage, bqLongStorage, bqActivePhysStorage, bqLongPhysStorage, bqStreamInserts, bqStreamWrites, bqStreamReads
  };

  const handleChange = (id, value) => {
    switch (id) {
      case 'bqComputeSize': handleBqComputeSizeChange({ target: { value } }); break;
      case 'bqActiveStorage': handleBqActiveStorageChange({ target: { value } }); break;
      case 'bqLongStorage': handleBqLongStorageChange({ target: { value } }); break;
      case 'bqActivePhysStorage': handleBqActivePhysStorageChange({ target: { value } }); break;
      case 'bqLongPhysStorage': handleBqLongPhysStorageChange({ target: { value } }); break;
      case 'bqStreamInserts': handleBqStreamInsertsChange({ target: { value } }); break;
      case 'bqStreamWrites': handleBqStreamWritesChange({ target: { value } }); break;
      case 'bqStreamReads': handleBqStreamReadsChange({ target: { value } }); break;
      default: break;
    }
  };

  return <InputSection title="BQ" fields={fields} values={values} handleChange={handleChange} />;
};

export default BQComponent;