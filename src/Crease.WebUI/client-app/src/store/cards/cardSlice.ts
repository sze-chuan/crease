import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardState, RootState } from '../../types';
import { IBankCardDto, ICardDto } from '../../api/apiClient';

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
    addCard: (state, { payload }: PayloadAction<ICardDto>) => {
      state.cards.push(payload);
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

export const { loadBankCards, loadCards, addCard, setIsAddCardDialogVisible } =
  cardSlice.actions;

export default cardSlice.reducer;
