import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useLoading } from '../../contexts/loadingContext';

export const LoadingSpinner = (): JSX.Element => {
  const { isLoading } = useLoading();

  return (
    <Backdrop
      open={isLoading}
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress size={60} thickness={4} color="primary" />
    </Backdrop>
  );
};
