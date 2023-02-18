import { IBankCardDto, ICardDto } from '../api/apiClient';

export interface CardState {
  bankCards: IBankCardDto[];
  cards: ICardDto[];
  isAddCardDialogVisisble: boolean;
}

export interface RootState {
  cardState: CardState;
}
