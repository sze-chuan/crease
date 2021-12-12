import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import { DialogTitle } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';

import {
  getIsAddCardDialogVisible,
  setIsAddCardDialogVisible,
} from '../slices/cardSlice';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AddCardDialog = (): JSX.Element => {
  const isDialogVisible = useSelector(getIsAddCardDialogVisible);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setIsAddCardDialogVisible(false));
  };

  return (
    <Dialog
      fullScreen
      open={isDialogVisible}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle>{'Add New Card'}</DialogTitle>
    </Dialog>
  );
};
