import { useState} from 'react';

export const useSessionStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(prevState => {
      try {
            const item =  sessionStorage.getItem(key);
            let val = null;
            if (Boolean(item))
              val = JSON.parse(item);
            else 
              val = initialValue;
            return {...prevState, val }
      } catch (err) {
            //console.log(`useSessionStorage error:`, err);
            return initialValue;
        }
    });
    
    const setValue = (value)  => {
        try {
            const valueToStore = 
                value instanceof Function
                ? value(storedValue)
                : value;
            setStoredValue(valueToStore);
            sessionStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (err) {
            //console.log(`setStorage error: `, err);
        }
    }
    return [storedValue, setValue];
};

export const useSessionStorageArray = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(prevState => {
    try {
          const item =  sessionStorage.getItem(key);
          let val = {};//JSON.parse(initialValue);
          if (item) {
            val = JSON.parse(item);
            
          }
          //console.log(`item:`,item,`val:`,val);
          return [{...prevState, ...val}]
    } catch (err) {
          //console.log(`useSessionStorage error:`, err);
          return initialValue;
      }
  });
  
  const setValue = (value)  => {
      try {
          const valueToStore = 
              value instanceof Function
              ? value(storedValue)
              : value;
          setStoredValue(valueToStore);
          sessionStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (err) {
          //console.log(`setStorage error: `, err);
      }
  }
  return [storedValue, setValue];
};
