import React from 'react';
import { IconButton } from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert'

function Alert({ severity, message, onClose }) {
  return (
    <MuiAlert 
      variant="filled" 
      severity={severity}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
          <CloseOutlined fontSize="small" />
        </IconButton>
      }
    >
      {message}
    </MuiAlert>
  )
}

export default Alert;

