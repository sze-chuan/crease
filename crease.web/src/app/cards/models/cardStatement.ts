import { CardTransaction } from './cardTransaction';

export interface CardStatement {
    id: number;
    cardId: number;
    statementMonth: Date;
    cardTransactions: CardTransaction[];
    cashback: number;
    miles: number;
    points: number;
}
