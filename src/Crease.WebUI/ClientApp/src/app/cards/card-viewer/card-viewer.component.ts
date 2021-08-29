import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { AddCardDialogComponent } from '../add-card-dialog/add-card-dialog.component';
import {
  BankCardsClient,
  BankCardDto,
  CardsClient,
  CardDto,
  CreateCardCommand,
} from '../../web-api-client';

import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'card-viewer',
  templateUrl: './card-viewer.component.html',
  styleUrls: ['./card-viewer.component.css'],
})
export class CardViewerComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  cards: CardDto[];
  bankCards: BankCardDto[];
  selectedCard?: CardDto;
  routerObserver!: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private bankCardsClient: BankCardsClient,
    private cardsClient: CardsClient
  ) {
    this.cards = [];
    this.bankCards = [];
  }

  ngOnInit(): void {
    this.bankCardsClient.get().subscribe((data: BankCardDto[]) => {
      this.bankCards = data;
    });

    this.cardsClient
      .getAll()
      .subscribe((data: CardDto[]) => (this.cards = data));

    this.routerObserver = this.router.events
      .pipe(
        filter(
          (event) => event instanceof NavigationEnd && event.url === '/cards'
        )
      )
      .subscribe(() => this.reset());

    if (this.route.children.length > 0) {
      this.route.firstChild?.params
        .pipe(switchMap((params: Params) => this.cardsClient.get(params.id)))
        .subscribe((data: CardDto | undefined) => (this.selectedCard = data));
    }
  }

  ngOnDestroy(): void {
    this.routerObserver.unsubscribe();
  }

  reset(): void {
    this.selectedCard = undefined;
  }

  onSelectCard(event: CardDto): void {
    this.selectedCard = Object.assign({}, this.selectedCard, event);
    this.sidenav.close();
  }

  openAddNewCardDialog(): void {
    const dialogRef = this.dialog.open(AddCardDialogComponent, {
      data: {
        bankCards: this.bankCards,
      },
    });

    dialogRef.afterClosed().subscribe((card: CardDto) => {
      if (!card) {
        return;
      }

      this.cardsClient.create(CreateCardCommand.fromJS({ ...card })).subscribe(
        (result) => {
          card.id = result;
          this.cards = [...this.cards, card];
        },
        (error) => console.error(error)
      );

      if (!this.selectedCard) {
        this.selectedCard = card;
      }
    });
  }
}
