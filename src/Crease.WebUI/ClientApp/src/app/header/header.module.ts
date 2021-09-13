import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    FontAwesomeModule,
    RouterModule,
  ],
  providers: [],
  exports: [HeaderComponent],
  bootstrap: [HeaderComponent],
})
export class HeaderModule {}
