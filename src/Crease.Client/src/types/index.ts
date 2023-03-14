import {
  IBankCardDto,
  ICardDto,
  ICardStatementDto,
  ITransactionDto,
} from '../api/apiClient';

export enum TransactionDialogAction {
  AddFromHome,
  AddFromCard,
  Update,
}

export interface TransactionDialogProps {
  visible: boolean;
  action?: TransactionDialogAction;
  cardStatement?: ICardStatementDto;
  card?: ICardDto;
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
