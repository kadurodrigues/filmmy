import { SET_USER, SET_USER_LISTS, SET_USER_LISTS_DIALOG, SET_USER_LOGGING } from './types';

export const setUserStore = user => ({
  type: SET_USER,
  payload: user
});

export const setUserLists = lists => ({
  type: SET_USER_LISTS,
  payload: lists
});

export const setUserListsDialog = shouldOpen => ({
  type: SET_USER_LISTS_DIALOG,
  payload: shouldOpen
});

export const setUserLogging = isLogged => ({
  type: SET_USER_LOGGING,
  payload: isLogged
});