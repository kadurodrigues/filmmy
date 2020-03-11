import { SET_USER, SET_USER_LISTS } from '../../actions/types';

export const userStates = {
  user: JSON.parse(window.sessionStorage.getItem('user')) || null,
  lists: []
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.payload}
    case SET_USER_LISTS:
      return {...state, lists: action.payload} 
    default:
      throw new Error();
  }
}