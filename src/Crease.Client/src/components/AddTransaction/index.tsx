import React from 'react';
import { useDispatch } from 'react-redux';
import { AddTransactionFab } from './styles';
import { setTransactionDialog } from '../../slices/transaction';
import { TransactionDialogAction } from '../../types';
import { ICardDto, ICardStatementDto } from '../../api/apiClient';

interface AddTransactionProps {
  cardStatement?: ICardStatementDto;
  card?: ICardDto;
  action: TransactionDialogAction;
}

const AddTransaction = ({
  cardStatement,
  card,
  action,
}: AddTransactionProps): JSX.Element => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(
      setTransactionDialog({
        visible: true,
        card: card,
        cardStatement: cardStatement,
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
