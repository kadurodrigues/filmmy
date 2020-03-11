import React, { createContext, useContext, useReducer } from 'react';
import { userReducer, userStates } from './reducers/user-reducer';
import { feedbackReducer, feedbackStates } from './reducers/feedback-reducer';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, userStates);
  const [feedbackState, feedbackDispatch] = useReducer(feedbackReducer, feedbackStates)

  return (
    <StoreContext.Provider value={{ 
      state: {
        ...userState,
        ...feedbackState
      }, 
      dispatch: {
        userDispatch,
        feedbackDispatch
      }
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext);