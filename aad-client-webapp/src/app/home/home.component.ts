import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {MsalBroadcastService, MsalService} from "@azure/msal-angular";
import {AuthenticationResult, EventMessage, EventType, InteractionStatus} from "@azure/msal-browser";
import {filter, takeUntil} from "rxjs/operators";
import {DummyDto, HttpService} from "../service/http.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  loginDisplay = false;
  displayedColumns: string[] = ['claim', 'value'];
  dataSource: any = [];

  response: DummyDto | undefined;

  private readonly _destroying$ = new Subject<void>();

  constructor(private authService: MsalService,
              private msalBroadcastService: MsalBroadcastService,
              private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.getClaims(this.authService.instance.getActiveAccount()?.idTokenClaims)
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  getClaims(claims: any) {
    this.dataSource = [
      {id: 1, claim: "Display Name", value: claims ? claims['name'] : null},
      {id: 2, claim: "User Principal Name (UPN)", value: claims ? claims['preferred_username'] : null},
      {id: 2, claim: "OID", value: claims ? claims['oid'] : null}
    ];
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  getPrivateResource(): void {
    this.httpService.getAuthorizedResource()
      .subscribe(value => this.response = value);
  }

  getPublicResource(): void {
    this.httpService.getPublicResource()
      .subscribe(value => this.response = value);
  }
}
