import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { CardTransactionDialogComponent } from '../card-transaction-dialog/card-transaction-dialog.component';

import {
  CardDto,
  CardStatementDto,
  TransactionDto,
  CardStatementsClient,
  CardsClient,
} from 'src/app/web-api-client';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'card-statement-detail',
  templateUrl: './card-statement-detail.component.html',
  styleUrls: ['./card-statement-detail.component.css'],
})
export class CardStatementDetailComponent implements OnInit {
  selectedCard?: CardDto;
  cardStatement?: CardStatementDto;
  dataSource: MatTableDataSource<TransactionDto>;

  displayedColumns: string[] = ['index', 'date', 'description', 'amount'];

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private cardsClient: CardsClient,
    private cardStatementsClient: CardStatementsClient
  ) {
    this.dataSource = new MatTableDataSource<TransactionDto>();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => this.cardsClient.get(Number(params.id)))
      )
      .subscribe((data: CardDto | undefined) => {
        this.selectedCard = data;
      });
  }

  openAddCardTransaction(): void {
    const dialogRef = this.dialog.open<
      CardTransactionDialogComponent,
      TransactionDto
    >(CardTransactionDialogComponent, { data: new TransactionDto() });

    dialogRef.afterClosed().subscribe((data) => {
      if (this.cardStatement?.transactions && data) {
        this.cardStatement.transactions = [
          ...this.cardStatement.transactions,
          data,
        ];
      }
    });
  }

  onChangeDate(event: Date): void {
    this.getCardStatement(event);
  }

  getCardStatement(statementPeriod: Date): void {
    if (this.selectedCard) {
      this.cardStatementsClient
        .get(this.selectedCard.id, statementPeriod)
        .subscribe((statement: CardStatementDto | undefined) => {
          this.cardStatement = statement
            ? Object.assign({}, statement)
            : undefined;
          this.dataSource = new MatTableDataSource<TransactionDto>(
            this.cardStatement?.transactions
          );
        });
    }
  }

  getTotalAmount(): number {
    return this.cardStatement?.transactions !== undefined
      ? this.cardStatement.transactions
          .map((x) => x.amount ?? 0)
          .reduce((acc, value) => acc + value, 0)
      : 0;
  }
}
