import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BankCardDto } from 'src/app/web-api-client';

@Component({
  selector: 'add-card-dialog',
  templateUrl: './add-card-dialog.component.html',
  styleUrls: ['./add-card-dialog.component.css'],
})
export class AddCardDialogComponent {
  cardForm: FormGroup;
  bankCards: BankCardDto[];

  constructor(
    private dialogRef: MatDialogRef<AddCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: BankCardDto[]
  ) {
    this.bankCards = data;

    this.cardForm = new FormGroup({
      bankCard: new FormControl(),
      name: new FormControl(),
      cardNumber: new FormControl(),
      startDate: new FormControl(),
    });
  }

  addCard(): void {
    this.dialogRef.close(this.cardForm.value);
  }
}
