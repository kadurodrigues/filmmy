import React, { createContext, useContext, useReducer } from 'react';
import { SET_USER, SET_USER_LISTS, SET_USER_LISTS_DIALOG } from '../actions/types';

const StoreContext = createContext();

const initialState = {
  user: JSON.parse(window.sessionStorage.getItem('user')) || null,
  lists: [],
  shouldOpenUserListsDialog: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.payload}
    case SET_USER_LISTS:
      return {...state, lists: action.payload}
    case SET_USER_LISTS_DIALOG:
      return {...state, shouldOpenUserListsDialog: action.payload} 
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