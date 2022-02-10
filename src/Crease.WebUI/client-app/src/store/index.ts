import { combineReducers, Reducer } from '@reduxjs/toolkit';
import { RootState } from '../types';
import cardReducer from './cards/cardSlice';

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  cardState: cardReducer,
});

export default rootReducer;
