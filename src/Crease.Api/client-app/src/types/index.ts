import { IBankCardDto, ICardDto } from '../api/apiClient';

export interface TransactionState {
  showTransactionDialog: boolean;
}

export interface CardState {
  bankCards: IBankCardDto[];
  cards: ICardDto[];
  showCardDialog: boolean;
}

export interface RootState {
  cardState: CardState;
  transactionState: TransactionState;
}
