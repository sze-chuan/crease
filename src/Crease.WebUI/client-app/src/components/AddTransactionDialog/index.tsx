import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogTemplate from '../DialogTemplate';

import {
  getTransactionDialog,
  setTransactionDialog,
} from '../../slices/transaction';

const AddTransactionDialog = (): JSX.Element => {
  const dispatch = useDispatch();
  const transactionDialog = useSelector(getTransactionDialog);
  const handleClose = () => {
    dispatch(setTransactionDialog({ visible: false }));
  };

  return (
    <DialogTemplate
      isDialogVisible={transactionDialog.visible}
      onClose={handleClose}
      dialogTitle="Add transaction"
    >
      <form autoComplete="off" noValidate={true}></form>
    </DialogTemplate>
  );
};

export default AddTransactionDialog;
