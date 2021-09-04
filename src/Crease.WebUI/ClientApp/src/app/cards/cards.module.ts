import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CardViewerComponent } from './card-viewer/card-viewer.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardTransactionDialogComponent } from './card-transaction-dialog/card-transaction-dialog.component';
import { AddCardDialogComponent } from './add-card-dialog/add-card-dialog.component';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { CardStatementDetailComponent } from './card-statement-detail/card-statement-detail.component';

import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: 'cards',
    component: CardViewerComponent,
    children: [{ path: ':id', component: CardStatementDetailComponent }],
  },
];

@NgModule({
  declarations: [
    CardViewerComponent,
    CardListComponent,
    AddCardDialogComponent,
    CardTransactionDialogComponent,
    CardStatementDetailComponent,
    DateFilterComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatSelectModule,
    MatDividerModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatSortModule,
  ],
  exports: [CardViewerComponent, CardListComponent],
  bootstrap: [CardViewerComponent],
})
export class CardsModule {}
