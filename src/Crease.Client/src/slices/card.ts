import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardState, RootState } from '../types';
import { IBankCardDto, ICardDto, ICardStatementDto } from '../api/apiClient';

const initialState: CardState = {
  bankCards: [],
  cards: [],
  showCardDialog: false,
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
    addCard: (state, { payload }: PayloadAction<ICardDto>) => {
      state.cards.push(payload);
    },
    setShowCardDialog: (state, { payload }: PayloadAction<boolean>) => {
      state.showCardDialog = payload;
    },
    setCardStatement: (
      state,
      { payload }: PayloadAction<ICardStatementDto>
    ) => {
      state.cardStatement = payload;
    },
  },
});

export const getBankCards = (state: RootState): IBankCardDto[] =>
  state.cardState.bankCards;
export const getCards = (state: RootState): ICardDto[] => state.cardState.cards;
export const getShowCardDialog = (state: RootState): boolean =>
  state.cardState.showCardDialog;
export const getCardStatement = (
  state: RootState
): ICardStatementDto | undefined => state.cardState.cardStatement;

export const {
  loadBankCards,
  loadCards,
  addCard,
  setShowCardDialog,
  setCardStatement,
} = cardSlice.actions;

export default cardSlice.reducer;
