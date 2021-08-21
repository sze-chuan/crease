import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardDto } from 'src/app/web-api-client';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent {
  @Input()
  cards: CardDto[];

  @Output()
  selectCard: EventEmitter<CardDto> = new EventEmitter<CardDto>();

  constructor() {
    this.cards = [];
  }

  onSelectCard(card: CardDto): void {
    this.selectCard.emit(card);
  }
}
