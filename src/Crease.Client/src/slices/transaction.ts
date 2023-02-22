import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransactionState, RootState, TransactionDialogProps } from '../types';

const initialState: TransactionState = {
  transactionDialog: {
    visible: false,
  },
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactionDialog: (
      state,
      { payload }: PayloadAction<TransactionDialogProps>
    ) => {
      state.transactionDialog = payload;
    },
  },
});

export const getTransactionDialog = (
  state: RootState
): TransactionDialogProps => state.transactionState.transactionDialog;

export const { setTransactionDialog } = transactionSlice.actions;

export default transactionSlice.reducer;
