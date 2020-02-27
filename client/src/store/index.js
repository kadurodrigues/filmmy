import React, { createContext, useContext, useReducer } from 'react';
import { SET_USER } from '../actions/types';

const StoreContext = createContext();

const initialState = {
  user: JSON.parse(window.localStorage.getItem('user')) || null
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        user: {...state.user, ...action.payload}
      } 
    default:
      throw new Error();
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext);