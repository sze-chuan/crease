import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AccountInfo } from '@azure/msal-common';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input()
  userAccount: AccountInfo | null = null;

  @Output()
  authenticateEvent: EventEmitter<string> = new EventEmitter<string>();

  faCreditCard = faCreditCard;

  handleLogin(): void {
    this.authenticateEvent.emit('login');
  }

  handleLogout(): void {
    this.authenticateEvent.emit('logout');
  }
}
