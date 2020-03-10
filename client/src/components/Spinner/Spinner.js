import React from 'react';
import { CircularProgress } from '@material-ui/core';

function Spinner({ size = 24 }) {
  return <CircularProgress size={size} />
}

export default Spinner;