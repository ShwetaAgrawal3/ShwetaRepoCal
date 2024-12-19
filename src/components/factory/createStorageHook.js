import React, { useCallback, useState } from 'react'

function createStorageHook(type) {
    const storageName= `${type}Storage`;
    if(isClient &&!isAPISupported(storageName)){
        warnOnce(`${storageName} is not supported`)
    }
  return function useStorageCreateHook(storageKey,defaultValue){
    if(isClient){
        if(isDevelopment){
            warnOnce(`Please be aware that ${storageName} could not be available during SSR`)
        }
        return [JSON.stringify(defaultValue),noop]
    }
    const storage = window[storageName];
    const safelySetStorage = useCallback((valueToStore)=>{
        try{
            storage.setItem(storageKey,valueToStore)
        }catch(e){}
    },[storage,storageKey]);
    const [storedValue,setStoredValue]=useState(()=>{
        let valueToStore;
        try{
            valueToStore-storage.getItem(storageKey)??JSON.stringify(defaultValue)
        }catch(e){
            valueToStore=JSON.stringify(defaultValue)
        }
        safelySetStorage(valueToStore)
        return safelyParseJson(valueToStore);
    });
    const setValue = useCallback((value)=>{
        setStoredValue((current)=>{
            const valueToStore = value instanceof Function ?value(current):value;
            safelySetStorage(JSON.stringify(valueToStore))
            return valueToStore;
        })
    },[safelySetStorage]);
    return [storedValue,setValue]
  }
}

export default createStorageHook;