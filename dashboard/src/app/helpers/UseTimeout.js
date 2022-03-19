import React, { useState, useEffect, useRef } from 'react'; 

export function useTimeout(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout.
  useEffect(() => {
    function tick() {
       return savedCallback.current;
    };
    if (delay !== null) {
      let id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
}

// useTimeout(() => {
//   handleLoctionsRefetch({custid: custid});
// }, 2000);

//let timeout = setTimeout(HandleFriendsRefetch, 3000, {custid: custid});

export function useArgsTimeout(callback, arg1, arg2) {
  const savedCallback = useRef();
  const savedArg1 = useRef();
  const savedArg2 = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
    savedArg1.current = arg1;
    savedArg2.current = arg2;
    function tick() {
      savedCallback.current();
    };
    let id = setTimeout(() => tick(savedArg1.current, savedArg2.current), 3000);
      return () => clearTimeout(id);
  }, [callback, arg1, arg2]);
}
