import { SET_USER } from './types';

export const setUserStore = user => ({
  type: SET_USER,
  payload: user
})