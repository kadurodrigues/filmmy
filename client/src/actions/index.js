import { 
  SET_USER, 
  SET_USER_LISTS, 
  SET_USER_LISTS_DIALOG, 
  SET_USER_LOGGING,
  SET_SNACKBAR,
  SET_CREATE_LIST_DIALOG
} from './types';

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

export const setCreateListsDialog = shouldOpen => ({
  type: SET_CREATE_LIST_DIALOG,
  payload: shouldOpen
});

export const setUserLogging = isLogged => ({
  type: SET_USER_LOGGING,
  payload: isLogged
});

export const setSnackbar = ({ show, message, options }) => ({
  type: SET_SNACKBAR,
  payload: {
    show, 
    message,
    options
  }
});