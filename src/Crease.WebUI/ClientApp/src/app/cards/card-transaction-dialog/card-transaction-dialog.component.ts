import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionDto } from 'src/app/web-api-client';

@Component({
  selector: 'card-transaction-dialog',
  templateUrl: './card-transaction-dialog.component.html',
  styleUrls: ['./card-transaction-dialog.component.css'],
})
export class CardTransactionDialogComponent {
  transactionForm: FormGroup;
  readonly transactionCategories: string[] = [
    'Shopping',
    'Dining',
    'Groceries',
  ];

  constructor(
    private dialogRef: MatDialogRef<CardTransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: TransactionDto
  ) {
    this.transactionForm = new FormGroup({
      id: new FormControl(data.id),
      date: new FormControl(data.date),
      description: new FormControl(data.description),
      amount: new FormControl(data.amount),
      paymentType: new FormControl(data.paymentType),
      transactionCategory: new FormControl(data.transactionCategory),
      cardStatementId: new FormControl(data.cardStatementId),
    });
  }

  addTransaction(): void {
    this.dialogRef.close(this.transactionForm.value);
  }
}
