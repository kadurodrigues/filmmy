import { useState, useEffect } from 'react';

const usePersistedState = (key) => {
  const [state, setState] = useState(() => {
    const persistedState = localStorage.getItem(key);
    return persistedState ? JSON.parse(persistedState) : ''
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
    // window.sessionStorage.setItem()
  }, [key, state]);

  return [state, setState]
}

export default usePersistedState;