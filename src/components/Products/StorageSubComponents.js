import React from 'react';

// Reusable InputField component
const InputField = ({ label, value, onChange, options }) => (
  <div className="input-field">
    <label htmlFor={label.toLowerCase().replace(/\s+/g, '-')}>{label}:</label>
    <select
      id={label.toLowerCase().replace(/\s+/g, '-')}
      value={value}
      onChange={onChange}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// Specific Storage subcomponents using InputField

export const StorageType = ({ value, onChange }) => (
  <InputField
    label="Storage Type"
    value={value}
    onChange={onChange}
    options={[
      { value: 0, label: 'None' },
      { value: 1, label: 'Object' },
      { value: 2, label: 'Block' },
      { value: 3, label: 'File' }
    ]}
  />
);

export const StorageVolume = ({ value, onChange }) => (
  <InputField
    label="Storage Volume"
    value={value}
    onChange={onChange}
    options={[
      { value: 0, label: 'None' },
      { value: 1, label: 'Xsmall' },
      { value: 2, label: 'Small' },
      { value: 3, label: 'Medium' },
      { value: 4, label: 'Large' },
      { value: 5, label: 'Xlarge' },
      { value: 6, label: 'XXlarge' },
      { value: 7, label: 'XXXlarge' },
      { value: 8, label: '4Xlarge' }
    ]}
  />
);

export const StorageClassA = ({ value, onChange }) => (
  <InputField
    label="Storage Class A"
    value={value}
    onChange={onChange}
    options={[
      { value: 0, label: 'None' },
      { value: 1, label: 'Xsmall' },
      { value: 2, label: 'Small' },
      { value: 3, label: 'Medium' },
      { value: 4, label: 'Large' },
      { value: 5, label: 'Xlarge' }
    ]}
  />
);

export const StorageClassB = ({ value, onChange }) => (
  <InputField
    label="Storage Class B"
    value={value}
    onChange={onChange}
    options={[
      { value: 0, label: 'None' },
      { value: 1, label: 'Xsmall' },
      { value: 2, label: 'Small' },
      { value: 3, label: 'Medium' },
      { value: 4, label: 'Large' },
      { value: 5, label: 'Xlarge' }
    ]}
  />
);

export const StorageRegionEgress = ({ value, onChange }) => (
  <InputField
    label="Storage Region Egress"
    value={value}
    onChange={onChange}
    options={[
      { value: 0, label: 'None' },
      { value: 1, label: 'Small' },
      { value: 2, label: 'Medium' },
      { value: 3, label: 'Large' }
    ]}
  />
);

export const StorageInetEgress = ({ value, onChange }) => (
  <InputField
    label="Storage Internet Egress"
    value={value}
    onChange={onChange}
    options={[
      { value: 0, label: 'None' },
      { value: 1, label: 'Small' },
      { value: 2, label: 'Medium' },
      { value: 3, label: 'Large' }
    ]}
  />
);

export const StorageFileBackup = ({ value, onChange }) => (
  <InputField
    label="Storage File Backup"
    value={value}
    onChange={onChange}
    options={[
      { value: 0, label: 'None' },
      { value: 1, label: 'Small' },
      { value: 2, label: 'Medium' },
      { value: 3, label: 'Large' },
      { value: 4, label: 'Xlarge' },
      { value: 5, label: 'XXlarge' },
      { value: 6, label: 'XXXlarge' },
      { value: 7, label: '4Xlarge' }
    ]}
  />
);

export const StorageBlockSnapshot = ({ value, onChange }) => (
  <InputField
    label="Storage Block Snapshot"
    value={value}
    onChange={onChange}
    options={[
      { value: 0, label: 'None' },
      { value: 1, label: 'Small' },
      { value: 2, label: 'Medium' },
      { value: 3, label: 'Large' },
      { value: 4, label: 'Xlarge' },
      { value: 5, label: 'XXlarge' },
      { value: 6, label: 'XXXlarge' },
      { value: 7, label: '4Xlarge' }
    ]}
  />
);
