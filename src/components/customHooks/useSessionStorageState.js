import { useState } from 'react';

const useSessionStorageState = (key, defaultValue) => {
  const [state, setState] = useState(() => sessionStorage.getItem(key) || defaultValue);

  const setSessionStorageState = (value) => {
    setState(value);
    sessionStorage.setItem(key, value);
  };

  return [state, setSessionStorageState];
};

export default useSessionStorageState;