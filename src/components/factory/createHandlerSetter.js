import React, { useRef } from 'react'

function createHandlerSetter() {
    const handleRef=useRef(callback);
    const setHandler=useRef((nextCallback)=>{
        if(typeof nextCallback!=="function"){
            throw new Error("the argument suppulied to SetHandler function should be of type function");
            
        }
        handleRef.current=nextCallback;
    })
  return [handleRef,setHandler.current]
}

export default createHandlerSetter