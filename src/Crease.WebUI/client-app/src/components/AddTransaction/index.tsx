import React from 'react';
import { useDispatch } from 'react-redux';

import { AddTransactionFab } from './styles';

import { setTransactionDialog } from '../../slices/transaction';

const AddTransaction = (): JSX.Element => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(setTransactionDialog({ visible: true }));
  };

  return (
    <AddTransactionFab variant="extended" color="primary" onClick={onClick}>
      Add Transaction
    </AddTransactionFab>
  );
};

export default AddTransaction;
