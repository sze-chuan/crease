import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransactionState, RootState } from '../types';

const initialState: TransactionState = {
  showTransactionDialog: false,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setShowTransactionDialog: (state, { payload }: PayloadAction<boolean>) => {
      state.showTransactionDialog = payload;
    },
  },
});

export const getShowTransactionDialog = (state: RootState): boolean =>
  state.transactionState.showTransactionDialog;

export const { setShowTransactionDialog } = transactionSlice.actions;

export default transactionSlice.reducer;
