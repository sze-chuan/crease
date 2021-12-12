import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardState, RootState } from '../types';
import { IBankCardDto, ICardDto } from '../web-api-client';

export const initialState: CardState = {
  bankCards: [],
  cards: [],
  isAddCardDialogVisisble: false,
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
    setIsAddCardDialogVisible: (state, { payload }: PayloadAction<boolean>) => {
      state.isAddCardDialogVisisble = payload;
    },
  },
});

export const getBankCards = (state: RootState): IBankCardDto[] =>
  state.cardState.bankCards;
export const getCards = (state: RootState): ICardDto[] => state.cardState.cards;
export const getIsAddCardDialogVisible = (state: RootState): boolean =>
  state.cardState.isAddCardDialogVisisble;

export const { loadBankCards, loadCards, setIsAddCardDialogVisible } =
  cardSlice.actions;

export default cardSlice.reducer;
