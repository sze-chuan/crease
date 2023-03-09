import React from 'react';
import { useDispatch } from 'react-redux';
import { AddTransactionFab } from './styles';
import { setTransactionDialog } from '../../slices/transaction';
import { TransactionDialogAction } from '../../types';

interface AddTransactionProps {
  cardId?: string;
  cardStatementId?: string;
  action: TransactionDialogAction;
}

const AddTransaction = ({
  cardId,
  cardStatementId,
  action,
}: AddTransactionProps): JSX.Element => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(
      setTransactionDialog({
        visible: true,
        cardId: cardId,
        cardStatementId: cardStatementId,
        action: action,
      })
    );
  };

  return (
    <AddTransactionFab variant="extended" color="primary" onClick={onClick}>
      Add Transaction
    </AddTransactionFab>
  );
};

export default AddTransaction;
