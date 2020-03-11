import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  progress: {
    color: '#1ddb25',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

function ProgressButton({ label, isDisabled, onClick }) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Button 
        variant="contained"
        color="primary"
        disabled={isDisabled}
        onClick={onClick} 
      >
        {label}
      </Button>
      {isDisabled && <CircularProgress size={14} className={classes.progress} />}
    </div>
  )
}

export default ProgressButton;