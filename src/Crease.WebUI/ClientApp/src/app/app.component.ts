import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import {
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
  MSAL_GUARD_CONFIG,
} from '@azure/msal-angular';
import {
  AccountInfo,
  AuthenticationResult,
  InteractionStatus,
  PopupRequest,
} from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly _destroying$ = new Subject<void>();
  userAccount: AccountInfo | null = null;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalBroadcastService: MsalBroadcastService,
    private authService: MsalService
  ) {}

  ngOnInit(): void {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        if (this.authService.instance.getAllAccounts().length > 0) {
          this.userAccount = Object.assign(
            {},
            this.userAccount,
            this.authService.instance.getAllAccounts()[0]
          );
        }
      });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  onAuthenticateEvent(event: string): void {
    if (event === 'logout') {
      this.authService.logout();
    } else if (event === 'login') {
      if (this.msalGuardConfig.authRequest) {
        this.authService
          .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
            this.userAccount = Object.assign(
              {},
              this.userAccount,
              response.account
            );
          });
      }
    }
  }
}
