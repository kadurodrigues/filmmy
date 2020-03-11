import { SET_USER_LISTS_DIALOG, SET_SNACKBAR } from '../../actions/types';

export const feedbackStates = {
  shouldOpenUserListsDialog: false,
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