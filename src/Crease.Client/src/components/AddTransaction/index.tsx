import React from 'react';
import { useDispatch } from 'react-redux';
import { AddTransactionFab } from './styles';
import { setTransactionDialog } from '../../slices/transaction';
import { ICardDto } from '../../api/apiClient';

interface AddTransactionProps {
  card?: ICardDto;
  cardStatementId?: string;
}

const AddTransaction = ({
  card,
  cardStatementId,
}: AddTransactionProps): JSX.Element => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(
      setTransactionDialog({
        visible: true,
        card: card,
        cardStatementId: cardStatementId,
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
