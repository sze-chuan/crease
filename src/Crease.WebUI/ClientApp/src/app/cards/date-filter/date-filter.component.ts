import { Component, Output, EventEmitter } from '@angular/core';

enum MonthName {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

@Component({
  selector: 'date-filter',
  styleUrls: ['./date-filter.component.css'],
  template: `
    <h3>Statement Month/Year</h3>
    <div class="date-filter-group">
      <mat-form-field>
        <mat-label>Month</mat-label>
        <mat-select
          #monthSelect
          [value]="month"
          (selectionChange)="
            onMonthYearChanged(monthSelect.value, yearSelect.value)
          "
        >
          <mat-option
            *ngFor="let monthOption of monthOptions"
            [value]="monthOption"
          >
            {{ getMonthName(monthOption) }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Year</mat-label>
        <mat-select
          #yearSelect
          [value]="year"
          (selectionChange)="
            onMonthYearChanged(monthSelect.value, yearSelect.value)
          "
        >
          <mat-option *ngFor="let year of yearOptions" [value]="year">{{
            year
          }}</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <mat-divider></mat-divider>
  `,
})
export class DateFilterComponent {
  readonly startYear: number = 2021;
  readonly maxNumberOfYears: number = 30;
  readonly monthOptions: MonthName[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  month: number;
  year: number;
  yearOptions: number[];

  @Output()
  changeDate: EventEmitter<Date> = new EventEmitter<Date>();

  constructor() {
    this.month = new Date(Date.now()).getMonth();
    this.year = new Date(Date.now()).getFullYear();
    this.yearOptions = Array.from(
      new Array(this.maxNumberOfYears),
      (val, index) => index + this.startYear
    );
  }

  getMonthName(month: number): string {
    return MonthName[month];
  }

  onMonthYearChanged(selectedMonth: number, selectedYear: number): void {
    this.changeDate.emit(new Date(selectedYear, selectedMonth));
  }
}
