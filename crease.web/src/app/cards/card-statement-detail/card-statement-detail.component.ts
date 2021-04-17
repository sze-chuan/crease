import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { CardTransactionDialogComponent } from '../card-transaction-dialog/card-transaction-dialog.component';

import { Card } from '../models/card';
import { CardStatement } from '../models/cardStatement';
import { CardTransaction } from '../models/cardTransaction';
import { CardsService } from '../cards.service';

@Component({
    selector: 'card-statement-detail',
    templateUrl: './card-statement-detail.component.html',
    styleUrls: ['./card-statement-detail.component.css']
})
export class CardStatementDetailComponent implements OnInit {
    selectedCard?: Card;
    cardStatement?: CardStatement;

    displayedColumns: string[] = ['index', 'transactionDate', 'vendor', 'amount'];

    constructor(
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private cardService: CardsService
        ) {
    }

    ngOnInit(): void {
        this.route.params
            .pipe(switchMap((params: Params) => this.cardService.getCard(Number(params.id))))
            .subscribe((data: Card | undefined) => {
                this.selectedCard = data;
                this.getCardStatement(new Date(Date.now()));
            });
    }

    openAddCardTransaction(): void {
        const dialogRef = this.dialog.open<CardTransactionDialogComponent, CardTransaction>(CardTransactionDialogComponent,
             { data: { id: 0, transactionDate: new Date(Date.now()), vendor: '', amount: 0 } });

        dialogRef.afterClosed().subscribe(data => {
            if (this.cardStatement && data) {
                this.cardStatement.cardTransactions = [...this.cardStatement.cardTransactions, data];
            }
        });
    }

    onChangeDate(event: Date): void {
        this.getCardStatement(event);
    }

    getCardStatement(statementPeriod: Date): void {
        if (this.selectedCard) {
            this.cardService.getCardStatement(this.selectedCard.id, statementPeriod)
                .subscribe((statement: CardStatement | undefined) => {
                    this.cardStatement = statement ? Object.assign({}, statement) : undefined;
                });
        }
    }

    getTotalAmount(): number {
        return this.cardStatement !== undefined
            ? this.cardStatement.cardTransactions.map(x => x.amount).reduce((acc, value) => acc + value, 0)
            : 0;
    }
}
