import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { AddCardDialogComponent } from '../add-card-dialog/add-card-dialog.component';

import { filter, switchMap } from 'rxjs/operators';

import { CardsService } from '../cards.service';
import { BaseCard } from '../models/baseCard';
import { Card } from '../models/card';

@Component({
  selector: 'card-viewer',
  templateUrl: './card-viewer.component.html',
  styleUrls: ['./card-viewer.component.css']
})
export class CardViewerComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  cards: Card[];
  baseCards: BaseCard[];
  selectedCard?: Card;
  routerObserver!: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private cardService: CardsService) {
    this.cards = [];
    this.baseCards = [];
  }

  ngOnInit(): void {
    this.cardService.getBaseCards().subscribe((data: BaseCard[]) => {
      this.baseCards = data;
    });

    this.cardService.getCards().subscribe((data: Card[]) => this.cards = data);

    this.routerObserver = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd && event.url === '/cards'))
      .subscribe(event => this.reset());

    if (this.route.children.length > 0) {
      this.route.firstChild?.params
      .pipe(switchMap((params: Params) => this.cardService.getCard(Number(params.id))))
      .subscribe((data: Card | undefined) => this.selectedCard = data);
    }
  }

  ngOnDestroy(): void {
    this.routerObserver.unsubscribe();
  }

  reset(): void {
    this.selectedCard = undefined;
  }

  onSelectCard(event: Card): void {
    this.selectedCard = Object.assign({}, this.selectedCard, event);
    this.sidenav.close();
  }

  openAddNewCardDialog(): void {
    const dialogRef = this.dialog.open(AddCardDialogComponent, {
      data: {
        baseCards: this.baseCards
      }
    });

    dialogRef.afterClosed().subscribe(card => {
      if (!card) {
        return;
      }

      this.cards = [...this.cards, card];

      if (!this.selectedCard) {
        this.selectedCard = card;
      }
    });
  }
}
