import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseCard } from '../models/baseCard';
import { Card } from '../models/card';

@Component({
  selector: 'add-card-dialog',
  templateUrl: './add-card-dialog.component.html',
  styleUrls: ['./add-card-dialog.component.css']
})
export class AddCardDialogComponent {
  cardForm: FormGroup;
  baseCards: BaseCard[];
  card: Card | undefined;

  constructor(
    private dialogRef: MatDialogRef<AddCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.baseCards = data?.baseCards;

    this.cardForm = new FormGroup({
      baseCard: new FormControl(),
      startDate: new FormControl()
    });
  }

  addCard(): void {
    this.dialogRef.close(this.cardForm.value);
  }
}
