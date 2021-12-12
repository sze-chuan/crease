import { IBankCardDto, ICardDto } from '../web-api-client';

export interface CardState {
  bankCards: IBankCardDto[];
  cards: ICardDto[];
}

export interface RootState {
  cardState: CardState;
}
