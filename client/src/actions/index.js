import { SET_USER, SET_USER_LISTS } from './types';

export const setUserStore = user => ({
  type: SET_USER,
  payload: user
});

export const setUserLists = lists => ({
  type: SET_USER_LISTS,
  payload: lists
});