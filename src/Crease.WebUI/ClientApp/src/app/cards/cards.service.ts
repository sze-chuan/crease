import { of, Observable } from 'rxjs';
import { BaseCard } from './models/baseCard';
import { Card } from './models/card';
import { CardStatement } from './models/cardStatement';

export class CardsService {
  cards: Card[];
  baseCards: BaseCard[];
  cardStatements: CardStatement[];

  constructor() {
    this.baseCards = [
      { id: 1, name: 'DBS Live Fresh', bank: 'DBS' },
      { id: 2, name: 'Maybank Friends & Family', bank: 'Maybank' },
      { id: 3, name: 'OCBC Frank', bank: 'OCBC' },
    ];

    this.cards = [
      { id: 1, baseCard: this.baseCards[0], startDate: new Date(Date.now()) },
      { id: 2, baseCard: this.baseCards[1], startDate: new Date(Date.now()) },
      { id: 3, baseCard: this.baseCards[2], startDate: new Date(Date.now()) },
    ];

    this.cardStatements = [
      {
        id: 1,
        cardId: 1,
        cardTransactions: [
          {
            id: 1,
            transactionDate: new Date(Date.now()),
            vendor: 'Lazada',
            amount: 10,
          },
        ],
        statementMonth: new Date(),
        cashback: 10,
        miles: 10,
        points: 10,
      },
    ];
  }

  getCards(): Observable<Card[]> {
    return of(this.cards);
  }

  getCard(cardId: number): Observable<Card | undefined> {
    return of(this.cards.find((x) => x.id === cardId));
  }

  getCardStatement(
    cardId: number,
    statementPeriod: Date
  ): Observable<CardStatement | undefined> {
    return of(
      this.cardStatements.find(
        (x) =>
          x.cardId === cardId &&
          x.statementMonth.getMonth() === statementPeriod.getMonth() &&
          x.statementMonth.getFullYear() === statementPeriod.getFullYear()
      )
    );
  }
}
