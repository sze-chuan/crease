import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardState, RootState } from '../types';
import { IBankCardDto, ICardDto } from '../web-api-client';

export const initialState: CardState = {
  bankCards: [],
  cards: [],
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    loadBankCards: (state, { payload }: PayloadAction<IBankCardDto[]>) => {
      state.bankCards = payload;
    },
    loadCards: (state, { payload }: PayloadAction<ICardDto[]>) => {
      state.cards = payload;
    },
  },
});

export const getBankCards = (state: RootState): IBankCardDto[] =>
  state.cardState.bankCards;

export const getCards = (state: RootState): ICardDto[] => state.cardState.cards;

export const { loadBankCards, loadCards } = cardSlice.actions;

export default cardSlice.reducer;
