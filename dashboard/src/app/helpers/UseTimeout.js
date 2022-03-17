import React, { useState, useEffect, useRef } from 'react';

export function useTimeout(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
    console.log(`callback`, callback);
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

// function useTimeout(callback, delay, arg1, arg2) {
//   const savedCallback = useRef();
//   const savedArg1 = useRef();
//   const savedArg2 = useRef();

//   // Remember the latest callback.
//   useEffect(() => {
//     savedCallback.current = callback;
//     savedArg1.current = arg1;
//     savedArg2.current = arg2;
//   }, [callback, arg1, arg2]);

//   // Set up the timeout.
//   useEffect(() => {
//     function tick() {
//       if(savedArg1.current !== null) {
//         let arg1 = savedArg1.current;
//         if(savedArg2.current !== null) {
//           let arg2 = savedArg2.current;
//           savedCallback.current(arg1, arg2);
//         } else {
//           savedCallback.current(arg1);
//           };
//       } else {
//         savedCallback.current();
//       };
//     };
//     if (delay !== null) {
//       let id = setTimeout(tick, delay);
//       return () => clearTimeout(id);
//     }
//   }, [delay]);
// }
