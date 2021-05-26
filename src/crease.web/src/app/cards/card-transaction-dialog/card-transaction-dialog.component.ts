import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardTransaction } from '../models/cardTransaction';

@Component({
  selector: 'card-transaction-dialog',
  templateUrl: './card-transaction-dialog.component.html',
  styleUrls: ['./card-transaction-dialog.component.css']
})
export class CardTransactionDialogComponent {
  transactionForm: FormGroup;
  cardTransaction: CardTransaction;

  constructor(
    private dialogRef: MatDialogRef<CardTransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: CardTransaction) {
    this.cardTransaction = data;

    this.transactionForm = new FormGroup({
      transactionDate: new FormControl(new Date()),
      vendor: new FormControl(),
      amount: new FormControl(),
      type: new FormControl()
    });
  }

  addTransaction(): void {
    this.dialogRef.close(this.transactionForm.value);
  }
}
