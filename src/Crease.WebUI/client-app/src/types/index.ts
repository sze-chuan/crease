import { IBankCardDto, ICardDto, ITransactionDto } from '../api/apiClient';

export interface TransactionDialogProps {
  visible: boolean;
  card?: ICardDto | undefined;
  transaction?: ITransactionDto | undefined;
}

export interface TransactionState {
  transactionDialog: TransactionDialogProps;
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
