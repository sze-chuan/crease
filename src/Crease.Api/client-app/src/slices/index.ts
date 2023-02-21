import { combineReducers, Reducer } from '@reduxjs/toolkit';
import { RootState } from '../types';
import cardReducer from './card';
import transactionReducer from './transaction';

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  cardState: cardReducer,
  transactionState: transactionReducer,
});

export default rootReducer;
