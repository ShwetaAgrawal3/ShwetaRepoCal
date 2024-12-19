
import React, { useReducer } from 'react';
import Headers from '../Headers';
import { StorageType, StorageVolume, StorageClassA, StorageClassB, StorageRegionEgress, StorageInetEgress, StorageFileBackup, StorageBlockSnapshot } from './StorageSubComponents';

const initialState = {
  storageType: 0,
  storageVolume: 0,
  storageClassA: 0,
  storageClassB: 0,
  storageRegionEgress: 0,
  storageInetEgress: 0,
  storageFileBackup: 0,
  storageBlockSnapshot: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STORAGE_TYPE':
      return { ...state, storageType: action.value };
    case 'SET_STORAGE_VOLUME':
      return { ...state, storageVolume: action.value };
    case 'SET_STORAGE_CLASS_A':
      return { ...state, storageClassA: action.value };
    case 'SET_STORAGE_CLASS_B':
      return { ...state, storageClassB: action.value };
    case 'SET_STORAGE_REGION_EGRESS':
      return { ...state, storageRegionEgress: action.value };
    case 'SET_STORAGE_INET_EGRESS':
      return { ...state, storageInetEgress: action.value };
    case 'SET_STORAGE_FILE_BACKUP':
      return { ...state, storageFileBackup: action.value };
    case 'SET_STORAGE_BLOCK_SNAPSHOT':
      return { ...state, storageBlockSnapshot: action.value };
    default:
      return state;
  }
}

const Storage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="input-section">
      <Headers level={2} text="Storage" />

      <StorageType value={state.storageType} onChange={(e) => dispatch({ type: 'SET_STORAGE_TYPE', value: e.target.value })} />
      <StorageVolume value={state.storageVolume} onChange={(e) => dispatch({ type: 'SET_STORAGE_VOLUME', value: e.target.value })} />
      <StorageClassA value={state.storageClassA} onChange={(e) => dispatch({ type: 'SET_STORAGE_CLASS_A', value: e.target.value })} />
      <StorageClassB value={state.storageClassB} onChange={(e) => dispatch({ type: 'SET_STORAGE_CLASS_B', value: e.target.value })} />
      <StorageRegionEgress value={state.storageRegionEgress} onChange={(e) => dispatch({ type: 'SET_STORAGE_REGION_EGRESS', value: e.target.value })} />
      <StorageInetEgress value={state.storageInetEgress} onChange={(e) => dispatch({ type: 'SET_STORAGE_INET_EGRESS', value: e.target.value })} />
      <StorageFileBackup value={state.storageFileBackup} onChange={(e) => dispatch({ type: 'SET_STORAGE_FILE_BACKUP', value: e.target.value })} />
      <StorageBlockSnapshot value={state.storageBlockSnapshot} onChange={(e) => dispatch({ type: 'SET_STORAGE_BLOCK_SNAPSHOT', value: e.target.value })} />
    </div>
  );
};

export default Storage;