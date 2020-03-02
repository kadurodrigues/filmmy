import { useState, useEffect } from 'react';

const useSessionStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    const persistedState = window.sessionStorage.getItem(key);
    return persistedState ? JSON.parse(persistedState) : initialValue
  });

  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState]
}

export default useSessionStorage;