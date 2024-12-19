import React from 'react';
import InputSection from '../InputV2/InputSection';

const CEComponent = ({
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
}) => {
  const fields = [
    { id: 'ceNumNodes', label: 'Number of Nodes:', type: 'number', min: 0, step: 1 },
    { id: 'ceCrit', label: 'Criticality:', type: 'select', options: [{ value: '1', label: 'No' }, { value: '2', label: 'Yes' }] },
    { id: 'ceNumClusters', label: 'Number of Regional Clusters:', type: 'number', min: 0 },
    { id: 'ceSizeNodes', label: 'Size of Nodes:', type: 'select', options: [
      { value: '0', label: 'Xsmall (2 vCPU, 8GB RAM)' },
      { value: '1', label: 'Small (4 vCPU, 16GB RAM)' },
      { value: '2', label: 'Medium (8 vCPU, 32GB RAM)' },
      { value: '3', label: 'Large (16 vCPU, 64GB RAM)' },
      { value: '4', label: 'Xlarge (32 vCPU, 128GB RAM)' },
      { value: '5', label: 'XXlarge (64 vCPU, 256GB RAM)' },
      { value: '6', label: 'XXXlarge (128 vCPU, 512GB RAM)' },
    ]},
    { id: 'ceBootDiskSize', label: 'Boot Disk Size:', type: 'number', min: 0, step: 10 },
  ];

  const values = { ceNumNodes, ceCrit, ceNumClusters, ceSizeNodes, ceBootDiskSize };
  const handleChange = (id, value) => {
    switch (id) {
      case 'ceNumNodes': handleCeNumNodesChange({ target: { value } }); break;
      case 'ceCrit': handleCritChange({ target: { value } }); break;
      case 'ceNumClusters': handleNumClustersChange({ target: { value } }); break;
      case 'ceSizeNodes': handleSizeNodesChange({ target: { value } }); break;
      case 'ceBootDiskSize': handleBootDiskSizeChange({ target: { value } }); break;
      default: break;
    }
  };

  return <InputSection title="CE" fields={fields} values={values} handleChange={handleChange} />;
};

export default CEComponent