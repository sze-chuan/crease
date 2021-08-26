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
  transaction: TransactionDto;
  readonly transactionCategories: string[] = ["Shopping", "Dining", "Groceries"];

  constructor(
    private dialogRef: MatDialogRef<CardTransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: TransactionDto
  ) {
    this.transaction = data;

    this.transactionForm = new FormGroup({
      date: new FormControl(new Date()),
      description: new FormControl(),
      amount: new FormControl(),
      paymentType: new FormControl(),
      transactionCategory: new FormControl(),
    });
  }

  addTransaction(): void {
    this.dialogRef.close(this.transactionForm.value);
  }
}
