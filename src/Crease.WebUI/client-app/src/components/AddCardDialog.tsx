import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import {
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';

import {
  getBankCards,
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
  const bankCards = useSelector(getBankCards);

  const handleClose = () => {
    dispatch(setIsAddCardDialogVisible(false));
  };

  const bankSelectItems = [
    ...Array.from(new Set(bankCards.map((bankCard) => bankCard.bank?.name))),
  ].map((bankName) => (
    <MenuItem key={bankName} value={bankName}>
      {bankName}
    </MenuItem>
  ));

  return (
    <Dialog
      fullScreen
      open={isDialogVisible}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle>{'Add New Card'}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id="bank-label">Bank</InputLabel>
          <Select labelId="bank-label" id="bank-select" label="Bank">
            {bankSelectItems}
          </Select>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};
