import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {InteractionType, IPublicClientApplication, PublicClientApplication} from "@azure/msal-browser";
import {msalConfig} from "./auth-config";
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE, MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration,
  MsalModule,
  MsalService,
  MsalRedirectComponent, MsalInterceptor, MSAL_INTERCEPTOR_CONFIG, MsalInterceptorConfiguration
} from "@azure/msal-angular";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {HomeComponent} from './home/home.component';
import {GuardedComponent} from './guarded/guarded.component';
import {ProfileComponent} from './profile/profile.component';
import {environment} from "../environments/environment";

/**
 * Here we pass the configuration parameters to create an MSAL instance.
 */
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

/**
 * MSAL Angular provides an Interceptor class that automatically acquires
 * tokens for outgoing requests that use the Angular http client to known protected resources.
 */
export const protectedResourceMap = new Map<string, Array<string>>([
  ['https://graph.microsoft.com/v1.0/me', ['user.read']],
  [`${environment.baseUrl}/dummy/authorized`, ['api://3131e057-40fc-4c4d-8ba7-b72a70c57120/resource']]
]);

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

/**
 * Set your default interaction type for MSALGuard here. If you have any
 * additional scopes you want the user to consent upon login, add them here as well.
 */
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read', 'openid', 'api://3131e057-40fc-4c4d-8ba7-b72a70c57120/resource']
    },
  };
}

const material = [
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatTableModule,
  MatCardModule
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GuardedComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    material,
    HttpClientModule,
    MsalModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule {
}
