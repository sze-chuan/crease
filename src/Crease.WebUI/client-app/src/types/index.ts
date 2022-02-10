import { IBankCardDto, ICardDto } from '../api/web-api-client';

export interface CardState {
  bankCards: IBankCardDto[];
  cards: ICardDto[];
  isAddCardDialogVisisble: boolean;
}

export interface RootState {
  cardState: CardState;
}
