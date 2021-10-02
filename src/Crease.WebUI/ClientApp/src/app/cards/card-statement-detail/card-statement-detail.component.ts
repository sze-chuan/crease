import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { saveDateAsUtc } from 'src/util/date.helper';

import { switchMap } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { CardTransactionDialogComponent } from '../card-transaction-dialog/card-transaction-dialog.component';

import {
  CardDto,
  CardStatementDto,
  TransactionDto,
  CardStatementsClient,
  CardsClient,
  TransactionsClient,
  CreateCardStatementCommand,
  CreateTransactionCommand,
} from 'src/app/web-api-client';

@Component({
  selector: 'card-statement-detail',
  templateUrl: './card-statement-detail.component.html',
  styleUrls: ['./card-statement-detail.component.css'],
})
export class CardStatementDetailComponent implements OnInit {
  selectedMonthYear?: Date;
  selectedCard?: CardDto;
  cardStatement?: CardStatementDto;

  displayedColumns: string[] = ['date', 'description', 'amount'];

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private cardsClient: CardsClient,
    private cardStatementsClient: CardStatementsClient,
    private transactionsClient: TransactionsClient
  ) {
    const currentDate = new Date(Date.now());
    this.selectedMonthYear = saveDateAsUtc(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    );
  }

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params: Params) => this.cardsClient.get(params.id)))
      .subscribe((data: CardDto | undefined) => {
        this.selectedCard = data;
        this.getCardStatement(this.selectedMonthYear);
      });
  }

  openAddCardTransaction(): void {
    const newTransaction = {
      cardStatementId: this.cardStatement?.id,
      date: new Date(),
    } as TransactionDto;

    this.openTransactionDialog(newTransaction);
  }

  openTransactionDialog(transaction: TransactionDto): void {
    const dialogRef = this.dialog.open<
      CardTransactionDialogComponent,
      TransactionDto
    >(CardTransactionDialogComponent, {
      data: transaction,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.modifyTransaction(result.event, result.data);
    });
  }

  onChangeDate(event: Date): void {
    this.selectedMonthYear = event;
    this.getCardStatement(event);
  }

  getCardStatement(statementPeriod: Date | undefined): void {
    if (this.selectedCard && statementPeriod) {
      // Set to utc time to remove time zone offset in generated web service client
      const utcStatementPeriod = new Date(
        Date.UTC(statementPeriod.getFullYear(), statementPeriod.getMonth())
      );

      this.cardStatementsClient
        .get(this.selectedCard.id, utcStatementPeriod)
        .subscribe((statement: CardStatementDto | undefined) => {
          this.cardStatement = statement
            ? Object.assign({}, statement)
            : undefined;
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

  modifyTransaction(event: string, transaction: TransactionDto): void {
    if (!transaction.cardStatementId) {
      console.error('CardStatementId is missing.');
      return;
    }

    if (event === 'Add') {
      this.transactionsClient
        .create(transaction.cardStatementId, {
          ...transaction,
        } as CreateTransactionCommand)
        .subscribe(
          (result) => {
            transaction.id = result;
            if (this.cardStatement?.transactions) {
              this.cardStatement.transactions = [
                ...this.cardStatement.transactions,
                transaction,
              ];
            }
          },
          (error) => console.error(error)
        );
    } else if (event === 'Update' && transaction.id) {
      this.transactionsClient
        .update(transaction.id, transaction.cardStatementId, {
          ...transaction,
        } as CreateTransactionCommand)
        .subscribe(
          () => {
            if (this.cardStatement?.transactions) {
              this.cardStatement.transactions =
                this.cardStatement.transactions.map((item) => {
                  if (item.id !== transaction.id) {
                    return item;
                  }

                  return transaction;
                });
            }
          },
          (error) => console.error(error)
        );
    } else if (event === 'Delete' && transaction.id) {
      this.transactionsClient
        .delete(transaction.id, transaction.cardStatementId)
        .subscribe(
          () => {
            if (this.cardStatement?.transactions) {
              this.cardStatement.transactions =
                this.cardStatement.transactions.filter(
                  (item) => item.id !== transaction.id
                );
            }
          },
          (error) => console.error(error)
        );
    }
  }

  editTransactionDialog(transaction: TransactionDto): void {
    if (transaction) {
      this.openTransactionDialog(transaction);
    }
  }

  createStatement(): void {
    this.cardStatementsClient
      .create({
        cardId: this.selectedCard?.id,
        bankCardId: this.selectedCard?.bankCardId,
        monthYear: this.selectedMonthYear,
      } as CreateCardStatementCommand)
      .subscribe(
        (result) => {
          this.cardStatement = {
            id: result,
            monthYear: this.selectedMonthYear,
            transactions: [] as TransactionDto[],
          } as CardStatementDto;
        },
        (error) => console.error(error)
      );
  }
}
