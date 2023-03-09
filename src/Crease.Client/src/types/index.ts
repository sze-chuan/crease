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
  cardId?: string;
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
