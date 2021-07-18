import { Component, Input, Output, EventEmitter} from '@angular/core';

import { Card } from '../models/card';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {
  @Input()
  cards: Card[];

  @Output()
  selectCard: EventEmitter<Card> = new EventEmitter<Card>();

  constructor() {
    this.cards = [];
  }

  onSelectCard(card: Card): void {
    this.selectCard.emit(card);
  }
}
