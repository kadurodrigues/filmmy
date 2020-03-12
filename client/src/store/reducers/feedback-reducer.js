import { SET_USER_LISTS_DIALOG, SET_SNACKBAR, SET_CREATE_LIST_DIALOG } from '../../actions/types';

export const feedbackStates = {
  shouldOpenUserListsDialog: false,
  shouldOpenCreateListDialog: false,
  shouldOpenSnackbar: false,
  snackbarMessage: '',
  snackbarOptions: null
}

export const feedbackReducer = (state, action) => {
  switch (action.type) {
    case SET_USER_LISTS_DIALOG:
      return {
        ...state, 
        shouldOpenUserListsDialog: action.payload 
      }
    case SET_CREATE_LIST_DIALOG:
      return {
        ...state,
        shouldOpenCreateListDialog: action.payload
      }
    case SET_SNACKBAR:
      return {
        ...state, 
        shouldOpenSnackbar: action.payload.show,
        snackbarMessage: action.payload.message,
        snackbarOptions: action.payload.options 
      } 
    default:
      throw new Error();
  }
}