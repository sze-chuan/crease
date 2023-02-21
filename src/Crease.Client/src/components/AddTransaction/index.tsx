import React from 'react';
import { useDispatch } from 'react-redux';
import { AddTransactionFab } from './styles';
import { setTransactionDialog } from '../../slices/transaction';
import { ICardDto } from '../../api/apiClient';

interface AddTransactionProps {
  card: ICardDto | undefined;
}

const defaultProps = {
  card: undefined,
};

const AddTransaction = ({ card }: AddTransactionProps): JSX.Element => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(setTransactionDialog({ visible: true, card: card }));
  };

  return (
    <AddTransactionFab variant="extended" color="primary" onClick={onClick}>
      Add Transaction
    </AddTransactionFab>
  );
};

AddTransaction.defaultProps = defaultProps;

export default AddTransaction;
