import {
  IBankCardDto,
  ICardDto,
  ICardStatementDto,
  ITransactionDto,
} from '../api/apiClient';

export interface TransactionDialogProps {
  visible: boolean;
  card?: ICardDto;
  cardStatementId?: string;
  transaction?: ITransactionDto;
}

export interface TransactionState {
  transactionDialog: TransactionDialogProps;
}

export interface CardState {
  bankCards: IBankCardDto[];
  cards: ICardDto[];
  showCardDialog: boolean;
  cardStatement?: ICardStatementDto;
}

export interface RootState {
  cardState: CardState;
  transactionState: TransactionState;
}
