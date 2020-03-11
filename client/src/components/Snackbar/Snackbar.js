import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../Alert';
import { useStore } from '../../store'
import { setSnackbar } from '../../actions';

function SnackbarContent({ open }) {
  const { 
    state: {
      snackbarMessage, 
      snackbarOptions: { severity, duration, position: { vertical,  horizontal } }
    },  
    dispatch: { feedbackDispatch }
  } = useStore(state => state);

  const handleOnClose = () => {
    feedbackDispatch(setSnackbar({ show: false }));
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={duration}
      onClose={handleOnClose}
    >
      <Alert severity={severity} message={snackbarMessage} onClose={handleOnClose}/>
    </Snackbar>
  );
}

export default SnackbarContent;